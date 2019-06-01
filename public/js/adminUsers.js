var userFindFlag=false;
var arrLocals;
var body;

var emptyUserRow=document.createElement('tr');
emptyUserRow.class="align-items-center";
emptyUserRow.id="userRow";
emptyUserRow.innerHTML ='<td id="userMail">\n' +
    '</td>\n' +
    '<td id="userLastname">\n' +
    '</td>\n' +
    '<td id="userFirstname">\n' +
    '</td>\n' +
    '<td id="userCity">\n' +
    '</td>\n' +
    '<td>\n' +
    '    <select type="text" class="form-control" id="userSkills"><option></option></select>\n' +
    '</td>\n' +
    '<td>\n' +
    '    <select type="text" class="form-control" id="userSkillsStatus"><option></option></select>\n' +
    '</td>\n' +
    '<td>\n' +
    '    <select type="text" class="form-control" id="userRights"><option></option></select>\n' +
    '</td>\n' +
    '<td>\n' +
    '    <a id="accountEdit" class="btn" ><i class="fas fa-pen h5 mx-auto my-auto"></i></a>'+
    '</td>\n' +
    '\n';

var emptyCompanyRow=document.createElement('tr');
emptyCompanyRow.class="align-items-center";
emptyCompanyRow.id="companyRow";
emptyCompanyRow.innerHTML =
    '<td id="name">\n' +
    '</td>\n' +
    '<td id="siret">\n' +
    '</td>\n' +
    '<td id="tel">\n' +
    '</td>\n';


function findusersByFilter(){

    body=new Object();
    let skillsSelect=document.getElementById("skillsSelect");
    let skillsStatusSelect=document.getElementById("skillsStatusSelect");
    let rightsSelect=document.getElementById("rightsSelect");
    console.log(skillsSelect);

    body.email=document.getElementById("mailInput").value;
    body.lastname= document.getElementById("lastnameInput").value;
    body.firstname= document.getElementById("firstnameInput").value;
    if(skillsSelect.options[skillsSelect.selectedIndex].value!==""){
        body.skill=skillsSelect.options[skillsSelect.selectedIndex].value;
    }
    if(skillsStatusSelect.options[skillsStatusSelect.selectedIndex].value!==""){
        body.status=skillsStatusSelect.options[skillsStatusSelect.selectedIndex].value;
    }
    if(rightsSelect.options[rightsSelect.selectedIndex].value!==""){
        body.rights=rightsSelect.options[rightsSelect.selectedIndex].value;
    }
    body.cityName=document.getElementById("cityInput").value

    searchUserAPI(0,20,searchUserAPI);
}

function searchUserAPI(offset=0,limit=20,searchUserAPI){

    let request=new XMLHttpRequest();

    if(offset===0){
        arrUser=null;
    }

    request.onreadystatechange=function(){

        if(request.readyState==4){
            if(request.status==200){
                console.log(request.responseText);
                let apiUsers=JSON.parse(request.responseText);

                if(apiUsers.length==limit){
                    apiUsers.concat(searchUserAPI(offset,limit,searchUserAPI));
                }
                else if(offset>0){
                    return apiUsers;
                }
                else{
                    arrLocals=apiUsers;
                    createUserRow();
                }

            }
        }
    };

    let url=ffwApiUrl+"/users?";
    let query="offset="+offset+"&limit="+limit;


    for(let key in body){
        if(body[key]){
            query=query+"&"+key+"="+body[key];
        }
    }
    url+=query;
    console.log(query);
    request.open("GET",url);
    console.log(JSON.stringify(body));
    request.send(JSON.stringify(body),false);

}


