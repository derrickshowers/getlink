/* jshint esnext: true */

import $ from 'jquery';

$('form').on('submit', evt => {
  $('form button').prop('disabled');
  chrome.storage.sync.get('getLinks', (getLinks) => {
    getLinks[$('#keyword').val()] = $('#url').val();
    chrome.storage.sync.set({ getLinks }, () => {
      $('form input').val('');
    });
  });
  return false;
});
