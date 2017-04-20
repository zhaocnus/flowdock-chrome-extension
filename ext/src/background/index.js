import { saveThread } from '../api';
import { SCRAPE_THREAD_DATA } from '../constants/messageTypes';

chrome.webNavigation.onHistoryStateUpdated.addListener(details => {
  let url, segments;

  // get thread info from url
  // Example:
  // https://www.flowdock.com/app/signifyd/dev/threads/fzmGbpx_blEX5ctrjfyvy5EH5_8
  // https://www.flowdock.com/app/<company_name>/<flow_name>/threads/<thread_id>
  url = new URL(details.url);
  if (url.origin !== 'https://www.flowdock.com') return;

  segments = url.pathname.split('/').slice(-3);
  if (segments.length < 3 || segments[1] !== 'threads') return;

  const thread = {
    url: details.url,
    flowName: segments[0],
    threadId: segments[2]
  };

  chrome.tabs.sendMessage(details.tabId, { type: SCRAPE_THREAD_DATA }, res => {
    if (res.err) return;

    // save thread title
    // TODO: save thread texts
    thread.title = res.title;

    saveThread(thread);
  });
});
