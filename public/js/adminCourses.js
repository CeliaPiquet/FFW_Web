var arrCourses;
var emptyBasketRow;
var emptyCourseRow;
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

    idArr=["userRow","externalRow","companyRow"];
    for(let i=0 ; i<idArr.length;i++){
        parent=getFirstParent(element,"id",idArr[i]);
        if(parent.tagName!="BODY"){
            console.log(parent);
            collapseDisplay(parent.collapsedAddressRow);
        }
    }
}

function affectToBasket(element){

    let arrNullKey=["userId","companyId","externalId"];

    let parentRow=getFirstParent(element,"className","genericRow");
    let parentTable=getFirstParent(parentRow,"className","genericTable");
    let basketRow=getFirstParent(parentTable,"id","collapsedBasketDestRow").basketRow;
    let affectDestBtn=basketRow.querySelector("#collapseBasketDestRow");
    let basket=parentTable.basket;

    let arrAffectBtn=parentTable.querySelectorAll("#affectToBasket");

    console.log(affectDestBtn);
    for(let key in arrAffectBtn){
        arrAffectBtn[key].innerHTML="Affect to basket";
    }


    if(basketRow.basket[parentRow.basketIdName]==parentRow.idValue){
        parentRow.querySelector("#affectToBasket").innerHTML="Affect to basket";
        affectDestBtn.innerHTML="Affect destination";
    }
    else{
        for(let i=0 ; i<arrNullKey.length ; i++){
            basket[arrNullKey[i]]=null;
        }
        parentRow.querySelector("#affectToBasket").innerHTML="Affected to basket";
        affectDestBtn.innerHTML="Destination affected";
        basket[parentRow.basketIdName]=parentRow.idValue;
    }

    console.log(basket);
}

function findCourseByFilter(){

    arrCourses=[];
    let filterObject={
        nameInput:null,
        routeStateSelect:null,
        createDateInput:null,
        courseDateInput:null,
        vehicleSelect:null
    };

    matchDOMAndObject("value","#",document.getElementById("coursesTableHeader"),filterObject,true);

    console.log(filterObject);

    args={
        query:{
            offset:0,
            limit:20,
            name:filterObject.nameInput,
            routeState:filterObject.vehicleSelect,
            vehicleId:filterObject.vehicleSelect,
            createTime:filterObject.createDateInput,
            serviceTime : filterObject.courseDateInput
        }
    };

    exchangeToAPI(ffwApiUrl+"/courses",arrCourses,"GET",updateCourseRows,args);

}


function findBasketsByFilter(){

    arrBaskets=[];
    let filterObject={
        basketRoleSelect:null,
        createDateInput:null
    }

    matchDOMAndObject("value","#",document.getElementById("basketsTableHeader"),filterObject,true);


    args={
        query:{
            offset:0,
            limit:20,
            status:"validated",
            role:basketRoleSelect,
            createTime:filterObject.createDateInput
        },
        role:filterObject.basketRoleSelect
    };

    exchangeToAPI(ffwApiUrl+"/baskets",arrBaskets,"GET",updateBasketRows,args);
}


function findUsersByFilter(element){

    body=new Object();

    let filterObject={
        mailInput:null,
        lastnameInput:null,
        firstnameInput:null,
        cityInput:null
    }

    let parent=getFirstParent(element,"id","usersTable");
    let container=parent.querySelector("#userRowsContainer");
    let basketRow=getFirstParent(element,"id","collapsedBasketDestRow").basketRow;
    let arrUsers=[];

    matchDOMAndObject("value","#",parent,filterObject,true);

    console.log(filterObject);

    args={
        query:{
            offset:0,
            limit:20,
            email:filterObject.mailInput,
            lastname:filterObject.lastnameInput,
            firstname:filterObject.firstnameInput,
            cityName:filterObject.cityInput
        },
        container:container,
        emptyRow:emptyUserRow,
        basketRow:basketRow,
        objectName:"user",
        idName:"uid",
        basketIdName:"userId"

    };

    exchangeToAPI(ffwApiUrl+"/users",arrUsers,"GET",updateGenericsRow,args);

}

