from pathlib import Path
path = Path('c:/Users/pc/Desktop/Runa_Finance-project/backend-runa/Dockerfile')
text = path.read_text(encoding='utf-8')
old = 'ENTRYPOINT ["dumb-init", "--", "docker-entrypoint.sh"]'
new = 'ENTRYPOINT ["dumb-init", "--", "bash", "/usr/local/bin/docker-entrypoint.sh"]'
if old not in text:
    raise SystemExit('old entrypoint not found')
text = text.replace(old, new, 1)
path.write_text(text, encoding='utf-8')
