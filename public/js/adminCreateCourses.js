var emptyBasketRow;
var emptyCollapsedAddressRow;

var emptyUsersTable;
var emptyCompaniesTable;
var emptyExternalsTable;

var emptyUserRow;
var emptyCompanyRow;
var emptyExternalRow;

var emptyCollapsedBasketDestRow;


function collapseBasketDestRow(element){
    parent=getFirstParent(element,"id","basketRow");
    collapseDisplay(parent.collapsedBasketDest);

}
function collapseAddressRow(element){

    idArr=["userRow","externalRow","companyRow","localRow"];
    for(let i=0 ; i<idArr.length;i++){
        parent=getFirstParent(element,"id",idArr[i]);
        if(parent.tagName!="BODY"){
            collapseDisplay(parent.collapsedAddressRow);
        }
    }
}


function getBasketsOrder(){

    let arrObjectKey=["user","external","company"];
    let course=document.getElementById("courseModal").course;

    let basketAddressIds=course.local.adid;

    course.baskets.forEach(function(basket,id,map){
        for(let i=0 ; i<arrObjectKey.length; i++){
            if(basket[arrObjectKey[i]]){
                basketAddressIds+=','+id+'||'+basket[arrObjectKey[i]].address.adid;
            }
        }

    });

    arrOrderIds=[];
    args={
        query:{
            offset:0,
            limit:20,
            subTarget:"pathFinding",
            basketAddressIds:basketAddressIds
        },
        course:course
    };

    console.log(course);
    exchangeToAPI(ffwApiUrl+"/courses/pathFinding",arrOrderIds,"GET",createCourseToAPI,args);
}

function createCourseToAPI(element,args){

    if(!element){
        return null;
    }

    args.arrOrderIds=element;
    args.query={completeData:true};
    args.course.status="created";
    args.course.type="course";
    args.course.affectedRow=null;
    args.basketCounter=0;
    //TODO control isPublic
    exchangeToAPI(ffwApiUrl+"/courses",args.course,"POST",updateBasketsToAPI,args);
}

function updateBasketsToAPI(element,args){

    console.log(element);

    if(args.basketCounter<args.arrOrderIds.length){
        let basket=args.course.baskets.get(args.arrOrderIds[args.basketCounter]);
        basket.order=args.basketCounter;
        basket.serviceId=args.course.serid;
        basket.status="affected";
        args.basketCounter++;
        console.log(basket);
        exchangeToAPI(ffwApiUrl+"/baskets/"+args.arrOrderIds[args.basketCounter-1],basket,"PUT",updateBasketsToAPI,args);
    }



}

function setCourseName(element){

    let course=document.getElementById("courseModal").course;
    let createCourseBtn=courseModal.querySelector('#createCourseBtn');

    course.name=element.value;

    if(course.localId&&course.baskets.size&&course.name){
        createCourseBtn.disabled=false;
    }
    else{
        createCourseBtn.disabled=true;
    }
}
function removeAffect(element){

    let arrNullKey=["userId","companyId","externalId"];
    let parentRow=getFirstParent(element,"className","genericRow");
    let affectToCourseBtn=parentRow.querySelector("#affectToCourseBtn");
    let affectDestBtn=parentRow.querySelector("#collapseBasketDestRow");
    let course=document.getElementById("courseModal").course;

    if(parentRow.basket && parentRow.basket.affectedRow){
        parentRow.basket.affectedRow.querySelector("#affectToBasket").innerHTML="Affect to basket";
        if(course.baskets.get(parentRow.basket.bid)){
            course.baskets.delete(parentRow.basket.bid);
        }
        affectDestBtn.innerHTML="Affect destination";
        affectToCourseBtn.innerHTML="Affect to course";

        for(let i=0 ; i<arrNullKey.length ; i++){
            parentRow.basket[arrNullKey[i]]=null;
        }
    }
    else{
        course.affectedRow.querySelector("#affectToCourse").innerHTML="Affect to course";
        course.localId=null;
        course.local=null;
    }


}


