var userFindFlag=false;
var arrLocals=[];
var body;

var emptyLocalsRow={
    "localRow":document.createElement('tr'),
    "collapsedAddressRow":document.createElement('tr'),
    "collapsedRoomRow":document.createElement('tr')
};
var emptyRoomRow;
var confirmButton=new DOMParser().parseFromString('<td>\n' +
    '    <button class="btn" id="confirmButton"><i  class="far fa-check-circle h1 mx-auto my-auto"></i></button>\n' +
    '</td>',"text/html").getElementById("confirmButton");


// document.getElementById("addLocal").addEventListener("click",addRow,false);

loadExternalDOMElement([
    {url:websiteRoot+"/adminlocals/collapsedAddressRow",func:getCollapsedAddressRow},
    {url:websiteRoot+"/adminlocals/collapsedRoomRow",func:getCollapsedRoomRow},
    {url:websiteRoot+"/adminlocals/localRow",func:getEmptyLocalRow},
    {url:websiteRoot+"/adminlocals/roomRow",func:getEmptyRoomRow}
]);

function getEmptyLocalRow(domText){
    emptyLocalsRow.localRow.class="align-items-center";
    emptyLocalsRow.localRow.id="localRow";
    emptyLocalsRow.localRow.innerHTML = domText;
}

function getCollapsedAddressRow(domText){
    emptyLocalsRow.collapsedAddressRow.class="align-items-center";
    emptyLocalsRow.collapsedAddressRow.id="collapsedAddressRow";
    emptyLocalsRow.collapsedAddressRow.innerHTML =domText;
}

function getCollapsedRoomRow(domText){
    emptyLocalsRow.collapsedRoomRow.class="align-items-center";
    emptyLocalsRow.collapsedRoomRow.id="collapsedRoomRow";
    emptyLocalsRow.collapsedRoomRow.innerHTML =domText;
}


function getEmptyRoomRow(domText){
    emptyRoomRow=document.createElement('tr');
    emptyRoomRow.class="align-items-center";
    emptyRoomRow.id="roomRow";
    emptyRoomRow.innerHTML =domText;
}


