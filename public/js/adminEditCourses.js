var arrCourses;
var emptyCourseRow;
var emptyVehiclesTable;
var emptyVehicleRow;
var emptyCollapsedBasketRow;
var emptyUsersTableCourse;

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



function createCourseRow(args){

    let newCollapsedBasketRow=emptyCollapsedBasketRow.cloneNode(true);
    let course =args.element;
    let container=args.container;
    let newCourseRow=args.domNode;

    setCourseDates(newCourseRow,course);
    setCourseRowByStatus(newCourseRow,course);

    if(course.affectations&&course.affectations[0].user){
        course.user=course.affectations[0].user;
        course.userId=course.user.uid;
        course.user.name=course.user.lastname;
    }
    if(course.vehicle){
        course.vehicleId=course.vehicle.vid;
        course.vehicle.name=course.vehicle.description;
    }
    else{
        course.vehicleId=null;
    }

    newCourseRow.course=course;


    matchDOMAndObject('value', '#', newCourseRow, course,false,1,0,"service");
    matchDOMAndObject('innerHTML', '#', newCourseRow, course,false,1,0,"service");

    newCollapsedBasketRow.courseRow=newCourseRow;
    newCollapsedBasketRow.course=course;
    newCourseRow.collapsedBasketRow=newCollapsedBasketRow.querySelector("#collapsedBasketRow");

    let subArgs={
        emptyRow:emptyBasketRow,
        cityName:document.getElementById("cityNameInput").value,
        container:newCollapsedBasketRow.querySelector("#basketRowsContainer"),
        course:course,
        baskets:course.baskets,
        specifyFunc:createCourseBasketRow
    }

    updateGenericsRow(course.baskets,subArgs);

    container.append(newCollapsedBasketRow);

}


function setCourseRowByStatus(courseRow, course){

    if(course.status=="deleted"||course.status=="finished"){
        let arrInput=courseRow.querySelectorAll("[name='courseInput']");
        for(let i=0; i<arrInput.length; i++){
            arrInput[i].disabled=true;
        }
    }
    if(course.status!=="in progress"){
        courseRow.querySelector("#durationTime").disabled=true;
    }
    let statusSelect=courseRow.querySelector("#status");

    if(course.status==="validated"){
        changePropertySelectOptions("disabled",true,["created","finished"],statusSelect);
    }
    else if(course.status==="created"){
        changePropertySelectOptions("disabled",true,["in progress","finished"],statusSelect);
    }
    else if(course.status==="in progress"){
        changePropertySelectOptions("disabled",true,["created","validated"],statusSelect);
    }

}

function setCourseDates(courseRow,course){

    let startDateTime=course.serviceTime;
    let endDateTime=course.serviceEnd;

    course.serviceStartTime=startDateTime?startDateTime.split(' ')[1]:null;
    course.serviceStartDate=startDateTime?startDateTime.split(' ')[0]:null;

    course.serviceEndTime=endDateTime?endDateTime.split(' ')[1]:null;
    course.serviceEndDate=endDateTime?endDateTime.split(' ')[0]:null;
    course.durationTime=secondsToHms(course.duration);

    let dates=synchronizeStartEnd(course.serviceStartDate,course.serviceStartTime,course.duration);
    course.calculateStartDate=dates.baseDate;
    course.calculateEndDate=dates.calculateDate;


    course.createDate=course.createTime?course.createTime.split(' ')[0]:null;

    courseRow.querySelector("#serviceStartDate").min=course.createDate;
    courseRow.querySelector("#serviceEndDate").min=course.createDate;

    let createDate=getUnifiedDateTime(course.createDate);
    let dateLocks=courseRow.querySelectorAll('.dateLock');

    for(let i=0;i<dateLocks.length;i++){
        if( createDate.getTime()<course.calculateStartDate.getTime()){
            dateLocks[i].disabled=false;
        }
        else{
            dateLocks[i].disabled=true;
        }
    }


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

    matchDOMAndObject('value', '#', basketRow, basket,false,null,0,"basket");
    matchDOMAndObject('innerHTML', '#', basketRow, basket,false,null,0,"basket");


    basketRow.basket=basket;


}