function findExternalsByFilter(element){

    body=new Object();

    let filterObject={
        mailInput:null,
        nameInput:null,
        cityInput:null
    };

    let parent=getFirstParent(element,"id","externalsTable");
    let container=parent.querySelector("#externalRowsContainer");
    let basketRow=getFirstParent(element,"id","collapsedBasketDestRow").basketRow;
    let arrExternals=[];

    console.log(filterObject);

    matchDOMAndObject("value","#",parent,filterObject,true);

    console.log(filterObject);

    args={
        query:{
            offset:0,
            limit:20,
            email:filterObject.mailInput,
            name:filterObject.nameInput,
            cityName:filterObject.cityInput
        },
        container:container,
        emptyRow:emptyExternalRow,
        basketRow:basketRow,
        objectName:"external",
        objectIdName:"exid",
        basketIdName:"externalId"


    };

    exchangeToAPI(ffwApiUrl+"/externals",arrExternals,"GET",updateGenericsRow,args);
}

function findCompaniesByFilter(element){

    body=new Object();

    let filterObject={
        siretInput:null,
        nameInput:null,
        cityInput:null
    };

    let parent=getFirstParent(element,"id","companiesTable");
    let container=parent.querySelector("#companyRowsContainer");
    let basketRow=getFirstParent(element,"id","collapsedBasketDestRow").basketRow;

    let arrCompanies=[];


    matchDOMAndObject("value","#",parent,filterObject,true);

    args={
        query:{
            offset:0,
            limit:20,
            email:filterObject.emailInput,
            name:filterObject.nameInput,
            cityName:filterObject.cityInput
        },
        container:container,
        emptyRow:emptyCompanyRow,
        basketRow:basketRow,
        objectName:"company",
        idName:"coid",
        basketIdName:"companyId"

    };

    exchangeToAPI(ffwApiUrl+"/companies",arrCompanies,"GET",updateGenericsRow,args);
}


function findLocalsByFilter(element){

    body=new Object();

    let filterObject={
        nameInput:null,
        cityInput:null
    };

    let parent=getFirstParent(element,"id","localsTable");
    let container=parent.querySelector("#localRowsContainer");
    let basketRow=getFirstParent(element,"id","collapsedBasketDestRow").basketRow;

    let arrLocals=[];


    matchDOMAndObject("value","#",parent,filterObject,true);

    args={
        query:{
            offset:0,
            limit:20,
            email:filterObject.emailInput,
            name:filterObject.nameInput,
            cityName:filterObject.cityInput
        },
        container:container,
        emptyRow:emptyCompanyRow,
        basketRow:basketRow,
        objectName:"local",
        idName:"loid",
        basketIdName:"companyId"

    };

    exchangeToAPI(ffwApiUrl+"/companies",arrLocals,"GET",updateGenericsRow,args);

}
function updateGenericsRow(element,args){

    args.container.innerHTML="";

    console.log(element);
    console.log(args);
    for(let i=0 ; i<element.length;i++){
        createGenericRow(element[i],args.objectName,args.idName,args.basketIdName,args.container,args.emptyRow,args.basketRow);
    }
}

function createGenericRow(object,objectName,idName,basketIdName,container,emptyRow,basketRow){

    let newGenericRow=emptyRow.cloneNode(true);
    let newCollapsedAddressRow=emptyCollapsedAddressRow.cloneNode(true);
    let affectBtn=newGenericRow.querySelector("#affectToBasket");
    newGenericRow["objectName"]=null;

    object.cityName=object.address.cityName;

    matchDOMAndObject('innerHTML', '#', newGenericRow, object);
    matchDOMAndObject('value', '#', newCollapsedAddressRow, object.address);

    if(basketRow.basket.role=="export"){
        if(basketRow.basket[basketIdName]==object[idName]){
            affectBtn.innerHTML="Affected to basket";
        }
        else{
            affectBtn.innerHTML="Affect to basket";
        }
    }
    else{
        affectBtn.remove();
    }


    newGenericRow[objectName]=object;
    newGenericRow.address=object.address;
    newGenericRow.idName=idName;
    newGenericRow.idValue=object[idName];
    newGenericRow.basketIdName=basketIdName;
    newGenericRow.basketRow=basketRow;


    newGenericRow.collapsedAddressRow=newCollapsedAddressRow.querySelector("#collapsedAddress");
    newCollapsedAddressRow[objectName]=object;

    container.append(newGenericRow);
    container.append(newCollapsedAddressRow);
}

function updateCourseRows(element){

    arrCourses=[];
    arrCourses=element;

    let courseRowContainer=document.getElementById("coursesRowsContainer");
    courseRowContainer.innerHTML="";

    for(let i=0 ; i<arrCourses.length;i++){
        createCourseRow(arrCourses[i],courseRowContainer);
    }
}

