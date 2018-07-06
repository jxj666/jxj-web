<?php
header("Access-Control-Allow-Origin: *");

class Verify {
	public $test  = '00';
}
$verify = new Verify();
$verify->test = 1;
echo json_encode($verify);
?>