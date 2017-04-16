function scrapeThreadContent(res) {
  let threadContentEl = document.querySelector('#thread .thread-content');

  if (!threadContentEl) return res();

  let titleEl = threadContentEl.querySelector('.title-body');

  if (!titleEl) return res();

  res(titleEl.textContent.replace(/\r?\n|\r/, '').trim());
}

chrome.runtime.onMessage.addListener((req, sender, res) => {
  switch (req.type) {
    case 'SCRAPE_THREAD_DATA':
      scrapeThreadContent(res);
      break;
  }
});