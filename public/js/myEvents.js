
getEvents();

function getEvents(){

    let arrAffectations=[];


    args={
        id:user.uid,
        subTarget:"affectations",
        query:{
            offset:0,
            limit:20,
            completeData:true,
        }
    };


    exchangeToAPI(ffwApiUrl+"/users",arrAffectations,"GET",updateCalendarEvents,args);
}

function updateCalendarEvents(element,args){

    let calendar=document.getElementById("calendar").calendar;

    let arrEvents=[];
    console.log(args);

    for(let key in element){
        console.log(element[key]);
        arrEvents.push({
            title : element[key].service.name,
            start:element[key].start,
            end:element[key].end
        })
    }


    calendar.addEventSource(arrEvents);

    calendar.eventRender=function(info){
        console.log(info);
    }

}

