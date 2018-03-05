//复制事件

document.addEventListener('copy', function() {
    var a=window.getSelection().baseNode.data;
    window.clipboardData.setData('text',a);
    console.log(window.clipboardData);
})