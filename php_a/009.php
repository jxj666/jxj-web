<?php
$dbhost = 'http';
$dbuser = 'root';
$dbpass = '123';
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
if (!$conn) {
    die('连接失败' . mysqli_error($conn));
}
mysqli_query($conn, 'ser names utf8');
$sql = 'SELECT id,title,author,data FROM tab1';
mysqli_select_db($conn, 'data1');
$retval = mysqli_query($conn, $sql);
if (!$retval) {
    die('无法读取' . mysqli_error($conn));
}
echo '欢迎';
echo '加油';
while ($row = mysqli_fetch_arry($retval, MYSQL_ASSQC)) {
    echo "{$row['id']}" . "{$row['title']}" . "{$row['author']}";
}
echo '结束';
mysqli_close($conn);
?>