function collapseBasketRow(element){

    let parent=getFirstParent(element,"id","courseRow");
    collapseDisplay(parent.collapsedBasketRow);
}


function changeServiceTime(element){

    let parent=getFirstParent(element,"id","courseRow");
    let course=parent.course;
    let dates, createDate;
    let tmpCourse=getServiceDateTime();
    let dateLocks=parent.querySelectorAll('.dateLock');

    createDate=getUnifiedDateTime(course.createDate);

    matchDOMAndObject("value","#",parent,tmpCourse,true,1,0,"service");
    tmpCourse.duration=hmsToSeconds(tmpCourse.durationTime);
    console.log(tmpCourse.duration);

    if(!isNaN(tmpCourse.duration)){
        if(element.id==="serviceStartTime"||element.id==="serviceStartDate"||element.id==="durationTime"){
            dates=synchronizeStartEnd(tmpCourse.serviceStartDate,tmpCourse.serviceStartTime,tmpCourse.duration);
            tmpCourse.serviceEndDate=dates.calculateDate.toISOString().split('T')[0];
            tmpCourse.serviceEndTime=dates.calculateDate.toISOString().split('T')[1].split('.')[0];
            tmpCourse.calculateStartDate=dates.baseDate;
            tmpCourse.calculateEndDate=dates.calculateDate;
        }
        else if(element.id==="serviceEndTime"||element.id==="serviceEndDate"){
            dates=synchronizeStartEnd(tmpCourse.serviceEndDate,tmpCourse.serviceEndTime,tmpCourse.duration*-1);
            tmpCourse.serviceStartDate=dates.calculateDate.toISOString().split('T')[0];
            tmpCourse.serviceStartTime=dates.calculateDate.toISOString().split('T')[1].split('.')[0];
            tmpCourse.calculateStartDate=dates.calculateDate;
            tmpCourse.calculateEndDate=dates.baseDate;
        }
    }

    if(isNaN(tmpCourse.duration)||createDate.getTime()>dates.calculateDate.getTime()){
        tmpCourse=getServiceDateTime(course);
        matchDOMAndObject("value","#",parent,tmpCourse,false,1,0,"service");
        return false;
    }
    copyObjectProperty(tmpCourse,course);
    course.serviceTime=course.serviceStartDate + " " + course.serviceStartTime;
    course.serviceEnd=course.serviceEndDate + " " + course.serviceEndTime;

    for(let i=0;i<dateLocks.length;i++){
        if(dateLocks[i].disabled){
            dateLocks[i].disabled=false;
        }
    }
    if(parent.querySelector('#serviceStartTime').disabled||parent.querySelector('#serviceEndTime').disabled){
        parent.querySelector('#serviceStartTime').disabled=false;
        parent.querySelector('#serviceEndTime').disabled=false;
    }

    matchDOMAndObject('value', '#', parent, course,false,1,0,"service");
    matchDOMAndObject('innerHTML', '#', parent, course,false,1,0,"service");

    controlCourseToAPIUpdate(null,course);

}


function affectToCreatedCourse(element){

    if(element.target){
        element=element.target;
    }
    let parent=getFirstParent(element,"className","genericRow");
    let course=parent.parentDomNode.course;

    let arrBtn=parent.parentDomNode.querySelectorAll("#"+element.id);
    let object=parent[parent.objectName];

    for(let i=0 ; i<arrBtn.length ;i++){
        arrBtn[i].innerHTML="Affect to course";
    }

    if(course[parent.parentIdName]){
        element.innerHTML="Affect to course";
        course[parent.parentIdName]=null;
        course[parent.objectName]=null;
    }
    else{
        element.innerHTML="Affected to course";
        course[parent.parentIdName]=object[parent.idName];
        course[parent.objectName]=object;
    }
}



