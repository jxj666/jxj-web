<?php
$dbhost = 'http';
$dbuser = 'root';
$dbpass = '123';
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
if (!$conn) {
    die('连接失败' . mysqli_error($conn));
}
echo '连接成功';
mysqli_query($connn, 'ser names utf8');
$title = 'php';
$author = 'jxj';
$data = '2017';
$sql = "INSERT INTO tab1(title,author,data) VALUES ('$title','$author','$data')";
mysqli_select_db($conn, 'data1');
$retval = mysqli_query($conn, $sql);
if ($retval) {
    die('插入失败:' . mysqli_error($conn));
}
echo "数据插入成功";
mysqli_close($conn);
?>