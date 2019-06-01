var userFindFlag=false;
var arrLocals;
var body;


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
                    createLocalRow();
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


function createLocalRow() {

    console.log(arrLocals);
    convertLocalObject(arrLocals);

    let localRowsContainer = document.getElementById("localRowsContainer");

    localRowsContainer.innerHTML = "";

    for (let i = 0; i < arrLocals.length; i++) {

        newLocalRow = emptyLocalsRow.localRow.cloneNode(true);
        newCollapsedAddressRow = emptyLocalsRow.collapsedAddressRow.cloneNode(true);
        newCollapsedRoomRow = emptyLocalsRow.collapsedRoomRow.cloneNode(true);

        fillElementAttributesFromObject("innerHTML", "#", newCollapsedAddressRow, arrLocals[i]);

        let roomRowsContainer = newCollapsedRoomRow.querySelector("#roomsContainer");

        for(let j = 0 ; j<arrLocals[i].rooms.length ; j++){
            newRoomRow = emptyRoomRow.cloneNode(true);
            fillElementAttributesFromObject("innerHTML", "#", newRoomRow, arrLocals[i].rooms[j]);
            fillElementAttributesFromObject("value", "#", newRoomRow, arrLocals[i].rooms[j]);
            roomRowsContainer.append(newRoomRow);
        }

        localRowsContainer.append(newLocalRow);
        localRowsContainer.append(newCollapsedAddressRow);
        localRowsContainer.append(newCollapsedRoomRow);
    }
}

function convertLocalObject(localsArr){

    for(let i = 0 ; i<localsArr.length ; i++){

        let rooms = localsArr[i].rooms;
        for(let j=0 ; j < localsArr[i].rooms.length ; j++){


        }


    }
}

function convertAddressObject(addressObj){

    convertObject={
        street_number: "houseNumber",
        route: "streetAddress",
        locality: "cityName",
        postal_code: "cityCode",
        country: "country"
    }

    for(let addKey in addressObj){

        for(let cvtKey in convertObject){

            if(cvtKey==addKey){
                addressObj.delte()
            }

        }
    }


}
// }
//
// function editUser(event){
//
//     let element=event.target;
//
//     while(element.id!="userRow" && element.tagName!="body"){
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



var emptyLocalsRow={
    "localRow":document.createElement('tr'),
    "collapsedAddressRow":document.createElement('tr'),
    "collapsedRoomRow":document.createElement('tr')
};


emptyLocalsRow.localRow.class="align-items-center";
emptyLocalsRow.localRow.id="collapsedRoomRow";
emptyLocalsRow.localRow.innerHTML =
    '<td>\n' +
    '    <input type="text" class="form-control"  id="nameInput" >\n' +
    '</td>\n' +
    '<td>\n' +
    '    <input type="text" class="form-control" id="cityNameInput" >\n' +
    '</td>\n' +
    '<td>\n' +
    '    <button class="btn col-md-2 mx-auto" type="button" data-toggle="collapse" data-target="#collapseAddress" aria-expanded="false" aria-controls="collapseAddress">Address</button>\n' +
    '</td>\n' +
    '<td>\n' +
    '    <button class="btn col-md-2 mx-auto" type="button" data-toggle="collapse" data-target="#collapseRooms" aria-expanded="false" aria-controls="collapseExample">Rooms</button>\n' +
    '</td>\n' +
    '<td>\n' +
    '    <div class="alert alert-dark">Total quantity : <span id="totalQuantity"></span></div>\n' +
    '</td>\n';

emptyLocalsRow.collapsedAddressRow.class="align-items-center";
emptyLocalsRow.collapsedAddressRow.id="collapsedAddressRow";
emptyLocalsRow.collapsedAddressRow.innerHTML =
    '<td colspan="5">\n' +
    '    <div class="collapse my-auto" id="collapseAddress">\n' +
    '        <div class="col-md-12 mx-auto py-3 visible" id="addressForm">\n' +
    '            <div class="form-group row col-md-11 mx-auto">\n' +
    '                <label for="autocomplete">Address</label>\n' +
    '                <input type="text" class="form-control" name="autocomplete" " >\n' +
    '            </div>\n' +
    '            <div class="form-group row col-md-11 mx-auto">\n' +
    '                <div class="col-md-3 mx-auto">\n' +
    '                    <label for="street_number">Numéro</label>\n' +
    '                    <input type="text" class="form-control mx-auto" id="street_number" name="houseNumber" placeholder="Numéro" required disabled>\n' +
    '                </div>\n' +
    '                <div class="col-md-9 mx-auto">\n' +
    '                    <label for="route" >Addresse</label>\n' +
    '                    <input type="text" class="form-control mx-auto" id="route" name="streetAddress" placeholder="Adresse" required disabled>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="form-group row col-md-11 mx-auto">\n' +
    '                <div class="form-group col-md-7">\n' +
    '                    <label for="complement">Complement</label>\n' +
    '                    <input type="text" id="complement" class="form-control mx-auto" name="complement" placeholder="Complement" required>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="form-group row col-md-11  mx-auto">\n' +
    '                <div class="form-group col-md-4">\n' +
    '                    <label for="locality" >Ville</label>\n' +
    '                    <input type="text" class="form-control mx-auto" id="locality" name="cityName" required disabled>\n' +
    '                </div>\n' +
    '                <div class="form-group col-md-3">\n' +
    '                    <label for="postal_code" >Code postal</label>\n' +
    '                    <input type="text" class="form-control mx-auto" name="cityCode" id="postal_code" required disabled>\n' +
    '                </div>\n' +
    '                <div class="form-group col-md-3 ">\n' +
    '                    <label for="country">Pays</label>\n' +
    '                    <select id="country" name="country" class="form-control mx-auto" required disabled>\n' +
    '                        <option value="france" selected>France</option>\n' +
    '                        <option value="italie">Italie</option>\n' +
    '                        <option value="portugal">Portugal</option>\n' +
    '                        <option value="irlande">Irlande</option>\n' +
    '                    </select>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</td>\n';

emptyLocalsRow.collapsedRoomRow.class="align-items-center";
emptyLocalsRow.collapsedRoomRow.id="collapsedRoomRow";
emptyLocalsRow.collapsedRoomRow.innerHTML =
    '<td colspan="5">\n' +
    '    <div class="collapse my-auto" id="collapseRooms">\n' +
    '        <table class="table table-striped table-hover " id="roomsTable">\n' +
    '            <thead>\n' +
    '            <tr>\n' +
    '                <th> Name </th>\n' +
    '                <th> Avalability </th>\n' +
    '                <th> Is stockroom </th>\n' +
    '                <th> Total quantity </th>\n' +
    '            </tr>\n' +
    '            </thead>\n' +
    '            <tbody id="roomsContainer">\n' +
    '            \n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '    </div>\n' +
    '</td>';

var emptyRoomRow=document.createElement('tr');
emptyRoomRow.class="align-items-center";
emptyRoomRow.id="roomRow";
emptyRoomRow.innerHTML =
    '<td>\n' +
    '    <input type="text" class="form-control"  id="name" placeholder="Name">\n' +
    '</td>\n' +
    '<td>\n' +
    '    <button type="button" class="list-group-item list-group-item-action text-center"  id="isUnavailable">Yes</button>\n' +
    '</td>\n' +
    '<td>\n' +
    '    <button type="button" class="list-group-item list-group-item-action text-center"  id="isStockroom">Yes</button>\n' +
    '</td>\n' +
    '<td>\n' +
    '    <div class="alert alert-dark">Total quantity : <span id="totalQuantity"></span></div>\n' +
    '</td>';