function affectToBasket(element){

    let arrNullKey=["userId","companyId","externalId"];

    let parentRow=getFirstParent(element,"className","genericRow");
    let parentTable=getFirstParent(parentRow,"className","genericTable");
    let parentDomNode=getFirstParent(parentTable,"id","collapsedBasketDestRow").parentDomNode;
    let affectDestBtn=parentDomNode.querySelector("#collapseBasketDestRow");
    let affectToCourseBtn=parentDomNode.querySelector("#affectToCourseBtn");
    let basket=parentTable.basket;
    let course=document.getElementById("courseModal").course;

    let arrAffectBtn=parentTable.querySelectorAll("#affectToBasket");

    for(let key in arrAffectBtn){
        arrAffectBtn[key].innerHTML="Affect to basket";
    }

    if(parentDomNode.basket[parentRow.parentIdName]==parentRow.idValue ){
        parentDomNode.basket[parentRow.parentIdName]=null;
        parentRow.querySelector("#affectToBasket").innerHTML="Affect to basket";
        affectDestBtn.innerHTML="Affect destination";
        if(course.baskets.get(parentTable.basket.bid)){
            affectToCourseBtn.innerHTML="Affect to course";
            course.delete(parentTable.basket.bid);
        }
    }
    else{
        for(let i=0 ; i<arrNullKey.length ; i++){
            basket[arrNullKey[i]]=null;
        }
        console.log(parentRow);
        parentRow.querySelector("#affectToBasket").innerHTML="Affected to basket";
        affectDestBtn.innerHTML="Destination affected";
        basket[parentRow.parentIdName]=parentRow.idValue;
        basket[parentRow.objectName]=parentRow[parentRow.objectName];
        basket.affectedRow=parentRow;
    }
}

function affectToCourse(element){


    let parentRow=getFirstParent(element,"className","genericRow");
    let courseModal=document.getElementById("courseModal");
    let createCourseBtn=courseModal.querySelector('#createCourseBtn');
    let course=courseModal.course;

    if(parentRow.id=="localRow"){

        if(course.local && course.local.loid===parentRow.local.loid){
            element.innerHTML="Affect to course";
            course.localId=null;
            course.local=null;
        }
        else if(!course.local){
            element.innerHTML="Affected to course";
            course.affectedRow=parentRow;
            course.localId=parentRow.local.loid;
            course.local=parentRow.local;
        }
    }
    else if(parentRow.id=="basketRow"){

        console.log(parentRow.basket);
        if(!course.baskets.get(parentRow.basket.bid)){
            if(parentRow.basket.role=="import" || (parentRow.basket.role=="export" && (parentRow.basket.userId||parentRow.basket.companyId||parentRow.basket.externalId))){
                element.innerHTML="Affected to course";
                course.baskets.set(parentRow.basket.bid,parentRow.basket);
            }
        }
        else{
            course.baskets.delete(parentRow.basket.bid);
            element.innerHTML="Affect to course";
        }
    }

    if(course.local&&course.baskets.size&&course.name){
        createCourseBtn.disabled=false;
    }
    else{
        createCourseBtn.disabled=true;
    }

}




function updateGenericsRow(element,args){

    args.container.innerHTML="";

    for(let i=0 ; i<element.length;i++){
        args.element=element[i];
        createGenericRow(args);
    }
}

function createGenericRow(args){

    let newGenericRow=args.emptyRow.cloneNode(true);


    console.log(args.element);
    newGenericRow[args.objectName]=null;

    newGenericRow[args.objectName]=args.element;
    newGenericRow.address=args.element.address;
    newGenericRow.idName=args.idName;
    newGenericRow.idValue=args.element[args.idName];
    newGenericRow.objectName=args.objectName;
    newGenericRow.parentIdName=args.parentIdName;
    newGenericRow.parentDomNode=args.parentDomNode;


    args.container.append(newGenericRow);
    args.previousNode=newGenericRow;

    if(args.specifyFunc){
        args.specifyFunc(args);
    }

    console.log(args.element);
    matchDOMAndObject('innerHTML', '#', newGenericRow, args.element,false,1);

}

