"""Validate artifact contracts, local references, JSON, JS syntax and media limits."""
import json
import pathlib
import re
import subprocess
from html.parser import HTMLParser

ROOT = pathlib.Path(__file__).resolve().parents[1]
class References(HTMLParser):
    def __init__(self):
        super().__init__()
        self.paths = []
    def handle_starttag(self, tag, attrs):
        self.paths.extend(v for k, v in attrs if k in ('src', 'href') and v and not v.startswith(('https:', '#', 'data:')))

categories = json.loads((ROOT / 'abstracts.json').read_text())['categories']
for path in ROOT.rglob('*'):
    if not path.is_file() or '.git' in path.parts or '.research' in path.parts:
        continue
    assert path.stat().st_size < 300000, f'Too large: {path}'
    if path.suffix in ('.json', '.geojson'):
        json.loads(path.read_text())
    if path.suffix in ('.js', '.mjs'):
        subprocess.run(['node', '--check', str(path)], check=True)
    if path.name == 'artifact.json':
        metadata = json.loads(path.read_text())
        assert set(metadata) == {'title', 'kind', 'entry', 'category', 'description'}
        assert metadata['category'] in categories
        assert metadata['kind'] in ('web', 'gallery', 'document')
        if metadata['kind'] == 'document':
            assert metadata['entry'].endswith('.md'), f'Document entry must be Markdown: {path}'
        assert (path.parent / metadata['entry']).is_file()
        assert (path.parent / 'SOURCES.md').is_file()
    if path.name == 'index.html':
        parser = References()
        parser.feed(path.read_text())
        for ref in parser.paths:
            assert (path.parent / ref).is_file(), f'Broken reference: {path}: {ref}'
        script = (path.parent / 'app.js').read_text()
        assert re.search(r"fetch\('\./[^']+'\)", script), f'No relative data fetch: {path}'
for path, field in [('artifacts/timeline/events.json', None), ('artifacts/qumran-map/places.geojson', 'features')]:
    rows = json.loads((ROOT / path).read_text())
    if field:
        rows = [f['properties'] for f in rows[field]]
    for row in rows:
        assert row['sources'] and all(s['title'] and s['url'].startswith('https://') for s in row['sources'])
print('Artifact contracts, file sizes, JSON, JS syntax, relative data and HTML paths: PASS')
