
//Fonction parcourant les enfants d'un noeud du DOM pour y affecter des valeurs présentes dans un objet.
//Les enfants du noeud sont sélectionnés en_EN combinant un selecteur CSS avec une des clés de l'objet passé en_EN paramètre de la fonction
function matchDOMAndObject(attribute, selector, element, object,order=false,limit=null,deepness=0,objectName=null,parentName=null){

    if(limit!=null && deepness==limit){
        return object;
    }
    for(let key in object){

        if(order==true){

            if (typeof object[key] === 'object') {
                deepness++;
                matchDOMAndObject(attribute, selector, element, object[key], order,limit,deepness,key);
            }

            let childElement=getElementBySelectorAndObject(element,selector,key,objectName,parentName);


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
                matchDOMAndObject(attribute, selector, element, object[key], order,limit,deepness,key,objectName);
            }
            if (isNaN(key)) {

                let childElement=getElementBySelectorAndObject(element,selector,key,objectName,parentName);

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

//Filtre un objet en le comparant avec un autre objet, utilisée principalement pour la recherche par filtre
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

//Fonction récursive parcourant un objet pour controler si toutes ses propriété sont vides
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

//Copie et remplace un objet par un autre, en faisant cela les références ne sont pas conservées
function copyObjectProperty(srcObj,dstObj){

    if(srcObj && dstObj){
        for(let key in srcObj){

            if(typeof srcObj[key] == 'object'){
                if(!dstObj[key]){
                    dstObj[key]=getEmptyObj(srcObj[key]);
                }
                copyObjectProperty(srcObj[key],dstObj[key]);
            }
            else{
                dstObj[key]=srcObj[key]?srcObj[key]:dstObj[key];
            }
        }
    }
}

//Fait une copie en profondeur d'un objet et place toutes ses propriétés à null afin de n'en récupérer que la structure
function getEmptyObj(obj){

    let emptyObj=JSON.parse(JSON.stringify(obj));
    for(let key in emptyObj){
        emptyObj[key]=null;
    }
    return emptyObj;
}

//Recherche dans le DOM un noeud, la recherche se base sur un sélecteur CSS + une valeur textuelle + un nom d'objet.
//Cette fonction permet entre autre lors d'un parcours d'un objet pour alimenter le dom dxe différencier des propriétés ayant le même nom mais dans deux objets différents
function getElementBySelectorAndObject(element,selector,objectKey,objectName=null,parentName=null){

    let domElement=null;


    if(isNaN(objectKey)){
        if(objectName ){
            domElement = element.querySelector(selector+objectKey +"[object='"+objectName+"']" + "[parent='" +parentName +"']");
            if(!domElement){
                domElement = element.querySelector(selector+objectKey +"[object='"+objectName+"']");
            }
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
function modalToggle(modalId,params={backdrop:false}){

    // params=params?params:{backdrop:false};
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

                newElement = request.responseText?JSON.parse(request.responseText):null;

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
                        if(element){
                            copyObjectProperty(newElement,element);
                        }
                        else{
                            element=newElement;
                        }
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

//Converti des secondes en heure/minute/seconde
function secondsToHms(seconds) {
    seconds = Number(seconds);
    let h = Math.floor(seconds / 3600);
    let m = Math.floor(seconds % 3600 / 60);
    let s = Math.floor(seconds % 3600 % 60);

    h=h>10?h:"0"+h;
    m=m>10?m:"0"+m;
    s=s>10?s:"0"+s;

    return h +":"+m+":"+s;
}

//Converti des  heures/minutes/seconds en secondes
function hmsToSeconds(hms){

    let arrTime=hms.split(':');
    h=parseInt(arrTime[0],10);
    m=parseInt(arrTime[1],10);
    s=parseInt(arrTime[2],10);

    return s+h*3600+m*60;

}

//Parcours une liste d'indices
function changePropertySelectOptions(property,value,indexes,select){

    for(let i=0; i<indexes.length;i++){
        for(let j=0 ;j<select.options.length;j++){
            if(select.options[j].value===indexes[i]){
                select.options[j][property]=value;
            }
        }
    }


}

function getServiceDateTime(srcObj=null){

    let serviceDateTime={
        serviceStartDate:null,
        serviceStartTime:null,
        durationTime:null,
        serviceEndDate:null,
        serviceEndTime:null
    };

    if(srcObj){
        copyObjectProperty(srcObj,serviceDateTime);
    }
    return serviceDateTime;
}

function synchronizeStartEnd(startDate,startTime,seconds){

    let baseDate=new Date(startDate+'T'+startTime);

    let calculateDate=getUnifiedDateTime(null, startDate, startTime);
    calculateDate.setSeconds(calculateDate.getSeconds()+seconds);

    return {
        baseDate:baseDate,
        calculateDate:calculateDate
    };
}


function getUnifiedDateTime(dateTime = null, date = null, time = null){

    let calculateDate=new Date();

    if(!dateTime&&!date&&!time){
        calculateDate.setTime(Date.now());
    }
    if(dateTime instanceof Date){
        return dateTime;
    }
    if(dateTime && !dateTime.includes('T')){
        date=dateTime.split(' ')[0];
        time=dateTime.split(' ')[1]?dateTime.split(' ')[1]:"00:00:00";
    }
    else if(dateTime){
        calculateDate=new Date(dateTime);
    }
    if(date && time ){
        calculateDate=new Date(date+'T'+time);
    }
    if(calculateDate){
        calculateDate.setMinutes(calculateDate.getMinutes()-calculateDate.getTimezoneOffset());
    }


    return calculateDate;
}


function replaceObjectKeys(srcObj,newKeysObj){

    for(let newKey in newKeysObj){

        for(let srcKey in srcObj){
            if(newKeysObj[newKey]===srcKey){
                srcObj[newKey]=srcObj[srcKey];
                delete(srcObj[srcKey]);
            }
        }
    }

    return srcObj;

}

function updateGenericsRow(element,args){

    args.container.innerHTML="";


    if(args.filterFunc){
        element=args.filterFunc(element,args);
    }
    if(element){
        for(let i=0 ; i<element.length;i++){
            args.element=element[i];
            createGenericRow(args);
        }
    }

}

function createGenericRow(args){

    let newGenericRow=args.emptyRow.cloneNode(true);

    newGenericRow[args.objectName]=null;

    newGenericRow[args.objectName]=args.element;
    newGenericRow.address=args.element.address;
    newGenericRow.idName=args.idName;
    newGenericRow.idValue=args.element[args.idName];
    newGenericRow.objectName=args.objectName;
    newGenericRow.parentIdName=args.parentIdName;
    newGenericRow.parentDomNode=args.parentDomNode;

    args.container.append(newGenericRow);
    args.domNode=newGenericRow;

    if(args.specifyFunc){
        args.specifyFunc(args);
    }

    matchDOMAndObject('innerHTML', '#', newGenericRow, args.element,false,1);

}

function changeLang(element){

    let lang=element.id;

    exchangeToAPI(websiteRoot+'/home/changeLang/'+lang,lang,"GET",function(){document.location.href = document.location},null);

}