function updateBasketRows(element,args){

    arrBaskets=[];
    arrBaskets=element;

    let courseRowContainer=document.getElementById("basketRowsContainer");
    let cityName=document.getElementById("cityNameInput").value;
    let filteredBasketArr=[];

    courseRowContainer.innerHTML="";


    for(let i=0 ; i<arrBaskets.length;i++){

        let basketCity= arrBaskets[i].srcAddress&&arrBaskets[i].srcAddress.cityName?arrBaskets[i].srcAddress.cityName.toLowerCase():null;
        if((cityName&&basketCity&&basketCity.includes(cityName.toLowerCase()))||!cityName){
            filteredBasketArr.push(arrBaskets[i]);
        }

    }
    arrBaskets=filteredBasketArr;

    for(let i=0 ; i<arrBaskets.length;i++){
        createBasketRow(arrBaskets[i],courseRowContainer,args.query.role);
    }
}




function createBasketRow(basket,container,role){

    let newBasketRow=emptyBasketRow.cloneNode(true);
    let newCollapsedBasketDestRow=emptyCollapsedBasketDestRow.cloneNode(true);
    let btnGrpContainer=newCollapsedBasketDestRow.querySelector("#displayTablesBtnContainer");
    let affectDestBtn=newBasketRow.querySelector("#collapseBasketDestRow");

    let arrId={userId:"#displayUsersTable",companyId:"#displayCompaniesTable",externalId:"#displayExternalsTable"};

    btnGrpContainer.innerHTML="";

    if(role=="import"){
        affectDestBtn.innerHTML="Show source";
        for(let key in arrId){
            if(!basket[key]){
                newCollapsedBasketDestRow.querySelector(arrId[key]);
                console.log(newCollapsedBasketDestRow.querySelector(arrId[key]));
            }
        }
    }

    newBasketRow.basket=null;

    basket.totalQuantity=basket.products&&basket.products.length?basket.products.length:"0";

    matchDOMAndObject('value', '#', newBasketRow, basket,false,null,"basket");
    matchDOMAndObject('innerHTML', '#', newBasketRow, basket,false,null,"basket");


    newBasketRow.basket=basket;
    newBasketRow.collapsedBasketDest=newCollapsedBasketDestRow.querySelector("#collapsedBasketDest");
    newCollapsedBasketDestRow.basket=basket;
    newCollapsedBasketDestRow.basketRow=newBasketRow;

    // newBasketRow.querySelector("#")


    container.append(newBasketRow);
    container.append(newCollapsedBasketDestRow);

}

function changeBasketQuantityOrder(){

    let arrowOrder=document.getElementById("arrowBasketOrder");
    sortByOrder.sortKey="totalQuantity";

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
    updateBasketRows(arrBaskets);
}


function createCourseRow(course,container){



    newCourseRow=emptyCourseRow.cloneNode(true);
    newCourseRow.service=course;
    console.log(newCourseRow);

    console.log(course);

    matchDOMAndObject('value', '#', newCourseRow, course,false,null,"service");

    container.append(newCourseRow);

}

function findBasketsByFilter(){

    arrBaskets=[];
    let filterObject={
        basketStatusSelect:null,
        basketRoleSelect:null,
        createDateInput:null
    }

    matchDOMAndObject("value","#",document.getElementById("basketsTableHeader"),filterObject,true);

    console.log(filterObject);

    args={
        query:{
            offset:0,
            limit:20,
            status:filterObject.basketStatusSelect,
            role:filterObject.basketRoleSelect,
        }
    };

    exchangeToAPI(ffwApiUrl+"/baskets",arrBaskets,"GET",updateBasketRows,args);

}

function openNewCourseModal(){

    modalDisplay('courseModal');
}


function withdrawBasketFromCourse(basket) {
    var indexToRemove = basketsInCourse.findIndex(function(element) {
        return element == basket;
    });

    basketsInCourse.splice(indexToRemove, 1);
}

function addBasketToCourse(basket) {
    basketsInCourse.push(basket);
}