function createSubBasketRow(args){

    let newCollapsedAddressRow=emptyCollapsedAddressRow.cloneNode(true);
    let affectBtn=args.previousNode.querySelector("#affectToBasket");


    newCollapsedAddressRow[args.objectName]=args.element;


    args.element.cityName=args.element.address.cityName;

    matchDOMAndObject('value', '#', newCollapsedAddressRow, args.element.address);

    if(args.parentDomNode.basket.role=="export"){
        if(args.parentDomNode.basket[args.parentIdName]==args.element[args.idName]){
            affectBtn.innerHTML="Affected to basket";
        }
        else{
            affectBtn.innerHTML="Affect to basket";
        }
    }
    else{
        affectBtn.remove();
    }

    args.previousNode.collapsedAddressRow=newCollapsedAddressRow.querySelector("#collapsedAddress");

    args.container.append(newCollapsedAddressRow);
}


function createLocalRow(args){

    let newCollapsedAddressRow=emptyCollapsedAddressRow.cloneNode(true);
    let affectBtn=args.previousNode.querySelector("#affectToCourse");


    newCollapsedAddressRow[args.objectName]=args.element;

    args.element.cityName=args.element.address.cityName;
    matchDOMAndObject('value', '#', newCollapsedAddressRow, args.element.address);

    if(args.parentDomNode.course.loid==args.element.loid){
        affectBtn.innerHTML="Affected to course";
    }
    else{
        affectBtn.innerHTML="Affect to course";
    }

    args.previousNode.collapsedAddressRow=newCollapsedAddressRow.querySelector("#collapsedAddress");

    args.container.append(newCollapsedAddressRow);
}

function updateBasketRows(element,args){

    let arrBaskets=element;

    let courseRowContainer=document.getElementById("basketRowsContainer");
    let cityName=document.getElementById("cityNameInput").value;
    let filteredBasketArr=[];

    courseRowContainer.innerHTML="";

    for(let i=0 ; i<arrBaskets.length;i++){
        let basketCity= arrBaskets[i].srcAddress&&arrBaskets[i].srcAddress.cityName?arrBaskets[i].srcAddress.cityName.toLowerCase():null;
        if((cityName&&basketCity&&basketCity.includes(cityName.toLowerCase()))||!cityName && (arrBaskets[i].status==="validated"||arrBaskets[i].status==="canceled")){
            filteredBasketArr.push(arrBaskets[i]);
        }

    }
    arrBaskets=filteredBasketArr;

    for(let i=0 ; i<arrBaskets.length;i++){
        createBasketRow(arrBaskets[i],courseRowContainer,args.role);
    }
}


function createBasketRow(basket,container,role){

    let newBasketRow=emptyBasketRow.cloneNode(true);
    let newCollapsedBasketDestRow=emptyCollapsedBasketDestRow.cloneNode(true);
    let affectDestBtn=newBasketRow.querySelector("#collapseBasketDestRow");
    let course =document.getElementById("courseModal").course;
    let arrId={userId:"#displayUsersTable",companyId:"#displayCompaniesTable",externalId:"#displayExternalsTable"};


    if(role=="import"){
        affectDestBtn.innerHTML="Show source";
        for(let key in arrId){
            if(!basket[key]){
                newCollapsedBasketDestRow.querySelector(arrId[key]).disabled=true;
                newCollapsedBasketDestRow.querySelector(arrId[key])["aria-disabled"]="true";
            }
        }
    }
    else{
        if(basket.userId || basket.externalId|| basket.companyId) {
            newBasketRow.querySelector("#collapseBasketDestRow").innerHTML = "Destination affected";
        }
        newBasketRow.querySelector("#removeAffect").disabled=false;
    }
    if(course.baskets.get(basket.bid)){
        newBasketRow.querySelector("#affectToCourseBtn").innerHTML="Affected to course";
    }

    newBasketRow.basket=null;

    basket.totalQuantity=basket.products&&basket.products.length?basket.products.length:"0";

    matchDOMAndObject('value', '#', newBasketRow, basket,false,null,"basket");
    matchDOMAndObject('innerHTML', '#', newBasketRow, basket,false,null,"basket");


    newBasketRow.basket=basket;
    newBasketRow.collapsedBasketDest=newCollapsedBasketDestRow.querySelector("#collapsedBasketDest");
    newCollapsedBasketDestRow.basket=basket;
    newCollapsedBasketDestRow.parentDomNode=newBasketRow;

    container.append(newBasketRow);
    container.append(newCollapsedBasketDestRow);
}

