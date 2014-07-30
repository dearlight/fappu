/**
 * @jsx React.DOM
 */

var React = require('react');
var Fappu = require('./app');
var hyperquest = require('hyperquest');
var es = require('event-stream');

console.log('rendering')

var buffer = '';
hyperquest('https://api.fakku.net/manga/right-now-while-cleaning-the-pool/read')
  .on('data', data => buffer += data)
  .on('end', _ => {
    var data = JSON.parse(buffer);
    var content_pages = data.content.content_pages
    var pages = new Array(content_pages);
    for (var i = 0; i < content_pages; i++) {
      pages[i] = data.pages[i + 1];
    }
    var location = {
      page: 'viewer',
      data: {
        pages: pages
      }
    };
    React.renderComponent(
      <Fappu location={location} />,
      document.body
    )
  });