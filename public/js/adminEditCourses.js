var arrCourses;
var emptyCourseRow;
var emptyVehiclesTable;
var emptyVehicleRow;
var emptyCollapsedBasketRow;

loadExternalDOMElement([
    {url:websiteRoot+"/adminCourses/vehiclesTable",func:getEmptyVehiclesTable},
    {url:websiteRoot+"/adminCourses/vehicleRow",func:getEmptyVehicleRow},
    {url:websiteRoot+"/adminCourses/collapsedBasketRow",func:getEmptyCollapsedBasketRow}

]);


function getEmptyVehiclesTable(domText) {
    emptyVehiclesTable=prepareEmptyDomElement('table',{className:"table table-striped table-hover genericTable",id:"vehiclesTable",innerHTML:domText});
}
function getEmptyVehicleRow(domText) {
    emptyVehicleRow=prepareEmptyDomElement('tr',{className:"align-items-center genericRow",id:"vehicleRow",innerHTML:domText});
}
function getEmptyCollapsedBasketRow(domText) {
    emptyCollapsedBasketRow=prepareEmptyDomElement('tr',{className:"align-items-center ",id:"collapsedBasketRow",innerHTML:domText});
}

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
            routeState:filterObject.routeStateSelect,
            vehicleId:filterObject.vehicleSelect,
            createTime:filterObject.createDateInput,
            serviceTime : filterObject.courseDateInput,
            completeData:true
        }
    };

    console.log(args.query);

    exchangeToAPI(ffwApiUrl+"/courses",arrCourses,"GET",updateCourseRows,args);

}

function updateCourseRows(element){

    arrCourses=[];
    arrCourses=element;

    console.log(element);
    let courseRowContainer=document.getElementById("coursesRowsContainer");
    courseRowContainer.innerHTML="";

    for(let i=0 ; i<arrCourses.length;i++){
        createCourseRow(arrCourses[i],courseRowContainer);
    }
}

function createCourseRow(course,container){

    let newCourseRow=emptyCourseRow.cloneNode(true);
    let newCollapsedBasketRow=emptyCollapsedBasketRow.cloneNode(true);

    let dateTime=course.serviceTime;

    course.serviceTime=dateTime?dateTime.split(' ')[1]:null;
    course.serviceDate=dateTime?dateTime.split(' ')[0]:null

    if(course.status=="deleted"||course.status=="finished"){
        let arrInput=newCourseRow.querySelectorAll("[name='courseInput']");
        for(let i=0; i<arrInput.length; i++){
            arrInput[i].disabled=true;
        }
    }
    newCourseRow.service=course;

    matchDOMAndObject('value', '#', newCourseRow, course,false,null,0,"service");
    matchDOMAndObject('innerHTML', '#', newCourseRow, course,false,null,0,"service");

    newCollapsedBasketRow.courseRow=newCourseRow;
    newCollapsedBasketRow.course=course;

    let args={
        emptyRow:emptyBasketRow,
        cityName:document.getElementById("cityNameInput").value,
        container:newCollapsedBasketRow.querySelector("#basketRowsContainer"),
        course:course,
        baskets:arrBaskets,
        specifyFunc:createBasketRow
    }
    updateGenericsRow(course.arrBaskets,args);

    container.append(newCourseRow);
    container.append(newCollapsedBasketRow);

}

loadExternalDOMElement([
    {url:websiteRoot+"/adminCourses/courseRow",func:getEmptyCourseRow}

]);

function getEmptyCourseRow(domText) {
    emptyCourseRow = document.createElement('tr');
    emptyCourseRow.class = "align-items-center";
    emptyCourseRow.id = "courseRow";
    emptyCourseRow.innerHTML =domText;
}


function openMapModal(element){

    let mapModal=document.getElementById("mapModal");
    let courseRow=getFirstParent(element,"id","courseRow");
    mapModal.course=courseRow.service;

    let mapPoints=[];
    mapPoints.push(new google.maps.LatLng(parseFloat(mapModal.course.local.address.latitude),parseFloat(mapModal.course.local.address.longitude))
        );
    let center ={lat:parseFloat(mapModal.course.local.address.latitude),lng:parseFloat(mapModal.course.local.address.longitude)};

    for(let i=0 ; i<mapModal.course.baskets.length;i++){

        let address;

        if(mapModal.course.baskets[i].role=="import"){
            address=mapModal.course.baskets[i].srcAddress;
        }
        else if(mapModal.course.baskets[i].role=="export"){
            address=mapModal.course.baskets[i].dstAddress;
        }

        mapPoints.push({
            location :new google.maps.LatLng(parseFloat(address.latitude),parseFloat(address.longitude)),
            stopover:true
        });
    }

    modalToggle('mapModal');

    initMap(mapPoints,center);
}


function openVehiclesModal(element){

    modalToggle('vehicleDriverModal');
    let vehicleModal=document.getElementById("vehicleDriverModal");

    let tableContainer=vehicleModal.querySelector("#tableContainer");
    tableContainer.innerHTML="";
    tableContainer.append(emptyVehiclesTable);



}
function openDriversModal(element){

}

function createSubCourseRow(args){

    console.log(args);


}
