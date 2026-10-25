// Run at /?section=portfolio; check Escape and outside clicks with the preview tools.
(async () => {
  const assert = (value, message) => { if (!value) throw new Error(message); };
  const pause = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const buttons = [...document.querySelectorAll('button[aria-label^="Enlarge image:"]')];
  assert(buttons.length === 2, 'Expected two project image previews');
  document.querySelectorAll('[popover]:popover-open').forEach(preview => preview.hidePopover());
  const checks = [];
  for (const [index, button] of buttons.entries()) {
    const article = button.closest('article');
    const before = article.getBoundingClientRect();
    const previousOverflow = document.body.style.overflow;
    const previousY = scrollY;
    button.focus({ preventScroll: true });
    button.click();
    await pause(40);
    const preview = article.querySelector('[popover]');
    assert(preview.matches(':popover-open'), 'Image preview must open');
    assert(preview.contains(document.activeElement), 'Preview controls must receive focus');
    assert(document.body.style.overflow === previousOverflow, 'Preview must leave page scrolling available');
    assert(article.getBoundingClientRect().height === before.height, 'Opening must not expand the project card');
    assert(Math.abs(article.getBoundingClientRect().top - before.top) < 1, 'Opening must not move the project card');
    const image = preview.querySelector('img');
    await image.decode();
    assert(image.naturalWidth > 0, 'Full image must load');
    const bounds = preview.getBoundingClientRect();
    assert(bounds.width <= 576 && bounds.height <= innerHeight * 0.6 + 19, 'Preview must stay compact');
    assert(bounds.left >= 0 && bounds.right <= innerWidth && bounds.top >= 44 && bounds.bottom <= innerHeight, 'Image and close control must fit in the viewport');
    assert(image.clientWidth <= preview.clientWidth && image.clientHeight <= preview.clientHeight, 'Full image must fit without internal scrolling');
    assert(getComputedStyle(preview, '::backdrop').backgroundColor === 'rgba(0, 0, 0, 0)', 'Page must stay visible without a scrim');
    const close = preview.querySelector(index === 0 ? '[aria-label="Close image preview"]' : '[aria-label^="Close enlarged image:"]');
    close.click();
    assert(!preview.matches(':popover-open'), 'Dismissal must be immediate');
    assert(document.activeElement === button, 'Focus must return to the originating thumbnail');
    assert(document.body.style.overflow === previousOverflow, 'Background scrolling must be restored');
    assert(Math.abs(scrollY - previousY) < 1, 'Dismissal must preserve the reading position');
    button.click();
    await pause(30);
    assert(preview.matches(':popover-open'), 'Preview must reopen');
    buttons[1 - index].click();
    assert(!preview.matches(':popover-open') && document.querySelectorAll('[popover]:popover-open').length === 1, 'Opening another image must replace the first preview');
    document.querySelector('[popover]:popover-open [aria-label="Close image preview"]').click();
    checks.push(button.getAttribute('aria-label'));
  }
  assert(document.documentElement.scrollWidth <= innerWidth, 'Research layout must not overflow');
  return { passed: true, viewport: `${innerWidth}×${innerHeight}`, viewers: checks, checks: 'compact image, no layout shift or scrim, image loading, instant dismissal, focus, reading position, reopen and switching images' };
})()
