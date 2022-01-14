<?php 
//hey
$array = json_decode(file_get_contents("storage.json"),true);
if (isset($_POST["value"])) {
	try {
		$value = str_replace("\n", "%newline%", htmlspecialchars($_POST["value"]));
		$value = filterText($value);
		$value = str_replace("\\","&#92;", $value);
		$array["value"] = $value;

		file_put_contents("storage.json", json_encode($array, JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES));
		echo('{"task": "changeValue", "state":"success", "value":"'.$value.'"}');
	} catch (Exception $e) {
		echo '{"task": "changeValue", "state":"error"}';
	}
	die();
}
if (isset($_POST["newJoin"])) {
	try {
		$array["newUserJoin"] = true;
		file_put_contents("storage.json", json_encode($array, JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES));

		echo '{"task": "registerNewUser", "state":"success"}';
		sleep(3);

		$array["newUserJoin"] = false;
		file_put_contents("storage.json", json_encode($array, JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES));
	} catch (Exception $e) {
		echo '{"task": "registerNewUser", "state":"error"}';
	}
	die();
}


$value = str_replace("\\", "\\\\", $array["value"]);

$value = str_replace("%newline%","\\n",$value);
if(!in_array("newUserJoin", $array)) {
	array_push($array, "newUserJoin");
	$array["newUserJoin"] =false;
}
if($array["newUserJoin"]) {
	echo('{"state":"success","value":"'.$value.'","newJoin":true}');
} else {
	echo('{"state":"success","value":"'.$value.'","newJoin":false}');
}
function filterText($text)
{
	$text = str_ireplace("fuck", "f**k", $text);
	$text = str_ireplace("fick", "f**k", $text);
	$text = str_ireplace("fack", "f**k", $text);
	$text = str_ireplace("scheiße", "sch**ße", $text);
	$text = str_ireplace("heil hitler", "h**l H***ler", $text);
	$text = str_ireplace("vergas", "verg**", $text);
	$text = str_ireplace("verrecke", "ver***ke", $text);
	$text = str_ireplace("fotze", "f**ze", $text);
	$text = str_ireplace("nutte", "nu**e", $text);
	$text = str_ireplace("arsch", "ar**h", $text);

	return $text;
}
?>