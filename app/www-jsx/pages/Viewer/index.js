/**
 * @jsx React.DOM
 */

var hyperquest = require('hyperquest');
var es = require('event-stream');
var React = require('react');
var Sidebar = require('./Sidebar');
var BackButton = require('../../COMMON/BackButton');

var logger = require('debug')('viewer');

var Viewer = React.createClass({
  getInitialState: function() {
    return {index:0,pages: []};
  },
  componentWillReceiveProps: function () {
    this.componentDidMount();
  },
  handleKeyDown: function (e) {
    var key = e.keyCode || e.which;
    // [wa]
    if (key === 0x57 || key === 0x41) {
      this.show(this.state.index-1)
    }
    // [sd] + sp
    if (key === 0x53 || key === 0x44 || key === 0x20) {
      this.show(this.state.index+1)
    }
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
        if (pages.length) this.show(0)
      })
  },
  show: function (index) {
    if (index >= 0 && this.state.pages.length > index) {
      this.setState({index: index});
    }
  },
  render: function() {
    var style = {};
    var showing_page = this.state.pages[this.state.index];
    if (showing_page) style.backgroundImage = 'url(' + showing_page.image + ')';
    return <div className="page viewer">
      <div id="sidebar-tools">
        <BackButton stateManager={this.props.stateManager}/>
      </div>
      <Sidebar pages={this.state.pages} onSelect={i=>this.show(i)} />
      <div id="viewer-content" style={style} />
    </div>
  }
})

module.exports = Viewer;