/**
 * @jsx React.DOM
 */

var React = require('react');

var SearchField = React.createClass({
  submit: function (e) {
    var slug = this.refs.input.getDOMNode().value;
    this.props.stateManager.push({
      page: 'results',
      data: {
        url: 'https://api.fakku.net/search/' + encodeURIComponent(slug)
      }
    }, Boolean(this.props.clear));
    e.preventDefault();
  },
  render: function() {
    return <form onSubmit={this.submit}>
      <input ref="input" type="search" /><button>Search</button>
    </form>
  }
})

module.exports = SearchField;