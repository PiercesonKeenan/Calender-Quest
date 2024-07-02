// Initialize variables for autocomplete objects
var autocompleteStart, autocompleteEnd;

// Initialize Autocomplete
function initAutocomplete() {
    autocompleteStart = new google.maps.places.Autocomplete(
        document.getElementById('start'), {
            types: ['establishment']
        });

    autocompleteEnd = new google.maps.places.Autocomplete(
        document.getElementById('end'), {
            types: ['establishment']
        });
}

function initMapasync() {
    initAutocomplete(); // Initialize autocomplete once API is loaded
}

// Load the Google Maps API
function loadScript() {
    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB-Ep4rBtq2tecPJgVqHYS9vt6vKwFLFuE&libraries=places&callback=initMapasync';
    script.defer = true;
    document.head.appendChild(script);
}

// Function to calculate distance
function calculateDistance() {
    var origin = document.getElementById('start').value;
    var destination = document.getElementById('end').value;
    var avoidHighways = document.getElementById('avoid-highways').checked;
    var avoidTolls = document.getElementById('avoid-tolls').checked;
    var mode = document.getElementById('mode').value;

    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode[mode],
        avoidHighways: avoidHighways,
        avoidTolls: avoidTolls,
        unitSystem: google.maps.UnitSystem.IMPERIAL 
    }, function(response, status) {
        if (status !== google.maps.DistanceMatrixStatus.OK) {
            alert('Error was: ' + status);
        } else {
            var originAddress = response.originAddresses[0];
            var destinationAddress = response.destinationAddresses[0];
            if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
                alert('Error: No route found');
            } else {
                var distance = response.rows[0].elements[0].distance.text;
                var duration = response.rows[0].elements[0].duration.text;
                var output = 'Distance: ' + distance + '<br> Duration: ' + duration;
                document.getElementById('output').innerHTML = output;
            }
        }
    });
}

loadScript();
