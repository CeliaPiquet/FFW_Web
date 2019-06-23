

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

function findBasketsByFilter(){

    arrBaskets=[];
    let filterObject={
        basketRoleSelect:null,
        basketStatusSelect:null,
        createDateInput:null
    }

    let course=document.getElementById("courseModal").course;
    if(!course.local){
        return null;
    }
    matchDOMAndObject("value","#",document.getElementById("basketsTableHeader"),filterObject,true);

    args={
        query:{
            offset:0,
            limit:20,
            status:filterObject.basketStatusSelect,
            role:filterObject.basketRoleSelect,
            createTime:filterObject.createDateInput,
            serviceId:false
        },
        emptyRow:emptyBasketRow,
        cityName:document.getElementById("cityNameInput").value,
        container:document.getElementById("basketRowsContainer"),
        role:filterObject.basketRoleSelect,
        course:course,
        baskets:arrBaskets,
        filterFunc:filterBaskets,
        specifyFunc:createBasketRow
    };
    exchangeToAPI(ffwApiUrl+"/baskets",arrBaskets,"GET",updateGenericsRow,args);
}


function findUsersByFilter(element){

    element=element.target;
    body=new Object();

    let filterObject={
        mailInput:null,
        lastnameInput:null,
        firstnameInput:null,
        cityInput:null
    }

    let parent=getFirstParent(element,"id","usersTable");
    let container=parent.querySelector("#userRowsContainer");
    let parentDomNode=getFirstParent(element,"id","collapsedBasketDestRow").parentDomNode;
    let arrUsers=[];

    matchDOMAndObject("value","#",parent,filterObject,true);

    console.log(filterObject);

    args={
        query:{
            offset:0,
            limit:20,
            email:filterObject.mailInput,
            lastname:filterObject.lastnameInput,
            firstname:filterObject.firstnameInput,
            cityName:filterObject.cityInput
        },
        container:container,
        emptyRow:emptyUserRow,
        parentDomNode:parentDomNode,
        objectName:"user",
        idName:"uid",
        parentIdName:"userId",
        specifyFunc:createSubBasketRow

    };

    exchangeToAPI(ffwApiUrl+"/users",arrUsers,"GET",updateGenericsRow,args);

}

function findExternalsByFilter(element){

    body=new Object();

    let filterObject={
        mailInput:null,
        nameInput:null,
        cityInput:null
    };

    let parent=getFirstParent(element,"id","externalsTable");
    let container=parent.querySelector("#externalRowsContainer");
    let parentDomNode=getFirstParent(element,"id","collapsedBasketDestRow").parentDomNode;
    let arrExternals=[];

    console.log(filterObject);

    matchDOMAndObject("value","#",parent,filterObject,true);

    console.log(filterObject);

    args={
        query:{
            offset:0,
            limit:20,
            email:filterObject.mailInput,
            name:filterObject.nameInput,
            cityName:filterObject.cityInput
        },
        container:container,
        emptyRow:emptyExternalRow,
        parentDomNode:parentDomNode,
        objectName:"external",
        idName:"exid",
        parentIdName:"externalId",
        specifyFunc:createSubBasketRow


    };

    exchangeToAPI(ffwApiUrl+"/externals",arrExternals,"GET",updateGenericsRow,args);
}

function findCompaniesByFilter(element){

    body=new Object();

    let filterObject={
        siretInput:null,
        nameInput:null,
        cityInput:null
    };

    let parent=getFirstParent(element,"id","companiesTable");
    let container=parent.querySelector("#companyRowsContainer");
    let parentDomNode=getFirstParent(element,"id","collapsedBasketDestRow").parentDomNode;

    let arrCompanies=[];


    matchDOMAndObject("value","#",parent,filterObject,true);

    args={
        query:{
            offset:0,
            limit:20,
            email:filterObject.emailInput,
            name:filterObject.nameInput,
            cityName:filterObject.cityInput
        },
        container:container,
        emptyRow:emptyCompanyRow,
        parentDomNode:parentDomNode,
        objectName:"company",
        idName:"coid",
        parentIdName:"companyId",
        specifyFunc:createSubBasketRow

    };

    exchangeToAPI(ffwApiUrl+"/companies",arrCompanies,"GET",updateGenericsRow,args);
}


