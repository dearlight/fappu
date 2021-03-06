/**
 * @jsx React.DOM
 */

var hyperquest = require('hyperquest');
var es = require('event-stream');
var React = require('react');
var TagButton = require('./TagButton');

var Tags = React.createClass({
  getInitialState: function() {
    return {tags: []};
  },
  componentWillReceiveProps: function () {
    this.componentDidMount();
  },
  componentDidMount: function () {
    var buffer = '';
    hyperquest('https://api.fakku.net/tags')
      .on('data', data => buffer += data)
      .on('end', _ => {
        var data = JSON.parse(buffer);
        if (data.error) {
          alert(data.error);
        }
        if (!data.tags || data.error) {
          this.props.stateManager.pop();
          return;
        }
        var todo = data.tags.length;
        var tags = [];
        var next = (err, tag) => {
          todo--;
          if (err) {
            console.error(err)
          }
          if (tag) {
            tags.push(tag);
          }
          if (todo === 0) {
            this.setState({
              tags: tags
            });
          }
        };
        // load all into cache, ignore errors
        data.tags.forEach(tag => {
          var img = new Image()
          var done = false;
          img.onload = function () {
            if (done) return;
            done = true;
            next(null, tag);
          }
          img.onerror = function (e) {
            if (done) return;
            done = true;
            next(e.error);
          }
          img.src = tag.tag_image_sample;
        });
      })
  },
  render: function() {
    return <div className="page tags">
      {this.state.tags.sort((a, b) => a.tag_name < b.tag_name ? -1 : 1).map(
        tag => <TagButton key={tag.tag_name} stateManager={this.props.stateManager} tag={tag} />
      )}
    </div>
  }
})

module.exports = Tags;