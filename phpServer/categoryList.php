<?php
$data =array();
for($q=0;$q<20;$q++){
	$qw =array(
		'id'=>1,
		'name' => "qwe".$q	
		);
	array_push($data, $qw);
}

	$arr = array(
		'status'=> 0,
		'data'=>$data
		);
	echo urldecode(json_encode($arr));
?>