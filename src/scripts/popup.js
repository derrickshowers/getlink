chrome.windows.create({
  url: '/options.html',
  type: 'popup',
  focused: true
}, function(win) {
  chrome.windows.update(win.id, { focused: true });
});
