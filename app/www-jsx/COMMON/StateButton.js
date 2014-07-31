/**
 * @jsx React.DOM
 */

var React = require('react');

var StateButton = React.createClass({
  submit: function (e) {
    this.props.stateManager.push(this.props.state, Boolean(this.props.clear));
    e.preventDefault();
  },
  render: function() {
    return <form className={this.props.className} type="button" onSubmit={this.submit}>
      <button>{this.props.children}</button>
    </form>
  }
})

module.exports = StateButton;