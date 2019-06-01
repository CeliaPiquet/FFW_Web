
var emptyUserSkill=(function(emptyUserSkill){

    parser=new DOMParser();
    emptyUserSkill=parser.parseFromString('' +
        '<div  class="list-group-item list-group-item-action " id="skillRow" >' +
            '<div  class="row align-items-center" >' +
                '<div class="col-md-10 mx-auto">' +
                    '<a id="skillContent" > </a>'+
                '</div>' +
                '<div class="col-md-2 mx-auto" id="removeButtonContainer">' +
                '</div>'+
            '</div>' +
        '</div>'
        ,
        'text/html').getElementsByTagName('div')[0];
    return emptyUserSkill;
});

var removeButtonSkill=(function(removeButtonSkill) {
    parser = new DOMParser();
    removeButtonSkill = parser.parseFromString(
        '<button id="removeSkill" class="btn" ><i class="far fa-times-circle h2 my-auto"></i></button>','text/html'
    ).getElementsByTagName('button')[0];
    return removeButtonSkill;
});

if(userSkills==null){
    userSkills=[];
}
updateMySkillsDisplay();
disableSkillOptions();


function disableSkillOptions(){

    let selectElement=document.getElementById("skillsSelect");

    for(i=0 ; i<selectElement.options.length ; i++){
        let switchFlag=0;
        for(j=0 ; j<userSkills.length ; j++){
            if(selectElement.options[i].value==userSkills[j].skid){
                switchFlag=1;
            }
        }
        if(switchFlag){
            selectElement.options[i].disabled=true;
        }
        else{
            selectElement.options[i].disabled=false;
        }
    }
    selectElement.selectedIndex=0;
}

function addSkill(){

    let selectElement=document.getElementById("skillsSelect");

    if(selectElement.selectedIndex!=0) {
        let title="Add : "+selectElement.options[selectElement.selectedIndex].innerHTML;
        let skid=skillBody.skid=selectElement.options[selectElement.selectedIndex].value;
        let name=skillBody.name=selectElement.options[selectElement.selectedIndex].innerHTML;
        prepareSkillModal("pending activate", title,skid,name);
    }

}

function removeSkill(event){

    let element=event.target;
    while(element.id!=="skillRow"&&element!==document.getElementsByTagName("body")[0]){
        element=element.parentElement;
    }
    let title="Delete : "+element.userSkill.name;
    let skid=element.userSkill.skid;
    let name=element.userSkill.name;
    prepareSkillModal("pending delete",title,skid,name);
}

function prepareSkillModal(status,title,skid,name){

    let selectElement=document.getElementById("skillsSelect");
    let modal=document.getElementById("skillModal")
    let modalTitle=modal.querySelector("h5[id='modalTitle'");
    let modalEmail=modal.querySelector("a[id='email']");

    skillBody=new Object();
    skillBody.status=status;
    skillBody.skid=skid;
    skillBody.name=name;
    modalTitle.innerHTML=title;
    modalEmail.setAttribute("href","mailto:"+user.email);
    modalEmail.innerHTML=user.email;
    modalDisplay("skillModal");


}

function skillAPI(method="POST"){

    let request=new XMLHttpRequest();
    var newSkill=skillBody;

    request.onreadystatechange=function(){

        if(request.readyState==4){
            console.log(request.status);
            if(request.status==200){
                let duplicateFlag=false;
                for(let i=0 ; i<userSkills.length;i++){
                    if(userSkills[i].skid==newSkill.skid){
                        userSkills[i]=newSkill;
                        duplicateFlag=true;
                    }
                }
                if(!duplicateFlag){
                    userSkills.push(newSkill);
                }
                newSkill=null;
                updateMySkillsDisplay();
                disableSkillOptions();
            }
            else{
                skillAPI("PUT");
            }
        }
    };

    let url="http://ffwapi.priv/users/"+user.uid+"/skills";
    request.open(method,url);
    request.send(JSON.stringify(skillBody));
}

function updateMySkillsDisplay(){

    console.log(userSkills);
    if(userSkills==null){
        return null;
    }
    let skillContainer=document.getElementById("skillsUserContainer");
    let clonedUserSkill=emptyUserSkill();
    let clonedRemoveButtonSkill=removeButtonSkill();

    console.log(clonedRemoveButtonSkill);

    skillContainer.innerHTML="";

    for(let i=0 ; i< userSkills.length;i++){
        if(userSkills[i].status!="refused") {
            let newUserSkill = clonedUserSkill.cloneNode(true);
            newUserSkill.userSkill=userSkills[i];
            let skillContent=newUserSkill.querySelector("a[id='skillContent']");
            let removeButtonContainer=newUserSkill.querySelector("div[id='removeButtonContainer']");

            if(userSkills[i].status!="pending delete"){
                let newRemoveButton=clonedRemoveButtonSkill.cloneNode(true);
                removeButtonContainer.append(newRemoveButton);
                newRemoveButton.addEventListener('click',removeSkill,false);
            }

            skillContent.innerHTML = userSkills[i].name;
            skillContent.name = userSkills[i].skid;
            if (userSkills[i].status == "pending activate") {
                skillContent.classList.add("text-warning");
                skillContent.innerHTML=skillContent.innerHTML+" (Pending activate)"
            }
            else if (userSkills[i].status == "pending delete") {
                skillContent.classList.add("text-warning");
                skillContent.innerHTML=skillContent.innerHTML+" (Pending delete)"
            }
            if (userSkills[i].status == "validated") {
                newUserSkill.classList.add("text-success");
                newUserSkill.addEventListener("click", switchActive, false);
            }
            skillContainer.append(newUserSkill);
        }
    }
}

function switchActive(event){

    let element=event.target;
    if(element.classList.contains("active")){
        element.classList.remove("active");
    }
    else{
        element.classList.add("active");
    }
}

