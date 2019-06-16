var emptyLocalRow;
var emptyCollapsedAddressRow;
var emptyProductRow;


loadExternalDOMElement([
    {url:websiteRoot+"/adminBaskets/collapsedAddressRow",func:getCollapsedAddressRow},
    {url:websiteRoot+"/adminBaskets/localRow",func:getEmptyLocalRow},
    {url:websiteRoot+"/adminBaskets/productRow",func:getEmptyProductRow}
]);


function openBasketModal(event){

    let element=event.target;
    let local=getFirstParent(element,"id","localRow").local;
    let modal=document.getElementById("createBasketModal");
    let productRowsContainer = document.getElementById("productRowsContainer");
    let productsTable=modal.querySelector("#productsTable");

    productRowsContainer.innerHTML = "";
    delete(productsTable.products);

    productsTable.products=local.products;

    let args={
        id:local.baskets.keys().next().value,
        products:productsTable.products
    };

    exchangeToAPI(ffwApiUrl+"/baskets",local.baskets,"GET",getAllBasketByID,args);

    modalDisplay("createBasketModal");
}

function  updateProductRows(arrProducts,parent){

    let productRowsContainer = parent.querySelector("#productRowsContainer");
    productRowsContainer.innerHTML = "";

    console.log(arrProducts);
    if(arrProducts){
        for (let i = 0; i < arrProducts.length; i++) {

            newProductRow=emptyProductRow.cloneNode(true);
            let checkProduct=newProductRow.querySelector("[name='checkProduct']");

            if(arrProducts[i]["checkProduct"] == undefined){
                arrProducts[i]["checkProduct"]=false;
            }
            checkProduct.checked=arrProducts[i]["checkProduct"];
            checkProduct.addEventListener('click',setCheckProductObj,false);
            matchDOMAndObject("value","#",newProductRow, arrProducts[i]);

            newProductRow.product=arrProducts[i];
            productRowsContainer.append(newProductRow);
        }
    }

}

function checkAllProduct(element){

    let productTable=getFirstParent(element,"id","productsTable");
    arrCheckProduct=productTable.querySelectorAll("[name='checkProduct']");
    checkAllVal=productTable.querySelector("#checkProductInput").checked;

    console.log(checkAllVal);
    for(let i =  0 ; i<arrCheckProduct.length ; i++){
        arrCheckProduct[i].checked=checkAllVal;
        getFirstParent(arrCheckProduct[i],"id","productRow").product.checkProduct=checkAllVal;
    }
}

function setCheckProductObj(event){

    let element=event.target;
    let product=getFirstParent(element,"id","productRow").product;
    product.checkProduct=element.checked;
    console.log(product);
}

function getAllBasketByID(element,args){

    let key=element.keys();
    args.id=null;
    console.log(args);
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
    else{
        console.log( args.products);
        console.log(element);
        let modal=document.getElementById("createBasketModal");
        console.log(args);
        modal.querySelector("#productsTable").products= args.products.filter(filterProduct,element);
    }
}


function filterProduct(product){

    let basket=this.get(product.basketId);
    basket = basket && basket.value ? basket.value : null;
    console.log(product);
    if(product.basketId===null  || (basket && basket.status ==="canceled")){
        return true;
    }
    return false;
}


function sortProductByFilter(element){


    parent=getFirstParent(element,"id","productsTable");
    console.log(parent);
    let arrProducts=parent.products;
    let arrFilters=parent.querySelectorAll("[name='sortProductInput']");
    let mapFilteredProducts=new Map();

    parent.querySelector("#checkProductInput").checked=false;

    for(let j = 0 ; j < arrProducts.length ; j++){

        let setFlag=1;

        for(let i = 0 ; i < arrFilters.length ; i++){

            let inputVal;
            let stringVal=null;

            if(arrFilters[i].tagName=="SELECT"){
                inputVal=arrFilters[i].options[arrFilters[i].selectedIndex].value;
            }
            else{
                inputVal=arrFilters[i].value;
            }

            if(arrProducts[j][arrFilters[i].id]!=null){
                stringVal=arrProducts[j][arrFilters[i].id].toString();
            }

            if (stringVal!=null && inputVal!="" &&  stringVal.includes(inputVal)){
                console.log(mapFilteredProducts.get(arrProducts[j].prid));
            }
            else if(inputVal!="" && stringVal!=inputVal){
                setFlag=0;
            }
        }

        if(setFlag){
            mapFilteredProducts.set(arrProducts[j].prid, arrProducts[j]);
        }
    }

    if(mapFilteredProducts.size===0){
        updateProductRows(arrProducts,parent);
    }
    else{
        updateProductRows(Array.from(mapFilteredProducts.values()),parent);
    }
}



