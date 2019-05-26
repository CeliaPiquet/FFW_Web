<?php

require_once 'Request.php';
require_once 'View.php';
require_once 'Controller.php';

class Router {

    // Route une requête entrante : exécute l'action associée
    public function routeRequest() {
        try {
            // Fusion des paramètres GET et POST de la requête
            $request = new Request(array_merge($_GET, $_POST));


            $controller = $this->createController($request);
            $action = $this->createAction($request);


            $controller->executeAction($action);

        }
        catch (Exception $e) {
            $this->handleError($e);
        }
    }

    // Crée le contrôleur approprié en fonction de la requête reçue
    private function createController(Request $request) :Controller{
        $controller = "Home";  // Contrôleur par défaut
        if ($request->existParameter('controller')) {
            $controller = $request->getParameterByName('controller');
            // Première lettre en majuscule

            $controller = ucfirst(strtolower($controller));
        }
        // Création du nom du fichier du contrôleur
        $controllerClass = $controller."Controller";
        $controllerFile = "controllers/" . $controllerClass . ".php";


        if (file_exists($controllerFile)) {
            // Instanciation du contrôleur adapté à la requête
            require($controllerFile);

            $controller = new $controllerClass();
            $controller->setRequest($request);

            return $controller;
        }
        else
            throw new Exception("File '$controllerFile' not found");
    }

    // Détermine l'action à exécuter en fonction de la requête reçue
    private function createAction(Request $request) {
        $action = "index";  // Action par défaut
        if ($request->existParameter('action')) {
            $action = $request->getParameterByName('action');
        }
        return $action;
    }

    // Gère une erreur d'exécution (exception)
    private function handleError(Exception $exception) {
        $view = new View('error');
        $view->generateV(array('errorMsg' => $exception->getMessage()));
    }
}