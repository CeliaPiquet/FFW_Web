<?php
        require_once "functions.php";

        if(!isset($_SESSION)) {
                session_start();
        }
        if(count($_POST) >= 6
           && !empty($_POST["lastname"])
           && !empty($_POST["firstname"])
           && !empty($_POST["mail"])
           && !empty($_POST["pwd"])
           && !empty($_POST["pwdConfirm"])
           && !empty($_POST["checkCG"])
           ){
                $error = false;
                $listErrors = [];

                // Nettoie les chaines
                $_POST["lastname"] = strtoupper(trim($_POST["lastname"]));
                $_POST["firstname"] = ucfirst( strtolower(trim($_POST["firstname"]))) ;
                $_POST["mail"] = strtolower(trim($_POST["mail"])) ;

                // Vérifie la longueur du mot de passe
                if (strlen($_POST["pwd"])<8){
                        $error = true;
                } 
                
                
                // Vérifie le mot de passe et sa confirmation
                if($_POST["pwd"] != $_POST["pwdConfirm"]){
                        $error = true;
                }
                if(!$error){
                        //on appelle l'api
                        $user = array(
                                "lastname" => utf8_encode($_POST["lastname"]), 
                                "firstname" => utf8_encode($_POST["firstname"]), 
                                "email" => utf8_encode($_POST["mail"]), 
                                "password" => utf8_encode($_POST["pwd"])
                        ); 
                        $user_string = json_encode($user);
                        $curl = curl_init("http://localhost:8080/FFW_API/api/users/create.php");
                        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
                        curl_setopt($curl, CURLOPT_POSTFIELDS, $user_string);                                                                   
                        curl_setopt($curl, CURLOPT_HTTPHEADER, array(                                                                          
                        'Content-Type: application/json',                                                                                
                        'Content-Length: ' . strlen($user_string))                                                                       
                        );                                                                                                                   
                                                                                                                          
                        $response = curl_exec($curl);
                        curl_close($curl);
                        header("Location:inscription2.php");

                }
                else {
                        header("Location:inscription.php");
                }

        }
?>