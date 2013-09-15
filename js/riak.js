$(document).ready(function(){

  //GET BROWSER WINDOW HEIGHT
	var currHeight = $(window).height();
	$('#sidebar, #content').css('height', currHeight);
	
	//ON RESIZE OF WINDOW
	$(window).resize(function() {
		//GET NEW HEIGHT
		var currHeight = $(window).height();	
		//RESIZE BOTH ELEMENTS TO NEW HEIGHT
		$('#sidebar, #content').css('height', currHeight);
		
	});

	var header = false;

	function renderBuckets(buckets) {
		var value1,list_of_buckets,value2;
		for(value1 in buckets) {
			if(buckets[value1] instanceof Array) {
				list_of_buckets = buckets[value1];
		 		for(value2 in list_of_buckets) {
					$(".buckets").append('<a class="list-group-item" href="'+list_of_buckets[value2]+'">'+list_of_buckets[value2]+'</a>');
		 		}
			}
		}
	}

	$.ajax({
		type: "GET",
		url: "riak.php?method=getBuckets",
		success: function (msg) {
			var buckets = JSON.parse(msg);
			renderBuckets(buckets);
		}
	});

	function getBucketKeys(bucket) {
		var remote = $.ajax({
			type: "GET",
	 		url: "riak.php?method=getBucketKeys&param1="+bucket,
			async: false
		}).responseText;
		return JSON.parse(remote);
	}

	function getBucketValues(bucket,key) {
		var remote = $.ajax({
			type: "GET",
			url: "riak.php?method=getBucketValues&param1="+bucket+"&param2="+encodeURIComponent(key),
			async: false
		}).responseText;
		return JSON.parse(remote);
	}

	function renderBucket(bucket,key) {
		var value;
		var row = '<tr>';
		var key_value = getBucketValues(bucket,key);
		if(header===false) {
			row = '<tr>';
			row+='<th class="danger">'+"Key"+'</th>';
			for(value in key_value) {
					row+='<th class="success">'+value+'</th>';
			}
			row+='</tr>';
			header=true;
			$("table").append(row);
		}
		row = '<tr>';
		row+='<td>'+key+'</td>';
		for(value in key_value) {
			row+='<td>'+key_value[value]+'</td>';
		}
		row+='</tr>';
		$("table").append(row);
	}

	$( "body" ).on("click", "a",function(event) {
		var value1,list_of_key,key;	
		event.preventDefault();
		$("table").html("");
		header = false;
		var bucket = $(this).attr("href");
		var bucket_key = getBucketKeys(bucket);
		for(value1 in bucket_key) {
				if(bucket_key[value1] instanceof Array && value1 === "keys") {
					list_of_key = bucket_key[value1];
					for(key in list_of_key) {
						renderBucket(bucket,list_of_key[key]);
					}
				}
		}
	});

});

