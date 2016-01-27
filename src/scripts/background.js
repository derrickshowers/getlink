chrome.omnibox.setDefaultSuggestion({
  description: 'Press enter to navigate to keyword: %s'
});

chrome.omnibox.onInputEntered.addListener(function(text) {
  chrome.storage.sync.get('getLinks', function(storage) {
    if (storage.getLinks && storage.getLinks[text]) {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    	  chrome.tabs.update(tabs[0].id, { url: storage.getLinks[text] });
    	});
    }
  });
});
