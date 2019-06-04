
//Fonction parcourant les enfants d'un noeud du DOM pour y affecter des valeurs présentes dans un objet.
//Les enfants du noeud sont sélectionnés en combinant un selecteur CSS avec une des clés de l'objet passé en paramètre de la fonction
function fillElementAttributesFromObject(attribute, selector, element, object){

    for(let key in object){

        if(object[key]!=null && typeof object[key] === 'object'){
            fillElementAttributesFromObject(attribute,selector,element,object[key]);
        }
        if(isNaN(key)){

            let childElement=element.querySelector(selector+key);
            if(childElement && object[key]!=null &&  object[key]!=""){
                childElement[attribute]=object[key];
            }
        }
    }
}

function existObjInObjByKeyValue(searchedKey,searchedValue,object,deep=0){

    for(let key in object){

        if(object[searchedKey] != undefined && object[searchedKey]==searchedValue ){
            return true;
        }
        else if(object[key]!=null && object[key]!=undefined && typeof object[key] === 'object'){
            deep++;
            if(existObjInObjByKeyValue(searchedKey,value,object[key]),deep){
                return true;
            }
        }
    }
    return false;
}

function modalDisplay(modalId){

    if(document.getElementById(modalId)){
        $('#'+ modalId).modal({
            backdrop:false
        })
    }
}

function collapseDisplay(element){

    console.log(element);
    $(element).collapse('toggle');
}



function ucFirst(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getFirstParent(element,attribute,value){

    while(element[attribute]!=value && element.tagName!="BODY"){
        element=element.parentElement;
    }
    return element;
}


function loadExternalDOMElement(arrFuncDom){

    for(let i=0 ; i<arrFuncDom.length ; i++){

        getDOMApi(arrFuncDom[i].url,arrFuncDom[i].func);

    }
}

function cvtObjectKey(cvtObj,objToCvt){


    for(let cvtKey in cvtObj){
        for(let objKey in objToCvt){

            if(cvtObj[cvtKey]==objKey){
                objToCvt[cvtKey]=objToCvt[objKey];
                delete objToCvt[objKey];
            }
        }
    }
    return objToCvt;
}

function getDOMApi(url,func){

    let request=new XMLHttpRequest();

    request.onreadystatechange=function(){

        if(request.readyState==4){
            if(request.status==200){
                func(request.responseText);
            }
        }
    };

    request.open("GET",url);
    request.send();

}