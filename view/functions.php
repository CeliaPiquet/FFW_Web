<?php

function connectDB(){
 	try{
    $connection = new PDO('mysql:host=localhost;port=3306;dbname=ffw;charset=UTF8','root','');
    }catch(Exception $e){
    	die("erreur sql ".$e->getMessage());
    }
	return $connection;
}

function createToken($pseudo, $email){
	$sha1 = sha1($email."FDSQfdsq444FGSDQ".$pseudo."fdsfqrffffzfczafzafv");
	return substr($sha1, 4, 10) ;
}
?>