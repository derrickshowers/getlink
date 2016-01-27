document.querySelector('.manage').addEventListener('click', evt => {
  chrome.windows.create({
    url: '/options.html',
    type: 'popup',
    width: 800,
    height: 600,
    focused: false
  }, function(win) {
    chrome.windows.update(win.id, { focused: true });
  });
});
