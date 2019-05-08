var fullProductsArray=[];
var rights = '';
var filteredArray = [];
var selectedProducts = [];

function getfullProductsArray(idRoom, offset){
    var request = new XMLHttpRequest();
    var productsArray = [];
    request.onreadystatechange = function(){
        if(request.readyState === 4 && request.status === 200){
            productsArray = JSON.parse(request.responseText);
            fullProductsArray=fullProductsArray.concat(productsArray);
            if(productsArray.length == 20){
                getfullProductsArray(idRoom, offset+20)
            }
            else {
                displayFullProductsArray();
            }
        } 
    }
    var url = "http://localhost:8080/FFW_API/api/rooms/getProducts.php?room="+idRoom+"&offset="+offset;
    request.open('GET',url);
    request.send();
}

function keepProductsWithRoomId(roomIds){
    var i = 0;
    while (i<fullProductsArray.length){
        if (! roomIds.includes(fullProductsArray[i]['roomId'])){
            fullProductsArray.splice(i,1);
        }
        else {
            i++;
        }
    }
}

function getMultiplefullProductsArray(roomIds, offset){
    var request = new XMLHttpRequest();
    var productArray = [];
    request.onreadystatechange = function(){
        if(request.readyState === 4 && request.status === 200){
            productArray = JSON.parse(request.responseText);
            fullProductsArray = fullProductsArray.concat(productArray);
            if (productArray.length == 20){
                getMultiplefullProductsArray(roomIds, offset+20)
            }
            else {
                keepProductsWithRoomId(roomIds);
                displayFullProductsArray(fullProductsArray);
            }
        }
    }
    var url = "http://localhost:8080/FFW_API/api/products/getAll.php?offset="+offset;
    request.open('GET',url);
    request.send();
}

function findArticleByFilter(){
    var codeFilter = document.getElementById("codeArticleInput").value;
    var nameFilter = document.getElementById("nameArticleInput").value;
    var categoryFilter = document.getElementById("categoryArticleInput").value;
    if (codeFilter.length != 0 || nameFilter.length !=0 || categoryFilter.length != 0){
        var filter = new Array();
        filter = {
            articleName : nameFilter,
            articleCategory : categoryFilter,
            articleId : codeFilter
        }
        var filteredArray = filterArray(filter);
        displayFullProductsArray(filteredArray);
    } else {
        displayFullProductsArray(fullProductsArray);
    }
}

function filterArray (filter){
    var test, i, key, strToTest;
    filteredArray = [];
    for (i = 0; i < fullProductsArray.length; i++){
        test = true;
        for (key in filter){
            if (fullProductsArray[i].hasOwnProperty(key)){
                strToTest = fullProductsArray[i][key].toUpperCase();
                if (! (strToTest.includes(filter[key].toUpperCase()) )){
                    test = false;
                }
            }else{
                test = false;
            }
        }
        if(test){
            filteredArray.push(fullProductsArray[i]);
        }
    }
    return filteredArray;
}

function sortByName(a,b){
    var newA = a.articleName.toLowerCase();
    var newB = b.articleName.toLowerCase();
    return ((newA < newB) ? -1: ((newA > newB) ? 1 : 0));
}

function displayFullProductsArray(productArray = fullProductsArray){ //par défaut on affiche le tableau entier
    productArray.sort(sortByName); //permet de regrouper tous les produits d'un même article
    var container = document.getElementById("articleResultsContainer");
    var noResult = document.getElementById("emptyResultArticle");
    noResult.innerHTML = '';
    container.innerHTML = '';

    for(var i=0; i<productArray.length; i++){
        strId = productArray[i].articleName + "ArticleLine";
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

function countQuantity(fullProductsArray,nameToSearch){
    counter = 0;
    for (var i =0; i<fullProductsArray.length; i++) {
        if (fullProductsArray[i].articleName == nameToSearch){
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

function createArticleDisplay(element){ //checked
    var articleLine = document.createElement('tr');
    strId = element.articleName + "ArticleLine";
    articleLine.setAttribute("id",strId);
    articleLine.setAttribute("class","articleLine font-weight-bold");

    var nameCell = document.createElement('td');
    nameCell.setAttribute("onclick",'selectAllProductByArticle("'+element.articleName+'")');
    nameCell.innerHTML = element.articleName;
    articleLine.appendChild(nameCell);

    var categoryCell = document.createElement('td');
    categoryCell.setAttribute("onclick",'selectAllProductByArticle("'+element.articleName+'")');
    categoryCell.innerHTML = element.articleCategory;
    articleLine.appendChild(categoryCell);
    
    var quantityCell = document.createElement('td');
    quantityCell.setAttribute("onclick",'selectAllProductByArticle("'+element.articleName+'")');
    quantityCell.innerHTML = countQuantity(fullProductsArray,element.articleName);
    articleLine.appendChild(quantityCell);

    var codeCell = document.createElement('td');
    codeCell.setAttribute("onclick",'selectAllProductByArticle("'+element.articleName+'")');
    codeCell.innerHTML = element.articleId;
    articleLine.appendChild(codeCell);

    var buttonCell = document.createElement('td');
    var button = document.createElement('p');
    button.setAttribute("class","btn");
    button.setAttribute("id","btn"+element.articleName);
    button.innerHTML = "+";
    button.setAttribute("onclick",'buttonOnClick("'+element.articleName+'")');
    buttonCell.appendChild(button);
    articleLine.appendChild(buttonCell);

    return articleLine;

}

function buttonOnClick(articleName){
    var button = document.getElementById("btn"+articleName)
    for (var i=0; i<fullProductsArray.length; i++){
        if (fullProductsArray[i].articleName == articleName){
            strId = fullProductsArray[i].articleName + "ProductLine" + fullProductsArray[i].prid;
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

function isAllArticleSelected(articleName){
    var element = document.getElementById(articleName + "ArticleLine");
    var productsClass = "productLine " + articleName; 
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
    strId = element.articleName + "ProductLine" + element.prid;
    productLine.setAttribute("id",strId);
    productLine.setAttribute("onclick",'selectProduct("' + element.prid + '", "' + element.articleName + '")');
    // productLine.setAttribute("onclick","selectProduct('"+strId+"','"+element.articleName+"')");
    productLine.setAttribute("class","productLine " + element.articleName);
    productLine.setAttribute("style","display:none");

    var firstCell = document.createElement('td');
    firstCell.innerHTML = "Date de péremption :"
    productLine.appendChild(firstCell);

    var dateCell = document.createElement('td');
    dateCell.innerHTML = element.limitDate;
    productLine.appendChild(dateCell);
    
    var thirdCell = document.createElement('td');
    thirdCell.innerHTML = "Salle :";
    productLine.appendChild(thirdCell);
    
    var roomCell = document.createElement('td');
    roomCell.innerHTML = getRoomById(element.roomId).name;
    productLine.appendChild(roomCell);
    return productLine;
}