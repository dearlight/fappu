/**
 * @jsx React.DOM
 */

var React = require('react');
var FileInput = require('../../COMMON/FileInput');

var Settings = React.createClass({
  render: function() {
    return <div className="page settings" onSubmit={e=>e.preventDefault()}>
      Cache: <FileInput /><br/>
      
      Downloads: <FileInput /><br/>
      
      <form onSubmit={this.props.stateManager.pop}>
        <button>save</button>
      </form>
    </div>
  }
})

module.exports = Settings;