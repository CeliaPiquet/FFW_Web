var arrLocals=[];
var body;
var emptyLocalRow;
var emptyCollapsedAddressRow;
var emptyProductRow;

function openLocalModal(){

    modalDisplay('selectLocalModal');

}


loadExternalDOMElement([
    {url:websiteRoot+"/adminBaskets/collapsedAddressRow",func:getCollapsedAddressRow},
    {url:websiteRoot+"/adminBaskets/localRow",func:getEmptyLocalRow},
    {url:websiteRoot+"/adminBaskets/productRow",func:getEmptyProductRow}
]);

function getEmptyLocalRow(domText){
    emptyLocalRow=document.createElement('tr');
    emptyLocalRow.class="align-items-center";
    emptyLocalRow.id="localRow";
    emptyLocalRow.innerHTML = domText;
}


function getEmptyProductRow(domText){
    emptyProductRow=document.createElement('tr');
    emptyProductRow.class="align-items-center";
    emptyProductRow.id="productRow";
    emptyProductRow.innerHTML = domText;
}

function getCollapsedAddressRow(domText){
    emptyCollapsedAddressRow=document.createElement('tr')
    emptyCollapsedAddressRow.class="align-items-center";
    emptyCollapsedAddressRow.id="collapsedAddressRow";
    emptyCollapsedAddressRow.innerHTML =domText;
}


function openBasketModal(event){

    let element=event.target;

    let local=getFirstParent(element,"id","localRow").local;
    let modal=document.getElementById("createBasketModal");
    modal.products=[];
    modal.products=local.products;
    modal.baskets=local.baskets;
    let args={id:local.baskets.keys().next().value};

    exchangeToAPI(ffwApiUrl+"/baskets",local.baskets,"GET",getAllBasketByID,args);

    modalDisplay("createBasketModal");
}


function checkAllProduct(){


    arrCheckProduct=document.getElementsByName("checkProduct");
    checkAllVal=document.getElementById("checkProductInput").checked;


    console.log(checkAllVal);
    for(let i =  0 ; i<arrCheckProduct.length ; i++){
        arrCheckProduct[i].checked=checkAllVal;
    }
}

function getAllBasketByID(args,element){

    let key=element.keys();
    args.id=null;
    do{

        keyVal=key.next().value;
        if(element.get(keyVal)==null){
            if(keyVal){
                args.id=keyVal;
                break;
            }
        }
    }while(keyVal);

    if(args.id){
        exchangeToAPI(ffwApiUrl+"/baskets",element,"GET",getAllBasketByID,args);
    }


}
function changeQuantityOrder(){

    let arrowOrder=document.getElementById("arrowOrder");


    if(arrowOrder.classList.contains("fa-arrow-up")){
        arrowOrder.classList.remove("fa-arrow-up");
        arrowOrder.classList.add("fa-arrow-down");
        orderLocalsByQuantity(1);
    }
    else{
        arrowOrder.classList.remove("fa-arrow-down");
        arrowOrder.classList.add("fa-arrow-up");
        orderLocalsByQuantity(-1);
    }
    updateLocalRows();
}

function orderLocalsByQuantity(order){


    arrLocals.sort(function(a,b){
        if(a.totalQuantity>b.totalQuantity){
            return 1*order;
        }
        else if(a.totalQuantity<b.totalQuantity){
            return -1*order;
        }
        return 0;
    });
}

function findLocalsByFilter(){

    body=new Object();


    body.name=document.getElementById("nameInput").value;
    body.cityName= document.getElementById("cityNameInput").value;

    searchLocalsAPI(0,20,searchLocalsAPI);
}


function searchLocalsAPI(offset=0, limit=20, searchLocalsAPI){

    let request=new XMLHttpRequest();

    if(offset===0){
        arrUser=null;
    }

    request.onreadystatechange=function(){

        if(request.readyState==4){
            if(request.status==200){
                let apiLocals=JSON.parse(request.responseText);

                if(apiLocals.length==limit){
                    apiLocals.concat(searchLocalsAPI(offset,limit,searchLocalsAPI));
                }
                else if(offset>0){
                    return apiLocals;
                }
                else{
                    arrLocals=apiLocals;
                    updateLocalRows();
                }

            }
        }
    };

    let url=ffwApiUrl+"/locals?";
    let query="offset="+offset+"&limit="+limit+"&completeData";

    for(let key in body){
        if(body[key]){
            query=query+"&"+key+"="+body[key];
        }
    }
    url+=query;
    request.open("GET",url);
    request.send(JSON.stringify(body),false);

}

