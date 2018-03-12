// jsx
var Hello = React.createClass({
    render: function() {
        return <div className='alert_text'> Hello { this.props.title } { this.props.name } </div>;
    }
});

React.render( < Hello name = "World"
    title = 'Mrs' /> , document.getElementById('root'));


//css
.alert_text{
	color:red;
}

//html
<div id='root'></div>