
var placeSearch, arrAutocomplete=[];

var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    country: 'long_name',
    postal_code: 'short_name'
};


function initAutocomplete(){

    inputs=document.getElementsByName("autocomplete");

    for(var i=0 ; i< inputs.length ; i++){

        arrAutocomplete[i]=new google.maps.places.Autocomplete( inputs[i], {types: ['geocode']});
        arrAutocomplete[i].addListener('place_changed', fillInAddress);
        arrAutocomplete[i].setFields(['address_component']);
        arrAutocomplete[i].input=inputs[i];
    }

}

function fillInAddress() {

    element=this.input;

    // Get the place details from the autocomplete object.
    var place = this.getPlace();

    element=getFirstParent(element,"id","addressForm");
    for (var component in componentForm) {
        console.log(componentForm[component]);
        element.querySelector("#"+component).value = '';
        element.querySelector("#"+component).disabled=false;
        console.log(element.querySelector("#"+component));
    }

    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.

    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];

        if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            var domElement;

            if(addressType=="country"){
                domElement=element.querySelector('select[id="'+addressType+'"]');
                for(var j=0 ; j<domElement.options.length;j++){
                    if(domElement.options[j].innerHTML==val){
                        domElement.options[j].selected=true;
                    }
                }
            }
            else{
                domElement=element.querySelector('input[id="'+addressType+'"]');
                domElement.value = val;
            }
        }
    }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle(
                {center: geolocation, radius: position.coords.accuracy});
            autocomplete.setBounds(circle.getBounds());
        });
    }
}
