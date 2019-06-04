var userFindFlag=false;
var arrLocals=[];
var arrToUpdate=[];
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
    {url:websiteRoot+"/local/collapsedAddressRow",func:getCollapsedAddressRow},
    {url:websiteRoot+"/local/collapsedRoomRow",func:getCollapsedRoomRow},
    {url:websiteRoot+"/local/localRow",func:getEmptyLocalRow},
    {url:websiteRoot+"/local/roomRow",func:getEmptyRoomRow}
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
                console.log(request.responseText);
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
    console.log(url);
    request.open("GET",url);
    request.send(JSON.stringify(body),false);

}


function btnEventToUpdate(event){
    element=event.target;
    setObjToUpdate(element);

}
function inputEventToUpdate(event){
    element=event.target;
    setObjToUpdate(element);
}


function setObjToUpdate(element){

    arrKey=['rid','aid','loid'];
    if(element.parentObject[element.id]!=element.value){

        for(let i= 0; i<arrKey.length;i++){
            if(element.parentObject[arrKey[i]] != undefined){
                if(!existObjInObjByKeyValue(arrKey[i],element.parentObject[arrKey[i]],arrToUpdate)){
                    if(arrKey[i]=='rid'){
                        arrToUpdate.push(convertRoomObjectToAPI(element.parentObject));
                    }
                    else if(arrKey[i]=='aid'){
                        arrToUpdate.push(convertAddressObjectToAPI(element.parentObject));
                    }
                    else{
                        arrToUpdate.push(element.parentObject);

                    }
                }
            }
        }
    }
    console.log(arrToUpdate);
}

function prepareUpdatableElement(parentObject,element){

    toUpdateElements=element.querySelectorAll(".to-update");

    for(let i=0; i<toUpdateElements.length ;i++){

        toUpdateElements[i].parentObject=parentObject;

        if(toUpdateElements[i].tagName=='BUTTON'){
            console.log(toUpdateElements[i]);
            toUpdateElements[i].addEventListener('click',btnEventToUpdate, false);
        }
        else{
            toUpdateElements[i].addEventListener('keyup',inputEventToUpdate, false);
        }

    }
}
// function updateLocalRows() {
//
//     console.log(arrLocals);
//
//     let localRowsContainer = document.getElementById("localRowsContainer");
//
//     localRowsContainer.innerHTML = "";
//
//     for (let i = 0; i < arrLocals.length; i++) {
//
//         newLocalRow = emptyLocalsRow.localRow.cloneNode(true);
//         newCollapsedAddressRow = emptyLocalsRow.collapsedAddressRow.cloneNode(true);
//         newCollapsedRoomRow = emptyLocalsRow.collapsedRoomRow.cloneNode(true);
//
//         let roomRowsContainer = newCollapsedRoomRow.querySelector("#roomsContainer");
//
//         if(arrLocals[i].rooms){
//             for(let j = 0 ; j<arrLocals[i].rooms.length ; j++){
//                 newRoomRow = emptyRoomRow.cloneNode(true);
//                 convertRoomObjectToDOM(arrLocals[i].rooms[j]);
//                 fillElementAttributesFromObject("innerHTML", "#", newRoomRow, arrLocals[i].rooms[j]);
//                 fillElementAttributesFromObject("value", "#", newRoomRow, arrLocals[i].rooms[j]);
//                 if(arrLocals[i].rooms[j].rid==null){
//                     newConfirmButton=confirmButton.cloneNode(true);
//                     newRoomRow.querySelector("#confirmButtonContainer").append(newConfirmButton);
//                 }
//                 roomRowsContainer.append(newRoomRow);
//             }
//         }
//
//         if(arrLocals[i].loid==null){
//             newConfirmButton=confirmButton.cloneNode(true);
//             newLocalRow.querySelector("#confirmButtonContainer").append(newConfirmButton);
//         }
//         roomRowsContainer.append(newLocalRow);
//
//         convertAddressObjectToDOM(arrLocals[i].address);
//         fillElementAttributesFromObject("value", "#", newCollapsedAddressRow, arrLocals[i].address);
//
//         convertLocalObject(arrLocals[i]);
//         fillElementAttributesFromObject("value", "#", newLocalRow, arrLocals[i]);
//         fillElementAttributesFromObject("innerHTML", "#", newLocalRow, arrLocals[i]);
//
//         localRowsContainer.append(newLocalRow);
//         localRowsContainer.append(newCollapsedAddressRow);
//         localRowsContainer.append(newCollapsedRoomRow);
//     }
// }



