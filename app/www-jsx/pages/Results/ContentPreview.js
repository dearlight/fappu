/**
 * @jsx React.DOM
 */

var React = require('react');

var StateButton = require('../../COMMON/StateButton');

var ContentPreview = React.createClass({
  g: function (e) {
    e.preventDefault();
    this.props.stateManager.push();
  },
  render: function() {
    var content = this.props.content;
    var goto_viewer_state = {
      page: 'viewer',
      data: {
        url: this.props.content.content_url.replace('www.fakku', 'api.fakku')+'/read'
      }
    };
    return <div className="content-preview" onSubmit={this.submit}>
      <StateButton className="content-image"
            stateManager={this.props.stateManager}
            state={goto_viewer_state}>
        <img src={content.content_images.cover} />
      </StateButton>
      <div className="content-meta">
        <StateButton className="content-name"
            stateManager={this.props.stateManager}
            state={goto_viewer_state}>
            {content.content_name}
        </StateButton>
        <hr />
        {content.content_description}
        <hr />
        {content.content_tags.map(
          tag => <StateButton className="content-tag"
            key={tag.attribute}
            stateManager={this.props.stateManager}
            state={{page:'results',data:{url:'http://api.fakku.net'+tag.attribute_link}}}>
              {tag.attribute}
            </StateButton>
        )}
      </div>
    </div>
  }
});

module.exports = ContentPreview;