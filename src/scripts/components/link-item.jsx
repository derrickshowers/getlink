import React from 'react';

const ESCAPE_KEY_CODE = 27;
const ENTER_KEY_CODE = 13;

export default class LinkItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    if (!this.props.keyword || !this.props.url) {
      this.state.isEditing = true;
    }

    // bind context for event handlers
    this.handleEditSave = this.handleEditSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  handleDelete(e) {
    this.props.saveChanges(this.props.keyword);
  }
  appendProtocol(url) {
    if (url && !url.includes('http')) {
      url = `http://${url}`;
    }
    return url;
  }
  handleEditSave() {
    if (this.state.isEditing) {
      this.setState({ isEditing: false });
      this.props.saveChanges(this.props.keyword, this.state.keyword || this.props.keyword, this.appendProtocol(this.state.url) || this.props.url);
    } else {
      this.setState({ isEditing: true });
    }
  }
  handleKeyPress(e) {
    if (e.keyCode === ESCAPE_KEY_CODE && this.state.isEditing) {
      this.setState({ isEditing: false });
      this.props.saveChanges(this.props.keyword, this.props.keyword, this.props.url);
    }
    if (e.keyCode === ENTER_KEY_CODE) {
      this.handleEditSave();
    }
  }
  handleKeywordChange(e) {
    this.setState({ keyword: e.target.value });
  }
  handleUrlChange(e) {
    this.setState({ url: e.target.value });
  }
  render() {
    let editSaveIcon = (() => {
      if (this.state.isEditing) {
        return (
          <svg className="icon icon-save"><use xlinkHref="#icon-save"></use></svg>
        );
      } else {
        return (
          <svg className="icon icon-edit"><use xlinkHref="#icon-edit"></use></svg>
        );
      }
    })();
    return (
      <ul onKeyDown={this.handleKeyPress} className={this.state.isEditing ? 'editing row' : 'row'}>
        <li className="keyword">
          <span className="get-keyword">get</span>
          {(() => {
            if (this.state.isEditing) {
              return <input id={`keyword-${this.props.id}`} placeholder="keyword" type="text" onChange={this.handleKeywordChange} defaultValue={this.props.keyword} />
            } else {
              return this.props.keyword
            }
          })()}
        </li>
        <li className="url">
          {(() => {
            if (this.state.isEditing) {
              return <input id={`url-${this.props.id}`} placeholder="url" type="text" onChange={this.handleUrlChange} defaultValue={this.props.url} />
            } else {
              return this.props.url
            }
          })()}
        </li>
        <li className="actions">
          <button className="edit-save-btn icon-btn" onClick={this.handleEditSave}>{editSaveIcon}</button>
          <button className="delete-btn icon-btn" onClick={this.handleDelete}><svg className="icon icon-delete"><use xlinkHref="#icon-delete"></use></svg></button>
        </li>
      </ul>
    )
  }
}
