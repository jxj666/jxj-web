//jsx 2.0
var e_root = document.getElementById('root');
const h1_line_css = { fontSize: '50px' }
var re_h1 = React.createElement('h1', { className: 'waring', style: h1_line_css }, 'hello world');
ReactDOM.render(re_h1, e_root);

//css
.waring {
    color: red;
}