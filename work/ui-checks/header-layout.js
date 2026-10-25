// Run in the collaborative preview at / after resizing across 899px and 900px.
(async () => {
  const assert = (value, message) => { if (!value) throw new Error(message); };
  await new Promise(requestAnimationFrame);
  await new Promise(requestAnimationFrame);

  const menu = document.querySelector('.menu-toggle');
  const contents = document.querySelector('nav[aria-label="Page contents"]');
  assert(menu && contents, 'The homepage must expose both header controls');
  const menuBounds = menu.getBoundingClientRect();
  const contentsBounds = contents.getBoundingClientRect();
  const mobile = innerWidth < 900;

  assert((getComputedStyle(menu).display !== 'none') === mobile,
    'The burger menu must appear below 900px');
  if (mobile) {
    assert(Math.abs(contentsBounds.top - menuBounds.top) < 1,
      `Page contents must align with the burger menu at ${innerWidth}px`);
    assert(Math.abs(contentsBounds.height - menuBounds.height) < 1,
      'The mobile header controls must have equal heights');
    assert(contentsBounds.left >= menuBounds.right,
      'Page contents must sit beside the burger menu without overlap');
  } else {
    const headerBounds = menu.closest('header').getBoundingClientRect();
    assert(contentsBounds.top >= headerBounds.top && contentsBounds.bottom <= headerBounds.bottom,
      'Desktop page contents must stay within the navigation bar');
  }
  assert(contentsBounds.right <= innerWidth && contentsBounds.top >= 0,
    'Page contents must fit within the viewport');
  assert(document.documentElement.scrollWidth <= innerWidth,
    'The page must not overflow horizontally');
  return { passed: true, width: innerWidth, slot: contents.parentElement.id, top: contentsBounds.top };
})()
