/**
 * @jsx React.DOM
 */

var React = require('react');
var SidebarThumb = require('./SidebarThumb');

var Sidebar = React.createClass({
  getInitialState: function () {
    return {selected: 0};
  },
  select: function (i) {
    this.setState({selected:i});
    this.props.onSelect(i)
  },
  render: function() {
    return <form className="sidebar">{
      this.props.pages.map(
        (page,i) => <SidebarThumb
          selected={this.state.selected === i}
          key={i}
          thumb={page.thumb}
          onSelect={_=>this.select(i)} />
      )
    }</form>
  }
});

module.exports = Sidebar;