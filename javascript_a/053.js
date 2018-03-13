// jsx



var names = ['a1', 'a2', 'a3'];


ReactDom.render( <
    div > {
        names.map({
            function(name, index) {
                return <div key = { index } > hello, { name }! < /div>
            }
        })
    } <
    /div>,
    document.getElementById('root')
);