function basketToAPI(){

    let products=document.getElementById('createBasketModal').querySelector("#productsTable").products;
    let emptyBasket=getEmptyBasket();
    let arrProducts=[];

    for(i=0;i<products.length;i++){
        if(products[i].checkProduct){
            arrProducts.push(products[i]);
        }
    }
    args={
        products:arrProducts
    };
    emptyBasket.status="pending";
    emptyBasket.role="export";

    exchangeToAPI(ffwApiUrl+"/baskets",emptyBasket,"POST",updateProductAPI, args);

}

function updateProductAPI(element,args){

    let arrProducts=args.products;

    if(args.counterProduct == undefined){
        if(element && element.bid!==null){
            console.log(element);

            for(let i=0; i<arrProducts.length ;i++){
                arrProducts[i].basketId=element.bid;
            }
            console.log(arrProducts);
        }
        args.counterProduct=0;
    }
    if(args.counterProduct<arrProducts.length){
        console.log(arrProducts[args.counterProduct]);
        exchangeToAPI(ffwApiUrl+"/products",arrProducts[args.counterProduct],"PUT",updateProductAPI,args);
        args.counterProduct++;
    }
    else{
        if(element){
            findLocalsByFilter();
        }
    }

}



function changeLocalQuantityOrder(){

    let arrowOrder=document.getElementById("arrowLocalOrder");

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
    arrLocals.sort(sortByOrder);
    updateLocalRows(arrLocals);

}


function openLocalModal(){

    modalDisplay('selectLocalModal');

}


function findLocalsByFilter(){

    modal=document.getElementById("selectLocalModal");
    modal.arrLocals=[]
    args={
        query:{
            offset:0,
            limit:20,
            name:document.getElementById("nameInput").value,
            cityName: document.getElementById("cityNameInput").value,
            completeData:true
        }
    };

    url=ffwApiUrl+"/locals?";


    exchangeToAPI(ffwApiUrl+"/locals",modal.arrLocals,"GET",updateLocalRows,args);

}

function updateLocalRows(element) {

    arrLocals=element;

    let localRowsContainer = document.getElementById("localRowsContainer");

    console.log(localRowsContainer);
    localRowsContainer.innerHTML = "";

    for (let i = 0; i < arrLocals.length; i++) {
        createLocalRow(localRowsContainer,arrLocals[i]);
    }
}



function createLocalRow(container,local){

    newLocalRow=emptyLocalRow.cloneNode(true);
    newCollapsedAddressRow = emptyCollapsedAddressRow.cloneNode(true);

    newLocalRow.querySelector("#collapseBtnAddress").addEventListener('click',collapseAddressElement,false);

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

    if(rooms){
        for(let i =0 ; i< rooms.length; i++){

            if(rooms[i].products){
                for(let j =0 ; j<rooms[i].products.length ; j++){

                    arrProducts.push(rooms[i].products[j]);
                }
            }
        }
    }
    return arrProducts;


}


function collapseAddressElement(event){

    element=event.target;
    parent=getFirstParent(element,"id","localRow");

    if(element.id=="collapseBtnAddress"){
        collapseDisplay(parent.collapseAddress);
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

function getEmptyBasket(){

    return {
        bid : null,
        createTime : null,
        status : null,
        role : null,
        order : null,
        serviceId : null,
        companyId : null,
        externalId : null,
        userId : null
    }
}

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