function createUserRow(){

    console.log(arrLocals);
    let rightsSelect=document.getElementById("rightsSelect");

    let userRowContainer=document.getElementById("userRowsContainer");

    userRowContainer.innerHTML="";

    for(let i=0 ; i< arrLocals.length ; i++){

        newLocalRow=emptyUserRow.cloneNode(true);
        newLocalRow.user=arrLocals[i];
        arrLocals[i].rights=!arrLocals[i].rights?2:arrLocals[i].rights;


        newLocalRow.querySelector("td[id='userMail']").innerHTML=arrLocals[i].email;
        newLocalRow.querySelector("td[id='userLastname']").innerHTML=arrLocals[i].lastname;
        newLocalRow.querySelector("td[id='userFirstname']").innerHTML=arrLocals[i].firstname;
        if(arrLocals[i].address){
            newLocalRow.querySelector("td[id='userCity']").innerHTML=arrLocals[i].address.cityName;
        }

        let selectSkills=newLocalRow.querySelector("select[id='userSkills']");
        let selectSkillsStatus=newLocalRow.querySelector("select[id='userSkillsStatus']");
        let selectRights=newLocalRow.querySelector("select[id='userRights']");
        newLocalRow.querySelector("a[id='accountEdit']").addEventListener("click",editUser,false);

        if(arrLocals[i].skills){
            let statusMap=new Map();
            for(let j=0; j<arrLocals[i].skills.length; j++){
                statusMap.set(arrLocals[i].skills[j].status,true);
                let option=document.createElement("option");
                if(arrLocals[i].skills[j].skid==body.skill){
                    option.selected=true;
                }
                option.innerHTML=arrLocals[i].skills[j].name;
                option.value=arrLocals[i].skills[j].skid;
                selectSkills.append(option);
            }
            for(let key of statusMap.keys()){
                let option=document.createElement("option");
                if(key===body.status){
                    option.selected=true;
                }
                option.value=key;
                option.innerHTML=ucFirst(key);
                selectSkillsStatus.append(option);
            }
        }

       for(let j=0;j<rightsSelect.options.length;j++){

            if((arrLocals[i].rights & (1<<rightsSelect.options[j].value))!=0){
                let option=document.createElement("option");
                if(arrLocals[i].rights===body.skill){
                    option.selected=true;
                }
                option.innerHTML=rightsSelect.options[j].innerHTML;
                option.value=rightsSelect.options[j].value;
                selectRights.append(option);
            }
        }
        userRowContainer.append(newLocalRow);

    }
}

function editUser(event){

    let element=event.target;

    while(element.id!="userRow" && element.tagName!="body"){
        element=element.parentElement;
    }
    let user=element.user;
    let tmpUser=JSON.parse(JSON.stringify(user));
    let modal=document.getElementById("userModal");
    let rightsList=document.getElementById("userRightsList");


    modal.user=user;
    modal.tmpUser=tmpUser;

    tmpUser.rights=parseInt(tmpUser.rights,10);

    fillElementAttributesFromObject("value","#",modal,tmpUser);

    console.log(tmpUser.rights);
    for(let i=0;i<rightsList.childNodes.length;i++){
        if(rightsList.childNodes[i].classList){
            rightsList.childNodes[i].classList.remove("active");
            if((tmpUser.rights & (1<<rightsList.childNodes[i].id))!=0){
                rightsList.childNodes[i].classList.add("active");
            }
        }

        rightsList.childNodes[i].addEventListener("click",updateRightsList,false);
    }
    updateUserSkillSelect(tmpUser.skills);
    updateCompaniesTable(tmpUser.companies);

    modalDisplay('userModal');
}


function updateSelectedStatus(){

    tmpUser=document.getElementById("userModal").tmpUser;
    let skillsSelectEditable=document.getElementById("skillsSelectEditable");
    let skillsStatusSelectEditable=document.getElementById("skillsStatusSelectEditable");

    let status;

    for(let i=0 ; i<tmpUser.skills.length;i++){
        if(skillsSelectEditable.options[skillsSelectEditable.selectedIndex].value===tmpUser.skills[i].skid){
            status=tmpUser.skills[i].status;
        }
    }
    for(let i=0 ;i < skillsStatusSelectEditable.options.length ; i++){
        if(skillsStatusSelectEditable.options[i].value===status){
            skillsStatusSelectEditable.options[i].selected=true;
        }
    }
}

