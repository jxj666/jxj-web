<?php
$dbhost = 'http';
$dbuser = 'root';
$dbpass = '123';
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
if (!$conn) {
    die('连接失败:' . mysqli_error($conn));
}
echo '连接成功';
$sql = 'DROP TABLE tab1';
mysqli_select_db($conn, 'data1');
$retval = mysqli_query($conn, $sql);
if (!$retval) {
    die('数据库删除失败:' . mysqli_error($conn));
}
echo '数据库删除成功';
mysqli_close($conn);
?>