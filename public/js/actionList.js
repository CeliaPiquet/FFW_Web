var isArticleExisting=false;

//affichage de la modale en fonction de son idHTML
function modalDisplay(modalId){
    var container = document.getElementById("alertMessage");
    container.innerHTML = '';
    if (selectedProducts.length > 0 || modalId == "addProduct" || modalId == "successModal"){
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

function checkArticle(){
    var nameArticlePlacement = document.getElementById("articleNamePlacement");
    var idArticle = document.forms['addProductForm'].elements[0].value;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === 4 && request.status === 200){
            isArticleExisting = true;
            var article = JSON.parse(request.responseText);
            nameArticlePlacement.innerHTML = article["name"];
        }
        else if(request.readyState === 4){
            isArticleExisting = false;
            nameArticlePlacement.innerHTML = "Aucun article correspondant";
        }
    }
    var url = ffwApiUrl+"/articles/"+idArticle;
    request.open('GET',url);
    request.send();
}

//traitements
function changeRoom(){

    console.log(selectedProducts);

    var request = new XMLHttpRequest();
    var idRoom = document.getElementById("roomChoice").value;


    request.onreadystatechange = function(){
        if(request.readyState === 4 && request.status === 200){
            document.location.href =websiteRoot+"/stock/index/1";
        }
    }

    var url = ffwApiUrl+"/products?roomId="+idRoom;
    request.open('PUT',url);
    request.send(JSON.stringify(selectedProducts));
}

function addProduct(){

    var form = document.forms["addProductForm"];
    var nbProducts = form.elements[3].value;
    if(isArticleExisting && nbProducts<100){
        var newProduct = {
            "limitDate" : form.elements[1].value ,
            "state" : form.elements[2].value ,
            "articleId" : form.elements[0].value,
            "roomId" :  document.getElementById("roomFilter").value
        };
        var jsonProduct = JSON.stringify(newProduct);
        var request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            if(request.readyState === 4 && request.status === 201){
                document.location.href = websiteRoot+"/stock/index/1";
            } 
        }
        var url = ffwApiUrl+"/products?nbProducts="+nbProducts;
        request.open('POST',url);
        request.send(jsonProduct);
    }
}

function removeProduct(){
    var request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if(request.readyState === 4 && request.status === 200){
            document.location.href = websiteRoot+"/stock/index/1";
        }
    }
    var url = ffwApiUrl+"/products?roomId=";
    request.open('PUT',url);
    request.send(JSON.stringify(selectedProducts));
}