function updateRightsList(event){

    rightItem=event.target;
    tmpUser=document.getElementById("userModal").tmpUser;


    if(rightItem.classList.contains("active")){
        rightItem.classList.remove("active");
        tmpUser.rights-=Math.pow(2,rightItem.id);
    }
    else{
        tmpUser.rights+=Math.pow(2,rightItem.id);
        rightItem.classList.add("active");
    }
    console.log(tmpUser.rights);


}

function updateUserSkillStatus(){

    tmpUser=document.getElementById("userModal").tmpUser;
    let skillsSelectEditable=document.getElementById("skillsSelectEditable");
    let skillsStatusSelectEditable=document.getElementById("skillsStatusSelectEditable");


    for(let i=0 ; i<tmpUser.skills.length;i++){
        if(skillsSelectEditable.options[skillsSelectEditable.selectedIndex].value===tmpUser.skills[i].skid){
           tmpUser.skills[i].status=skillsStatusSelectEditable.options[skillsStatusSelectEditable.selectedIndex].value;
        }
    }
}

function updateCompaniesTable(companies){

    let companiesTable=document.getElementById("companiesTable");
    let newEmptyCompany=emptyCompanyRow;

    companiesTable.innerHTML="";

    if(companies&&companies.length>0){

        for(let i=0 ; i<companies.length ; i++){
            console.log(companies[i]);
            clonedCompany=newEmptyCompany.cloneNode(true);
            fillElementAttributesFromObject("innerHTML","#",clonedCompany,companies[i]);
            companiesTable.append(clonedCompany);
        }
    }
}

function updateUserSkillSelect(skills){

    let skillsSelectEditable=document.getElementById("skillsSelectEditable");
    let skillsStatusSelectEditable=document.getElementById("skillsStatusSelectEditable");

    skillsSelectEditable.addEventListener("change",updateSelectedStatus,false);
    skillsStatusSelectEditable.addEventListener("change",updateUserSkillStatus,false);

    skillsSelectEditable.innerHTML="";

    if(skills&&skills.length>0){
        for(let i=0;i<skills.length;i++){
            let option=document.createElement("option");
            if(i===0){
                option.selected=true;
            }
            option.innerHTML=skills[i].name;
            option.value=skills[i].skid;
            skillsSelectEditable.append(option);
        }
        for(let i=0;i<skillsStatusSelectEditable.options.length; i++){
            if(skillsStatusSelectEditable.options[i].value===skills[0].status){
                skillsStatusSelectEditable.options[i].selected=true;
            }
        }
    }

}


function updateUser(){

    let tmpUser=document.getElementById("userModal").tmpUser;

    let userBody=JSON.parse(JSON.stringify(tmpUser));
    delete userBody.companies;
    delete userBody.address;
    delete userBody.skills;

    console.log(userBody);

    if(tmpUser.skills){
        updateUsersSkillAPI(tmpUser.uid,tmpUser.skills,0,updateUsersSkillAPI);
    }

    updateUserAPI(userBody);

}
function updateUsersSkillAPI(uid, skillBody, count, updateSkillAPI){

    let request=new XMLHttpRequest();

    request.onreadystatechange=function(){

        if(request.readyState==4&&request.status==200){
            console.log(request.responseText);
            count++;
            if(count<skillBody.length){
                updateSkillAPI(skillBody,count,updateSkillAPI)
            }
        }
    };

    let url=ffwApiUrl+"/users/"+uid+"/skills";
    request.open("PUT",url);
    request.send(JSON.stringify(body[count]));

}

function updateUserAPI(userBody){

    let request=new XMLHttpRequest();

    request.onreadystatechange=function(){

        if(request.readyState==4&&request.status==200){
            console.log(request.responseText);
            findusersByFilter();
        }
    };

    console.log(ffwApiUrl+"/users/"+userBody.uid);
    let url=ffwApiUrl+"/users/"+userBody.uid;
    console.log(JSON.stringify(userBody));
    request.open("PUT",url);
    request.send(JSON.stringify(userBody));

}