function changeBasketQuantityOrder(){

    let arrowOrder=document.getElementById("arrowBasketOrder");
    let arrBaskets=document.getElementById("courseModal").arrBaskets;

    sortByOrder.sortKey="totalQuantity";

    let filterObject={
        basketRoleSelect:null
    };

    matchDOMAndObject("value","#",document.getElementById("basketsTableHeader"),filterObject,true);

    let args={role:filterObject.basketRoleSelect};

    if(arrowOrder.classList.contains("fa-arrow-up")){
        arrowOrder.classList.remove("fa-arrow-up");
        arrowOrder.classList.add("fa-arrow-down");
        sortByOrder.order=1;
    }
    else{
        arrowOrder.classList.remove("fa-arrow-down");
        arrowOrder.classList.add("fa-arrow-up");
        sortByOrder.order=-1;

    }

    arrBaskets.sort(sortByOrder);
    updateBasketRows(arrBaskets,args);
}

function openNewCourseModal(){

    let courseModal=document.getElementById("courseModal");
    courseModal.course=getEmtpyCourse();
    courseModal.arrBaskets=[];

    modalToggle('courseModal');
}

function openLocalModal(){

    modalToggle('localModal');
}
function closeLocalModal(element){

    if(element){
        let course=document.getElementById("courseModal").course;
        document.getElementById("localRowsContainer").innerHTML="";
        course.localId=null;
        course.local=null;
    }
    modalToggle('localModal',"hide");
}
loadExternalDOMElement([
    {url:websiteRoot+"/adminCourses/basketRow",func:getEmptyBasketRow},
    {url:websiteRoot+"/adminCourses/collapsedBasketDestRow",func:getEmptyCollapsedBasketDestRow},
    {url:websiteRoot+"/adminCourses/collapsedAddressRow",func:getEmptyCollapsedAddressRow},
    {url:websiteRoot+"/adminCourses/usersTable",func:getEmptyUsersTable},
    {url:websiteRoot+"/adminCourses/userRow",func:getEmptyUserRow},
    {url:websiteRoot+"/adminCourses/companiesTable",func:getEmptyCompaniesTable},
    {url:websiteRoot+"/adminCourses/companyRow",func:getEmptyCompanyRow},
    {url:websiteRoot+"/adminCourses/externalsTable",func:getEmptyExternalsTable},
    {url:websiteRoot+"/adminCourses/externalRow",func:getEmptyExternalRow},
    {url:websiteRoot+"/adminCourses/localRow",func:getEmptyLocalRow}

]);


function getEmptyLocalRow(domText){
    emptyLocalRow=prepareEmptyDomElement('tr',{className:"align-items-center genericRow",id:"localRow",innerHTML:domText});
}
function getEmptyBasketRow(domText){
    emptyBasketRow=prepareEmptyDomElement('tr',{className:"align-items-center genericRow",scope:"row",id:"basketRow",innerHTML:domText});
}

function getEmptyCollapsedBasketDestRow(domText) {
    emptyCollapsedBasketDestRow=prepareEmptyDomElement('tr',{className:"align-items-center ",id:"collapsedBasketDestRow",innerHTML:domText});
}

