<?php


require_once 'framework/Controller.php';


class StockController extends Controller
{


    /**
     * StockController constructor.
     */
    public function __construct(){
        $this->addView('script',null);
    }

    public function index()
    {
        if($this->id==1){
            $this->addView("successAlert", null);
        }
        else if($this->id=0){
            $this->addView("errorAlert", null);
        }

        $arrPeremptionState=["good","average","bad"];

        $this->addView($this->action, array("arrPeremptionState"=>$arrPeremptionState));

        $this->loadTemplate(parent::getTemplateData(), $this->action);
    }


}