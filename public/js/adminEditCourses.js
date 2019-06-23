var arrCourses;
var emptyCourseRow;
var emptyVehiclesTable;
var emptyVehicleRow;
var emptyCollapsedBasketRow;

loadExternalDOMElement([
    {url:websiteRoot+"/adminCourses/vehiclesTable",func:getEmptyVehiclesTable},
    {url:websiteRoot+"/adminCourses/vehicleRow",func:getEmptyVehicleRow},
    {url:websiteRoot+"/adminCourses/collapsedBasketRow",func:getEmptyCollapsedBasketRow},
    {url:websiteRoot+"/adminCourses/courseRow",func:getEmptyCourseRow}

]);

function getEmptyCourseRow(domText) {
    emptyCourseRow=prepareEmptyDomElement('tr',{className:"align-items-center",id:"courseRow",innerHTML:domText});
}

function getEmptyVehiclesTable(domText) {
    emptyVehiclesTable=prepareEmptyDomElement('table',{className:"table table-striped table-hover genericTable",id:"vehiclesTable",innerHTML:domText});
}
function getEmptyVehicleRow(domText) {
    emptyVehicleRow=prepareEmptyDomElement('tr',{className:"align-items-center genericRow",id:"vehicleRow",innerHTML:domText});
}
function getEmptyCollapsedBasketRow(domText) {
    emptyCollapsedBasketRow=prepareEmptyDomElement('tr',{className:"align-items-center ",id:"collapsedBasketRow",innerHTML:domText});
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
    let startDateTime=course.serviceTime;
    let endDateTime=course.serviceEnd;

    console.log(course.serviceTime);

    course.serviceStartTime=startDateTime?startDateTime.split(' ')[1]:null;
    course.serviceStartDate=startDateTime?startDateTime.split(' ')[0]:null;

    course.serviceEndTime=endDateTime?endDateTime.split(' ')[1]:null;
    course.serviceEndDate=endDateTime?endDateTime.split(' ')[0]:null;
    course.durationTime=secondsToHms(course.duration);

    let dates=synchronizeStartEnd(course.serviceStartDate,course.serviceStartTime,course.duration);
    course.calculateStartDate=dates.baseDate;
    course.calculateEndDate=dates.calculateDate;

    course.createDate=course.createTime?course.createTime.split(' ')[0]:null;

    newCourseRow.querySelector("#serviceStartDate").min=course.createDate;
    newCourseRow.querySelector("#serviceEndDate").min=course.createDate;

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
    newCourseRow.collapsedBasketRow=newCollapsedBasketRow.querySelector("#collapsedBasketRow");

    let args={
        emptyRow:emptyBasketRow,
        cityName:document.getElementById("cityNameInput").value,
        container:newCollapsedBasketRow.querySelector("#basketRowsContainer"),
        course:course,
        baskets:course.baskets,
        specifyFunc:createCourseBasketRow
    }

    updateGenericsRow(course.baskets,args);

    container.append(newCourseRow);
    container.append(newCollapsedBasketRow);

}


function createCourseBasketRow(args){

    let basketRow=args.domNode;
    let basket=args.element;
    let newCollapsedAddressRow=emptyCollapsedAddressRow.cloneNode(true);

    basketRow.querySelector("#destinationCel").remove();
    basketRow.querySelector("#affectCourseCel").remove();

    newCollapsedAddressRow[args.objectName]=args.element;



    if(args.element.role==="import"){
        args.element.address=args.element.srcAddress;
    }
    else{
        args.element.address=args.element.dstAddress;
    }

    matchDOMAndObject('value', '#', newCollapsedAddressRow, args.element.address);

    args.domNode.collapsedAddressRow=newCollapsedAddressRow.querySelector("#collapsedAddress");

    args.container.append(newCollapsedAddressRow);


    basketRow.basket=null;

    basket.totalQuantity=basket.products&&basket.products.length?basket.products.length:"0";

    matchDOMAndObject('value', '#', basketRow, basket,false,null,"basket");
    matchDOMAndObject('innerHTML', '#', basketRow, basket,false,null,"basket");


    basketRow.basket=basket;


}

function collapseBasketRow(element){

    let parent=getFirstParent(element,"id","courseRow");
    collapseDisplay(parent.collapsedBasketRow);
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

    let parent=getFirstParent(element,"id","courseRow");
    modalToggle('vehicleDriverModal');
    let vehicleModal=document.getElementById("vehicleDriverModal");
    emptyVehiclesTable.service=parent.service;

    let tableContainer=vehicleModal.querySelector("#tableContainer");

    tableContainer.innerHTML="";
    tableContainer.append(emptyVehiclesTable);

}

function changeServiceTime(element){

    let parent=getFirstParent(element,"id","courseRow");
    let course=parent.service;
    let dates, createDate;

    createDate=new Date(course.createDate.replace(' ','T'));
    createDate.setMinutes(createDate.getMinutes()-createDate.getTimezoneOffset());

    matchDOMAndObject("value","#",parent,course,true,null,0,"service");

    if(element.id==="serviceStartTime"||element.id==="serviceStartDate"){
        dates=synchronizeStartEnd(course.serviceStartDate,course.serviceStartTime,course.duration);
        course.serviceEndDate=dates.calculateDate.toISOString().split('T')[0];
        course.serviceEndTime=dates.calculateDate.toISOString().split('T')[1].split('.')[0];
        course.calculateStartDate=dates.baseDate;
        course.calculateEndDate=dates.calculateDate;
    }
    else if(element.id==="serviceEndTime"||element.id==="serviceEndDate"){
        dates=synchronizeStartEnd(course.serviceEndDate,course.serviceEndTime,course.duration*-1);
        course.serviceStartDate=dates.calculateDate.toISOString().split('T')[0];
        course.serviceStartTime=dates.calculateDate.toISOString().split('T')[1].split('.')[0];
        course.calculateStartDate=dates.calculateDate;
        course.calculateEndDate=dates.baseDate;
    }
    let dateLocks=parent.querySelectorAll('.dateLock');

    if(createDate.getTime()>dates.calculateDate.getTime()){
        for(let i=0;i<dateLocks.length;i++) {
            dateLocks[i].disabled = true;
        }
        return null;
    }


    for(let i=0;i<dateLocks.length;i++){
        if(dateLocks[i].disabled){
            dateLocks[i].disabled=false;
        }
    }
    if(parent.querySelector('#serviceStartTime').disabled||parent.querySelector('#serviceEndTime').disabled){
        parent.querySelector('#serviceStartTime').disabled=false;
        parent.querySelector('#serviceEndTime').disabled=false;
    }

    matchDOMAndObject('value', '#', parent, course,false,null,0,"service");
    matchDOMAndObject('innerHTML', '#', parent, course,false,null,0,"service");

}


function openDriversModal(element){

}

function createSubCourseRow(args){

    console.log(args);


}

function synchronizeStartEnd(startDate,startTime,seconds){

    let baseDate=new Date(startDate+'T'+startTime);
    let calculateDate=new Date(startDate+'T'+startTime);
    calculateDate.setMinutes(calculateDate.getMinutes()-calculateDate.getTimezoneOffset());
    calculateDate.setSeconds(calculateDate.getSeconds()+seconds);

    return {
        baseDate:baseDate,
        calculateDate:calculateDate
    };
}