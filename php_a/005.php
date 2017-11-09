<?php
$dbhost = 'http';
$dbuser = 'user';
$dbpass = '123';
$conn = mysqli_connect($dbhost, $dbuser, $dbuser);
if (!$conn) {
    die('连接成功' . mysqli_error($conn));
}
echo '连接成功';
mysqli_select_db($conn, 'data1');
mysqli_close($conn);
?>