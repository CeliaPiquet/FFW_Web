var fullArray=[];
var rights = '';
var filteredArray = [];

function getFullArray(){
    var request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if(request.readyState === 4 && request.status === 200){
            fullArray = JSON.parse(request.responseText);
            displayFullArray(fullArray);
        }
    }
    var url = "http://localhost:8080/FFW_API/api/rooms/getProducts.php?room=1";
    request.open('GET',url);
    request.send();
}

function findArticleByCode(){
    var request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if(request.readyState === 4 && request.status === 200){
            fullArray = JSON.parse(request.responseText);
            displayFullArray(fullArray);
        }
    }
    var url = "http://localhost:8080/FFW_API/api/rooms/getProducts.php?room=1";
    request.open('GET',url);
    request.send();
}

function displayFullArray(productArray){
    var container = document.getElementById("articleResultsContainer");
    var noResult = document.getElementById("emptyResultArticle");
    noResult.innerHTML = '';
    container.innerHTML = '';

    for(var i=0; i<productArray.length; i++){
        var product = creatProductDisplay(productArray[i]);
        container.appendChild(product);
    }
    if (productArray.length === 0){
        noResult.innerHTML = "Vide";
    }
}

function creatProductDisplay(element){
    var productHTML = document.createElement('tr');
    var nameCell = document.createElement('td');
    nameCell.innerHTML = element.name;
    productHTML.appendChild(nameCell);
    
    var testButtonCell = document.createElement('td');
    var buttonTest = document.createElement('button');
    buttonTest.innerHTML = "valider";
    buttonTest.onclick = function(){
        console.log(element.category);
    }
    testButtonCell.appendChild(buttonTest);
    productHTML.appendChild(testButtonCell);

    return productHTML;
}