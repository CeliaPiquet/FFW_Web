

function findEventByFilter(){

    arrEvents=[];
    let filterObject={
        nameInput:null,
        eventStateSelect:null,
        createDateInput:null,
        eventDateInput:null,
        publicSelect:null
    };

    matchDOMAndObject("value","#",document.getElementById("eventsTableHeader"),filterObject,true);

    console.log(filterObject);

    args={
        query:{
            offset:0,
            limit:20,
            name:filterObject.nameInput,
            state:filterObject.eventStateSelect,
            createTime:filterObject.createDateInput,
            serviceTime : filterObject.eventDateInput,
            isPublic : filterObject.publicSelect,
            completeData:true
        }
    };

    console.log(args.query);

    exchangeToAPI(ffwApiUrl+"/courses",arrEvents,"GET",updateEditRows,args);

}