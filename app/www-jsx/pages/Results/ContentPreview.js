/**
 * @jsx React.DOM
 */

var React = require('react');

var ContentPreview = React.createClass({
  submit: function (e) {
    e.preventDefault();
    this.props.stateManager.push({
      page: 'viewer',
      data: {
        url: this.props.content.content_url.replace('www.fakku', 'api.fakku')+'/read'
      }
    });
  },
  render: function() {
    var content = this.props.content;
    return <form onSubmit={this.submit}>
      <button className="content-preview">
        <img src={content.content_images.cover} />
        <br/>
        {content.content_name}
      </button>
    </form>
  }
});

module.exports = ContentPreview;