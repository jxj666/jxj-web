<?php
$image = imagecreatetruecolor(100, 30);
$bgcolor = imagecolorallocate($image, 255, 255, 255);
imagefill($image,0,0,$bgcolor);

for($i=0;$i<100;$i++){
	$pointcolor=imagecolorallocate($image,rand(0,200),rand(0,200),rand(2,200));
	imagesetpixel($image, rand(1,99), rand(1,29), $pointcolor);
}
for($i=0;$i<10;$i++){
	$linecolor=imagecolorallocate($image,rand(100,200),rand(100,200),rand(100,200));
	imageline($image,rand(1,99),rand(1,29),rand(1,99),rand(1,29),$linecolor);
}
for($i=0;$i<4;$i++){
	$fontsize=6;
	$fontcolor=imagecolorallocate($image,rand(0,100),rand(0,100),rand(0,100));
	$fontcontent=rand(0,9);
	$x=($i*100/4)+rand(5,10);
	$y=rand(5,10);
	imagestring($image, $fontsize, $x, $y, $fontcontent, $fontcolor);
}
header('content-type:image/png');
imagepng($image);
imagedestroy($image);
?>
