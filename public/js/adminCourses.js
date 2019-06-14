var arrCourses;
var emptyBasketRow;
var emptyCourseRow;
var emptyCollapsedAddressRow;



loadExternalDOMElement([
    {url:websiteRoot+"/adminCourses/basketRow",func:getEmptyBasketRow},
    {url:websiteRoot+"/adminCourses/courseRow",func:getEmptyCourseRow},
    {url:websiteRoot+"/adminCourses/collapsedAddressRow",func:getCollapsedAddressRow}
]);



function findCourseByFilter(){

    arrCourses=[];
    let filterObject={
        nameInput:null,
        routeStateSelect:null,
        createDateInput:null,
        courseDateInput:null,
        vehicleSelect:null
    };


    matchDOMAndObject("value","#",document.getElementById("coursesTableHeader"),filterObject,true);

    console.log(filterObject);

    args={
        query:{
            offset:0,
            limit:20,
            name:filterObject.nameInput,
            routeState:filterObject.vehicleSelect,
            vehicleId:filterObject.vehicleSelect,
            createTime:filterObject.createDateInput,
            serviceTime : filterObject.courseDateInput
        }
    };

    exchangeToAPI(ffwApiUrl+"/courses",arrCourses,"GET",updateCourseRows,args);

}


function findBasketsByFilter(){

    arrBaskets=[];
    let filterObject={
        basketRoleSelect:null,
        createDateInput:null
    }

    matchDOMAndObject("value","#",document.getElementById("basketsTableHeader"),filterObject,true);

    console.log(filterObject);

    args={
        query:{
            offset:0,
            limit:20,
            status:"validated",
            role:filterObject.basketRoleSelect,
            createTime:filterObject.createDateInput
        }
    };

    exchangeToAPI(ffwApiUrl+"/baskets",arrBaskets,"GET",updateBasketRows,args);

}

function updateCourseRows(element){

    arrCourses=[];
    arrCourses=element;

    let courseRowContainer=document.getElementById("coursesRowsContainer");
    courseRowContainer.innerHTML="";

    for(let i=0 ; i<arrCourses.length;i++){
        createCourseRow(arrCourses[i],courseRowContainer);
    }
}

function updateBasketRows(element){

    arrBaskets=[];
    arrBaskets=element;

    let courseRowContainer=document.getElementById("basketRowsContainer");
    let cityName=document.getElementById("cityNameInput").value;
    let filteredBasketArr=[];

    courseRowContainer.innerHTML="";

    for(let i=0 ; i<arrBaskets.length;i++){

        let basketCity= arrBaskets[i].srcAddress&&arrBaskets[i].srcAddress.cityName?arrBaskets[i].srcAddress.cityName.toLowerCase():null;
        if((cityName&&basketCity&&basketCity.includes(cityName.toLowerCase()))||!cityName){
            filteredBasketArr.push(arrBaskets[i]);
        }

    }
    arrBaskets=filteredBasketArr;

    for(let i=0 ; i<arrBaskets.length;i++){
        createBasketRow(arrBaskets[i],courseRowContainer);
    }
}


function createBasketRow(basket,container){

    newBasketRow=emptyBasketRow.cloneNode(true);
    newBasketRow.service=basket;

    basket.totalQuantity=basket.products&&basket.products.length?basket.products.length:"0";

    matchDOMAndObject('value', '#', newBasketRow, basket,false,null,"basket");
    matchDOMAndObject('innerHTML', '#', newBasketRow, basket,false,null,"basket");


    container.append(newBasketRow);

}


function changeBasketQuantityOrder(){

    let arrowOrder=document.getElementById("arrowBasketOrder");
    sortByOrder.sortKey="totalQuantity";

    if(arrowOrder.classList.contains("fa-arrow-up")){
        arrowOrder.classList.remove("fa-arrow-up");
        arrowOrder.classList.add("fa-arrow-down");
        sortByOrder.order=1;
    }
    else{
        arrowOrder.classList.remove("fa-arrow-down");
        arrowOrder.classList.add("fa-arrow-up");
        sortByOrder.order=-1;

    }

    arrBaskets.sort(sortByOrder);
    updateBasketRows(arrBaskets);
}


