<?php

$curl = curl_init();

curl_setopt_array($curl, array(
	  CURLOPT_URL => "http://18.235.27.33/api/user/login",
	    CURLOPT_RETURNTRANSFER => true,
	      CURLOPT_ENCODING => "",
	        CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 30,
		    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		      CURLOPT_CUSTOMREQUEST => "POST",
		        CURLOPT_POSTFIELDS => "email=jfbauer%40oakland.edu&password=432234",
			  CURLOPT_HTTPHEADER => array(
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
