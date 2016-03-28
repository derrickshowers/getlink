import React from 'react';
import LinkItem from './link-item.jsx';

const STORAGE_KEY = 'getLinks';

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
  }
  componentDidMount() {
    this.loadFromStorage();
  }
  loadFromStorage() {
    chrome.storage.sync.get(STORAGE_KEY, storage => {
      let data;
      if (!storage[STORAGE_KEY]) {
        data = [];
      } else {
        data = sortArrayAlphapetically(changeToArray(storage[STORAGE_KEY]));
      }
      this.setState({ data });
    });
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
    chrome.storage.sync.get(STORAGE_KEY, storage => {
      if (storage[STORAGE_KEY]) {
        delete storage[STORAGE_KEY][oldKeyword];
      } else {
        storage[STORAGE_KEY] = {};
      }
      if (newKeyword) {
        storage[STORAGE_KEY][newKeyword] = url;
      }
      chrome.storage.sync.set({ [STORAGE_KEY]: storage[STORAGE_KEY] }, () => {
        let data = changeToArray(storage[STORAGE_KEY]);
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
      </div>
    );
  }
}
