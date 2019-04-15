<?php
require_once "functions.php";

if(!isset($_SESSION)) {
        session_start();
}



header("Location:inscription2.php");
?>