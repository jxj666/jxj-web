// jsx
var Hello=React.createClass({
	render:function(){
		return <h1>hello {this.props.name}</h1>;
	}
});
reactDOM.render(
<Hello name='a1'/>,
document.getElementById('root')
);