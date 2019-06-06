
//Fonction parcourant les enfants d'un noeud du DOM pour y affecter des valeurs présentes dans un objet.
//Les enfants du noeud sont sélectionnés en combinant un selecteur CSS avec une des clés de l'objet passé en paramètre de la fonction
function matchDOMAndObject(attribute, selector, element, object,order=false,limit=null,deepness=0){

    if(limit!=null && deepness==limit){
        return object;
    }
    for(let key in object){

        if(order==true){
            let childElement = element.querySelector(selector + key);
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
                matchDOMAndObject(attribute, selector, element, object[key], order,limit,deepness);
            }
            if (isNaN(key)) {

                let childElement = element.querySelector(selector + key);

                if (childElement && object[key] !== null && object[key] != "") {

                    if(childElement.tagName=="SELECT" ){
                        for(let selectKey in childElement.options){

                            if(childElement.options[selectKey].value== object[key].toLowerCase()){
                                childElement.options[selectKey].selected=true;
                            }
                        }
                    }
                    else{
                        childElement[attribute] = object[key];
                    }
                }
            }
        }
    }
    return object;
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

function existObjInObjByKeyValue(searchedKey,searchedValue,object){

    for(let key in object){

        if(object[searchedKey] != undefined && object[searchedKey]==searchedValue ){
            return key;
        }
        else if(object[key]!=null && object[key]!=undefined && typeof object[key] === 'object'){
            if(existObjInObjByKeyValue(searchedKey,searchedValue,object[key])){
                return key;
            }
        }
    }
    return null;
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
    if(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return "";
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

function exchangeToAPI(url, element, method, func=null, args=null){


    request = new XMLHttpRequest();

    request.onreadystatechange=function(){

        if(request.readyState==4){
            if(request.status==200 || request.status==201) {
                newElement = JSON.parse(request.responseText);

                if(Array.isArray(newElement)){
                    if(Array.isArray(element)){
                        element=element.concat(newElement);
                    }

                    if(args.query){

                        if(args.query.offset!==null && args.query.limit!==null ) {

                            if (newElement.length != args.query.limit && func) {

                                func(args,element);
                            }
                            else{
                                args.query.offset+=newElement.length
                                exchangeToAPI(url, element, method, func, args)
                            }
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

                    if(func&&args){
                        func(args,element);
                    }
                }
            }
        }
    }

    url=generateUrl(url,args.id,args.subTarget,args.query);
    console.log(url);

    request.open(method,url);
    if(method!='GET'){
        request.send(JSON.stringify(element));
    }
    else{
        request.send();

    }

}

function generateUrl(url,id=null,subTarget=null,query=null){


    let i=0;
    if(id){
        url+="/"+id;
    }
    if(subTarget){
        url+="/"+subTarget;
    }
    if(query)
        i=0;
        url+="?";

        for(let key in query){
            i++;
            url+=key+"="+query[key];
                if(i!=Object.keys(query).length){
                url+="&";
            }
        }
    return url;
}