<?php

class Request {

    // paramètres de la requête
    private $arrParameters;

    /**
     * Request constructor.
     * @param $arrParameters
     */
    public function __construct($arrParameters)
    {
        $this->arrParameters = $arrParameters;
    }

    /**
     * @return array
     */
    public function getArrParameters(): array
    {
        return $this->arrParameters;
    }

    /**
     * @param array $arrParameters
     */
    public function setArrParameters(array $arrParameters): void
    {
        $this->arrParameters = $arrParameters;
    }


    // Renvoie vrai si le paramètre existe dans la requête
    public function existParameter($name) {
        return (isset($this->arrParameters[$name]) && $this->arrParameters[$name] != "");
    }

    // Renvoie la valeur du paramètre demandé
    // Lève une exception si le paramètre est introuvable
    public function getParameterByName($name) {
        if ($this->existParameter($name)) {
            return $this->arrParameters[$name];
        }
        else
            throw new Exception("Parameter '$name' not in request");
    }
}