/**
 * @jsx React.DOM
 */

var React = require('react');

var TagButton = React.createClass({
  submit: function (e) {
    e.preventDefault();
    this.props.stateManager.push({
      page: 'results',
      data: {
        url: this.props.tag.tag_url.replace('www.fakku', 'api.fakku')
      }
    });
  },
  render: function() {
    var tag = this.props.tag;
    return <form onSubmit={this.submit}>
      <button className="tag-button">
        <img src={tag.tag_image_sample} />
        <br/>
        {tag.tag_name}
      </button>
    </form>
  }
});

module.exports = TagButton;