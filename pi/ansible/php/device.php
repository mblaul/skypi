<?php
require_once "login.php";
$curl = curl_init();
$host = gethostname();
echo $host . "\n";
$text = `ifconfig`;
preg_match('/([0-9a-f]{2}:){5}\w\w/i', $text, $mac);
$mac = str_replace(":","%3A",$mac[0]);

$header = "Authorization: " . $token;
echo $header ."\n";
echo $mac . "\n";
curl_setopt_array($curl, array(
	  CURLOPT_URL => "http://18.235.27.33/api/device/register",
	    CURLOPT_RETURNTRANSFER => true,
	      CURLOPT_ENCODING => "",
	        CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 30,
		    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		      CURLOPT_CUSTOMREQUEST => "POST",
		        CURLOPT_POSTFIELDS => "name=".$host."&macaddress=".$mac."&manufacturer=Toyota&model=Flyboi5000&category=Entertainment",
			  CURLOPT_HTTPHEADER => array(
				      $header,
				          "Content-Type: application/x-www-form-urlencoded"
					    ),
				    ));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
	  echo "cURL Error #:" . $err;
} else {
	  echo $response;
}

?>
