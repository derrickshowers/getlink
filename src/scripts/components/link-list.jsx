import React from 'react';
import LinkItem from './link-item.jsx';

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
    chrome.storage.sync.get('getLinks', storage => {
      let data = changeToArray(storage.getLinks);
      data = sortArrayAlphapetically(data);
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
    chrome.storage.sync.get('getLinks', storage => {
      delete storage.getLinks[oldKeyword];
      storage.getLinks[newKeyword] = url;
      chrome.storage.sync.set({ getLinks: storage.getLinks }, () => {
        let data = changeToArray(storage.getLinks);
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
        <ul>
          {linkItems}
        </ul>
        <button onClick={this.addNewRow}>Add New</button>
      </div>
    );
  }
}
