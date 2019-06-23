

var arrEvents;
var emptyEventRow;

loadExternalDOMElement([
    {url:websiteRoot+"/adminEvents/eventRow",func:getEmptyEventRow}

]);


function getEmptyEventRow(domText) {
    emptyEventRow=prepareEmptyDomElement('tr',{className:"align-items-center",id:"eventRow",innerHTML:domText});
}


function updateCourseRows(element){

    arrEvents=[];
    arrEvents=element;

    console.log(element);
    let eventRowContainer=document.getElementById("eventsRowsContainer");
    eventRowContainer.innerHTML="";

    for(let i=0 ; i<arrEvents.length; i++){
        createEventRow(arrEvents[i],eventRowContainer);
    }
}


function createEventRow(event,container){
    
    let newEventRow=emptyEventRow.cloneNode(true);
    let startDateTime=event.serviceTime;
    let endDateTime=event.serviceEnd;

    console.log(event.serviceTime);

    event.serviceStartTime=startDateTime?startDateTime.split(' ')[1]:null;
    event.serviceStartDate=startDateTime?startDateTime.split(' ')[0]:null;

    event.serviceEndTime=endDateTime?endDateTime.split(' ')[1]:null;
    event.serviceEndDate=endDateTime?endDateTime.split(' ')[0]:null;
    event.durationTime=secondsToHms(event.duration);

    let dates=synchronizeStartEnd(event.serviceStartDate,event.serviceStartTime,event.duration);
    event.calculateStartDate=dates.baseDate;
    event.calculateEndDate=dates.calculateDate;

    event.createDate=event.createTime?event.createTime.split(' ')[0]:null;

    newEventRow.querySelector("#serviceStartDate").min=event.createDate;
    newEventRow.querySelector("#serviceEndDate").min=event.createDate;

    if(event.status=="deleted"||event.status=="finished"){
        let arrInput=newEventRow.querySelectorAll("[name='eventInput']");
        for(let i=0; i<arrInput.length; i++){
            arrInput[i].disabled=true;
        }
    }
    newEventRow.service=event;

    matchDOMAndObject('value', '#', newEventRow, event,false,null,0,"service");
    matchDOMAndObject('innerHTML', '#', newEventRow, event,false,null,0,"service");

    // newCollapsedBasketRow.courseRow=newEventRow;
    // newCollapsedBasketRow.course=event;
    // newEventRow.collapsedBasketRow=newCollapsedBasketRow.querySelector("#collapsedBasketRow");
    //
    // let args={
    //     emptyRow:emptyBasketRow,
    //     cityName:document.getElementById("cityNameInput").value,
    //     container:newCollapsedBasketRow.querySelector("#basketRowsContainer"),
    //     course:event,
    //     baskets:event.baskets,
    //     specifyFunc:createCourseBasketRow
    // }
    //
    // updateGenericsRow(event.baskets,args);

    container.append(newEventRow);
    // container.append(newCollapsedBasketRow);

}
