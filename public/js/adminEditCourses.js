var arrCourses;
var emptyCourseRow;

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
            serviceTime : filterObject.courseDateInput,
            completeData:true
        }
    };

    exchangeToAPI(ffwApiUrl+"/courses",arrCourses,"GET",updateCourseRows,args);

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

function createCourseRow(course,container){

    newCourseRow=emptyCourseRow.cloneNode(true);
    newCourseRow.service=course;
    console.log(newCourseRow);

    console.log(course);

    matchDOMAndObject('value', '#', newCourseRow, course,false,null,"service");

    container.append(newCourseRow);

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
