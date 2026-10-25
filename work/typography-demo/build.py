"""A warm research-site font direction; production files stay untouched."""
from pathlib import Path
import base64
import html
import io
import json
import re
import urllib.parse
import urllib.request
from PIL import Image

HERE = Path(__file__).resolve().parent
source = json.loads((HERE / 'source.json').read_text())
pages = {'start': source['html'], 'publications': (HERE / 'publications-source.html').read_text()}
pages.update(json.loads((HERE / 'other-pages.json').read_text()))
css = (HERE / 'original.css').read_text()
css_url = source['styleUrls'][0]
asset_cache = {}
image_assets = {}

def inline_asset(url, image=False):
    url = urllib.parse.urljoin(css_url if not image else 'http://localhost:3000/', html.unescape(url))
    if url in asset_cache:
        return asset_cache[url]
    with urllib.request.urlopen(url) as response:
        data = response.read()
        mime = response.headers.get_content_type()
    if image and mime != 'image/svg+xml':
        original = Image.open(io.BytesIO(data)).convert('RGB')
        bounds = (128, 128) if '/logos/' in url else (320, 440) if 'frontpage' in url else (640, 480)
        original.thumbnail(bounds)
        output = io.BytesIO()
        original.save(output, 'WEBP', quality=68)
        data, mime = output.getvalue(), 'image/webp'
    result = 'data:' + mime + ';base64,' + base64.b64encode(data).decode()
    asset_cache[url] = result
    return result

# This round uses web fonts; earlier self-contained comparisons stay in their own files.
css = re.sub(r'@font-face\s*\{[^}]+\}', '', css)
# Original site variables intentionally stay inside this isolated document.
css = re.sub(r'/\*# sourceMappingURL=.*?\*/', '', css)

def replace_img(match):
    tag = match.group(0)
    src = re.search(r'\ssrc="([^"]+)"', tag)
    if not src:
        return tag
    url = html.unescape(src.group(1))
    if url.startswith('/_next/image?'):
        params = urllib.parse.parse_qs(urllib.parse.urlparse(url).query)
        url = params['url'][0]
    data = inline_asset(url, image=True)
    key = 'image-' + str(list(image_assets.values()).index(data)) if data in image_assets.values() else 'image-' + str(len(image_assets))
    image_assets[key] = data
    tag = re.sub(r'\s(?:srcset|sizes|loading)="[^"]*"', '', tag)
    tag = re.sub(r'\ssrc="[^"]*"', ' data-demo-image="' + key + '"', tag)
    return tag

for key, markup in pages.items():
    markup = re.sub(r'<img\b[^>]*>', replace_img, markup)
    markup = re.sub(r'<!--.*?-->', '', markup, flags=re.S)
    # No scripts or hydrated application state are copied into the demo.
    markup = re.sub(r'<script\b[^>]*>.*?</script>', '', markup, flags=re.S)
    pages[key] = markup

templates = '\n'.join('<template id="page-' + name + '">' + markup + '</template>' for name, markup in pages.items())
toolbar = '''<div id="demo-toolbar" aria-label="Typography comparison">
  <div class="demo-options">
    <button type="button" class="demo-arrow" data-direction="-1" aria-label="Previous typography">←</button>
    <button type="button" data-choice="lora" aria-pressed="true">Lora + Lato</button>
    <button type="button" data-choice="lato" aria-pressed="false">Lato Only</button>
    <button type="button" data-choice="previous" aria-pressed="false">Previous</button>
    <button type="button" class="demo-arrow" data-direction="1" aria-label="Next typography">→</button>
  </div>
  <span id="demo-caption" class="demo-caption" aria-live="polite">Lora For Headings · Lato Within Every Item</span>
  <span class="demo-note">Title Case Headings · Decorative Motion Preserved</span>
</div><div id="demo-toast" role="status" hidden></div>'''
document = ('<!doctype html><html lang="en"><head><meta charset="utf-8">'
    '<meta name="viewport" content="width=device-width,initial-scale=1">'
    '<title>Loic — Lora And Lato Preview</title>'
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400&amp;family=Literata:opsz,wght@7..72,400&amp;family=Lora:wght@400;500&amp;family=Source+Sans+3:ital,wght@0,400;0,600;1,400&amp;display=swap">'
    '<style>' + css + '\n' + (HERE / 'demo.css').read_text() + '</style></head><body>'
    '<div id="demo-site" data-variant="lora" class="' + source['bodyClass'] + '">'
    '<main></main>' + source['footer'] + '</div>' + templates + toolbar
    + '<script>const demoImages = ' + json.dumps(image_assets) + ';\n' + (HERE / 'demo.js').read_text() + '</script></body></html>')
(HERE / 'lora-lato.html').write_text(document)
print(json.dumps({'bytes': len(document.encode()), 'pages': list(pages), 'uniqueAssets': len(asset_cache), 'originalFilesChanged': False}))
