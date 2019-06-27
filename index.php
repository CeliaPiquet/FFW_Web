<?php

    if(!session_id()){
        session_start();
    }
    if(isset($_SESSION["lang"])){
        $locale=$_SESSION["lang"];
//        $locale="fr_FR";

        setlocale(LC_ALL,$locale);
        bindtextdomain("ffw","locale");
        textdomain("ffw");
    }
    else{
        setlocale(LC_ALL,null);
        textdomain("null");
    }

    require_once "framework/Router.php";

    $router=new Router();
    $router->routeRequest();
?>