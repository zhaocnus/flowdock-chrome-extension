import { SCRAPE_THREAD_DATA } from '../constants/messageTypes';

function getElementTextContent(el) {
  return el ? el.textContent.replace(/\r?\n|\r/, '').trim() : '';
}

function getThreadTexts(threadContentEl) {
  const texts = threadContentEl.querySelectorAll('ul.thread-activities li.chat-message');

  if (texts.length < 1) return [];

  // texts is a NodeList, NOT an array
  return [...texts].map(el => {
    const authorEl = el.querySelector('.message-author');
    const timestamp = el.querySelector('.timestamp');
    const messageEl = el.querySelector('.msg-body');

    return {
      author: getElementTextContent(authorEl),
      authorId: authorEl && authorEl.getAttribute('data-user'),
      timestamp: timestamp && timestamp.getAttribute('datetime'),
      message: getElementTextContent(messageEl)
    };
  });
}

function scrapeThreadContent(res) {
  let threadContentEl, titleEl;

  threadContentEl = document.querySelector('#thread .thread-content');
  if (!threadContentEl) return res({ err: true });

  titleEl = threadContentEl.querySelector('.title-body');
  if (!titleEl) return res({ err: true });

  res({
    title: getElementTextContent(titleEl),
    texts: getThreadTexts(threadContentEl)
  });
}

chrome.runtime.onMessage.addListener((req, sender, res) => {
  switch (req.type) {
    case SCRAPE_THREAD_DATA:
      scrapeThreadContent(res);
      break;
  }
});
