import { saveThread } from '../api';

chrome.webNavigation.onHistoryStateUpdated.addListener(details => {
  let url = new URL(details.url);

  // get thread id from url
  // Example:
  // https://www.flowdock.com/app/<company_name>/<flow_name>/threads/fzmGbpx_blEX5ctrjfyvy5EH5_8
  if (url.origin !== 'https://www.flowdock.com') return;

  let segments = url.pathname.split('/').slice(-3);

  if (segments.length < 3) return;

  if (segments[1] !== 'threads') return;

  let thread = {
    url: details.url,
    flow: segments[0],
    id: segments[2]
  };

  chrome.tabs.sendMessage(details.tabId, { type: 'SCRAPE_THREAD_DATA' }, response => {
    thread.text = response;

    saveThread((err, res) => {
      console.log(err);
      console.log(res);
    });
  });
});