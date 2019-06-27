<?php
require_once 'framework/Controller.php';

class HomeController extends Controller {



    // Affiche la liste de tous les billets du blog
    /**
     * HomeController constructor.
     */
    public function index() {

        $this->addView($this->action,null);

        $this->loadTemplate(parent::getTemplateData(),$this->action);

    }

    public function changeLang(){

        if(!isset($_SESSION) || empty($_SESSION)){
            session_start();
        }

        $_SESSION['lang']=$this->lang!=="en"?$this->lang."_".strtoupper($this->lang):null;
        http_response_code(200);
    }

    public function noConnection() {



    }
    public function noInscription() {



    }

}