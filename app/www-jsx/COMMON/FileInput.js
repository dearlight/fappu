/**
 * @jsx React.DOM
 */

var React = require('react');

var Settings = React.createClass({
  getInitialState: function () {
    return {
      value: this.props.initialValue || ''
    };
  },
  openDialog: function (e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    var currentValue = this.state.value;
    var file = require('remote').require('dialog').showOpenDialog({ properties: [ 'openDirectory' ]});
    if (file != null && file !== currentValue) {
      this.change(file);
    }
  },
  onInputBlur: function (e) {
    e.target = this.refs.form.getDOMNode();
    this.change(null);
  },
  change: function (value) {
    if (value != null) {
      this.refs.input.getDOMNode().value = value;
    }
    this.refs.form.value = value;
    
    var event = document.createEvent('Event');
    event.initEvent('change', true, false);
    this.refs.form.getDOMNode().dispatchEvent(event);
  },
  render: function() {
    var style = {display: 'inline-block'};
    var buttonStyle = {marginLeft: '0.3em', padding: '0.1em'};
    return <form ref="form" type="file" style={style} onSubmit={this.openDialog}>
      <input ref="input" onBlur={this.onInputBlur} /><button style={buttonStyle}>Browse...</button>
    </form>
  }
})

module.exports = Settings;