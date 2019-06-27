<?php

class Request {

    // paramètres de la requête
    private $arrParameters;

    /**
     * Request constructor.
     * @param $arrParameters
     */
    public function __construct($get,$post)
    {
        $this->arrParameters=[];

        if(is_array($get)){
            $get=array_values($get);
            for($i=0;$i<count($get);$i++){

                if($i==0&&!isset($this->arrParameters['controller'])){
                    $this->arrParameters['controller']=$get[$i];
                }
                else if(intval($get[$i])&&!isset($this->arrParameters['id'])){
                    $this->arrParameters['id']=$get[$i];
                    $i=1;
                }
                else if(isset($this->arrParameters['controller'])&&!intval($get[$i])&&strlen($get[$i])>2&&!isset($this->arrParameters['action'])){
                    $this->arrParameters['action']=$get[$i];
                    $i=1;
                }
                else if(!is_int($get[$i])&&strlen($get[$i])===2&&!isset($this->arrParameters['lang'])){
                    $this->arrParameters['lang']=$get[$i];
                    $i=1;
                }
            }
        }
        $this->arrParameters=array_merge($this->arrParameters,$post);
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