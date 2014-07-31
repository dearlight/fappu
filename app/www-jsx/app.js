/**
 * @jsx React.DOM
 */

var React = require('react');
var Viewer = require('./pages/Viewer');
var Settings = require('./pages/Settings');
var Tags = require('./pages/Tags');
var Results = require('./pages/Results');
var Header = require('./header');

var logger = require('debug')('page');

var Fappu = React.createClass({
  // this will be called by `window` as needed
  handleKeyDown: function (e) {
    if (e.keyCode === 27) {
      this.props.stateManager.pop();
    }
    if (this.refs.page.handleKeyDown) {
      this.refs.page.handleKeyDown(e);
    }
  },
  render: function() {
    logger('RENDERING', this.props.location)
    if (this.props.location.page === 'viewer') {
      page = <Viewer
        ref="page"
        stateManager={this.props.stateManager}
        parent={this.props.location.parent}
        url={this.props.location.data.url} />;
    }
    else if (this.props.location.page === 'settings') {
      page = <Settings
        ref="page"
        stateManager={this.props.stateManager}
        parent={this.props.location.parent} />;
    }
    else if (this.props.location.page === 'tags') {
      page = <Tags
        ref="page"
        stateManager={this.props.stateManager}
        parent={this.props.location.parent} />;
    }
    else if (this.props.location.page === 'results') {
      page = <Results
        ref="page"
        url={this.props.location.data.url}
        stateManager={this.props.stateManager}
        parent={this.props.location.parent} />;
    }
    return <div className="fappu">
      <Header stateManager={this.props.stateManager} />
      {page}
    </div>
  }
})

module.exports = Fappu;