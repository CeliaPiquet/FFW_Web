var containerCompanyForm=document.getElementById("containerCompanyForm");
var companyAddressArr=[];

if(companies==null){
    companies=[];
}

window.onload=getAllCompaniesByUser;

function searchBySiren(){



    var sirenInput = document.getElementById("siren");
    var siren = sirenInput.value;

    if (siren.length == 9) {
        getSirenList(siren);
    }

}

function getAllCompaniesByUser(){


    console.log(arrAutocomplete);
    console.log(companies);


    changeFilledCompanyAddrForm();

}



function changeCompanyList(nbCompany){

    if(nbCompany==null){
        nbCompany=document.getElementById("nb").value;
    }
    companyAddressArr=containerCompanyForm.childNodes;

    if(companyAddressArr.length<nbCompany){
        companyAddressForm=getCompanyAddressForm(containerCompanyForm,nbCompany-companyAddressArr.length);
    }
    else{
        for(var i=companyAddressArr.length-1;companyAddressArr.length>nbCompany;i--){
            companyAddressArr[i].remove();
        }
    }

    return companyAddressArr;

}

function addEmptyCompanyAddrForm(emptyCompanyAddrForm,containerCompanyForm,nbCompanyAddressFormToAdd){

    for(var i = 0; i < nbCompanyAddressFormToAdd; i++){
        var element=emptyCompanyAddrForm.cloneNode(true);
        element.querySelector('button[id="removeCompany"]').addEventListener('click', removeCompany, false);
        element.querySelector('button[id="updateCompany"]').addEventListener('click', updateCompany, false);

        console.log(element);
        element.company=new Object();
        element.company.address=new Object();
        containerCompanyForm.appendChild(element);
        initAutocomplete();
    }
}

function getCompanyAddressForm(containerCompanyForm,nbCompanyAddressFormToAdd){

    var request = new XMLHttpRequest();
    console.log("sent");
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var parser =new  DOMParser();
            var companyAddressForm=parser.parseFromString(request.responseText,"text/html").getElementById("addressForm");
            addEmptyCompanyAddrForm(companyAddressForm, containerCompanyForm,nbCompanyAddressFormToAdd)
        }
    };
    var url = ffwApiUrl+"/account/getCompanyAddressForm";
    request.open('GET', url, false);
    request.send();
}

function getSirenList(siren) {

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {

            companies=companies.concat(JSON.parse(request.responseText));
            changeFilledCompanyAddrForm();
        }
    };
    var url = ffwApiUrl+"/company/listBySiren/" + siren;
    request.open('GET', url,false);
    request.send();

}


function changeFilledCompanyAddrForm(){


    if(companies.length==0){
        return false;
    }
    companiesMap= new Map();//Création d'un dictionnaire aux clés uniques;
    var uniqueCompanies=[];

    for(var company of companies){
        if(!companiesMap.has(company.siret)){
            companiesMap.set(company.siret,true);//Les clées sont basées sur les sirets si dans le tableau companies un siret est unique alors il est rajouté au tableau uniqueCompanies
            uniqueCompanies.push({
                coid:company.coid,
                siret:company.siret,
                status:company.status,
                name:company.name,
                tel:company.tel,
                addressId:company.addressId,
                address:company.address,
                userId:company.userId
            })
        }
    }

    companies=uniqueCompanies;
    companyAddressArr=changeCompanyList(companies.length);
    var i=companyAddressArr.length-companies.length;

    for(var company in companies){
        companyAddressArr[i].company= companies[company];
        companyAddressArr[i]=copyCompanyValuesToForm(companyAddressArr[i]);

        if(companies[company].coid!=null){
            companyAddressArr[i].querySelector('i[id="checkFlag"]').setAttribute("class","fas fa-check-double h1 mx-auto my-auto");
        }
        else{
            companyAddressArr[i].querySelector('i[id="checkFlag"]').setAttribute("class","far fa-check-circle h1 mx-auto my-auto");
        }
        i++;
    }
    document.getElementById("nb").value=companyAddressArr.length;
    document.getElementById("nb").setAttribute("min",companies.length);
    initAutocomplete();
}

