import React from 'react';
import LinkItem from './link-item.jsx';
import DebugMode from './debug-mode.jsx';

let storageKey = 'getLinks';

function changeToArray(obj) {
  let keys = Object.keys(obj);
  return keys.map(key => {
    return {
      keyword: key,
      url: obj[key]
    };
  });
}

function sortArrayAlphapetically(array) {
  return array.sort((a, b) => a.keyword > b.keyword);
}

export default class LinkList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.addNewRow = this.addNewRow.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.changeStorageKey = this.changeStorageKey.bind(this);
  }
  componentDidMount() {
    this.loadFromStorage();
  }
  loadFromStorage() {
    chrome.storage.sync.get(storageKey, storage => {
      let data;
      if (!storage[storageKey]) {
        data = [];
      } else {
        data = sortArrayAlphapetically(changeToArray(storage[storageKey]));
      }
      this.setState({ data });
    });
  }
  changeStorageKey(newStorageKey) {
    storageKey = newStorageKey;
    this.loadFromStorage();
  }
  addNewRow() {
    let data = this.state.data;
    data.push({
      keyword: '',
      url: ''
    });
    this.setState({ data });
  }
  saveChanges(oldKeyword, newKeyword, url) {
    chrome.storage.sync.get(storageKey, storage => {
      if (storage[storageKey]) {
        delete storage[storageKey][oldKeyword];
      } else {
        storage[storageKey] = {};
      }
      if (newKeyword) {
        storage[storageKey][newKeyword] = url;
      }
      chrome.storage.sync.set({ [storageKey]: storage[storageKey] }, () => {
        let data = changeToArray(storage[storageKey]);
        data = sortArrayAlphapetically(data);
        this.setState({ data });
      });
    });
  }
  render() {
    let linkItems = this.state.data.map((linkItem, id) => {
      return (
        <LinkItem key={id} id={id} keyword={linkItem.keyword} url={linkItem.url} saveChanges={this.saveChanges} />
      );
    });
    return (
      <div>
        <ul className="grid">
          <li>{linkItems}</li>
        </ul>
        <button className="add-new icon-btn" onClick={this.addNewRow}><svg className="icon icon-plus"><use xlinkHref="#icon-plus"></use></svg></button>
        <DebugMode changeStorageKey={this.changeStorageKey} />
      </div>
    );
  }
}
