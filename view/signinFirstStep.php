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

                //on appelle l'api pour vérifier si un utilisateur avec le même mail existe déjà
                $curl = curl_init();
                $userMail = urlencode($_POST["mail"]);
                $url = "http://localhost:8080/FFW_API/api/users/getOneByEmail.php?email=".$userMail;
                curl_setopt($curl,CURLOPT_URL, $url);
                $response = curl_exec($curl);
                curl_close($curl)
                if($response){ 
                        $error = true;
                }


                if ($error){
                        header("Location: connection.php");
                }
                else {
                        $curl2 = curl_init();
                        $pwd = urlencode($_POST["pwd"]);
                        
                }




        }



        header("Location:inscription2.php");
?>