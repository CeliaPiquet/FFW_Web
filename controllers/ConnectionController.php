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

        if(isset($user) && !empty($user)){
            session_start();
            $_SESSION['user']=serialize($user);
            header("Location:$websiteRoot/home");
        }
        else{
//            header("Location:$websiteRoot/connection/error");
        }

    }
    public function logout() {

        $websiteRoot = Configuration::get("websiteRoot", "/");
        session_start();
        unset($_SESSION['user']);
        header("Location:$websiteRoot");

    }

    public function error(){

        $this->addView("index",null);
        $this->addView("errorAlert", null);
        $this->loadTemplate(parent::getTemplateData(),$this->action);

    }
}