loadExternalDOMElement([
    {url:websiteRoot+"/adminCourses/basketRow",func:getEmptyBasketRow},
    {url:websiteRoot+"/adminCourses/courseRow",func:getEmptyCourseRow},
    {url:websiteRoot+"/adminCourses/collapsedBasketDestRow",func:getEmptyCollapsedBasketDestRow},
    {url:websiteRoot+"/adminCourses/collapsedAddressRow",func:getEmptyCollapsedAddressRow},
    {url:websiteRoot+"/adminCourses/usersTable",func:getEmptyUsersTable},
    {url:websiteRoot+"/adminCourses/userRow",func:getEmptyUserRow},
    {url:websiteRoot+"/adminCourses/companiesTable",func:getEmptyCompaniesTable},
    {url:websiteRoot+"/adminCourses/companyRow",func:getEmptyCompanyRow},
    {url:websiteRoot+"/adminCourses/externalsTable",func:getEmptyExternalsTable},
    {url:websiteRoot+"/adminCourses/externalRow",func:getEmptyExternalRow}
]);



function getEmptyBasketRow(domText){
    emptyBasketRow=document.createElement('tr');
    emptyBasketRow.class="align-items-center ";
    emptyBasketRow.scope="row";
    emptyBasketRow.id="basketRow";
    emptyBasketRow.innerHTML =domText;
}

function getEmptyCourseRow(domText) {
    emptyCourseRow = document.createElement('tr');
    emptyCourseRow.class = "align-items-center";
    emptyCourseRow.id = "courseRow";
    emptyCourseRow.innerHTML =domText;
}

function getEmptyCollapsedBasketDestRow(domText) {
    emptyCollapsedBasketDestRow = document.createElement('tr');
    emptyCollapsedBasketDestRow.class = "align-items-center";
    emptyCollapsedBasketDestRow.id = "collapsedBasketDestRow";
    emptyCollapsedBasketDestRow.innerHTML =domText;
}

function getEmptyCollapsedAddressRow(domText) {
    emptyCollapsedAddressRow = document.createElement('tr');
    emptyCollapsedAddressRow.class = "align-items-center";
    emptyCollapsedAddressRow.id = "collapsedAddressRow";
    emptyCollapsedAddressRow.innerHTML =domText;
}

function getEmptyUsersTable(domText) {
    emptyUsersTable = document.createElement('table');
    emptyUsersTable.className = "table table-striped table-hover genericTable";
    emptyUsersTable.id = "usersTable";
    emptyUsersTable.innerHTML =domText;
}
function getEmptyUserRow(domText) {
    emptyUserRow = document.createElement('tr');
    emptyUserRow.className = "align-items-center genericRow";
    emptyUserRow.id = "userRow";
    emptyUserRow.innerHTML =domText;
}

function getEmptyCompaniesTable(domText) {
    emptyCompaniesTable = document.createElement('table');
    emptyCompaniesTable.className = "table table-striped table-hover genericTable ";
    emptyCompaniesTable.id = "companiesTable";
    emptyCompaniesTable.innerHTML =domText;
}
function getEmptyCompanyRow(domText) {
    emptyCompanyRow = document.createElement('tr');
    emptyCompanyRow.className = "align-items-center genericRow";
    emptyCompanyRow.id = "companyRow";
    emptyCompanyRow.innerHTML =domText;
}


function getEmptyExternalsTable(domText) {
    emptyExternalsTable = document.createElement('table');
    emptyExternalsTable.className = "table table-striped table-hover genericTable";
    emptyExternalsTable.id = "externalsTable";
    emptyExternalsTable.innerHTML =domText;
}
function getEmptyExternalRow(domText) {
    emptyExternalRow = document.createElement('tr');
    emptyExternalRow.className = "align-items-center genericRow";
    emptyExternalRow.id = "externalRow";
    emptyExternalRow.innerHTML =domText;
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
                container:container,
                emptyRow:emptyCompanyRow,
                basketRow:parent.basketRow,
                objectName:"company",
                idName:"coid",
                basketIdName:"companyId"
                }},
            userId: {url:"users",args: {
                container:container,
                basketRow:parent.basketRow,
                emptyRow:emptyUserRow,
                objectName:"user",
                idName:"uid",
                basketIdName:"userId"
                }
            },
            externalId:{url:"externals",args:{
                container:container,
                basketRow:parent.basketRow,
                emptyRow:emptyExternalRow,
                objectName:"external",
                idName:"exid",
                basketIdName:"externalId"
                }}};

        let inputList=newTable.querySelectorAll("[name='inputFilter']");

        for(let i=0; i<inputList.length ; i++){
            inputList[i].readOnly=true;
        }
        for(let key in idNameUrl){
            if(basket[key]){
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