function getEmptyCollapsedAddressRow(domText) {
    emptyCollapsedAddressRow=prepareEmptyDomElement('tr',{className:"align-items-center",id:"collapsedAddressRow",innerHTML:domText});
}

function getEmptyUsersTable(domText) {
    emptyUsersTable=prepareEmptyDomElement('table',{className:"table table-striped table-hover genericTable",id:"usersTable",innerHTML:domText});
}
function getEmptyUserRow(domText) {
    emptyUserRow=prepareEmptyDomElement('tr',{className:"align-items-center genericRow",id:"userRow",innerHTML:domText});
}

function getEmptyCompaniesTable(domText) {
    emptyCompaniesTable=prepareEmptyDomElement('table',{className:"table table-striped table-hover genericTable",id:"companiesTable",innerHTML:domText});
}
function getEmptyCompanyRow(domText) {
    emptyCompanyRow=prepareEmptyDomElement('tr',{className:"align-items-center genericRow",id:"companyRow",innerHTML:domText});
}

function getEmptyExternalsTable(domText) {
    emptyExternalsTable=prepareEmptyDomElement('table',{className:"table table-striped table-hover genericTable",id:"externalsTable",innerHTML:domText});
}
function getEmptyExternalRow(domText) {
    emptyExternalRow=prepareEmptyDomElement('tr',{className:"align-items-center genericRow",id:"externalRow",innerHTML:domText});
}

function displayTable(element,nodeToClone){

    let parent=getFirstParent(element,"id","collapsedBasketDestRow");
    let tableContainer=parent.querySelector("#tableContainer");


    tableContainer.innerHTML="";
    let newTable=nodeToClone.cloneNode(true);
    newTable.basket=parent.basket;
    tableContainer.append(newTable);
    let basket=parent.basket;


    if(basket.role=="import"){
        let container=tableContainer.querySelector(".genericRowContainer");
        let idNameUrl={
            companyId:{url:"companies",args:{
                query:{completeData:true},
                container:container,
                emptyRow:emptyCompanyRow,
                parentDomNode:parent.parentDomNode,
                objectName:"company",
                idName:"coid",
                parentIdName:"companyId",
                specifyFunc:createSubBasketRow
                }},
            userId: {url:"users",args: {
                container:container,
                parentDomNode:parent.parentDomNode,
                emptyRow:emptyUserRow,
                objectName:"user",
                idName:"uid",
                parentIdName:"userId",
                specifyFunc:createSubBasketRow
                }
            },
            externalId:{url:"externals",args:{
                query:{completeData:true},
                container:container,
                parentDomNode:parent.parentDomNode,
                emptyRow:emptyExternalRow,
                objectName:"external",
                idName:"exid",
                parentIdName:"externalId",
                specifyFunc:createSubBasketRow
                }}};

        let inputList=newTable.querySelectorAll("[name='filterInput']");

        for(let i=0; i<inputList.length ; i++){
            inputList[i].readOnly=true;
            inputList[i].onkeyup="";
        }
        for(let key in idNameUrl){
            if(basket[key]){
                console.log(key);
                let arrResult=[];
                exchangeToAPI(ffwApiUrl+"/"+idNameUrl[key].url+"/"+basket[key],arrResult,"GET",updateGenericsRow,idNameUrl[key].args);
            }
        }
        if(basket.companyId){
            args.id=companyId
        }else if(basket.companyId){


        }else if(basket.userId){

        }
    }
}
function displayUsersTable(element){
    displayTable(element,emptyUsersTable);
}

function displayCompaniesTable(element){
    displayTable(element,emptyCompaniesTable);
}

function displayExternalsTable(element){
    displayTable(element,emptyExternalsTable);
}

function getEmtpyCourse(){

    return {
        serid:null,
        name:null,
        description:null,
        createTime:null,
        type:null,
        capacity:null,
        isPublic:null,
        status:null,
        isPremium:null,
        serviceTime:null,
        routeState:null,
        vehicleId:null,
        localId:null,
        local:null,
        baskets:new Map()
    };


}