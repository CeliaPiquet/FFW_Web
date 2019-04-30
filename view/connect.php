<?php
require_once "functions.php";

if(!isset($_SESSION))
{
        session_start();
}
if (isset($_POST['email']) && isset($_POST['pwd'])){
    $curl = curl_init();
    $userMail = urlencode(strtolower($_POST["email"]));
    $userPwd = urlencode($_POST["pwd"]);
    $url = "http://localhost:8080/FFW_API/api/users/authentication.php?email=".$userMail."&password=".$userPwd;
    curl_setopt($curl,CURLOPT_URL, $url);
    curl_setopt($curl,CURLOPT_RETURNTRANSFER, TRUE);
    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);
    if ($err || !$response){
        echo "curl erro #:".$err;
        header("Location:connection.php");
    } else {
        $user = json_decode($response);
        var_dump($user);
        $_SESSION["auth"] = true;
        $_SESSION["email"] = $_POST["email"];
        $_SESSION["firstname"] = $user->firstname;
        $_SESSION["rights"] = $user->rights;
        header("Location:homeView.php");
    }
}


?>