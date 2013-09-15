<?php
 	
	function getData($relative_url) {
		// create curl resource 
    $ch = curl_init(); 
		// create curl resource
		$absolute_url= "http://localhost:8098/".$relative_url;
    // set url 
    curl_setopt($ch, CURLOPT_URL, $absolute_url); 
    //return the transfer as a string 
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
    // $output contains the output string 
    $output = curl_exec($ch);
    // close curl resource to free up system resources 
    curl_close($ch);
		return $output;
	}

	function  getBuckets() {
		//http://localhost:8098/riak?buckets=true
		$relative_url= "riak?buckets=true";
		return getData($relative_url);
	}
	function getBucketKeys($bucket) {
		//http://localhost:8098/riak/Organization?keys=true
		$relative_url= "riak/".$bucket .'?keys=true';
		return getData($relative_url);
	}

	function getBucketValues($bucket,$value) {
		//http://localhost:8098/riak/Organization/ORG001%2fa72FWn
		$relative_url= "riak/".$bucket."/".urlencode($value);		 
		return getData($relative_url);
	}     
?>
