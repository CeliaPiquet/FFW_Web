var fullArray=[];
var rights = '';
var filteredArray = [];
var selectedProducts = [];

function getFullArray(idRoom){
    var request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if(request.readyState === 4 && request.status === 200){
            fullArray = JSON.parse(request.responseText);
            displayArray(fullArray);
        } else if (request.readyState === 4 && request.status === 204){
            fullArray = [];
            displayArray(fullArray);
        }
    }
    var url = "http://localhost:8080/FFW_API/api/rooms/getProducts.php?room="+idRoom;
    request.open('GET',url);
    request.send();
}

function getMultipleFullArray(roomIds){
    var request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if(request.readyState === 4 && request.status === 200){
            fullArray = JSON.parse(request.responseText);
            var tmp = fullArray.length;
            var i=0;
            while (i<tmp){
                if (! roomIds.includes(fullArray[i]['room_r_id'])){
                    fullArray.splice(i,1);
                    tmp = fullArray.length;
                }
                else {
                    i++;
                }
            }
            displayArray(fullArray);
        }
    }
    var url = "http://localhost:8080/FFW_API/api/products/getAll.php";
    request.open('GET',url);
    request.send();
    return "ok";
}

function findArticleByFilter(){
    var codeFilter = document.getElementById("codeArticleInput").value;
    var nameFilter = document.getElementById("nameArticleInput").value;
    var categoryFilter = document.getElementById("categoryArticleInput").value;
    if (codeFilter.length != 0 || nameFilter.length !=0 || categoryFilter.length != 0){
        var filter = new Array();
        filter = {
            name : nameFilter,
            category : categoryFilter,
            article_a_id : codeFilter
        }
        var filteredArray = filterArray(filter);
        displayArray(filteredArray);
    } else {
        displayArray(fullArray);
    }
}

function filterArray (filter){
    filteredArray = [];
    for (var i = 0; i < fullArray.length; i++){
        var test = true;
        for (var key in filter){
            if (fullArray[i].hasOwnProperty(key)){
                var strToTest = fullArray[i][key].toUpperCase();
                if (! (strToTest.includes(filter[key].toUpperCase()) )){
                    test = false;
                }
            }else{
                test = false;
            }
        }
        if(test){
            filteredArray.push(fullArray[i]);
        }
    }
    return filteredArray;
}

function sortByName(a,b){
    var newA = a.name.toLowerCase();
    var newB = b.name.toLowerCase();
    return ((newA < newB) ? -1: ((newA > newB) ? 1 : 0));
}

function displayArray(productArray){
    productArray.sort(sortByName); //permet de regrouper tous les produits d'un même article
    var container = document.getElementById("articleResultsContainer");
    var noResult = document.getElementById("emptyResultArticle");
    noResult.innerHTML = '';
    container.innerHTML = '';

    for(var i=0; i<productArray.length; i++){
        strId = productArray[i].name + "ArticleLine";
        if(document.getElementById(strId)){  //si un l'article a déjà été ajouté on ajoute juste le produit
            var product = createProductDisplay(productArray[i]);
            container.appendChild(product);
        }
        else { //sinon on crée la div de l'article + le produit
            var article = createArticleDisplay(productArray[i]);
            container.appendChild(article);
            var product = createProductDisplay(productArray[i]);
            container.appendChild(product);
        }
    }
    if (productArray.length === 0){
        noResult.innerHTML = "Vide";
    }
}

function countQuantity(fullArray,nameToSearch){
    counter = 0;
    for (var i =0; i<fullArray.length; i++) {
        if (fullArray[i].name == nameToSearch){
            counter ++;
        }
    }
    return counter;
}

function getRealProductId(idHTML){
    var productId = (idHTML.split("ProductLine"))[1];
    return productId;
}

function selectAllProductByArticle(articleName){

    var productClass = "productLine " + articleName;
    var productElements = document.getElementsByClassName(productClass);
    var allSelected = isAllArticleSelected(articleName);

    if (productElements){
        for (var i=0; i<productElements.length; i++){
            realId = getRealProductId(productElements[i].id);
            if(allSelected){
                productElements[i].classList.remove("select");
                productElements[i].style.background = "";
                var indexToRemove = selectedProducts.findIndex( o => o == realId);
                selectedProducts.splice(indexToRemove,1);
            }
            else if (!(selectedProducts.includes(realId))){
                productElements[i].classList.add("select");
                productElements[i].style.background = "#42BD85";
                selectedProducts.push(realId);
            }
        }
    }
    isAllArticleSelected(articleName);
    buttonOnClick(articleName); 
}


