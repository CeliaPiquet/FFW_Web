
var arrSkills;

var emptySkillRow=document.createElement('tr');
emptySkillRow.class="align-items-center ";
emptySkillRow.scope="row";
emptySkillRow.id="skillRow";
emptySkillRow.innerHTML =
    '<td ">\n' +
        '<input type="text" class="form-control" id="name">\n'+
    '</td>\n' +
    '<td >\n' +
        '<button type="button" class="list-group-item list-group-item-action"  id="skStatus"></button>\n'+
    '</td>\n';




function openSkillsModal(){

    arrSkills=null;

    getSkillsAPI(0,20,"",getSkillsAPI);

    modalDisplay('skillsModal');
}

function prepareSkillModal(){

    let modal=document.getElementById("skillsModal");

}

function changeSelectSkills(){

    skillsSelects=document.getElementById("skillsSelect");

    skillsSelects.innerHTML="";

    console.log(arrSkills);

    for(let j=0; j<arrSkills.length+1; j++){

        if(j==0 || arrSkills[j].skStatus=="enabled"){

            let option=document.createElement("option");

            if(j==0){
                option.selected=true;
            }
            else if(arrSkills[j].skStatus=="enabled"){

                option.innerHTML=arrSkills[j-1].name;
                option.value=arrSkills[j-1].skid;
            }

            skillsSelects.append(option);
        }
    }
}

function showEnabledSkills(){

    document.getElementById("enabledSkills").classList.add("active");

    document.getElementById("disabledSkills").classList.remove("active");

    changeSkillsList("enabled");

}
function showDisabledSkills(){

    document.getElementById("enabledSkills").classList.remove("active");

    document.getElementById("disabledSkills").classList.add("active");

    changeSkillsList("disabled");

}

function changeSkillsList(status){

    console.log(arrSkills);
    console.log(status);

    let skillsTable=document.getElementById("skillsTable");

    skillsTable.innerHTML="";

    for(let i=0 ; i<arrSkills.length ; i++){

        console.log(arrSkills[i]);

        if(arrSkills[i].skStatus===status){
            let newSkillRow=emptySkillRow.cloneNode(true);


            let skillRowStatus=newSkillRow.querySelector("#skStatus");
            let skillName=newSkillRow.querySelector("#name");

            fillElementAttributesFromObject("value","#",newSkillRow,arrSkills[i]);
            if(arrSkills[i].skStatus=="enabled"){
                skillRowStatus.innerHTML="Disable";
                skillRowStatus.value="disabled";
            }
            else{
                skillRowStatus.innerHTML="Enable";
                skillRowStatus.value="enabled";

            }
            newSkillRow.skill=arrSkills[i];
            skillRowStatus.addEventListener('click',changeStatus,false);
            skillName.addEventListener('change',changeName,false);
            skillsTable.append(newSkillRow);
        }
    }




}

function changeStatus(event){

    element=getFirstParent(event.target,"id","skillRow");

    let status=element.skill.skStatus;
    element.skill.skStatus=event.target.value;

    changeSkillsList(status);

}

function changeName(event){

    element=getFirstParent(event.target,"id","skillRow");
    element.skill.name=event.target.value;
}



function getSkillsAPI(offset=0,limit=20,skStatus,getSkillsAPI){

    let request=new XMLHttpRequest();

    if(offset===0){
        arrSkills=null;
    }

    request.onreadystatechange=function(){

        if(request.readyState==4){
            if(request.status==200){
                let apiSkills=JSON.parse(request.responseText);

                if(apiSkills.length==limit){
                    apiSkills.concat(getSkillsAPI(offset,limit,skStatus,getSkillsAPI));
                }
                else if(offset>0){
                    return apiSkills;
                }
                else{
                    arrSkills=apiSkills;
                    changeSkillsList("enabled");
                }

            }
        }
    };

    let url=ffwApiUrl+"/skills?";
    let query="offset="+offset+"&limit="+limit+"&skStatus="+skStatus;

    for(let key in body){
        if(body[key]){
            query=query+"&"+key+"="+body[key];
        }
    }
    url+=query;
    request.open("GET",url);
    request.send();
}

function addSkill(){

    let skillsEdit=document.getElementById("skillEdit");
    let newSkill={
        skid:null,
        name:skillsEdit.value,
        skStatus:"enabled"
    };
    skillsEdit.value="";

    arrSkills.push(newSkill);

    changeSkillsList("enabled");

}

function updateSkills(){

    skillsToAPI(arrSkills,0,skillsToAPI);
}


function skillsToAPI(skills,counter,skillsToAPI){

    let request=new XMLHttpRequest();
    let method;
    let url=ffwApiUrl+"/skills/";

    request.onreadystatechange=function(){

        if(request.readyState==4){
            console.log(skills.length);
            console.log(counter);
            if(method=="POST" && request.status==200){
                arrSkills[counter]=JSON.parse(request.responseText);
            }
            counter++;
            if(counter==skills.length){
                changeSelectSkills();
                return counter;
            }
            skillsToAPI(skills,counter,skillsToAPI);
        }
    };

    if(skills[counter].skid!=null){
        url=url+skills[counter].skid;
        method="PUT";
    }
    else{
        method="POST";
    }
    request.open(method,url);

    request.send(JSON.stringify(skills[counter]));


}
