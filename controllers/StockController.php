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

        $this->addView($this->action, null);

        $this->loadTemplate(parent::getTemplateData(), $this->action);
    }

}