function createArticleDisplay(element){
    
    var articleLine = document.createElement('tr');
    strId = element.name + "ArticleLine";
    articleLine.setAttribute("id",strId);
    articleLine.setAttribute("class","articleLine font-weight-bold");

    var nameCell = document.createElement('td');
    nameCell.setAttribute("onclick","selectAllProductByArticle('"+element.name+"')");
    nameCell.innerHTML = element.name;
    articleLine.appendChild(nameCell);

    var categoryCell = document.createElement('td');
    categoryCell.setAttribute("onclick","selectAllProductByArticle('"+element.name+"')");
    categoryCell.innerHTML = element.category;
    articleLine.appendChild(categoryCell);
    
    var quantityCell = document.createElement('td');
    quantityCell.setAttribute("onclick","selectAllProductByArticle('"+element.name+"')");
    quantityCell.innerHTML = countQuantity(fullArray,element.name);
    articleLine.appendChild(quantityCell);

    var codeCell = document.createElement('td');
    codeCell.setAttribute("onclick","selectAllProductByArticle('"+element.name+"')");
    codeCell.innerHTML = element.article_a_id;
    articleLine.appendChild(codeCell);

    var buttonCell = document.createElement('td');
    var button = document.createElement('p');
    button.setAttribute("class","btn");
    button.setAttribute("id","btn"+element.name);
    button.innerHTML = "+";
    button.setAttribute("onclick","buttonOnClick('"+element.name+"')");
    buttonCell.appendChild(button);
    articleLine.appendChild(buttonCell);

    return articleLine;

}

function buttonOnClick(name){
    var button = document.getElementById("btn"+name)
    for (var i=0; i<fullArray.length; i++){
        if (fullArray[i].name == name){
            strId = fullArray[i].name + "ProductLine" + fullArray[i].pr_id;
            if (document.getElementById(strId).style.display == "none"){
                document.getElementById(strId).style.display = "table-row";
                button.innerHTML ="-";
            }
            else {
                button.innerHTML = "+";
                document.getElementById(strId).style.display = "none";
            }
        }
    }
}

function selectProduct(elementId, elementName){ //lorsqu'on clique sur un produit celui ci doit changer de statut ("select"/"")

    strId = elementName + "ProductLine" + elementId;
    
    var elementHTML = document.getElementById(strId);
    var indexToRemove = selectedProducts.findIndex( o => o == elementId);

    // if(elementHTML.classList.toggle("select")){
    if(indexToRemove == -1) {
        elementHTML.style.background = "#42BD85";
        selectedProducts.push(elementId);
    }
    else {
        elementHTML.style.background = "";
        selectedProducts.splice(indexToRemove, 1);
    }    
    isAllArticleSelected(elementName); //on vérifie si tous les produits d'un article sont sélectionné afin de changer ou non la classe de l'article
}

function isAllArticleSelected(name){
    var element = document.getElementById(name + "ArticleLine");
    var productsClass = "productLine " + name; 
    var allSelected = true;
    var products = document.getElementsByClassName(productsClass);
    var isArticleSelected = element.classList.contains("select");

    for (var i=0; i<products.length; i++){
        if(!(selectedProducts.includes(getRealProductId(products[i].id)))){
            allSelected = false;
        }
    }

    if(allSelected){
        element.style.background = "#42BD85";
    }
    else {
        //element.classList.add("select");
        element.style.background = "";
    }
    return allSelected;
}

function createProductDisplay(element){
    var productLine = document.createElement('tr');
    strId = element.name + "ProductLine" + element.pr_id;
    productLine.setAttribute("id",strId);
    productLine.setAttribute("onclick","selectProduct('" + element.pr_id + "', '" + element.name + "')");
    // productLine.setAttribute("onclick","selectProduct('"+strId+"','"+element.name+"')");
    productLine.setAttribute("class","productLine " + element.name);
    productLine.setAttribute("style","display:none");

    var firstCell = document.createElement('td');
    firstCell.innerHTML = "Date de péremption :"
    productLine.appendChild(firstCell);

    var dateCell = document.createElement('td');
    dateCell.innerHTML = element.limit_date;
    productLine.appendChild(dateCell);
    
    var thirdCell = document.createElement('td');
    thirdCell.innerHTML = "Salle :";
    productLine.appendChild(thirdCell);
    
    var roomCell = document.createElement('td');
    roomCell.innerHTML = getRoomById(element.room_r_id).name;
    productLine.appendChild(roomCell);

    return productLine;
}