function changeQuantityOrder(){

    let arrowOrder=document.getElementById("arrowOrder");

    console.log(arrLocals);

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


function btnEventToUpdate(event){
    element=event.target;

    if(element.func!= undefined && element.func==changeBoolBtnState){
        element.func();
    }

    prepareUpdateAPI(element);
}


function inputEventToUpdate(event){
    element=event.target;
    prepareUpdateAPI(element);
}


function prepareUpdateAPI(element){

    let arrKey=['rid','adid','loid'];

    let url=null;

    if(element.parentObject[element.id]!=element.value){

        for(let i= 0; i<arrKey.length;i++){

            if(element.parentObject[arrKey[i]] != undefined){


                element.parentObject[element.id]=element.value;
                if(arrKey[i]=='rid'){
                    exchangeToAPI(ffwApiUrl+"/rooms",element.parentObject,"PUT");
                }
                else if(arrKey[i]=='adid'){

                    element.parentObject=convertAddressObjectToDOM(element.parentObject);
                    let parentDOM=getFirstParent(element,"id","collapseAddress");
                    element.parentObject=matchDOMAndObject("value","#",parentDOM,element.parentObject,true);
                    exchangeToAPI(ffwApiUrl+"/addresses",convertAddressObjectToAPI(element.parentObject),"PUT",true);
                }
                else if(arrKey[i]=='loid' && element.parentObject["rid"]== undefined){
                    exchangeToAPI(ffwApiUrl+"/locals",element.parentObject,"PUT");
                }
            }
        }
    }
}


function prepareUpdatableElement(parentObject,element){

    toUpdateElements=element.querySelectorAll(".to-update");

    for(let i=0; i<toUpdateElements.length ;i++){

        toUpdateElements[i].parentObject=parentObject;

        if(toUpdateElements[i].tagName=='BUTTON'){
            toUpdateElements[i].addEventListener('click',btnEventToUpdate, false);
        }
        else{
            toUpdateElements[i].addEventListener('focusout',inputEventToUpdate, false);
        }

    }
}

function updateLocalRows() {

    let localRowsContainer = document.getElementById("localRowsContainer");

    localRowsContainer.innerHTML = "";

    for (let i = 0; i < arrLocals.length; i++) {

        console.log(arrLocals[i]);
        createLocalRow(localRowsContainer,arrLocals[i]);
    }
}




function createLocalRow(container,local){

    newLocalRow = emptyLocalsRow.localRow.cloneNode(true);
    newCollapsedAddressRow = emptyLocalsRow.collapsedAddressRow.cloneNode(true);
    newCollapsedRoomRow = emptyLocalsRow.collapsedRoomRow.cloneNode(true);
    let roomRowsContainer = newCollapsedRoomRow.querySelector("#roomsContainer");

    prepareUpdatableElement(local,newLocalRow);
    prepareUpdatableElement(local.address,newCollapsedAddressRow);
    if(local.loid==null){
        newConfirmButton=confirmButton.cloneNode(true);
        newLocalRow.querySelector("#confirmButtonContainer").append(newConfirmButton);
        newConfirmButton.addEventListener('click',confirmRow,false);
    }
    else{
        newLocalRow.querySelector("#addRoom").addEventListener('click',addRoom,false);
    }
    newLocalRow.querySelector("#collapseBtnAddress").addEventListener('click',collapseElement,false);
    newLocalRow.querySelector("#collapseBtnRoom").addEventListener('click',collapseElement,false);

    if(local.rooms){
        for(let i = 0 ; i<local.rooms.length ; i++){
            createRoomRow(roomRowsContainer,local.rooms[i])
        }
    }

    convertAddressObjectToDOM(local.address);

    matchDOMAndObject("value", "#", newCollapsedAddressRow, local.address);

    convertLocalObject(local);

    matchDOMAndObject("value", "#", newLocalRow, local,false,1);
    matchDOMAndObject("innerHTML", "#", newLocalRow, local,false,1)

    container.append(newLocalRow);
    container.append(newCollapsedAddressRow);
    container.append(newCollapsedRoomRow);

    newLocalRow.local=local;
    newLocalRow.rooms=local.rooms;
    newLocalRow.roomRowsContainer=roomRowsContainer;
    newLocalRow.collapseAddress=newCollapsedAddressRow.querySelector("#collapseAddress");
    newLocalRow.collapseRoomRow=newCollapsedRoomRow.querySelector("#collapseRooms");

    initAutocomplete();
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

function changeBoolBtnState(){

    this.value=this.value==="1"?"0":"1";
    this.innerHTML=this.innerHTML==="YES"?"NO":"YES";
}

function createRoomRow(container,room){

    newRoomRow = emptyRoomRow.cloneNode(true);

    prepareUpdatableElement(room,newRoomRow);
    convertRoomObjectToDOM(room);
    matchDOMAndObject("innerHTML", "#", newRoomRow, room);
    convertRoomObjectToAPI(room);
    matchDOMAndObject("value", "#", newRoomRow, room);

    newRoomRow.querySelector("#isUnavailable").func=changeBoolBtnState;
    newRoomRow.querySelector("#isStockroom").func=changeBoolBtnState;

    if(room.rid==null){
        newConfirmButton=confirmButton.cloneNode(true);
        newRoomRow.querySelector("#confirmButtonContainer").append(newConfirmButton);
        newConfirmButton.addEventListener('click',confirmRow,false);
        newRoomRow.room=room;
    }

    container.append(newRoomRow);
}

function confirmRow(event){

    element=event.target;
    let tmpElement;
    console.log(element);
    if((tmpElement=getFirstParent(element,"id","localRow")).tagName=="BODY"){
        if((tmpElement=getFirstParent(element,"id","roomRow")).tagName!="BODY"){

            args={
                domParent:tmpElement,
            };
            exchangeToAPI(ffwApiUrl+"/rooms",matchDOMAndObject("value","#",tmpElement,tmpElement.room,true),"POST",removeConfirmButton,args);
        }
    }
    else{

        tmpElement.local.address=convertAddressObjectToDOM(tmpElement.local.address);
        tmpElement.local.address=matchDOMAndObject("value","#",tmpElement.collapseAddress,tmpElement.local.address,true);
        args={
            url:ffwApiUrl+"/locals",
            local:matchDOMAndObject("value","#",tmpElement,tmpElement.local,true),
            method:"POST",
            domParent:tmpElement
        };
        exchangeToAPI(ffwApiUrl+"/addresses",convertAddressObjectToAPI(tmpElement.local.address),"POST",createLocalToAPI,args);
    }
}

function createLocalToAPI(args,address){
    console.log(args.local);
    args.local.adid=address.adid;

    exchangeToAPI(args.url,args.local,args.method,removeConfirmButton,{domParent:args.domParent});
}

function removeConfirmButton(args){

    args.domParent.querySelector("#confirmButtonContainer").innerHTML="";

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

function addRoom(event){

    let element=event.target;

    element=getFirstParent(element,"id","localRow");
    for(let i=0;i<element.rooms.length;i++){
        if(element.rooms[i].rid==null){
            return null;
        };
    }
    let newRoom=getEmptyRoom();
    newRoom.loid=element.local.loid;
    console.log(element.rooms);
    element.rooms.push(newRoom);
    createRoomRow(element.roomRowsContainer,newRoom);
}

function convertLocalObject(local){

    console.log("QUANTITY FIRST");
    let quantity=0;
    if(local.rooms){
        for(let i=0 ; i<local.rooms.length;i++){
            if(local.rooms[i]){
                console.log(local.rooms[i]);
                quantity+= parseInt(local.rooms[i].totalQuantity);
            }
        }
    }

    console.log(quantity);
    local["totalQuantity"]=""+quantity+"";
    console.log("QUANTITY FIRST");

    return local;
}
function convertRoomObjectToDOM(room){

    let cvtArr=[
        "isUnavailable",
        "isStockroom"
    ];

    for(let i=0;i<cvtArr.length;i++){

        if(room[cvtArr[i]]==="1"){
            room[cvtArr[i]]="YES";
        }
        else{
            room[cvtArr[i]]="NO";
        }
    }
    room["totalQuantity"]=room.products&&room.products.length>0?room.products.length:"0";

    return room;
}

function convertRoomObjectToAPI(room){
    let cvtArr=[
        "isUnavailable",
        "isStockroom"
    ];

    for(let i=0;i<cvtArr.length;i++){

        if(room[cvtArr[i]]==="YES"){
            room[cvtArr[i]]="1";
        }
        else{
            room[cvtArr[i]]="0";
        }
    }

    return room;
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

function convertAddressObjectToAPI(addressObj){

    convertObject={
        houseNumber: "street_number",
        streetAddress: "route",
        cityName: "locality",
        cityCode: "postal_code",
    }
    cvtObjectKey(convertObject,addressObj);

    return addressObj;
}

function getEmptyLocal(){
    return {loid: null,
        name: null,
        adid: null,
        rooms: [],
        address: null};
}

function getEmptyAddress(){
    return{adid: null,
        houseNumber: null,
        streetAddress: null,
        complement: null,
        cityName: null,
        cityCode: null,
        country: null,
        latitude: null,
        longitude:null};
}

function getEmptyRoom(){
    return {rid: null,
        name: null,
        isUnavailable: null,
        isStockroom: null,
        loid: null,
        products:null};
}
