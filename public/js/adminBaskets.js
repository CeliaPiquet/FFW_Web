
var arrBaskets=[];
var emptyBasketRow;
var emptyCollapsedProductRow;


loadExternalDOMElement([
    {url:websiteRoot+"/adminBaskets/basketRow",func:getEmptyBasketRow},
    {url:websiteRoot+"/adminBaskets/collapsedProductRow",func:getCollapsedProductRow},
    {url:websiteRoot+"/adminBaskets/productRow",func:getEmptyProductRow}
]);



function findBasketsByFilter(){


    arrBaskets=[];
    let filterObject={
        basketStatusSelect:null,
        basketRoleSelect:null,
        createDateInput:null
    }

    matchDOMAndObject("value","#",document.getElementById("basketsTableHeader"),filterObject,true);

    args={
        query:{
            offset:0,
            limit:20,
            status:filterObject.basketStatusSelect,
            role:filterObject.basketRoleSelect,
            createTime:filterObject.createDateInput
        }
    };

    exchangeToAPI(ffwApiUrl+"/baskets",arrBaskets,"GET",updateBasketRows,args);

}

function collapseProductElement(event){

    element=event.target;
    parent=getFirstParent(element,"id","basketRow");

    if(element.id=="collapseBtnProduct"){
        collapseDisplay(parent.collapseProductRow);
    }
}


function updateBasketRows(element) {

    arrBaskets=element;

    let basketRowsContainer = document.getElementById("basketRowsContainer");
    let createTime=document.getElementById("createDateInput").value;
    let filteredArrBasket=[];

    basketRowsContainer.innerHTML = "";

    if(arrBaskets){

        for(let i =0 ; i<arrBaskets.length; i++){

            if((createTime && arrBaskets[i].createTime===createTime)||!createTime){
                filteredArrBasket.push(arrBaskets[i]);
            }
        }
        arrBaskets=filteredArrBasket;
        for (let i = 0; i < arrBaskets.length; i++) {
            createBasketRow(basketRowsContainer,arrBaskets[i]);
        }
    }

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


function createBasketRow(container,basket,oldRow){

    newBasketRow=emptyBasketRow.cloneNode(true);

    newBasketRow.querySelector("#collapseBtnProduct").addEventListener('click',collapseProductElement,false);

    let arrStatus=["validated","refused","canceled"];

    for(let i=0 ; i<arrStatus.length ; i++){

        if(arrStatus[i]=== basket.status){
            newBasketRow.querySelector("#" + arrStatus[i]).disabled=true;
        }
    }
    if(basket.status==="delivered" || basket.status==="transit" || basket.status==="refused" || basket.status==="affected"){
        let inputs=newBasketRow.querySelectorAll("[name='basketsInput']");
        for(let i=0; i<inputs.length;i++){
            inputs[i].disabled=true;
        }
    }
    // newBasketRow.querySelector("#collapseBtnAddress").addEventListener('click',collapseAddressElement,false)

    basket["totalQuantity"]=basket.products&&basket.products.length>0?basket.products.length:"0";


    matchDOMAndObject("value", "#", newBasketRow, basket,false,1);
    matchDOMAndObject("innerHTML", "#", newBasketRow, basket,false,1)

    container.append(newBasketRow);
    newBasketRow.basket=basket;

    collapsedProductsRow= createCollapsedProductsRow(container,basket.products,newBasketRow);


    if(oldRow){
        container.replaceChild(newBasketRow,oldRow);
    }

    newBasketRow.collapseProductRow=collapsedProductsRow.querySelector("#collapseProducts");


}

function createCollapsedProductsRow(container,products,basketRow){

    newCollapsedProductRow = emptyCollapsedProductRow.cloneNode(true);

    container.append(newCollapsedProductRow);

    updateProductRows(products,newCollapsedProductRow);

    let productsTable=newCollapsedProductRow.querySelector("#productsTable");

    if(basketRow.basket.status==="delivered"||basketRow.basket.status==="transit"||basketRow.basket.status==="refused"){
        let productsInput=newCollapsedProductRow.querySelectorAll("[name='productsInput']");
        for(let i=0; i<productsInput.length; i++){
            productsInput[i].disabled=true;
        }
    }

    productsTable.products=products;
    productsTable.basketRow=basketRow;

    return newCollapsedProductRow;
}

function removeProduct(element){

    let productTable=getFirstParent(element,"id","productsTable");
    let basketRow=productTable.basketRow;
    let basket=basketRow.basket;
    let collapsedProducts=getFirstParent(basketRow.collapseProductRow,"id","collapsedProductRow");
    let productsToRemove=[];
    let productsToSave=[];

    for(let i=0 ; i<productTable.products.length; i++){
        if(productTable.products[i].checkProduct){
            productTable.products[i].basketId=null;
            productsToRemove.push(productTable.products[i])
        }
        else{
            productsToSave.push(productTable.products[i]);
        }
    }

    let nodeListToRemove=collapsedProducts.querySelectorAll("input:checked");
    for (let i=0; i<nodeListToRemove.length; i++){
        let nodeToRemove=getFirstParent(nodeListToRemove[i],"id","productRow");
        if(nodeToRemove.id=="productRow"){
            nodeToRemove.remove();
        }
    }

    basket.products=productsToSave;

    basket["totalQuantity"]=basket.products&&basket.products.length>0?basket.products.length:"0";

    matchDOMAndObject("value", "#", basketRow, basket,false,1);
    matchDOMAndObject("innerHTML", "#", basketRow, basket,false,1);

    args={
        products:productsToRemove
    };

    updateProductAPI(null,args);
}



function changeBasketStatus(element){

    let basket=getFirstParent(element,"id","basketRow").basket;

    basket.status=element.value;

    exchangeToAPI(ffwApiUrl+"/baskets",basket,"PUT",changeArrBaskets);

    updateBasketRows(arrBaskets);

}


function changeArrBaskets(element){

    for (let i=0 ; i< arrBaskets.length ; i++){
        arrBaskets[i];

        if(arrBaskets[i].bid==element.bid.toString()  ){
            arrBaskets.splice(i,1);
        }
    }

    updateBasketRows(arrBaskets);
}



function getEmptyBasketRow(domText){
    emptyBasketRow=document.createElement('tr');
    emptyBasketRow.class="align-items-center";
    emptyBasketRow.id="basketRow";
    emptyBasketRow.innerHTML = domText;
}

function getCollapsedProductRow(domText){
    emptyCollapsedProductRow=document.createElement('tr');
    emptyCollapsedProductRow.class="align-items-center";
    emptyCollapsedProductRow.id="collapsedProductRow";
    emptyCollapsedProductRow.innerHTML = domText;

}