function sortProductByFilter(){

    arrProducts=document.getElementById("createBasketModal").products;

    arrFilters=document.getElementsByName("sortProductInput");

    mapFilteredProducts=new Map();

    for(let i = 0 ; i < arrFilters.length ; i++){
        for(let j = 0 ; j < arrProducts.length ; j++){

            let stringVal=null;
            let inputVal;

            if(arrFilters[i].tagName=="SELECT"){
                inputVal=arrFilters[i].options[arrFilters[i].selectedIndex].value;
            }
            else{
                inputVal=arrFilters[i].value;
            }

            if(arrProducts[j][arrFilters[i].id]!=null){
                stringVal=arrProducts[j][arrFilters[i].id].toString();
            }
            if (stringVal && inputVal &&  stringVal.includes(inputVal) && !arrProducts[i].basketId){
                mapFilteredProducts.set(arrProducts[j].prid, arrProducts[j]);
            }
        }
    }

    for(let i = 0 ; i < arrProducts.length ; i++){
        if(!arrProducts[i].basketId){
            mapFilteredProducts.set(arrProducts[i].prid,arrProducts[i]);
        }
    }

    updateProductRows(Array.from(mapFilteredProducts));
}



function updateLocalRows() {

    let localRowsContainer = document.getElementById("localRowsContainer");

    localRowsContainer.innerHTML = "";

    for (let i = 0; i < arrLocals.length; i++) {

        createLocalRow(localRowsContainer,arrLocals[i]);
    }
}

function  updateProductRows(arrProducts){

    let productRowsContainer = document.getElementById("productRowsContainer");

    productRowsContainer.innerHTML = "";

    for (let i = 0; i < arrProducts.length; i++) {

        newProductRow=emptyProductRow.cloneNode(true);
        if(arrProducts["checkProduct"]==undefined){
            arrProducts["checkProduct"]=false;
        }

        matchDOMAndObject("value","#",newProductRow, arrProducts[i]);
        matchDOMAndObject("checked","name",newProductRow, arrProducts[i].checkProduct);

        newProductRow.product=arrProducts[i];
        productRowsContainer.append(newProductRow);
    }
}



function createLocalRow(container,local){

    newLocalRow=emptyLocalRow.cloneNode(true);
    newCollapsedAddressRow = emptyCollapsedAddressRow.cloneNode(true);

    newLocalRow.querySelector("#collapseBtnAddress").addEventListener('click',collapseElement,false);

    local.products=mergeAllProductsInLocal(local.rooms);
    local["totalQuantity"]=local.products&&local.products.length>0?local.products.length:"0";

    local.baskets=new Map();
    for(let i = 0 ; i <local.products.length ; i++){
        local.baskets.set(local.products[i].basketId,null);
    }

    newLocalRow.querySelector("#displayCreateBasketModal").addEventListener('click',openBasketModal,false);

    convertAddressObjectToDOM(local.address);

    matchDOMAndObject("value", "#", newCollapsedAddressRow, local.address);

    matchDOMAndObject("value", "#", newLocalRow, local,false,1);
    matchDOMAndObject("innerHTML", "#", newLocalRow, local,false,1)

    container.append(newLocalRow);
    container.append(newCollapsedAddressRow);

    newLocalRow.local=local;
    newLocalRow.collapseAddress=newCollapsedAddressRow.querySelector("#collapseAddress");

}

function mergeAllProductsInLocal(rooms){

    let arrProducts=[];

    for(let i =0 ; i< rooms.length; i++){

        for(let j =0 ; j<rooms[i].products.length ; j++){

            arrProducts.push(rooms[i].products[j]);
        }
    }

    return arrProducts;

}


function collapseElement(event){

    element=event.target;
    parent=getFirstParent(element,"id","localRow");

    if(element.id=="collapseBtnAddress"){
        collapseDisplay(parent.collapseAddress);
    }
    else if(element.id=="collapseBtnRoom"){
        collapseDisplay(parent.collapseRoomRow);
    }
}



function addLocal(){

    let localRowsContainer = document.getElementById("localRowsContainer");

    for(let i=0;i<arrLocals.length;i++){
        if(arrLocals[i].loid==null){
            return null;
        }
    }

    let newLocal=getEmptyLocal();
    newLocal.address=getEmptyAddress();
    arrLocals.push(newLocal);
    createLocalRow(localRowsContainer,newLocal);
}


function convertAddressObjectToDOM(addressObj){

    convertObject={
        street_number: "houseNumber",
        route: "streetAddress",
        locality: "cityName",
        postal_code: "cityCode",
    }

    cvtObjectKey(convertObject,addressObj);
    addressObj.autocomplete="";
    return addressObj;
}

