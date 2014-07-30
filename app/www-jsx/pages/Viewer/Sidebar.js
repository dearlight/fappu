/**
 * @jsx React.DOM
 */

var React = require('react');
var SidebarThumb = require('./SidebarThumb');

var Sidebar = React.createClass({
  getInitialState: function () {
    return {selected: 0};
  },
  select: function (page, i) {
    this.setState({selected:i});
    this.props.onSelect(page)
  },
  render: function() {
    return <form className="sidebar">{
      this.props.pages.map(
        (page,i) => <SidebarThumb
          selected={this.state.selected === i}
          key={page.thumb}
          thumb={page.thumb}
          onSelect={_=>this.select(page, i)} />
      )
    }</form>
  }
});

module.exports = Sidebar;