import React from 'react';

export default class LinkItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    if (!this.props.keyword || !this.props.url) {
      this.state.isEditing = true;
    }

    // bind context for event handlers
    this.handleEditSave = this.handleEditSave.bind(this);
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
  }
  handleEditSave(e) {
    if (this.state.isEditing) {
      this.setState({ isEditing: false });
      this.props.saveChanges(this.props.keyword, this.state.keyword || this.props.keyword, this.state.url || this.props.url);
    } else {
      this.setState({ isEditing: true });
    }
  }
  handleKeywordChange(e) {
    this.setState({ keyword: e.target.value });
  }
  handleUrlChange(e) {
    this.setState({ url: e.target.value });
  }
  render() {
    return (
      <ul>
        <li>
          {(() => {
            if (this.state.isEditing) {
              return <input id={`keyword-${this.props.id}`} type="text" onChange={this.handleKeywordChange} defaultValue={this.props.keyword} />
            } else {
              return this.props.keyword
            }
          })()}
        </li>
        <li>
          {(() => {
            if (this.state.isEditing) {
              return <input id={`url-${this.props.id}`} type="text" onChange={this.handleUrlChange} defaultValue={this.props.url} />
            } else {
              return this.props.url
            }
          })()}
        </li>
        <li>
          <button onClick={this.handleEditSave}>{this.state.isEditing ? 'Save' : 'Edit'}</button>
        </li>
      </ul>
    )
  }
}
