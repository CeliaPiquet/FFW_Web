var fullLocalArray = [];
var fullRoomArray = [];
var selectedRoomIdForTransfer=[];

function getRoomById($roomId){
    for (var i=0; i<fullRoomArray.length; i++){
        if (fullRoomArray[i]['r_id'] == $roomId){
            return fullRoomArray[i];
        }
    }
    return null;
}

function getFullLocals(){
    var request = new XMLHttpRequest();
    var containers = document.getElementsByClassName("localisationList");
    request.onreadystatechange = function(){
        if(request.readyState === 4 && request.status === 200){
            fullLocalArray = JSON.parse(request.responseText);
            for(var i=0; i<containers.length; i++){
                displayLocals(fullLocalArray, containers[i]);
            }
        }
    }

    var url = "http://localhost:8080/FFW_API/api/locals/getAll.php";
    request.open('GET',url);
    request.send();
}

function getRoomByLocal(localListId){    
    var local = document.getElementById(localListId).value;
    var roomListId = "roomFilter";
    if (localListId == "localChoice"){
        roomListId = "roomChoice";
    }
    for (var i=0; i<fullLocalArray.length; i++){
        if (fullLocalArray[i]['name']==local){
            var idLocal = fullLocalArray[i]['lo_id'];
        }
    }
    if (idLocal){
        var request = new XMLHttpRequest();
        var i = 0;
        request.onreadystatechange = function(){
            if(request.readyState === 4 && request.status === 200){
                fullRoomArray = JSON.parse(request.responseText);
                while (i<fullRoomArray.length){
                    if (fullRoomArray[i]['is_stockroom'] != "1"){
                        fullRoomArray.splice(i,1);
                    }
                    else {
                        i ++;
                    }
                }
                displayRooms(fullRoomArray,roomListId);
                if (localListId =="localFilter"){
                    getProductByRoom();
                }
            }
        }
    
        var url = "http://localhost:8080/FFW_API/api/locals/getRooms.php?local="+idLocal;
        request.open('GET',url);
        request.send();
    }
    else {
        document.getElementById("actionList").style.display = "none";
        fullRoomArray = [];
        displayRooms(fullRoomArray,roomListId);
        displayArray([]);
    }
}

function displayLocals(array, containerTarget){
    var container = containerTarget;
    var noResult = document.getElementById("noResultLocals");
    container.innerHTML = '';
    noResult.innerHTML = '';
    if (array.length == 0){
        noResult.innerHTML = "Vide, aucun local trouvé";
    }
    else {
        var localchoiceList = document.createElement('select');
        var roomChoiceList = document.createElement('select');
        
        container.appendChild(localchoiceList);
        container.appendChild(roomChoiceList)
        
        var option = document.createElement('option');
        option.innerHTML = 'Local';
        localchoiceList.appendChild(option);
        
        var option = document.createElement('option');
        option.innerHTML = 'Toutes les salles';
        roomChoiceList.appendChild(option);
        
        localchoiceList.setAttribute("class","col-md-6");
        roomChoiceList.setAttribute("class","col-md-6");

        if (containerTarget.id == "localisationFilter"){
            localchoiceList.setAttribute("onchange","getRoomByLocal('localFilter')");
            roomChoiceList.setAttribute("onchange","getProductByRoom()");
            
            localchoiceList.setAttribute("id","localFilter");
            roomChoiceList.setAttribute("id","roomFilter");
        }

        else {
            localchoiceList.setAttribute("onchange","getRoomByLocal('localChoice')");
            localchoiceList.setAttribute("id","localChoice");
            roomChoiceList.setAttribute("id","roomChoice");
        }

        for (var i=0; i<array.length; i++){
            var option = document.createElement('option');
            option.innerHTML = array[i].name;
            localchoiceList.appendChild(option);
    
        }
    }
}

function getProductByRoom(){
    var idRoom = document.getElementById("roomFilter").value;
    if (idRoom == "Toutes les salles"){
        document.getElementById("actionList").style.display = "none";
        var roomIds = [];
        for (var  i=0; i<fullRoomArray.length; i++){
            if (! roomIds.includes(fullRoomArray[i]['r_id'])){
                roomIds.push(fullRoomArray[i]['r_id']);
            }
        }
        getMultipleFullArray(roomIds); //on veut afficher le contenu de toutes les rooms d'un local
    }
    else {
        document.getElementById("actionList").style.display = "";
        getFullArray(idRoom);
    }
}


function displayRooms(array, roomListId){
    var choiceList = document.getElementById(roomListId);
    choiceList.innerHTML='';
    var option = document.createElement('option');
    option.innerHTML = 'Toutes les salles';
    choiceList.appendChild(option);
    for (var i=0; i<array.length; i++){
        var option = document.createElement('option');
        option.setAttribute("value",array[i].r_id);
        option.innerHTML = array[i].name;
        choiceList.appendChild(option);
    }
}