function removeCompany(event){

    var element=event.target;
    while(element.id!="addressForm"&&element!=undefined){
        element=element.parentNode;
    }

    console.log(companyAddressArr);

    // var companyIndex= companyAddressArr.indexOf(element.company);

    if(element.company && element.company.coid!=null){
        companies.splice(companies.indexOf(element.company),1);
        console.log(element)
        element.company.status=0;
        updateCompanyAPI(element.company);
    }
    element.remove();
    document.getElementById("nb").value=companyAddressArr.length;
}

function updateCompany(event){

    var element=event.target;


    while(element.id!="addressForm"&&element!=undefined){
        element=element.parentNode;
    }

    var companyIndex= companies.indexOf(element.company);

    copyFormValuesToCompany(element);

    if(element.company==null || element.company.coid==null){
        element.company=createCompanyAPI(element.company);
    }
    else{
        element.company=updateCompanyAPI(element.company);
    }
}

function updateCompanyAPI(company){

    var request = new XMLHttpRequest();
    console.log(company);

    request.onreadystatechange = function () {
        if (request.readyState === 4) {

            if(request.status === 200){
                company=JSON.parse(request.responseText);
            }
            changeFilledCompanyAddrForm();

            return company;
        }
    };

    var url = ffwApiUrl+"/company/updateOne";
    request.open('PUT', url);
    request.send(JSON.stringify(company));

}

function createCompanyAPI(company){

    var request = new XMLHttpRequest();

    company.userId=userId;
    company.status=1;

    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {

            console.log(request.responseText);
            company=JSON.parse(request.responseText);
            companies.push(company);
            changeFilledCompanyAddrForm();
        }
    };

    console.log(JSON.stringify(company));
    var url = ffwApiUrl+"/company/createOne";
    request.open('POST', url);
    request.send(JSON.stringify(company));

}

function copyFormValuesToCompany(element){

    element.company.siret=element.querySelector('input[name="siret"]').value;
    element.company.name=element.querySelector('input[name="name"]').value;
    element.company.tel=element.querySelector('input[name="tel"]').value;
    element.company.address.houseNumber=element.querySelector('input[name="houseNumber"]').value;
    element.company.address.streetAddress=element.querySelector('input[name="streetAddress"]').value;
    element.company.address.complement=element.querySelector('input[name="complement"]').value;
    element.company.address.cityName=element.querySelector('input[name="cityName"]').value;
    element.company.address.cityCode=element.querySelector('input[name="cityCode"]').value;

    let selectedCountry=element.querySelector('select[name="country"]');
    element.company.address.country=selectedCountry.options[selectedCountry.selectedIndex].value;

    return element;

}

function copyCompanyValuesToForm(element){

    element.querySelector('button[id="removeCompany"]').addEventListener('click', removeCompany, false);
    element.querySelector('button[id="updateCompany"]').addEventListener('click', updateCompany, false);
    element.querySelector('input[name="siret"]').value=element.company.siret;
    element.querySelector('input[name="name"]').value=element.company.name;
    element.querySelector('input[name="tel"]').value=element.company.tel;
    element.querySelector('input[name="houseNumber"]').value=element.company.address.houseNumber;
    element.querySelector('input[name="streetAddress"]').value=element.company.address.streetAddress;
    element.querySelector('input[name="complement"]').value=element.company.address.complement;
    element.querySelector('input[name="cityName"]').value=element.company.address.cityName;
    element.querySelector('input[name="cityCode"]').value=element.company.address.cityCode;
    for(var j = 0; j < element.querySelector('select[name="country"]').options.length ; j++){
        if(element.querySelector('select[name="country"]').options[j].text==element.company.address.country)
            element.querySelector('select[name="country"]').options[j].selected=true;
    }

    return element;
}