function createDriversRow(args){

    let driverRow=args.domNode;
    let driver=args.element;
    let newCollapsedAddressRow=emptyCollapsedAddressRow.cloneNode(true);
    let affectBtn=driverRow.querySelector("#affectTo");

    driver.name=driver.lastname;
    newCollapsedAddressRow[args.objectName]=args.element;

    console.log(driverRow.parentDomNode.course);
    if(driverRow.parentDomNode.course&&driver.uid===driverRow.parentDomNode.course.userId){
        affectBtn.innerHTML="Affected to course";
    }
    else{
        affectBtn.innerHTML="Affect to course";
    }

    affectBtn.addEventListener("click",affectToCreatedCourse,false);


    matchDOMAndObject('value', '#', newCollapsedAddressRow, args.element.address);

    args.domNode.collapsedAddressRow=newCollapsedAddressRow.querySelector("#collapsedAddress");

    args.container.append(newCollapsedAddressRow);

    driverRow.driver=null;

    matchDOMAndObject('value', '#', driverRow, driver,false,null,"user");
    matchDOMAndObject('innerHTML', '#', driverRow, driver,false,null,"user");


    driverRow.driver=driver;
}

function createVehicleRow(args) {

    let vehicleRow = args.domNode;
    let vehicle = args.element;
    let affectBtn = vehicleRow.querySelector("#affectToCourse");

    vehicle.name=vehicle.description;

    if (vehicleRow.parentDomNode.course && vehicle.vid === vehicleRow.parentDomNode.course.vehicleId) {
        affectBtn.innerHTML = "Affected to course";
    } else {
        affectBtn.innerHTML = "Affect to course";
    }
}



function openMapModal(element){

    let mapModal=document.getElementById("mapModal");
    let courseRow=getFirstParent(element,"id","courseRow");
    mapModal.course=courseRow.course;

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
    let vehicleModal=document.getElementById("vehicleDriverModal");
    let tableContainer=vehicleModal.querySelector("#tableContainer");

    modalToggle('vehicleDriverModal');

    emptyVehiclesTable.course=parent.course;

    vehicleModal.modalBtn=element;
    vehicleModal.course=parent.course;
    vehicleModal.row=parent;
    parent.course.tmpObject=parent.course.vehicle;
    parent.course.tmpObjectName="vehicle";
    parent.course.tmpObjectId=parent.course.vehicle?parent.course.vehicle.vid:null;
    parent.course.tmpObjectIdName="vehicleId";


    vehicleModal.objectId="vehicleId";
    vehicleModal.objectName="vehicle";

    tableContainer.innerHTML="";


    tableContainer.append(emptyVehiclesTable);

    findVehiclesByFilter(emptyVehiclesTable);

}
function openDriversModal(element){

    let parent=getFirstParent(element,"id","courseRow");
    let driverModal=document.getElementById("vehicleDriverModal");
    let tableContainer=driverModal.querySelector("#tableContainer");

    modalToggle('vehicleDriverModal');

    emptyUsersTableCourse.course=parent.course;

    driverModal.modalBtn=element;
    driverModal.course=parent.course;
    driverModal.row=parent;

    parent.course.tmpObject=parent.course.user;
    parent.course.tmpObjectName="user";
    parent.course.tmpObjectId=parent.course.user?parent.course.user.uid:null;
    parent.course.tmpObjectIdName="userId";

    driverModal.objectId="userId";
    driverModal.objectName="user";

    tableContainer.innerHTML="";
    tableContainer.append(emptyUsersTableCourse);
    findDriversByFilter(emptyUsersTableCourse);

}

function closeVehicleDriverModal(element){

    let modal=document.getElementById("vehicleDriverModal");
    console.log(modal.objectName);
    console.log(modal.course);
    let object=modal.course[modal.objectName];

    console.log(modal.course);


    if(object){
        console.log(object);
        modal.modalBtn.innerHTML=object.name;
    }
    else{
        modal.modalBtn.innerHTML="Select vehicle";
    }
    modalToggle('vehicleDriverModal',"hide");
    controlCourseToAPIUpdate(modal.row,modal.course);

}

