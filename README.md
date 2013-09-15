## Commands

After downloading from Git, You need to follow the below steps to use the RIAK Object Browser:

1. install apache server
````
			sudo apt-get install apache2
````

2. install php
````
			sudo apt-get install php5 libapache2-mod-php5
````

3. install php-curl library
````		
			sudo apt-get install curl libcurl3 libcurl3-dev php5-mcrypt php5-curl
````

4. 	copy downloaded project into apache server www directory
````
		 sudo mkdir /var/www/riak
		 cd <downloaded_project_dirctory>
		 sudo cp -r * /var/www/riak
````

5. start apache server
````
			sudo /etc/init.d/apache2 start
````


6. Go to the following URL
````
			http://localhost:80/riak/
````


