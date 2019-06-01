<?php

require_once 'framework/Controller.php';
require_once 'services/UserService.php';
require_once 'models/User.php';

class ConnectionController extends Controller {


    public function index() {

        $this->addView($this->action,null);

        $this->loadTemplate(parent::getTemplateData(),$this->action);
    }

    // Ajoute un commentaire sur un billet
    public function login() {

        $arrUser=$this->getRequest()->getArrParameters();
        $user=new User($arrUser);
        $userManager=UserService::getInstance();
        $user=$userManager->authentication($user);

        $websiteRoot = Configuration::get("websiteRoot", "/");

//        var_dump($user);
        if(isset($user) && !empty($user)){
            session_start();
            $_SESSION['user']=serialize($user);
            header("Location:$websiteRoot/home");
        }
        else{
            header("Location:$websiteRoot/home/noConnection");
        }

    }
    public function logout() {

        $websiteRoot = Configuration::get("websiteRoot", "/");
        session_start();
        session_destroy();
        header("Location:$websiteRoot");

    }
}