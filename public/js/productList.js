var fullArray=[];
var rights = '';
var filteredArray = [];

function getFullArray(idRoom){
    var request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if(request.readyState === 4 && request.status === 200){
            fullArray = JSON.parse(request.responseText);
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

function displayArray(productArray){
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

function selectAllProductByArticle(articleName){
    // si on clique sur un article alors les modifications s'applique aux enfants
    // 2 cas possibles : soit l'article est déjà select et dans ce cas on enleve select a tous 
    // soit l'article est pas select et on doit ajouter select a tous

    var articleId = articleName + "ArticleLine";
    var articleElement = document.getElementById(articleId);    //on récupère l'élément qui contient l'article
    var isSelect = articleElement.classList.contains("select"); //on vérifie l'état actuel de l'article
    
    var productClass = "productLine " + articleName;
    var productElements = document.getElementsByClassName(productClass);

    if (articleElement && productElements){
        for (var i=0; i<productElements.length; i++){
            if(isSelect){                                       // cas de l'article déjà activé
                productElements[i].classList.remove("select");
                productElements[i].style.background = "";
            }
            else {
                productElements[i].classList.add("select");
                productElements[i].style.background = "#42BD85";
            }
        }
        if(isSelect){                                       // cas de l'article déjà activé
        articleElement.classList.remove("select");
        articleElement.style.background = "";
    }
    else {
        articleElement.classList.add("select");
        articleElement.style.background = "#42BD85";
    }
    buttonOnClick(articleName); 
}
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

function selectProduct(productId,name){ //lorsqu'on clique sur un produit celui ci doit changer de statut ("select"/"")
    var element = document.getElementById(productId);
    if(element.classList.toggle("select")){
        element.style.background = "#42BD85";
    }
    else {
        element.style.background = "";
    }
    isAllArticleSelected(name); //on vérifie si tous les produits d'un article sont sélectionné afin de changer ou non la classe de l'article
}

function isAllArticleSelected(name){
    console.log("check");
    var element = document.getElementById(name + "ArticleLine");
    var productsClass = "productLine " + name;
    var allSelected = true;
    var products = document.getElementsByClassName(productsClass);
    var isArticleSelected = element.classList.contains("select");

    for (var i=0; i<products.length; i++){
        if(!products[i].classList.contains("select")){
            console.log(products[i]);
            allSelected = false;
        }
    }

    if(isArticleSelected && !allSelected){
        element.classList.remove("select");
        element.style.background = "";
    }
    else if(!isArticleSelected && allSelected){
        element.classList.add("select");
        element.style.background = "#42BD85";
    }
    
    return allSelected;
}

function createProductDisplay(element){
    var productLine = document.createElement('tr');
    strId = element.name + "ProductLine" + element.pr_id;
    productLine.setAttribute("id",strId);
    productLine.setAttribute("onclick","selectProduct('"+strId+"','"+element.name+"')");
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