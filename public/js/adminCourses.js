var arrCourses;
var emptyBasketRow;
var emptyCourseRow;
var emptyCollapsedAddressRow;



loadExternalDOMElement([
    {url:websiteRoot+"/adminCourses/basketRow",func:getEmptyBasketRow},
    {url:websiteRoot+"/adminCourses/courseRow",func:getEmptyCourseRow},
    {url:websiteRoot+"/adminCourses/collapsedAddressRow",func:getCollapsedAddressRow}
]);



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

function updateCourseRows(element){

    console.log(element);
}




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

function getCollapsedAddressRow(domText){
    emptyCollapsedAddressRow.class="align-items-center";
    emptyCollapsedAddressRow.id="collapsedAddressRow";
    emptyCollapsedAddressRow.innerHTML =domText;
}

// searchCourseAPI(0,20,searchCourseAPI);

//
// function findusersByFilter(){
//
//     body=new Object();
//     let skillsSelect=document.getElementById("skillsSelect");
//     let skillsStatusSelect=document.getElementById("skillsStatusSelect");
//     let rightsSelect=document.getElementById("rightsSelect");
//     console.log(skillsSelect);
//
//     body.email=document.getElementById("mailInput").value;
//     body.lastname= document.getElementById("lastnameInput").value;
//     body.firstname= document.getElementById("firstnameInput").value;
//     if(skillsSelect.options[skillsSelect.selectedIndex].value!==""){
//         body.skill=skillsSelect.options[skillsSelect.selectedIndex].value;
//     }
//     if(skillsStatusSelect.options[skillsStatusSelect.selectedIndex].value!==""){
//         body.status=skillsStatusSelect.options[skillsStatusSelect.selectedIndex].value;
//     }
//     if(rightsSelect.options[rightsSelect.selectedIndex].value!==""){
//         body.rights=rightsSelect.options[rightsSelect.selectedIndex].value;
//     }
//     body.cityName=document.getElementById("cityInput").value
//
//     searchUserAPI(0,20,searchUserAPI);
// }
//
// function searchCourseAPI(offset=0,limit=20,searchCourseAPI){
//
//
//     // temporary
//         body=new Object();
//
//
//     let request=new XMLHttpRequest();
//
//     if(offset===0){
//         arrUser=null;
//     }
//
//     request.onreadystatechange=function(){
//
//         if(request.readyState==4){
//             if(request.status==200){
//                 console.log(request.responseText);
//                 let apiCourses=JSON.parse(request.responseText);
//
//                 if(apiCourses.length==limit){
//                     apiCourses.concat(searchCourseAPI(offset,limit,searchCourseAPI));
//                 }
//                 else if(offset>0){
//                     return apiCourses;
//                 }
//                 else{
//                     arrCourses=apiCourses;
//                     createCourseRow();
//                 }
//
//             }
//         }
//     };
//
//     let url=ffwApiUrl+"/courses?";
//     let query="offset="+offset+"&limit="+limit;
//
//
//     for(let key in body){
//         if(body[key]){
//             query=query+"&"+key+"="+body[key];
//         }
//     }
//     url+=query;
//     console.log(query);
//     request.open("GET",url);
//     console.log(JSON.stringify(body));
//     request.send(JSON.stringify(body),false);
//
// }