function findLocalsByFilter(element){

    let filterObject={
        nameInput:null,
        cityInput:null
    };

    let parent=getFirstParent(element,"id","localsTable");
    let container=parent.querySelector("#localRowsContainer");
    let parentDomNode=document.getElementById("courseModal");
    let arrLocals=[];


    console.log(container);
    matchDOMAndObject("value","#",parent,filterObject,true);

    let args={
        query:{
            offset:0,
            limit:20,
            name:filterObject.nameInput,
            cityName:filterObject.cityInput,
            completeData:true
        },
        container:container,
        emptyRow:emptyLocalRow,
        parentDomNode:parentDomNode,
        objectName:"local",
        idName:"loid",
        parentIdName:"localId",
        specifyFunc:createLocalRow
    };

    exchangeToAPI(ffwApiUrl+"/locals",arrLocals,"GET",updateGenericsRow,args);
}


function findVehiclesByFilter(element){

    let filterObject={
        descriptionInput:null,
        volumeInput:null,
        insuranceDateInput:null,
        lastRevisionInput:null
    };

    let parent=getFirstParent(element,"id","vehiclesTable");
    let container=parent.querySelector("#vehicleRowsContainer");
    let arrVehicles=[];

    console.log(container);
    matchDOMAndObject("value","#",parent,filterObject,true);

    let args={
        query:{
            offset:0,
            limit:20,
            description:filterObject.descriptionInput,
            volume:filterObject.volumeInput,
            insuranceDate:filterObject.insuranceDateInput,
            lastRevision:filterObject.lastRevisionInput,
            completeData:true
        },
        container:container,
        emptyRow:emptyVehicleRow,
        parentDomNode:parent,
        objectName:"vehicle",
        idName:"vid",
        course:parent.course,
        parentIdName:"vehicleId",
        filterFunc:filterVehicles
    };

    exchangeToAPI(ffwApiUrl+"/vehicles",arrVehicles,"GET",updateGenericsRow,args);
}

function filterBaskets(element,args){

    console.log(element);
    console.log(args);

    let arrBaskets=element;
    let course=args.course;
    let cityName=args.cityName;
    let filteredBasketArr=[];

    console.log(cityName);

    for(let i=0 ; i<arrBaskets.length;i++){
        let basketCity= arrBaskets[i].srcAddress&&arrBaskets[i].srcAddress.cityName?arrBaskets[i].srcAddress.cityName.toLowerCase():null;
        if((cityName&&basketCity&&basketCity.includes(cityName.toLowerCase()))||cityName===""){
            console.log(arrBaskets[i]);
            console.log(course.localId);
            if(args.role==="export"&&arrBaskets[i].local&&arrBaskets[i].local.loid===course.localId){

                filteredBasketArr.push(arrBaskets[i]);
            }
            else if(args.role==="import"){
                filteredBasketArr.push(arrBaskets[i]);
            }
        }
    }

    console.log(filteredBasketArr);
    element=filteredBasketArr;
    return element;
}

function filterVehicles(element){


    let arrVehicles=element;
    let filteredArrVehicles=[];

    for(let i=0 ; i<arrVehicles.length ;i++){
        if(arrVehicles[i].services){
            let availabilityFlag=1;
            console.log(arrVehicles[i].services);
            for(let j=0; j<arrVehicles[i].services.length; j++){
                let vServiceStartDateTime=new Date(arrVehicles[i].services.serviceTime.replace(' ','T'));
                let vServiceEndDateTime=new Date(arrVehicles[i].services.serviceEnd.replace(' ','T'));

                vServiceStartDateTime=vServiceStartDateTime.setMinutes(vServiceStartDateTime.getMinutes()-vServiceStartDateTime.getTimezoneOffset());
                vServiceEndDateTime=vServiceEndDateTime.setMinutes(vServiceEndDateTime.getMinutes()-vServiceEndDateTime.getTimezoneOffset());

                if(vServiceStartDateTime.getTime()<course.calculateEndDate.getTime()&&vServiceEndDateTime.getTime()>course.calculateStartDate.getTime()){
                    availabilityFlag=0;
                }
            }
            if(availabilityFlag){
                filteredArrVehicles.push(arrVehicles[i])
            }
        }
        else{
            filteredArrVehicles.push(arrVehicles[i]);
        }
    }

    return filteredArrVehicles;
}