function controlCourseToAPIUpdate(element, course=null){

    let statusFlag=1;

    let filterObject={nameInput:null, routeStateSelect:null, createDateInput:null, courseDateInput:null,vehicleSelect:null};

    matchDOMAndObject("value","#",document.getElementById("coursesTableHeader"),filterObject,true);

    filterObject=replaceObjectKeys(filterObject,{name:"nameInput", status:"routeStateSelect", createDate:"createDateInput", serviceTime:"courseDateInput", vehicle:"vehicleSelect"});

    filterObject.vehicle.description=filterObject.vehicle;

    if(element&&!course){
        let courseRow=getFirstParent(element,"id","courseRow");
        let tmpCourse=getEmptyCourse();

        course=courseRow.course;

        copyObjectProperty(course,tmpCourse);
        matchDOMAndObject("value","#",courseRow,tmpCourse,true,1,0,"service");

        statusFlag=tmpCourse.status===course.status;

        if(!controlCourse(tmpCourse)){
            matchDOMAndObject("value","#",courseRow,course,false,1,0,"service");
            return false;
        }
        copyObjectProperty(tmpCourse,course);
    }
    else if(!controlCourse(course)){
        course[course.tmpObjectName]=course.tmpObject;
        course[course.tmpObjectIdName]=course.tmpObjectId;

        matchDOMAndObject("value","#",courseRow,course,false,1,0,"service");
        matchDOMAndObject("innerHTML","#",courseRow,course,false,1,0,"service");
        return false;
    }

    if(!course.affectations){
        course.affectations=[];
        course.affectations.push(getEmptyAffectation());
    }

    updateBasketByCourse(course);

    course.affectations[0].serid=course.serid;
    course.affectations[0].uid=course.user?course.user.uid:null;
    course.affectations[0].start=course.serviceTime;
    course.affectations[0].end=course.serviceEnd;


    if(!filterObjectOnObject(course,filterObject)||!statusFlag){
        courseRow.remove();
    }

    if(!course.affectations[0].affid){
        exchangeToAPI(ffwApiUrl+"/affectations",course.affectations[0],"POST",updateCourseApi,{course:course});
    }
    else{
        exchangeToAPI(ffwApiUrl+"/affectations",course.affectations[0],"PUT",updateCourseApi,{course:course});
    }
}

function updateCourseApi(element,args){

    args.query={
        completeDate:true
    }
    exchangeToAPI(ffwApiUrl+"/courses",args.course,"PUT",null,args);

}



function getEmptyAffectation(){

    return {
        affid:null,
        role:null,
        start:null,
        end:null,
        uid:null,
        serid:null,
        skid:null,
    };
}


function updateBasketByCourse(course){

    if(course.status==="deleted"){
        course.vehicleId=null;
        course.affectations[0].uid=null;
        for(let i=0;i<course.baskets.length;i++){
            course.baskets[i].serviceId=null;
            course.baskets[i].status="canceled";
            course.baskets[i].order=null;
            exchangeToAPI(ffwApiUrl+"/baskets",course.baskets[i],"PUT");
        }
    }
    else if(course.status==="finished"){
        for(let i=0;i<course.baskets.length;i++){
            course.baskets[i].status="delivered";
            exchangeToAPI(ffwApiUrl+"/baskets",course.baskets[i],"PUT");
        }
    }
    else if(course.status==="in progress"){
        for (let i = 0; i < course.baskets.length; i++) {
            course.baskets[i].status = "transit";
            exchangeToAPI(ffwApiUrl + "/baskets", course.baskets[i], "PUT");
        }
    }

}

function controlCourse(course){

    if(course.status==="validated"||course.status==="in progress"||course.status==="finished"){
        let endDateTime=getUnifiedDateTime(null,course.serviceEndDate,course.serviceEndTime);
        let startDateTime=getUnifiedDateTime(null,course.serviceStartDate,course.serviceStartTime);
        let now=getUnifiedDateTime();

        if(course.status==="finished"&&now.getTime()<endDateTime.getTime()) {
            return false;
        }
        if(course.status==="in progress"&& (now.getTime()<startDateTime.getTime()||now.getTime()>endDateTime.getTime())) {
            return false;
        }
        if(getUnifiedDateTime(course.createDate).getTime()>startDateTime.getTime()){
            return false;
        }
        if(!course.user||!course.vehicle){
            return false;
        }
    }
    return true;
}