function updateLocalRows() {

    console.log(arrLocals);

    let localRowsContainer = document.getElementById("localRowsContainer");

    localRowsContainer.innerHTML = "";

    for (let i = 0; i < arrLocals.length; i++) {

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
    fillElementAttributesFromObject("value", "#", newCollapsedAddressRow, local.address);

    convertLocalObject(local);
    fillElementAttributesFromObject("value", "#", newLocalRow, local);
    fillElementAttributesFromObject("innerHTML", "#", newLocalRow, local);

    container.append(newLocalRow);
    container.append(newCollapsedAddressRow);
    container.append(newCollapsedRoomRow);

    newLocalRow.local=local;
    newLocalRow.rooms=local.rooms;
    newLocalRow.roomRowsContainer=roomRowsContainer;
    newLocalRow.collapseAddress=newCollapsedAddressRow.querySelector("#collapseAddress");
    newLocalRow.collapseRoomRow=newCollapsedRoomRow.querySelector("#collapseRooms");
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

function createRoomRow(container,room){

    newRoomRow = emptyRoomRow.cloneNode(true);

    prepareUpdatableElement(room,newRoomRow);
    convertRoomObjectToDOM(room);
    fillElementAttributesFromObject("innerHTML", "#", newRoomRow, room);
    convertRoomObjectToAPI(room);
    fillElementAttributesFromObject("value", "#", newRoomRow, room);

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
    if((tmpElement=getFirstParent(element,"id","localRow"))==document.getElementsByTagName('body')[0]){

        if((tmpElement=getFirstParent(element,"id","roomRow"))!=document.getElementsByTagName('body')[0]){

        }
    }
    console.log(tmpElement);
}

//
// function skillsToAPI(url,element,method){
//
//     let request=new XMLHttpRequest();
//
//     let url=ffwApiUrl+"/skills/";
//
//     request.onreadystatechange=function(){
//
//         if(request.readyState==4){
//             console.log(skills.length);
//             console.log(counter);
//             if(method=="POST" && request.status==200){
//                 arrSkills[counter]=JSON.parse(request.responseText);
//             }
//             counter++;
//             if(counter==skills.length){
//                 changeSelectSkills();
//                 return counter;
//             }
//             skillsToAPI(skills,counter,skillsToAPI);
//         }
//     };
//
//     if(skills[counter].skid!=null){
//         url=url+skills[counter].skid;
//         method="PUT";
//     }
//     else{
//         method="POST";
//     }
//     request.open(method,url);
//
//     request.send(JSON.stringify(skills[counter]));
//
//
// }
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
    console.log(arrLocals);
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

    console.log(element.rooms);
    element.rooms.push(newRoom);
    createRoomRow(element.roomRowsContainer,newRoom);
}

function convertLocalObject(local){

    let quantity=0;
    if(local.rooms){
        for(let i=0 ; i<local.rooms.length;i++){
            if(local.rooms[i]){
                console.log(local.rooms[i].totalQuantity);
                quantity+= parseInt(local.rooms[i].totalQuantity);
            }
        }
    }

    console.log(quantity);
    local["totalQuantity"]=""+quantity+"";
}
function convertRoomObjectToDOM(room){

    let cvtArr=[
        "isUnavailable",
        "isStockroom"
    ];

    for(let i=0;i<cvtArr.length;i++){

        if(room[cvtArr[i]]==1){
            room[cvtArr[i]]="YES";
        }
        else{
            room[cvtArr[i]]="NO";
        }
    }
    room["totalQuantity"]=room.products&&room.products.length>0?room.products.length:"0";

}

function convertRoomObjectToAPI(room){
    let cvtArr=[
        "isUnavailable",
        "isStockroom"
    ];

    for(let i=0;i<cvtArr.length;i++){

        if(room[cvtArr[i]]=="YES"){
            room[cvtArr[i]]=1;
        }
        else{
            room[cvtArr[i]]=0;
        }
    }
    delete room["totalQuantity"];
}


function convertAddressObjectToDOM(addressObj){

    convertObject={
        street_number: "houseNumber",
        route: "streetAddress",
        locality: "cityName",
        postal_code: "cityCode",
        country: "country"
    }

    cvtObjectKey(convertObject,addressObj);

}

function convertAddressObjectToAPI(addressObj){

    convertObject={
        houseNumber: "street_number",
        streetAddress: "route",
        cityName: "locality",
        cityCode: "postal_code",
        country: "country"
    }

    cvtObjectKey(convertObject,addressObj);

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
// }
//
// function editUser(event){
//
//     let element=event.target;
//
//     while(element.id!=userRow" && element.tagName!="body"){
//         element=element.parentElement;
//     }
//     let user=element.user;
//     let tmpUser=JSON.parse(JSON.stringify(user));
//     let modal=document.getElementById("userModal");
//     let rightsList=document.getElementById("userRightsList");
//
//
//     modal.user=user;
//     modal.tmpUser=tmpUser;
//
//     tmpUser.rights=parseInt(tmpUser.rights,10);
//
//     fillElementAttributesFromObject("value","#",modal,tmpUser);
//
//     console.log(tmpUser.rights);
//     for(let i=0;i<rightsList.childNodes.length;i++){
//         if(rightsList.childNodes[i].classList){
//             rightsList.childNodes[i].classList.remove("active");
//             if((tmpUser.rights & (1<<rightsList.childNodes[i].id))!=0){
//                 rightsList.childNodes[i].classList.add("active");
//             }
//         }
//
//         rightsList.childNodes[i].addEventListener("click",updateRightsList,false);
//     }
//     updateUserSkillSelect(tmpUser.skills);
//     updateCompaniesTable(tmpUser.companies);
//
//     modalDisplay('userModal');
// }


// function updateSelectedStatus(){
//
//     tmpUser=document.getElementById("userModal").tmpUser;
//     let skillsSelectEditable=document.getElementById("skillsSelectEditable");
//     let skillsStatusSelectEditable=document.getElementById("skillsStatusSelectEditable");
//
//     let status;
//
//     for(let i=0 ; i<tmpUser.skills.length;i++){
//         if(skillsSelectEditable.options[skillsSelectEditable.selectedIndex].value===tmpUser.skills[i].skid){
//             status=tmpUser.skills[i].status;
//         }
//     }
//     for(let i=0 ;i < skillsStatusSelectEditable.options.length ; i++){
//         if(skillsStatusSelectEditable.options[i].value===status){
//             skillsStatusSelectEditable.options[i].selected=true;
//         }
//     }
// }

function changeQuantityOrder(){


}


// function updateCompaniesTable(companies){
//
//     let companiesTable=document.getElementById("companiesTable");
//     let newEmptyCompany=emptyLocalRow;
//
//     companiesTable.innerHTML="";
//
//     if(companies&&companies.length>0){
//
//         for(let i=0 ; i<companies.length ; i++){
//             console.log(companies[i]);
//             clonedCompany=newEmptyCompany.cloneNode(true);
//             fillElementAttributesFromObject("innerHTML","#",clonedCompany,companies[i]);
//             companiesTable.append(clonedCompany);
//         }
//     }
// }

// function updateUserSkillSelect(skills){
//
//     let skillsSelectEditable=document.getElementById("skillsSelectEditable");
//     let skillsStatusSelectEditable=document.getElementById("skillsStatusSelectEditable");
//
//     skillsSelectEditable.addEventListener("change",updateSelectedStatus,false);
//     skillsStatusSelectEditable.addEventListener("change",updateUserSkillStatus,false);
//
//     skillsSelectEditable.innerHTML="";
//
//     if(skills&&skills.length>0){
//         for(let i=0;i<skills.length;i++){
//             let option=document.createElement("option");
//             if(i===0){
//                 option.selected=true;
//             }
//             option.innerHTML=skills[i].name;
//             option.value=skills[i].skid;
//             skillsSelectEditable.append(option);
//         }
//         for(let i=0;i<skillsStatusSelectEditable.options.length; i++){
//             if(skillsStatusSelectEditable.options[i].value===skills[0].status){
//                 skillsStatusSelectEditable.options[i].selected=true;
//             }
//         }
//     }
//
// }
//
//
// function updateUser(){
//
//     let tmpUser=document.getElementById("userModal").tmpUser;
//
//     let userBody=JSON.parse(JSON.stringify(tmpUser));
//     delete userBody.companies;
//     delete userBody.address;
//     delete userBody.skills;
//
//     console.log(userBody);
//
//     if(tmpUser.skills){
//         updateUsersSkillAPI(tmpUser.uid,tmpUser.skills,0,updateUsersSkillAPI);
//     }
//
//     updateUserAPI(userBody);
//
// }
// function updateUsersSkillAPI(uid, skillBody, count, updateSkillAPI){
//
//     let request=new XMLHttpRequest();
//
//     request.onreadystatechange=function(){
//
//         if(request.readyState==4&&request.status==200){
//             console.log(request.responseText);
//             count++;
//             if(count<skillBody.length){
//                 updateSkillAPI(skillBody,count,updateSkillAPI)
//             }
//         }
//     };
//
//     let url=ffwApiUrl+"/users/"+uid+"/skills";
//     request.open("PUT",url);
//     request.send(JSON.stringify(body[count]));
//
// }
//
// function updateUserAPI(userBody){
//
//     let request=new XMLHttpRequest();
//
//     request.onreadystatechange=function(){
//
//         if(request.readyState==4&&request.status==200){
//             console.log(request.responseText);
//             findLocalsByFilter();
//         }
//     };
//
//     console.log(ffwApiUrl+"/users/"+userBody.uid);
//     let url=ffwApiUrl+"/users/"+userBody.uid;
//     console.log(JSON.stringify(userBody));
//     request.open("PUT",url);
//     request.send(JSON.stringify(userBody));
//
// }