function createCourseRow(args, element){

    arrCourses=element;
    let courseRowContainer=document.getElementById("coursesRowsContainer");

    courseRowContainer.innerHTML="";

    for(let i=0 ; i< arrCourses.length ; i++){

        newCourseRow=emptyCourseRow.cloneNode(true);
        newCourseRow.service=arrCourses[i];

        // if (newLocalRow.service.createTime) {
        //     newLocalRow.service.createTime = newLocalRow.service.createTime.toLocaleString();
        // }


        matchDOMAndObject('innerHTML', '#', newCourseRow, arrCourses[i]);

        //
        // newLocalRow.querySelector("td[id='courseName']").innerHTML=arrCourses[i].name;
        // newLocalRow.querySelector("td[id='courseDescription']").innerHTML=arrCourses[i].description;
        // newLocalRow.querySelector("td[id='createDate']").innerHTML=arrCourses[i].createDate;
        //
        //
        // if(arrCourses[i].courseDate) {
        //     newLocalRow.querySelector("td[id='courseDate']").innerHTML=arrCourses[i].courseDate;
        // }
        // if(arrCourses[i].vehicle) {
        //     newLocalRow.querySelector("td[id='vehicleName']").innerHTML=arrCourses[i].vehicle.name;
        // }

        // let selectSkills=newLocalRow.querySelector("select[id='createDate']");
        // let selectSkillsStatus=newLocalRow.querySelector("select[id='userSkillsStatus']");
        // let selectRights=newLocalRow.querySelector("select[id='userRights']");

        // newLocalRow.querySelector("a[id='accountEdit']").addEventListener("click",editUser,false);

        // if(arrCourses[i].skills){
        //     let statusMap=new Map();
        //     for(let j=0; j<arrCourses[i].skills.length; j++){
        //         statusMap.set(arrCourses[i].skills[j].status,true);
        //         let option=document.createElement("option");
        //         if(arrCourses[i].skills[j].skid==body.skill){
        //             option.selected=true;
        //         }
        //         option.innerHTML=arrCourses[i].skills[j].name;
        //         option.value=arrCourses[i].skills[j].skid;
        //         selectSkills.append(option);
        //     }
        //     for(let key of statusMap.keys()){
        //         let option=document.createElement("option");
        //         if(key===body.status){
        //             option.selected=true;
        //         }
        //         option.value=key;
        //         option.innerHTML=ucFirst(key);
        //         selectSkillsStatus.append(option);
        //     }
        // }

        // for(let j=0;j<rightsSelect.options.length;j++){
        //
        //     if((arrCourses[i].rights & (1<<rightsSelect.options[j].value))!=0){
        //         let option=document.createElement("option");
        //         if(arrCourses[i].rights===body.skill){
        //             option.selected=true;
        //         }
        //         option.innerHTML=rightsSelect.options[j].innerHTML;
        //         option.value=rightsSelect.options[j].value;
        //         selectRights.append(option);
        //     }
        // }


        courseRowContainer.append(newCourseRow);

    }
}
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
//     matchDOMAndObject("value","#",modal,tmpUser);
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

//
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



function openNewCourseModal(){

    arrBaskets=[];

    console.log(arrBaskets);

    let url = ffwApiUrl + "/baskets/status";

    args={
        query:{
            offset:0,
            limit:20,
            status:"VALIDATED"
        }
    };
    exchangeToAPI(url, arrBaskets, "GET", changeBasketsList, args );
    modalDisplay('courseModal');
}


function changeBasketsList(args, element){



    let basketsTable=document.getElementById("basketRowsContainer");

    basketsTable.innerHTML="";

    console.log(element);

    arrBaskets = element;

    for(let i=0 ; i<arrBaskets.length ; i++){


        // if(arrBaskets[i].skStatus===status){
            let newBasketRow=emptyBasketRow.cloneNode(true);


            // let skillRowStatus=newBasketRow.querySelector("#skStatus");
            // let basketRowEntityName=newBasketRow.querySelector("#entityName");

            matchDOMAndObject("innerHTML","#",newBasketRow,arrBaskets[i]);

            let addBasketButton=document.createElement("button");

            if (basketsInCourse.find(function(element) {return element == arrBaskets[i];}) ) {
                addBasketButton.innerHTML = "Ajouté";
                addBasketButton.addEventListener(addBasketButton, "onClick", withdrawBasketFromCourse(arrBaskets[i]));
            } else {
                addBasketButton.innerHTML = "Ajouter";
                addBasketButton.addEventListener(addBasketButton, "onClick", addBasketToCourse(arrBaskets[i]));
            }

            newBasketRow.append(addBasketButton);




            // if(arrBaskets[i].role=="import"){
            //     newBasketRow.style("background-color: red");
            // }
            // else{
            //     newBasketRow.style("background-color: blue");
            // }
            // newBasketRow.skill=arrSkills[i];
            // skillRowStatus.addEventListener('click',changeStatus,false);
            // skillName.addEventListener('change',changeName,false);
            // basketsTable.append(newSkillRow);
        // }

        basketsTable.append(newBasketRow);
    }

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
