"""Throwaway comparison: current, Lora + Lato, and Lato throughout.

Run: python3 work/typography-demo/build_lato_prototype.py
Uses rendered snapshots of the current site; changes no application files.
"""
from pathlib import Path
import base64
import html
import io
import json
import re
import subprocess
import urllib.parse
from PIL import Image

HERE = Path(__file__).resolve().parent
source = json.loads((HERE / 'lato-prototype-source.json').read_text())
pages = {'start': source['html'], **json.loads((HERE / 'lato-prototype-pages.json').read_text())}
cache = {}
images = {}


def fetch(url):
    return subprocess.check_output(['curl', '-fsSL', '--max-time', '30', '-A', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', url])


def asset(url, image=False):
    if url in cache:
        return cache[url]
    data = fetch(url)
    extension = urllib.parse.urlparse(url).path.rsplit('.', 1)[-1]
    mime = {'woff2': 'font/woff2', 'woff': 'font/woff', 'ttf': 'font/ttf', 'svg': 'image/svg+xml'}.get(extension)
    if image and extension != 'svg':
        picture = Image.open(io.BytesIO(data)).convert('RGB')
        picture.thumbnail((128, 128) if '/logos/' in url else (320, 440) if 'frontpage' in url else (640, 480))
        output = io.BytesIO()
        picture.save(output, 'WEBP', quality=68)
        data, mime = output.getvalue(), 'image/webp'
    result = 'data:' + mime + ';base64,' + base64.b64encode(data).decode()
    cache[url] = result
    return result


css = ''
for url in source['styleUrls']:
    sheet = fetch(url).decode()
    sheet = re.sub(r'@font-face\s*\{.*?\}', lambda m: m[0] if 'src: local(' in m[0] or ('font-family: Geist;' in m[0] and ('unicode-range: U+??' in m[0] or 'unicode-range: U+100-2BA' in m[0])) else '', sheet, flags=re.S)
    sheet = re.sub(r'url\(([^)]+)\)', lambda m: 'url(' + asset(urllib.parse.urljoin(url, m[1].strip('"\''))) + ')', sheet)
    css += re.sub(r'/\*# sourceMappingURL=.*?\*/', '', sheet)

font_url = 'https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400..600&family=Lato:ital,wght@0,400;0,700;1,400&family=Newsreader:wght@400..600&family=Petrona:wght@400..600&family=Source+Serif+4:wght@400..600&display=swap'
font_css = fetch(font_url).decode()
font_faces = re.findall(r'/\* latin(?:-ext)? \*/\s*(@font-face\s*\{.*?\})', font_css, re.S)
assert font_faces, 'Google Fonts returned no Latin font faces'
for face in font_faces:
    css += re.sub(r'url\(([^)]+)\)', lambda m: 'url(' + asset(m[1].strip('"\'')) + ')', face)


def replace_image(match):
    tag = match[0]
    found = re.search(r'\ssrc="([^"]+)"', tag)
    if not found:
        return tag
    url = urllib.parse.urljoin('http://localhost:3000/', html.unescape(found[1]))
    if '/_next/image?' in url:
        url = urllib.parse.urljoin('http://localhost:3000/', urllib.parse.parse_qs(urllib.parse.urlparse(url).query)['url'][0])
    encoded = asset(url, image=True)
    key = next((key for key, value in images.items() if value == encoded), 'image-' + str(len(images)))
    images[key] = encoded
    tag = re.sub(r'\s(?:srcset|sizes|loading)="[^"]*"', '', tag)
    return re.sub(r'\ssrc="[^"]*"', ' data-demo-image="' + key + '"', tag)


for name, markup in pages.items():
    markup = re.sub(r'<img\b[^>]*>', replace_image, markup)
    markup = re.sub(r'<script\b[^>]*>.*?</script>|<!--.*?-->', '', markup, flags=re.S)
    pages[name] = markup

demo_css = (HERE / 'demo.css').read_text().replace('not([data-variant="before"])', 'not([data-variant="current"])')
demo_css += '''
html, body { min-height: 0; height: auto; }
#demo-site, #demo-site main, #demo-site .min-h-screen { min-height: 0; }
#demo-site h1, #demo-site h2 { text-wrap: balance; }
#demo-site p { text-wrap: pretty; }
#demo-toolbar .demo-note { max-width: 420px; }
@media (max-width: 600px) { #demo-toolbar button { padding: 9px 7px; } }
#demo-site[data-variant="sourceserif"] { --demo-heading: "Source Serif 4", Georgia, serif; --demo-body: Lato, Arial, sans-serif; }
#demo-site[data-variant="crimson"] { --demo-heading: "Crimson Pro", Georgia, serif; --demo-body: Lato, Arial, sans-serif; }
#demo-site[data-variant="newsreader"] { --demo-heading: Newsreader, Georgia, serif; --demo-body: Lato, Arial, sans-serif; }
#demo-site[data-variant="petrona"] { --demo-heading: Petrona, Georgia, serif; --demo-body: Lato, Arial, sans-serif; }
#demo-site:is([data-variant="sourceserif"], [data-variant="crimson"], [data-variant="newsreader"], [data-variant="petrona"]) h2 { font-weight: 500; }
'''
script = (HERE / 'demo.js').read_text()
script = script.replace("['lora', 'lato', 'previous']", "['current', 'sourceserif', 'crimson', 'newsreader', 'petrona', 'lato']")
script = script.replace("previous: 'Previous Pairing · Literata + Source Sans 3',", "current: 'Current site · Serif headings + Geist body',")
script = script.replace("lora: 'Lora For Headings · Lato Within Every Item',", "sourceserif: 'Source Serif 4 Headings · Lato Body',\n  crimson: 'Crimson Pro Headings · Lato Body',\n  newsreader: 'Newsreader Headings · Lato Body',\n  petrona: 'Petrona Headings · Lato Body',")
script = script.replace(": 'lora';", ": 'sourceserif';")
script = script.replace("initial.get('page') || 'highlights'", "initial.get('page') || 'start'")
script = script.replace("{ Start: 'start',", "{ Home: 'start', Start: 'start', Background: 'timeline',")
script = script.replace("headingFont: getComputedStyle(site.querySelector('h1')).fontFamily,", "headingFont: getComputedStyle(site.querySelector('h1')).fontFamily, fontCheck: ['Lato', 'Source Serif 4', 'Crimson Pro', 'Newsreader', 'Petrona'].map(f => f + '=' + document.fonts.check('16px ' + f)).join(' '),")
toolbar = '''<div id="demo-toolbar" role="group" aria-label="Typography comparison">
  <div class="demo-options">
    <button type="button" class="demo-arrow" data-direction="-1" aria-label="Previous typography">←</button>
    <button type="button" data-choice="current" aria-pressed="false">Current</button>
    <button type="button" data-choice="sourceserif" aria-pressed="true">Source Serif 4</button>
    <button type="button" data-choice="crimson" aria-pressed="false">Crimson Pro</button>
    <button type="button" data-choice="newsreader" aria-pressed="false">Newsreader</button>
    <button type="button" data-choice="petrona" aria-pressed="false">Petrona</button>
    <button type="button" data-choice="lato" aria-pressed="false">Lato throughout</button>
    <button type="button" class="demo-arrow" data-direction="1" aria-label="Next typography">→</button>
  </div>
  <span id="demo-caption" class="demo-caption" aria-live="polite">Source Serif 4 Headings · Lato Body</span>
  <span class="demo-note">Typography demo · Use ← / → to compare · Live site unchanged</span>
</div><div id="demo-toast" role="status" hidden></div>'''
templates = ''.join('<template id="page-' + key + '">' + markup + '</template>' for key, markup in pages.items())
document = ('<!doctype html><html lang="en"><head><meta charset="utf-8">'
    '<meta name="viewport" content="width=device-width,initial-scale=1">'
    '<title>Loic — Typography Demo</title><style>' + css + demo_css + '</style></head><body>'
    '<div id="demo-site" data-variant="lato" class="' + source['bodyClass'] + '"><main></main>'
    + source['footer'] + '</div>' + templates + toolbar
    + '<script>const demoImages = ' + json.dumps(images) + ';\n' + script + '</script></body></html>')
target = HERE / 'lato-only-prototype.html'
target.write_text(document)
print(json.dumps({'file': str(target), 'bytes': len(document.encode()), 'pages': list(pages), 'assets': len(cache)}))
