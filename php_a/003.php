 <?php
$dbhost = 'http';
$dbuser = 'user';
$dbpass = '123';
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
if (!$conn) {
    die('连接错误!' . mysqli_errno($conn));
}
echo '连接成功'$sql = 'CREATE DATABASE data1';
$retval = mysqli_query($conn, $sql);
if (!$retval) {
    die('创建数据库失败' . mysqli_query($conn));
}
echo '数据库创建成功';
mysqli_close($conn);
?>