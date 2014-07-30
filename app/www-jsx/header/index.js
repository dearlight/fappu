/**
 * @jsx React.DOM
 */

var React = require('react');
var StateButton = require('./StateButton');
var SearchField = require('./SearchField');

var Header = React.createClass({
  render: function() {
    return <header>
      <nav>
        <StateButton stateManager={this.props.stateManager} state={{page:'tags'}} clear>Explore</StateButton>
        <SearchField stateManager={this.props.stateManager} />
        {/*<StateButton stateManager={this.props.stateManager} state={{page:'gallery'}}>View</StateButton>*/}
      </nav>
    </header>
  }
})

module.exports = Header;