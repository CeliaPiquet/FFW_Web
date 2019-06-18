
function findBasketsByFilter(){

    arrBaskets=[];
    let filterObject={
        basketRoleSelect:null,
        createDateInput:null
    }

    matchDOMAndObject("value","#",document.getElementById("basketsTableHeader"),filterObject,true);

    args={
        query:{
            offset:0,
            limit:20,
            status:"validated",
            role:basketRoleSelect,
            createTime:filterObject.createDateInput
        },
        role:filterObject.basketRoleSelect
    };
    console.log(args.query);
    console.log("COUCOU");


    exchangeToAPI(ffwApiUrl+"/baskets",arrBaskets,"GET",updateBasketRows,args);
}


function findUsersByFilter(element){

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
        objectIdName:"exid",
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


function findBasketsByFilter(){

    let arrBaskets=document.getElementById("courseModal").arrBaskets;
    arrBaskets=[];

    let filterObject={
        basketRoleSelect:null,
        createDateInput:null
    }

    matchDOMAndObject("value","#",document.getElementById("basketsTableHeader"),filterObject,true);

    args={
        query:{
            offset:0,
            limit:20,
            serviceId:false,
            role:filterObject.basketRoleSelect,
        },
        role:filterObject.basketRoleSelect
    };

    exchangeToAPI(ffwApiUrl+"/baskets",arrBaskets,"GET",updateBasketRows,args);

}
