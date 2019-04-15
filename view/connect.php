<?php
require_once "functions.php";

if(!isset($_SESSION))
{
        session_start();
}
if (isset($_POST['email']) && isset($_POST['pwd'])){
    $connection = connectDB();
    $query = $connection->prepare("SELECT * FROM user WHERE email = :mail");
    $query->execute([
        'mail'=>$_POST['email']
    ]);
    $result = $query->fetch();
    if ( password_verify($_POST['pwd'],password_hash($result['password'],PASSWORD_DEFAULT))){
        $_SESSION["auth"] = true;
        $_SESSION["email"] = $_POST["email"];
        $_SESSION["name"] = $result["firstname"];
        $_SESSION["rights"] = $result["rights"];
        // $_SESSION["token"] = createToken($pseudo, $_POST['email']);
        header("Location:homeView.php");
    }
} else {
    header("Location:connection.php");
}


?>