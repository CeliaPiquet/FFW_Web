var fullArray = [];

function changeProductRoom(){
    var selectedProducts = document.getElementsByClassName("select");
    var container = document.getElementById("alertMessage");
    container.innerHTML = '';
    fullArray = [];
    if (selectedProducts.length > 0){
        for(var i=0; i<selectedProducts.length; i++){
            if (!selectedProducts[i].classList.contains("articleLine")) {  //on élimine les articles pour garder les produits
                fullArray.push(selectedProducts[i]);
            }
        }
        if (fullArray.length > 0){
            createNextStep(fullArray);
        }
    }
    else {
        var message = document.createElement('p');
        message.innerHTML = "Il vous faut sélectionner au moins un produit";
        container.appendChild(message);
    }
}

function createNextStep(){
    var container = document.getElementById("newInputs");

    var formElement = document.createElement("form");
    formElement.setAttribute("formclass","col");
    formElement.setAttribute("method","post");
    formElement.setAttribute("action","addProductToRoom.php");
    container.appendChild(formElement);

    var label = document.createElement("label");
    label.setAttribute("for","newLocal");
    label.innerHTML = "Nouveau local :";
    formElement.appendChild(label);

    var input = document.createElement("input");
    input.setAttribute("required",true);
    input.setAttribute("type","text");
    input.setAttribute("class","form-control");
    input.setAttribute("id","newLocal");
    formElement.appendChild(input);
    
    var button = document.createElement("button");
    button.setAttribute("type","submit");
    button.setAttribute("class","form-control btn");
    button.innerHTML = "Valider";
    formElement.appendChild(button);
}