<?php

    ini_set('display_errors', 1);
    require_once "framework/Router.php";


    //require_once "./views/homeView.php";
//    header("Location: views/homeView.php");

//    if(isset($_GET["locale"])){
//        $locale=$_GET("locale");
//    }
//    else if(isset($_SESSION["locale"])){
//        $locale=$_SESSION("locale");
//    }
//    else {
//        $locale="fr";
//    }
//
//    $currentLocale = setlocale(LC_ALL, fr);
//    $locale = setlocale(LC_ALL,"fr_FR.utf8");
//    var_dump($locale);
//     $currentLocale;
//    var_dump($locale);

//    phpinfo();
//    session_start();

//    require 'framework/Router.php';
    $router=new Router();
    $router->routeRequest();
?>