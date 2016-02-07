import React from 'react';
import LinkItem from './link-item.jsx';
import DebugMode from './debug-mode.jsx';

const DEBUG_STORAGE_KEY = 'getLinksDebug';
const STORAGE_KEY = 'getLinks';

export default class LinkList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enabled: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      enabled: this.state.enabled ? false : true
    }, () => {
      this.props.changeStorageKey(this.state.enabled ? DEBUG_STORAGE_KEY : STORAGE_KEY);
    });
  }
  render() {
    return (
      <button className={this.state.enabled ? 'toggle-debug-mode enabled' : 'toggle-debug-mode'} onClick={this.handleClick}>π</button>
    );
  }
}
