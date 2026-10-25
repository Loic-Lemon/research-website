// Preview state only. No app files, storage, or server data are changed.
const site = document.getElementById('demo-site');
const toolbar = document.getElementById('demo-toolbar');
const caption = document.getElementById('demo-caption');
const variants = ['lora', 'lato', 'previous'];
const descriptions = {
  lora: 'Lora For Headings · Lato Within Every Item',
  lato: 'Lato Throughout · Same Consistent Item Styling',
  previous: 'Previous Pairing · Literata + Source Sans 3',
};
const initial = new URLSearchParams(location.search);
let variant = variants.includes(initial.get('variant')) ? initial.get('variant') : 'lora';
let page = initial.get('page') || 'highlights';
function setVariant(next, updateUrl = true) {
  variant = next;
  site.dataset.variant = next;
  toolbar.querySelectorAll('[data-choice]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.choice === next)));
  caption.textContent = descriptions[next];
  if (updateUrl) syncUrl();
}
function syncUrl() {
  try {
    const url = new URL(location.href);
    url.searchParams.set('variant', variant);
    url.searchParams.set('page', page);
    history.replaceState(null, '', url);
  } catch (_) { /* srcdoc previews do not have a writable URL. */ }
}
function showPage(next, scroll = true) {
  const template = document.getElementById('page-' + (next === 'highlights' ? 'start' : next));
  if (!template) return;
  page = next;
  const previousMain = site.querySelector('main');
  const nextMain = template.content.firstElementChild.cloneNode(true);
  nextMain.querySelectorAll('img[data-demo-image]').forEach(img => { img.src = demoImages[img.dataset.demoImage]; });
  if (next === 'highlights') {
    nextMain.querySelectorAll('#about, #my-research, nav[aria-label="On this page"]').forEach(element => element.remove());
    nextMain.querySelector('section#recent-highlights').style.scrollMarginTop = '80px';
  }
  nextMain.querySelectorAll('#recent-highlights h3, #research h3, #publications h3, #timeline h3, #awards h3').forEach(title => {
    const item = title.parentElement;
    item.classList.add('demo-item');
    title.classList.add('demo-item-title');
    title.previousElementSibling?.classList.add('demo-item-meta');
    item.querySelectorAll(':scope > p, :scope > ul').forEach(body => body.classList.add('demo-item-body'));
    if (title.closest('#publications')) {
      const authors = item.querySelector(':scope > p');
      authors?.classList.replace('demo-item-body', 'demo-item-meta');
    }
    if (title.closest('#timeline')) item.previousElementSibling?.classList.add('demo-item-meta');
  });
  previousMain.replaceWith(nextMain);
  updateThemeLabels();
  setVariant(variant, false);
  syncUrl();
  if (scroll) window.scrollTo({ top: 0 });
}
toolbar.addEventListener('click', event => {
  const choice = event.target.closest('[data-choice]');
  if (choice) setVariant(choice.dataset.choice);
  const direction = event.target.closest('[data-direction]');
  if (direction) setVariant(variants[(variants.indexOf(variant) + Number(direction.dataset.direction) + variants.length) % variants.length]);
});
document.addEventListener('keydown', event => {
  if (event.target.closest('input,textarea,select,[contenteditable="true"]')) return;
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    const delta = event.key === 'ArrowRight' ? 1 : -1;
    setVariant(variants[(variants.indexOf(variant) + delta + variants.length) % variants.length]);
  }
});
site.addEventListener('click', event => {
  const menu = event.target.closest('.menu-toggle');
  if (menu) {
    const header = menu.closest('.site-nav');
    const open = header.dataset.open !== 'true';
    header.dataset.open = String(open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close quick links' : 'Open quick links');
    menu.lastElementChild.textContent = open ? 'Close' : 'Menu';
    return;
  }
  const nav = event.target.closest('#quick-links button');
  if (nav) {
    const pages = { Start: 'start', Research: 'research', Publications: 'publications', Timeline: 'timeline', Awards: 'awards', Extra: 'extra' };
    showPage(pages[nav.textContent.trim()]);
    return;
  }
  const theme = event.target.closest('button[aria-label^="Switch to"]');
  if (theme) {
    document.documentElement.classList.toggle('dark');
    updateThemeLabels();
    return;
  }
  const contents = event.target.closest('nav[aria-label="On this page"] button');
  if (contents) {
    const links = document.getElementById(contents.getAttribute('aria-controls'));
    if (links) {
      const expanded = contents.getAttribute('aria-expanded') !== 'true';
      contents.setAttribute('aria-expanded', String(expanded));
      links.style.display = expanded ? 'flex' : 'none';
    }
    return;
  }
  const preview = event.target.closest('button[aria-label*="image preview"]');
  if (preview) {
    const img = preview.querySelector('img');
    if (!img) return;
    let enlarged = preview.parentElement.querySelector('.demo-image-preview');
    if (enlarged) { enlarged.remove(); preview.setAttribute('aria-expanded', 'false'); }
    else {
      enlarged = document.createElement('div');
      enlarged.className = 'demo-image-preview';
      enlarged.style.cssText = 'flex-basis:100%;width:100%;padding:16px;border:1px solid rgb(var(--border));border-radius:12px';
      const full = img.cloneNode();
      full.style.cssText = 'position:static;width:100%;height:auto;max-height:600px;object-fit:contain';
      full.alt = preview.getAttribute('aria-label');
      enlarged.append(full);
      preview.parentElement.append(enlarged);
      preview.setAttribute('aria-expanded', 'true');
    }
    return;
  }
  const project = event.target.closest('a[href^="/research/"]');
  if (project) {
    event.preventDefault();
    const toast = document.getElementById('demo-toast');
    toast.textContent = 'Typography preview — project detail pages are unchanged.';
    toast.hidden = false;
    setTimeout(() => { toast.hidden = true; }, 2500);
  }
});
function updateThemeLabels() {
  site.querySelectorAll('button[aria-label^="Switch to"]').forEach(button => {
    button.setAttribute('aria-label', document.documentElement.classList.contains('dark') ? 'Switch to light mode' : 'Switch to dark mode');
  });
}
showPage(page, false);
setVariant(variant, false);
document.fonts.ready.then(() => console.log(JSON.stringify({
  variant,
  page,
  headingFont: getComputedStyle(site.querySelector('h1')).fontFamily,
  bodyFont: getComputedStyle(site).fontFamily,
  portraitFilter: Boolean(site.querySelector('#ink-bleed animate')),
  navigationPages: document.querySelectorAll('template[id^="page-"]').length,
  horizontalOverflow: document.documentElement.scrollWidth > innerWidth
})));
