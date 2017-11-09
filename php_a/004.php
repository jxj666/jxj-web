<?php
$dbhost = 'http';
$dbuser = 'user';
$dbpass = '123';
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
if (!$conn) {
    die('连接失败:' . mysqli_error($conn));
}
echo '连接成功';
$sql = 'DROP DATABASE data1';
$retval = mysqli_query($conn, $sql);
if (!$retval) {
    die('删除数据库失败:' . mysqli_error($conn));
}
echo '数据库删除失败';
mysqli_close($conn);
?>