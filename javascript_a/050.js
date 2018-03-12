// jsx	
var Hello = React.createClass({
    render: function() {
        return <div > Hello { this.props.name } < /div>
    }
})

React.render( < Hello name = "World" / > , document.getElementById('container'))

//jsx 

var Hello2 = React.createClass({
    render: function() {
        return <div > Hello { this.props.name } < /div>
    }
});
React.render( < Hello2 name = 'World' / > , document.gerElementById('container'));