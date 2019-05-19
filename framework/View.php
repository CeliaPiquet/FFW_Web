<?php

require_once 'framework/Configuration.php';

class View {

    // Nom du file associé à la vue
    private $file;

    // Titre de la vue (défini dans le file vue)
    private $name;

    private $controller;

    public function __construct($view, $controller = "") {
        // Détermination du nom du file vue à partir de l'action et du constructeur
        $file = "views/";
        if ($controller != "") {
            $file = $file . lcfirst($controller ). "/";
        }
        $this->file = $file . $view . ".php";
        $this->controller =$controller;
    }

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
     * @return string
     */
    public function getFile(): string
    {
        return $this->file;
    }

    /**
     * @param string $file
     */
    public function setFile(string $file): void
    {
        $this->file = $file;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name): void
    {
        $this->name = $name;
    }


    // Génère et affiche la vue
    public function generate($data) {

        // Génération de la partie spécifique de la vue

        $content = $this->generateFile($this->file, $data);


        $template=new Template($this->getController());

        $websiteRoot = Configuration::get("websiteRoot", "/");
        // Génération du gabarit commun utilisant la partie spécifique

        $view = $this->generateFile($template->getFile(),
            array('title' => $this->titre, 'content' => $content, 'websiteRoot'=>$websiteRoot));

        // Renvoi de la vue générée au navigateur
        echo $view;
    }


    // Génère un file vue et renvoie le résultat produit
    protected function generateFile($file, $data ) {

        if (file_exists($file)) {
            // Rend les éléments du tableau $data accessibles dans la vue
            if(isset($data))
            extract($data);

            $websiteRoot=Configuration::get("websiteRoot", "/");
            // Démarrage de la temporisation de sortie
            ob_start();
            // Inclut le file vue
            // Son résultat est placé dans le tampon de sortie
            require $file;
            // Arrêt de la temporisation et renvoi du tampon de sortie
            return ob_get_clean();
        }
        else {
            throw new Exception("File '$file' not found");
        }
    }

}
