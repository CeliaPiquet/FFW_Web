var fullLocalArray = [];
var fullRoomArray = [];
var selectedRoomIdForTransfer=[];
var isLocalRequestComplete = false;
var isRoomRequestComplete = false; 

function getRoomById($roomId){
    for (var i=0; i<fullRoomArray.length; i++){
        if (fullRoomArray[i]['rid'] == $roomId){
            return fullRoomArray[i];
        }
    }
    return null;
}

function getFullLocals(){
    var containers = document.getElementsByClassName("localisationList");
    fullLocalArray = [];
    getPageOfLocals(0, containers);
}
        
function getPageOfLocals(offset, containers) {
    localArray = [];
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === 4 && request.status === 200){
            localArray = JSON.parse(request.responseText);
            fullLocalArray = fullLocalArray.concat(localArray);
            if(localArray.length == 20){
                getPageOfLocals(offset+20);
            }
            else {
                var containers = document.getElementsByClassName("localisationList");
                for(var i=0; i<containers.length; i++){
                    displayLocals(fullLocalArray, containers[i]);
                }
            }
        }
    }

    var url = ffwApiUrl+"/locals?offset=" + offset + "&limit=20" ;
    request.open('GET',url);
    request.send();
}

function getRoomByLocal(localListId){  
    var local = document.getElementById(localListId).value;
    var roomListId = "roomFilter";
    fullRoomArray = [];
    fullProductsArray = [];
    if (localListId == "localChoice"){
        roomListId = "roomChoice";
    }
    for (var i=0; i<fullLocalArray.length; i++){
        if (fullLocalArray[i]['name']==local){
            var idLocal = fullLocalArray[i]['loid'];
        }
    }
    if (idLocal){
        getPageOfRooms(idLocal, 0, roomListId, localListId);
    }
    else {
        document.getElementById("actionList").style.display = "none";
        fullRoomArray = [];
        displayRooms(fullRoomArray,roomListId);
        displayFullProductsArray();
    }
}

function keepStockRoom(){
    var i=0;
        while (i<fullRoomArray.length){
            if (fullRoomArray[i]['isStockroom'] != "1"){
                fullRoomArray.splice(i,1);
            }
            else {
                i ++;
            }
        }
}

function getPageOfRooms(idLocal, offset, roomListId, localListId){
    var roomArray = [];
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === 4 && request.status === 200){
            roomArray = JSON.parse(request.responseText);
            fullRoomArray = fullRoomArray.concat(roomArray);

            if(roomArray.length == 20){ //il existe encore des rooms à rappeler
                getPageOfRooms(idLocal, offset+20);
            } 
            
            else { //si tout a été chargé on peut appeler les fonctions suivantes
                keepStockRoom();
                displayRooms(fullRoomArray,roomListId);
                if (localListId =="localFilter"){
                    getProductByRoom();
                }
            }
        }
    }
    var url = ffwApiUrl+"/locals/"+idLocal+"/rooms?offset=" + offset + "&limit=20";
    request.open('GET',url);
    request.send();
}

function displayLocals(array, containerTarget){
    var container = containerTarget;
    var noResult = document.getElementById("noResultLocals");
    container.innerHTML = '';
    noResult.innerHTML = '';
    if (array.length == 0){
        noResult.setAttribute("class","visible");
        noResult.innerHTML = "Vide, aucun adminlocals trouvé";
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
    fullProductsArray = [];
    
    var idRoom = document.getElementById("roomFilter").value;
    if (idRoom == "Toutes les salles"){
        document.getElementById("actionList").style.display = "none";
        var roomIds = [];
        for (var  i=0; i<fullRoomArray.length; i++){
            if (! roomIds.includes(fullRoomArray[i]['rid'])){
                roomIds.push(fullRoomArray[i]['rid']);
            }
        }
        getMultiplefullProductsArray(roomIds,0); //on veut afficher le contenu de toutes les rooms d'un adminlocals
    }
    else {
        document.getElementById("actionList").style.display = "";
        getfullProductsArray(idRoom,0);
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
        option.setAttribute("value",array[i].rid);
        option.innerHTML = array[i].name;
        choiceList.appendChild(option);
    }
}