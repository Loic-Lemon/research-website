// Run in the collaborative preview at /?section=timeline.
(() => {
  const assert = (value, message) => { if (!value) throw new Error(message); };
  const root = document.querySelector('#timeline');
  const dates = [...root.querySelectorAll('span.tabular-nums')];
  assert(dates.length === 4, 'Education and Experience must share date styling');
  for (const date of dates) {
    assert(/^\d{4} – (?:\d{4}|Present)$/.test(date.textContent), 'Date ranges must use consistent spaced en dashes');
    assert(date.getBoundingClientRect().height <= 24, 'Date label must not stretch to the full entry height');
    assert(getComputedStyle(date).whiteSpace === 'nowrap', 'Each date range must stay together');
  }
  const lists = [...root.querySelectorAll('ul')].filter(ul => ul.querySelector('li>span+span'));
  assert(lists.length === 2 && lists[0].children.length === 4 && lists[1].children.length === 2, 'All six advisors must be preserved');
  const checkPairs = list => {
    for (const item of list.children) {
      const [name, affiliation] = item.children;
      const n = name.getBoundingClientRect(), a = affiliation.getBoundingClientRect();
      assert(getComputedStyle(name).fontStyle === 'normal', 'Advisor names should remain upright');
      assert(getComputedStyle(affiliation).fontStyle === 'italic', 'Affiliations should remain italic');
      assert(parseFloat(getComputedStyle(affiliation).fontSize) < parseFloat(getComputedStyle(name).fontSize), 'Affiliations must be smaller than names');
      assert(a.top >= n.bottom && a.left === n.left, 'Each affiliation must sit beneath its own advisor');
      assert(item.scrollWidth <= item.clientWidth, 'Advisor groups must not overflow');
    }
  };
  for (const list of lists) {
    checkPairs(list);
    const previousWidth = list.style.width;
    try {
      list.style.width = '280px';
      assert(getComputedStyle(list).gridTemplateColumns.split(' ').length === 1, 'Narrow lists must use one column');
      checkPairs(list);
    } finally {
      list.style.width = previousWidth;
    }
  }
  assert(document.documentElement.scrollWidth <= innerWidth, 'Background must not overflow horizontally');
  return { passed: true, dateRanges: dates.map(d => d.textContent), advisors: 6, narrowColumnWidth: 280 };
})()
