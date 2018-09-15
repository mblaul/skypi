<?php

$curl = curl_init();

curl_setopt_array($curl, array(
	  CURLOPT_URL => "http://18.235.27.33/api/device/register",
	    CURLOPT_RETURNTRANSFER => true,
	      CURLOPT_ENCODING => "",
	        CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 30,
		    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		      CURLOPT_CUSTOMREQUEST => "POST",
		        CURLOPT_POSTFIELDS => "name=station1&macaddress=12%3A34%3A56%3A78%3A90&manufacturer=Toyota&model=Flyboi5000&category=Entertainment",
			  CURLOPT_HTTPHEADER => array(
				      "Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViOWJkNDkxNTg1YzVjMjBiMjMxNGEyMSIsIm5hbWUiOiJKYWNvYiBCYXVlciIsImlhdCI6MTUzNjk0NjcyOSwiZXhwIjoxNTM2OTUwMzI5fQ.zJnEi4xYLHFjLRA6RyRxWleoSC1Kq3VzICI1goZ8f6o",
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
