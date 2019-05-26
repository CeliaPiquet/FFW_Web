<?php

require_once "View.php";

class Template extends View
{

    private $controller;
    private $views;


    /**
     * @return string
     */
    public function getController(): string
    {
        return $this->controller;
    }

    /**
     * @param string $controller
     */
    public function setController(string $controller): void
    {
        $this->controller = $controller;
    }

    /**
     * @return mixed
     */
    public function getViews():array
    {
        return $this->views;
    }

    /**
     * @param mixed $views
     */
    public function setViews($views): void
    {
        $this->views = $views;
    }

    public function __construct($controller = "") {
        // Détermination du nom du file vue à partir de l'action et du constructeur
        $file = "templates/";
        if ($controller != "") {
            if(file_exists($file . lcfirst($controller ))){
                $file = $file . lcfirst($controller ). "/" ;
            }
        }
        $this->setFile($file ."template.php");
        $this->controller=$controller;
    }

    public function generateT(array $arrView, array $templateData) {

        foreach ($arrView as $viewFile=>$data) {

            $view = new View($viewFile, $this->controller);
            $viewContent=$view->generateFile($view->getFile(),$data);
            $this->views[$view->getName()]=$viewContent;

        }
        $views=$this->getViews();

        $websiteRoot = Configuration::get("websiteRoot", "/");

        $views['websiteRoot']=$websiteRoot;

        $filledTemplate = array_merge($views,$templateData);

        echo( parent::generateFile($this->getFile(),$filledTemplate));
    }
}