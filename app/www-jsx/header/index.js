/**
 * @jsx React.DOM
 */

var React = require('react');

var Header = React.createClass({
  render: function() {
    return <header>
      <nav>
        <a>Explore</a><a>View</a>
      </nav>
    </header>
  }
})

module.exports = Header;