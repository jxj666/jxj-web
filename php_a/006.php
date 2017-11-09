<?php
$dbhost = 'http';
$dbuser = 'root';
$dbpass = '123';
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
if (!$conn) {
    die('连接失败:' . mysqli_error($conn));
}
echo '连接成功';
$sql = "CREATE TABLE data1_1(id INT NOT NULL AUTO_INCREMENT,title VARCHAR(100) NOT NULL,author VARCHAR(40) NOT NULL,data DATE,PRIMARY KEY(id))ENGINE=InnoDB DEFAULT CHARSET=utf8;";
mysqli_select_db($conn, 'data1');
$retval = mysqli_query($conn, $sql);
if (!$retval) {
    die('数据表创建失败:' .;
    mysqli_error($conn));
}
echo '数据表创建成功';
mysqli_close($conn);
?>