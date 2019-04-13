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

function createArticleDisplay(element){
    
    var articleLine = document.createElement('tr');
    strId = element.name + "ArticleLine";
    articleLine.setAttribute("id",strId);
    articleLine.setAttribute("class","articleLine font-weight-bold");

    var nameCell = document.createElement('td');
    nameCell.innerHTML = element.name;
    articleLine.appendChild(nameCell);

    var categoryCell = document.createElement('td');
    categoryCell.innerHTML = element.category;
    articleLine.appendChild(categoryCell);
    
    var quantityCell = document.createElement('td');
    quantityCell.innerHTML = countQuantity(fullArray,element.name);
    articleLine.appendChild(quantityCell);

    var codeCell = document.createElement('td');
    codeCell.innerHTML = element.article_a_id;
    articleLine.appendChild(codeCell);

    var buttonCell = document.createElement('td');
    var button = document.createElement('button');
    button.setAttribute("class","btn");
    button.innerHTML = "+";
    button.onclick = function(){
        for (var i=0; i<fullArray.length; i++){
            if (fullArray[i].name == element.name){
                strId = fullArray[i].name + "ProductLine" + fullArray[i].pr_id;
                if (document.getElementById(strId).style.display == "none"){
                    document.getElementById(strId).style.display = "block";
                    button.innerHTML ="-";
                }
                else {
                    button.innerHTML = "+";
                    document.getElementById(strId).style.display = "none";
                }
            }
        }
    }
    buttonCell.appendChild(button);
    articleLine.appendChild(buttonCell);

    return articleLine;

}

function createProductDisplay(element){
    var productLine = document.createElement('tr');
    strId = element.name + "ProductLine" + element.pr_id;
    productLine.setAttribute("id",strId);
    productLine.setAttribute("class","productLine " + element.name);
    productLine.setAttribute("style","display:none");
    var dateCell = document.createElement('td');
    dateCell.setAttribute("colspan","4");
    dateCell.innerHTML = element.limit_date;
    productLine.appendChild(dateCell);

    return productLine;
}