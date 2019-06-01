
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

function modalDisplay(modalId){

    if(document.getElementById(modalId)){
        $('#'+ modalId).modal({
            backdrop:false
        })
    }
}



function ucFirst(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getFirstParent(element,attribute,value){

    while(element[attribute]!=value && element.tagName!="body"){
        element=element.parentElement;
    }
    return element;
}
