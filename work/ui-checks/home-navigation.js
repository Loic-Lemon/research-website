// Run in the collaborative preview after opening /.
(async () => {
  const assert = (value, message) => { if (!value) throw new Error(message); };
  const pause = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const nav = label => [...document.querySelectorAll('nav[aria-label="Quick links"] button')].find(button => button.textContent.trim() === label);
  const showMore = () => [...document.querySelectorAll('#recent-highlights button')].find(button => button.textContent.trim() === 'Show more');
  assert(document.querySelector('#about'), 'Start on the main Home');
  showMore().click();
  await pause(520);
  assert([...document.querySelectorAll('h2')].some(h => h.textContent.trim() === 'All Highlights'), 'Show more must open All Highlights');
  nav('Background').click();
  await pause(520);
  assert(document.querySelector('#timeline'), 'Navigation must reach Background');
  nav('Home').click();
  await pause(520);
  assert(document.querySelector('#about') && document.querySelector('#my-research'), 'Returning Home must show the main Home, not All Highlights');
  assert(![...document.querySelectorAll('h2')].some(h => h.textContent.trim() === 'All Highlights'), 'Expanded highlights must not persist after navigation');
  showMore().click();
  await pause(520);
  nav('Home').click();
  await pause(520);
  assert(document.querySelector('#about'), 'Home must also reset expanded highlights when already on Home');
  showMore().click();
  await pause(20);
  nav('Research').click();
  await pause(520);
  nav('Home').click();
  await pause(520);
  assert(document.querySelector('#about'), 'Leaving during the highlight animation must not revive All Highlights');
  assert(!location.search.includes('section='), 'Home URL must not retain a section');
  return { passed: true, checks: 'show more → other page → Home; Home from expanded view; leave during transition' };
})()
