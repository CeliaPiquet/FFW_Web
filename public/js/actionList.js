//affichage de la modale en fonction de son idHTML
function modalDisplay(modalId){
    var container = document.getElementById("alertMessage");
    container.innerHTML = '';
    if (selectedProducts.length > 0 || modalId=="addModal"){
        $('#'+ modalId).modal({
            backdrop:false
        })
    }
    else {
        var message = document.createElement('p');
        message.innerHTML = "Il vous faut sélectionner au moins un produit";
        container.appendChild(message);
    }
}



//traitements
function changeRoom(){
    var request = new XMLHttpRequest();
    var idRoom = document.getElementById("roomChoice").value;

    request.onreadystatechange = function(){
        if(request.readyState === 4 && request.status === 200){
            document.location.reload(true);
        }
    }
    var url = "http://localhost:8080/FFW_API/api/products/transferRoom.php?room_id="+idRoom;
    request.open('PUT',url);
    request.send(JSON.stringify(selectedProducts));
}

function addProduct(){
    var form = document.forms["addProductForm"];
    var newProduct = [];
    var i = 0;
    while (i<form.length-1){
        newProduct.push(form.elements[i].value);
        i++;
    }
    console.log(newProduct);
}

function removeProduct(){
    var request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if(request.readyState === 4 && request.status === 200){
            document.location.reload(true);
        }
    }
    var url = "http://localhost:8080/FFW_API/api/products/remove.php";
    request.open('PUT',url);
    request.send(JSON.stringify(selectedProducts));
}