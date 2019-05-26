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

    public function noConnection() {

        echo "NO CONNECTION !!";

    }
    public function noInscription() {



    }

}