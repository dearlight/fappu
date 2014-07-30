/**
 * @jsx React.DOM
 */

var React = require('react');

var SidebarThumb = React.createClass({
  getInitialState: function () {
    return {selected:false};
  },
  checkSelected: function (event) {
    if (this.refs.input.getDOMNode().checked) {
      this.refs.label.getDOMNode().scrollIntoView();
      this.setState({selected:true});
      var onSelect = this.props.onSelect;
      onSelect && onSelect();
    }
  },
  render: function() {
    var checked = this.props.selected;
    var classNames = {
      'sidebar-thumb': true,
      'selected': checked
    };
    var classes = Object.keys(classNames).filter(key => classNames[key]).join(' ');
    var style={backgroundImage: 'url(' + this.props.thumb + ')'};
    return <label ref="label" className={classes} style={style}>
      <input ref="input" type="radio" name="thumb" checked={checked}  onChange={this.checkSelected}/>
    </label>
  }
});

module.exports = SidebarThumb;