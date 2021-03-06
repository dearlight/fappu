/**
 * @jsx React.DOM
 */

var hyperquest = require('hyperquest');
var es = require('event-stream');
var React = require('react');
var ContentPreview = require('./ContentPreview');
var BackButton = require('../../COMMON/BackButton');

var Results = React.createClass({
  getInitialState: function() {
    return {results: [], page: 1};
  },
  refresh: function () {
    var buffer = '';
    var url = this.props.url + '/page/' + this.state.page;
    console.error('URL: ' + url)
    hyperquest(url)
      .on('data', data => buffer += data)
      .on('error', err => {
        alert(err.message || err);
        this.props.stateManager.pop()
      })
      .on('end', _ => {
        var data = JSON.parse(buffer);
        if (data.error) {
          alert(data.error);
        }
        data.content = data.content || data.related;
        if (!data.content || data.error) {
          this.props.stateManager.pop();
          return;
        }
        var todo = data.content.length;
        var results = [];
        var next = (err, content) => {
          todo--;
          if (err) {
            console.error(err)
          }
          if (content) {
            results.push(content);
          }
          if (todo === 0) {
            this.setState({
              results: results
            });
          }
        };
        data.content.forEach(content => {
          var img = new Image()
          var done = false;
          img.onload = function () {
            if (done) return;
            done = true;
            next(null, content)
          }
          img.onerror = function (e) {
            if (done) return;
            done = true;
            next(e.error);
          }
          img.src = content.content_images.cover;
        });
      })
  },
  componentDidUpdate: function (prevProps) {
    console.error('----------', this.props.url, prevProps.url)
    if (this.props.url !== prevProps.url) this.refresh();
  },
  componentDidMount: function () {
    this.refresh();
  },
  render: function() {
    return <div className="page results">
      <div id="sidebar-tools">
        <BackButton stateManager={this.props.stateManager}/>
      </div>
      <div id="results">
        {this.state.results.map(
          content => <ContentPreview key={content.content_name} stateManager={this.props.stateManager} content={content} />
        )}
      </div>
    </div>
  }
})

module.exports = Results;