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

    if ( password_verify($_POST['pwd'],$result['password'])){
        $_SESSION["auth"] = true;
        $_SESSION["email"] = $_POST["email"];
        $pseudo = $_POST['firstname']+$_POST['lastname'];
        $_SESSION["token"] = createToken($pseudo, $_POST['email']);
        echo "ok";
    }
    echo "notok";
}


echo "not ok"
?>