<?php
require_once 'Request.php';
require_once 'View.php';
require_once 'Template.php';
require_once 'models/User.php';
require_once 'services/UserService.php';

abstract class Controller {

    // Action à réaliser
    protected $action;
    protected $id;

    // Requête entrante
    protected $request;

//    protected $arrViews;

    /**
     * Controller constructor.
     * @param $action
     * @param $request
     */

    /**
     * @return mixed
     */

    public function getAction()
    {
        return $this->action;
    }

    /**
     * @param mixed $action
     */
    public function setAction($action): void
    {
        $this->action = $action;
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id): void
    {
        $this->id = $id;
    }



    /**
     * @return mixed
     */
    public function getRequest() : Request
    {
        return $this->request;
    }

    /**
     * @param mixed $request
     */
    public function setRequest(Request $request): void
    {
        $this->request = $request;
    }

    // Exécute l'action à réaliser
    public function executeAction($action) {
        if (method_exists($this, $action)) {
            $this->action = $action;
            $this->{$this->action}();
        }
        else {
            $controllerClass = get_class($this);
            throw new Exception("Action '$action' undefined in class $controllerClass");
        }
    }

    // Méthode abstraite correspondant à l'action par défaut
    // Oblige les classes dérivées à implémenter cette action par défaut
    public abstract function index();

    public function addView($view,$viewData = array()){

        $this->arrViews[$view]=$viewData;

    }

    public function getTemplateData(){

        if(!isset($_SESSION) || empty($_SESSION)){
            session_start();
        }
        if(isset($_SERVER['REQUEST_URI'])){
            $uri=explode("?",$_SERVER['REQUEST_URI'])[0];
        }

        $isConnected=false;
        $isAdmin=false;

        if(isset($_SESSION['user']) && !empty($_SESSION['user'])){
            $user=unserialize($_SESSION['user']);

            $user->getRights();

            $isAdmin=UserService::isRightSet($user->getRights(),5);

//            $isAdmin=$user->getRights()=="admin"?true:false;

            $isConnected=true;
        }

        return array("isConnected"=>$isConnected, "isAdmin"=>$isAdmin,"uri"=>$uri);

    }

    // Génère la vue associée au contrôleur courant
    protected function loadView($view,$viewData = array()) {
        // Détermination du nom du fichier vue à partir du nom du contrôleur actuel
        $controllerClass = get_class($this);
        $controller = str_replace("Controller", "", $controllerClass);
        lcfirst($controller);
        // Instanciation et génération de la vue
        $view = new View($view, $controller);
        $view->generateV($viewData);
    }

    protected function loadTemplate($templateData = array()) {
        // Détermination du nom du fichier vue à partir du nom du contrôleur actuel
        $controllerClass = get_class($this);
        $controller = str_replace("Controller", "", $controllerClass);
        lcfirst($controller);
        // Instanciation et génération de la vue
        $template = new Template($controller);
        $template->generateT($this->arrViews,$templateData);
    }




}