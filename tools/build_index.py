#!/usr/bin/env python3
"""Regenerate assets/projects/projects.json from the .md files (run from the repo root).
Run it locally before testing, or let the GitHub Action do it on every push."""
import json, pathlib
d = pathlib.Path('assets/projects')
ids = sorted(f.stem for f in d.glob('*.md'))
(d / 'projects.json').write_text(json.dumps(ids, indent=1) + '\n')
print('Indexed', len(ids), 'projects:', ', '.join(ids))
