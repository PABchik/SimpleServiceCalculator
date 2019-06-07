<?php


class DBHelper {

	public $link;
	
	private $host;
	private $user;
	private $password;
	private $database;
	
	
	function __construct($host, $user, $password, $database) {
		//echo $host." ".$user." ".$password." ".$database."           ";
		
		$this->host = $host;
		$this->user = $user;
		$this->password = $password;
		$this->database = $database;
		
		$this->link = mysqli_connect($host, $user, $password, $database);
		
		if (mysqli_connect_errno()) {
			echo "ошибка номер ( ".mysqli_connect_errno()." ) : ".mysqli_connect_error();
			exit();
		}
	}

	function printVars() {
		echo $this->host." ".$this->user." ".$this->password." ".$this->database."           ";
	}


	function getQuery($query) {
		$result = mysqli_query($this->link, $query);
		$result = mysqli_fetch_all($result, MYSQLI_ASSOC);
		return $result;
	}

	function execQuery($query) {
		$res = mysqli_query($this->link, $query);
		/*if ($res) {
     	 echo '<p>Данные успешно добавлены в таблицу.</p>';
    	} else {
    	  echo '<p>Произошла ошибка: ' . mysqli_error($this->link) . '</p>';
    	}*/
	}
}
