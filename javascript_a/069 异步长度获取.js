
var html = [];
for (var i = 0; i < 100000; i++) {
    html.push('<span>' + i + '</span>');
}
$('#example').html(html.join(' '));
setTimeout(function() {
    var width = $('#example').text().length;
    console.log(width);
}, 0);