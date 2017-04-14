chrome.webNavigation.onHistoryStateUpdated.addListener(details => {
  console.log(details);
});

// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     if (request.greeting === 'hello')
//       sendResponse({farewell: 'goodbye'});
//   });