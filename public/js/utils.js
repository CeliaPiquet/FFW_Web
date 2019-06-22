
//Fonction parcourant les enfants d'un noeud du DOM pour y affecter des valeurs présentes dans un objet.
//Les enfants du noeud sont sélectionnés en combinant un selecteur CSS avec une des clés de l'objet passé en paramètre de la fonction
function matchDOMAndObject(attribute, selector, element, object,order=false,limit=null,deepness=0,objectName=null){

    if(limit!=null && deepness==limit){
        return object;
    }
    for(let key in object){

        if(order==true){

            if (typeof object[key] === 'object') {
                deepness++;
                matchDOMAndObject(attribute, selector, element, object[key], order,limit,deepness,key);
            }

            let childElement=getElementBySelectorAndObject(element,selector,key,objectName);


            if(childElement!=null){

                if(childElement.tagName=="SELECT" && childElement.selectedIndex>=0){
                    object[key]=childElement.options[childElement.selectedIndex][attribute];
                }
                else{
                    object[key]=childElement[attribute];
                }
            }
        }
        if(order==false) {
            if (object[key] != null && typeof object[key] === 'object') {
                deepness++;
                matchDOMAndObject(attribute, selector, element, object[key], order,limit,deepness,key);
            }
            if (isNaN(key)) {

                let childElement=getElementBySelectorAndObject(element,selector,key,objectName);

                if (childElement && object[key] !== null && object[key] !== "") {

                    if(childElement.tagName=="SELECT" ){
                        for(let selectKey in childElement.options){
                            if(childElement.options[selectKey].value== object[key].toLowerCase() ||(childElement.options[selectKey].innerHTML && childElement.options[selectKey].innerHTML.toLowerCase()== object[key].toLowerCase())){
                                childElement.options[selectKey].selected=true;
                            }
                        }
                    }
                    else{
                        childElement[attribute]=object[key];
                    }
                }
            }
        }
    }
    return object;
}

function filterObjectOnObject(objToFilter,filterObj){


    for(let key in objToFilter){

        if(filterObj[key] && filterObj[key]!==""){

            if(!objToFilter[key] && !isObjectEmpty(filterObj[key])){
                return false;
            }
            if(typeof objToFilter[key] !== "object" && !objToFilter[key].includes(filterObj[key]) && objToFilter[key]){
                return false;
            }
            else{
                if(typeof objToFilter[key] === "object"){

                    if(!filterObjectOnObject(objToFilter[key],filterObj[key])){
                        return false;
                    }
                }
            }
        }

    }
    return true;
}

function isObjectEmpty(controlledObj){

    for(let key in controlledObj){

        if(typeof controlledObj[key]==="object"){
            if(!isObjectEmpty(controlledObj[key])){
                return false;
            }
        }
        else if(controlledObj[key]){
            return false;
        }
    }

    return true;
}


function copyObjectProperty(srcObj,dstObj){

    for(let key in srcObj){

        if(typeof srcObj[key] == 'object'){
            copyObjectProperty(srcObj[key],dstObj[key]);
        }
        else{
            dstObj[key]=srcObj[key];
        }
    }

}

function getElementBySelectorAndObject(element,selector,objectKey,objectName=null){

    let domElement=null;

    if(isNaN(objectKey)){
        if(objectName ){
            domElement = element.querySelector(selector+objectKey +"[object='"+objectName+"']");
            if(domElement)
                domElement.objectSet=true;
        }
        if(!domElement){
            domElement = element.querySelector(selector + objectKey);
            if(domElement && !domElement.objectSet){
                return domElement;
            }
            return null
        }
    }


    return domElement;

}
//
// function existObjInObjByKeyValue(searchedKey,searchedValue,object){
//
//     for(let key in object){
//
//         if(object[searchedKey] != undefined && object[searchedKey]==searchedValue ){
//             return key;
//         }
//         else if(object[key]!=null && object[key]!=undefined && typeof object[key] === 'object'){
//             if(existObjInObjByKeyValue(searchedKey,searchedValue,object[key])){
//                 return key;
//             }
//         }
//     }
//     return null;
// }

function modalToggle(modalId,params=null){

    params=params?params:{backdrop:false};
    if(document.getElementById(modalId)){
        $('#'+ modalId).modal(params)
    }
}

function collapseDisplay(element){

    $(element).collapse('toggle');
}



function ucFirst(string){
    if(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return "";
}
function getFirstParent(element,attribute,value){

    while(!element[attribute].includes(value) && element.tagName!="BODY"){
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

function exchangeToAPI(url, element, method, func=null, args=null){


    request = new XMLHttpRequest();

    request.onreadystatechange=function(){

        if(request.readyState==4){
            if(args){
                args.status = request.status;
            }
            if(request.status==200 || request.status==201) {
                newElement = JSON.parse(request.responseText);

                if(Array.isArray(newElement)){
                    if(Array.isArray(element)){
                        element=element.concat(newElement);
                    }

                    if(args.query){

                        if(args.query.offset!==null && args.query.limit!==null && newElement.length == args.query.limit) {

                            args.query.offset+=newElement.length;
                            exchangeToAPI(url, element, method, func, args)
                        }
                    }
                }
                else{
                    if(Array.isArray(element)){
                        element.push(newElement);
                    }
                    else if(element instanceof  Map && args.id ){
                        element.set(args.id,newElement);
                    }
                    else{
                        copyObjectProperty(newElement,element);
                    }
                }
            }
            if (func) {
                func( element ,args);
            }

        }
    }

    if(args!=null){
        newUrl=generateUrl(url,args.id,args.subTarget,args.query);
    }
    else{
        newUrl=url;
    }
    request.open(method,newUrl);
    if(method!='GET'){
        request.send(JSON.stringify(element));
    }
    else{
        request.send();

    }

}

function generateUrl(url,id=null,subTarget=null,queries=null){


    let i=0;
    if(id){
        url+="/"+id;
    }
    if(subTarget){
        url+="/"+subTarget;
    }
    for(let key in queries){
        if(queries[key]===null||queries[key]===""){
            delete(queries[key]);
        }
    }

    if(queries){
        i=0;
        url+="?";

        for(let key in queries){
            i++;
            url+=key+"="+queries[key];

            if(i!=Object.keys(queries).length){
                url+="&";
            }
        }
    }

    return url;
}

function sortByOrder(a,b){

    if(a[sortByOrder.sortKey]>b[sortByOrder.sortKey]){
        return 1*sortByOrder.order;
    }
    else if(a[sortByOrder.sortKey]<b[sortByOrder.sortKey]){
        return -1*sortByOrder.order;
    }
    return 0;
}

function prepareEmptyDomElement(tagName,arrPropertyValue){

    let element=document.createElement(tagName);
    for(let key in arrPropertyValue){
        element[key]=arrPropertyValue[key];
    }
    return element;
}
