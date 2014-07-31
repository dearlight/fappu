/**
 * @jsx React.DOM
 */

var hyperquest = require('hyperquest');
var es = require('event-stream');
var React = require('react');
var Sidebar = require('./Sidebar');
var BackButton = require('../../COMMON/BackButton');

var Viewer = React.createClass({
  getInitialState: function() {
    return {image: null,pages: []};
  },
  componentDidMount: function () {
    var buffer = '';
    hyperquest(this.props.url)
      .on('data', data => buffer += data)
      .on('end', _ => {
        var data = JSON.parse(buffer);
        if (data.error) {
          alert(data.error);
        }
        if (!data.content || data.error) {
          this.props.stateManager.pop();
          return;
        }
        var content_pages = data.content.content_pages
        var pages = new Array(content_pages);
        for (var i = 0; i < content_pages; i++) {
          pages[i] = data.pages[i + 1];
        }
        this.setState({
          pages: pages
        });
        if (pages.length) this.show(pages[0])
      })
  },
  show: function (page) {
    this.setState({image: page.image});
  },
  render: function() {
    var style = {};
    if (this.state.image) {
      style.backgroundImage = 'url(' + this.state.image + ')';
    }
    var parent;
    if (this.props.parent) {
      parent = <button>{'\u2B07'}</button>
    }
    return <div className="page viewer">
      <div id="sidebar-tools">
        <BackButton stateManager={this.props.stateManager}/>
      </div>
      <Sidebar pages={this.state.pages} onSelect={this.show} />
      <div id="viewer-content" style={style} />
    </div>
  }
})

module.exports = Viewer;