function createCourseRow(course,container){



    newCourseRow=emptyCourseRow.cloneNode(true);
    newCourseRow.service=course;
    console.log(newCourseRow);

    console.log(course);

    matchDOMAndObject('value', '#', newCourseRow, course,false,null,"service");

    container.append(newCourseRow);

}

function findBasketsByFilter(){

    arrBaskets=[];
    let filterObject={
        basketStatusSelect:null,
        basketRoleSelect:null,
        createDateInput:null
    }

    matchDOMAndObject("value","#",document.getElementById("basketsTableHeader"),filterObject,true);

    console.log(filterObject);

    args={
        query:{
            offset:0,
            limit:20,
            status:filterObject.basketStatusSelect,
            role:filterObject.basketRoleSelect,
        }
    };

    exchangeToAPI(ffwApiUrl+"/baskets",arrBaskets,"GET",updateBasketRows,args);

}

function openNewCourseModal(){

    modalDisplay('courseModal');
}
//
//
// function changeBasketsList(element){
//
//     let basketsTable=document.getElementById("basketRowsContainer");
//     basketsTable.innerHTML="";
//     basketsTable.baskets=element;
//
//     for(let i=0 ; i<arrBaskets.length ; i++){
//
//
//         // if(arrBaskets[i].skStatus===status){
//             let newBasketRow=emptyBasketRow.cloneNode(true);
//
//
//             // let skillRowStatus=newBasketRow.querySelector("#skStatus");
//             // let basketRowEntityName=newBasketRow.querySelector("#entityName");
//
//             matchDOMAndObject("innerHTML","#",newBasketRow,arrBaskets[i]);
//
//             let addBasketButton=document.createElement("button");
//
//             if (basketsInCourse.find(function(element) {return element == arrBaskets[i];}) ) {
//                 addBasketButton.innerHTML = "Ajouté";
//                 addBasketButton.addEventListener(addBasketButton, "onClick", withdrawBasketFromCourse(arrBaskets[i]));
//             } else {
//                 addBasketButton.innerHTML = "Ajouter";
//                 addBasketButton.addEventListener(addBasketButton, "onClick", addBasketToCourse(arrBaskets[i]));
//             }
//
//             newBasketRow.append(addBasketButton);
//
//
//
//
//             // if(arrBaskets[i].role=="import"){
//             //     newBasketRow.style("background-color: red");
//             // }
//             // else{
//             //     newBasketRow.style("background-color: blue");
//             // }
//             // newBasketRow.skill=arrSkills[i];
//             // skillRowStatus.addEventListener('click',changeStatus,false);
//             // skillName.addEventListener('change',changeName,false);
//             // basketsTable.append(newSkillRow);
//         // }
//
//         basketsTable.append(newBasketRow);
//     }
//
// }


function withdrawBasketFromCourse(basket) {
    var indexToRemove = basketsInCourse.findIndex(function(element) {
        return element == basket;
    });

    basketsInCourse.splice(indexToRemove, 1);
}

function addBasketToCourse(basket) {
    basketsInCourse.push(basket);
}



function getEmptyBasketRow(domText){
    emptyBasketRow=document.createElement('tr');
    emptyBasketRow.class="align-items-center ";
    emptyBasketRow.scope="row";
    emptyBasketRow.id="basketRow";
    emptyBasketRow.innerHTML =domText;
}

function getEmptyCourseRow(domText) {

    emptyCourseRow = document.createElement('tr');
    emptyCourseRow.class = "align-items-center";
    emptyCourseRow.id = "courseRow";
    emptyCourseRow.innerHTML =domText;
}

function getCollapsedAddressRow(domText){
    emptyCollapsedAddressRow = document.createElement('tr');
    emptyCollapsedAddressRow.class="align-items-center";
    emptyCollapsedAddressRow.id="collapsedAddressRow";
    emptyCollapsedAddressRow.innerHTML =domText;
}