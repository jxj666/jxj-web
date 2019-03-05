// jsx
var Notes = React.createClass({
  render: function() {
    return (
      <ol>{
      React.Children.map(this.props.children, function(child) {
        return <li>{child}</li>;
      })
      }</ol>
    );
  }
});

ReactDOM.render(
  <Notes><span>hello</span><span>world</span></Notes>, document.getElementById('root')
);
