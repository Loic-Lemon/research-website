// Run in the collaborative preview at /?section=publication.
(async () => {
  const assert = (value, message) => { if (!value) throw new Error(message); };
  const pause = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const articles = [...document.querySelectorAll('#publications article')];
  assert(articles.length === 4, 'Expected four publications');
  const keys = new Set();
  for (const article of articles) {
    const button = article.querySelector('button');
    const beforeWidth = button.getBoundingClientRect().width;
    button.focus();
    button.click();
    await pause(40);
    assert(button.textContent === 'Copied', 'Clipboard write must report success');
    const citation = await navigator.clipboard.readText();
    const key = citation.match(/^@(inproceedings|unpublished)\{([^,]+),/)?.[2];
    assert(key && !keys.has(key), 'Citation keys must exist and be unique');
    keys.add(key);
    assert(citation.includes('author = {') && citation.includes('title = {{'), 'Citation needs authors and protected title');
    let depth = 0;
    for (const character of citation) {
      if (character === '{') depth++;
      if (character === '}') depth--;
      assert(depth >= 0, 'Unbalanced citation braces');
    }
    assert(depth === 0, 'Unbalanced citation braces');
    assert(!citation.includes('<u>') && !citation.includes('*'), 'Citation cannot contain display-only author markup');
    assert(button.getBoundingClientRect().width === beforeWidth, 'Copied state must not shift action buttons');
  }

  const clipboard = navigator.clipboard;
  const descriptor = Object.getOwnPropertyDescriptor(clipboard, 'writeText');
  try {
    Object.defineProperty(clipboard, 'writeText', {
      configurable: true,
      value: async () => { throw new DOMException('Test: clipboard denied', 'NotAllowedError'); },
    });
    const first = articles[0];
    first.querySelector('button').click();
    await pause(40);
    const textarea = first.querySelector('textarea');
    assert(textarea, 'Denied clipboard must offer manual copying');
    assert(document.activeElement === textarea, 'Manual citation must receive focus');
    assert(textarea.selectionStart === 0 && textarea.selectionEnd === textarea.value.length, 'Manual citation must be fully selected');
    assert(first.querySelector('[role=status]').textContent.includes('unavailable'), 'Copy failure must be explained');
  } finally {
    if (descriptor) Object.defineProperty(clipboard, 'writeText', descriptor);
    else delete clipboard.writeText;
  }
  articles[0].querySelector('button').click();
  await pause(40);
  assert(!articles[0].querySelector('textarea'), 'Successful retry must remove fallback');
  await pause(2600);
  assert(articles[0].querySelector('button').textContent === 'Copy BibTeX', 'Copied feedback must reset');
  assert(document.documentElement.scrollWidth <= innerWidth, 'Publication layout must not overflow');
  return { passed: true, citations: keys.size, clipboard: 'real write/read, denied fallback, retry and feedback reset' };
})()
