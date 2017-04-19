import { SCRAPE_THREAD_DATA } from '../constants/messageTypes';

function getElementTextContent(el) {
  return el ? el.textContent.replace(/\r?\n|\r/, '').trim() : '';
}

function scrapeThreadContent(res) {
  let threadContentEl, titleEl, texts, content;

  threadContentEl = document.querySelector('#thread .thread-content');
  if (!threadContentEl) return res();

  titleEl = threadContentEl.querySelector('.title-body');
  if (!titleEl) return res();

  content = {
    title: getElementTextContent(titleEl)
  };

  texts = threadContentEl.querySelectorAll('.thread-activities .chat-message');
  if (!texts) return res(content);

  content.texts = texts.map(el => ({
    author: getElementTextContent(el.querySelector('.message-author')),
    timestamp: getElementTextContent(el.querySelector('.timestamp')),
    message: getElementTextContent(el.querySelector('.msg-body'))
  }));

  res(content);
}

chrome.runtime.onMessage.addListener((req, sender, res) => {
  switch (req.type) {
    case SCRAPE_THREAD_DATA:
      scrapeThreadContent(res);
      break;
  }
});