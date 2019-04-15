var fullLocalArray = [];
var fullRoomArray = [];

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

    request.onreadystatechange = function(){
        if(request.readyState === 4 && request.status === 200){
            fullLocalArray = JSON.parse(request.responseText);
            displayLocals(fullLocalArray);
        }
    }

    var url = "http://localhost:8080/FFW_API/api/locals/getAll.php";
    request.open('GET',url);
    request.send();
}

function getRoomByLocal(){    
    var local = document.getElementById("localFilter").value;
    for (var i=0; i<fullLocalArray.length; i++){
        if (fullLocalArray[i]['name']==local){
            var idLocal = fullLocalArray[i]['lo_id'];
        }
    }
    if (idLocal){
        var request = new XMLHttpRequest();
        
        request.onreadystatechange = function(){
            if(request.readyState === 4 && request.status === 200){
                fullRoomArray = JSON.parse(request.responseText);
                for (var i=0; i<fullRoomArray.length; i++){
                    if (fullRoomArray[i]['is_stockroom'] != "1"){
                        fullRoomArray.splice(i,1);
                    }
                }
                displayRooms(fullRoomArray);
                getProductByRoom();
            }
        }
    
        var url = "http://localhost:8080/FFW_API/api/locals/getRooms.php?local="+idLocal;
        request.open('GET',url);
        request.send();
    }
    else {
        document.getElementById("actionList").style.display = "none";
        fullRoomArray = [];
        displayRooms(fullRoomArray);
        displayArray([]);
    }
}

function displayLocals(array){
    var container = document.getElementById("localisationFilter");
    var noResult = document.getElementById("noResultLocals");
    container.innerHTML = '';
    noResult.innerHTML = '';
    if (array.length == 0){
        noResult.innerHTML = "Vide, aucun local trouvé";
    }
    else {
        var localchoiceList = document.createElement('select');
        var roomChoiceList = document.createElement('select');

        localchoiceList.setAttribute("class","col-md-6");
        localchoiceList.setAttribute("id","localFilter");
        
        roomChoiceList.setAttribute("class","col-md-6");
        roomChoiceList.setAttribute("id","roomFilter");
        
        container.appendChild(localchoiceList);
        container.appendChild(roomChoiceList)
        
        var option = document.createElement('option');
        option.innerHTML = 'Local';
        localchoiceList.appendChild(option);
        
        var option = document.createElement('option');
        option.innerHTML = 'Toutes les salles';
        roomChoiceList.appendChild(option);
        
        localchoiceList.setAttribute("onchange","getRoomByLocal()");
        roomChoiceList.setAttribute("onchange","getProductByRoom()");
        for (var i=0; i<array.length; i++){
            var option = document.createElement('option');
            option.innerHTML = array[i].name;
            localchoiceList.appendChild(option);
    
        }
    }
}

function getProductByRoom(){
    var room = document.getElementById("roomFilter").value;
    if (room == "Toutes les salles"){
        document.getElementById("actionList").style.display = "none";
        var roomIds = [];
        for (var  i=0; i<fullRoomArray.length; i++){
            if (! roomIds.includes(fullRoomArray[i]['r_id'])){
                roomIds.push(fullRoomArray[i]['r_id']);
            }
        }
        getMultipleFullArray(roomIds);
    }
    else {
        document.getElementById("actionList").style.display = "";
        for (var i=0; i<fullRoomArray.length; i++){
            if (fullRoomArray[i]['name']==room){
                var idRoom = fullRoomArray[i]['r_id'];
            }
        }
        if (idRoom){
            getFullArray(idRoom);
        }
    }
}

function displayRooms(array){
    var choiceList = document.getElementById("roomFilter");
    choiceList.innerHTML='';
    var option = document.createElement('option');
    option.innerHTML = 'Toutes les salles';
    choiceList.appendChild(option);
    for (var i=0; i<array.length; i++){
        var option = document.createElement('option');
        option.innerHTML = array[i].name;
        choiceList.appendChild(option);
    }
}