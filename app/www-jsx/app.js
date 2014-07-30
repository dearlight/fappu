/**
 * @jsx React.DOM
 */

var React = require('react');
var Viewer = require('./pages/Viewer');
var Settings = require('./pages/Settings');
var Tags = require('./pages/Tags');
var Results = require('./pages/Results');
var Header = require('./header');

var Fappu = React.createClass({
  render: function() {
    console.log('RENDERING: '+this.props.location.page)
    console.log(JSON.stringify(this.props.location, null, 2))
    if (this.props.location.page === 'viewer') {
      page = <Viewer
        stateManager={this.props.stateManager}
        parent={this.props.location.parent}
        url={this.props.location.data.url} />;
    }
    else if (this.props.location.page === 'settings') {
      page = <Settings
        stateManager={this.props.stateManager}
        parent={this.props.location.parent} />;
    }
    else if (this.props.location.page === 'tags') {
      page = <Tags
        stateManager={this.props.stateManager}
        parent={this.props.location.parent} />;
    }
    else if (this.props.location.page === 'results') {
      page = <Results
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