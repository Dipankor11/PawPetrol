// ========================================
// HOME PAGE NAVIGATION
// ========================================

function openReport() {

    window.location.href = "report.html";

}


function openServices() {

    window.location.href = "services.html";

}


function openLogin() {

    window.location.href = "login.html";

}


function goHome() {

    window.location.href = "index.html";

}



// ========================================
// REPORT ANIMAL - LOCATION
// ========================================

function getReportLocation() {

    const input =
        document.getElementById("reportLocation");

    const status =
        document.getElementById("reportLocationStatus");


    if (!navigator.geolocation) {

        status.textContent =
            "❌ Your browser does not support location.";

        return;

    }


    status.textContent =
        "📍 Getting your location...";


    navigator.geolocation.getCurrentPosition(

        function(position) {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;


            input.value =
                `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;


            status.textContent =
                "✅ Location detected successfully.";

        },


        function() {

            status.textContent =
                "❌ Location permission denied. Please enter your location manually.";

        }

    );

}



// ========================================
// REPORT SUBMISSION
// ========================================

const reportForm =
    document.getElementById("reportForm");


if (reportForm) {

    reportForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const condition =
                document.getElementById("condition").value;


            const animal =
                document.getElementById("animalType").value;


            const location =
                document.getElementById("reportLocation").value;


            const name =
                document.getElementById("reporterName").value;


            const phone =
                document.getElementById("reporterPhone").value;

window.location.href = "submitted.html";
            // Save information temporarily

            localStorage.setItem(
                "reportCondition",
                condition
            );


            localStorage.setItem(
                "reportAnimal",
                animal
            );


            localStorage.setItem(
                "reportLocation",
                location
            );


            localStorage.setItem(
                "reporterName",
                name
            );


            localStorage.setItem(
                "reporterPhone",
                phone
            );


            // Open submitted page

            window.location.href =
                "submitted.html";

        }
    );

}



// ========================================
// SERVICE DATABASE
// ========================================

// DEMO DATA FOR HACKATHON PROTOTYPE

const services = [

    {
        name: "Shillong Animal Hospital",
        type: "Hospital",
        state: "Meghalaya",
        city: "Shillong",
        address: "Shillong, Meghalaya",
        phone: "0000000000"
    },


    {
        name: "Paw Friends Pet Store",
        type: "Pet Store",
        state: "Meghalaya",
        city: "Shillong",
        address: "Shillong, Meghalaya",
        phone: "0000000000"
    },


    {
        name: "Tura Animal Care Centre",
        type: "Hospital",
        state: "Meghalaya",
        city: "Tura",
        address: "Tura, Meghalaya",
        phone: "0000000000"
    },


    {
        name: "Tura Pet Supplies",
        type: "Pet Store",
        state: "Meghalaya",
        city: "Tura",
        address: "Tura, Meghalaya",
        phone: "0000000000"
    },


    {
        name: "Imphal Animal Care Hospital",
        type: "Hospital",
        state: "Manipur",
        city: "Imphal",
        address: "Imphal, Manipur",
        phone: "0000000000"
    },


    {
        name: "Imphal Pet World",
        type: "Pet Store",
        state: "Manipur",
        city: "Imphal",
        address: "Imphal, Manipur",
        phone: "0000000000"
    },


    {
        name: "Guwahati Animal Hospital",
        type: "Hospital",
        state: "Assam",
        city: "Guwahati",
        address: "Guwahati, Assam",
        phone: "0000000000"
    },


    {
        name: "Guwahati Pet Mart",
        type: "Pet Store",
        state: "Assam",
        city: "Guwahati",
        address: "Guwahati, Assam",
        phone: "0000000000"
    }

];



// ========================================
// CITY LIST
// ========================================

const cityList = {

    Meghalaya: [
        "Shillong",
        "Tura"
    ],

    Manipur: [
        "Imphal"
    ],

    Assam: [
        "Guwahati"
    ]

};



const stateSelect =
    document.getElementById("state");


if (stateSelect) {

    stateSelect.addEventListener(
        "change",
        function() {

            const citySelect =
                document.getElementById("city");


            citySelect.innerHTML =
                '<option value="">Select City</option>';


            const selectedState =
                this.value;


            if (cityList[selectedState]) {

                cityList[selectedState].forEach(
                    function(city) {

                        const option =
                            document.createElement("option");

                        option.value = city;

                        option.textContent = city;

                        citySelect.appendChild(option);

                    }
                );

            }

        }
    );

}



// ========================================
// SEARCH SERVICES
// ========================================

function findServices() {

    const state =
        document.getElementById("state").value;


    const city =
        document.getElementById("city").value;


    const type =
        document.getElementById("serviceType").value;


    const results =
        document.getElementById("serviceResults");


    if (!state || !city) {

        results.innerHTML = `

            <div class="no-results">

                ⚠️ Please select both
                State and City.

            </div>

        `;

        return;

    }


    let filtered =
        services.filter(function(service) {

            return service.state === state &&
                   service.city === city;

        });


    if (type !== "All") {

        filtered =
            filtered.filter(function(service) {

                return service.type === type;

            });

    }


    if (filtered.length === 0) {

        results.innerHTML = `

            <div class="no-results">

                😔 No services found
                for this location.

            </div>

        `;

        return;

    }


    results.innerHTML = "";


    filtered.forEach(function(service) {


        const icon =
            service.type === "Hospital"
            ? "🏥"
            : "🛍️";


        const card =
            document.createElement("div");


        card.className =
            "service-card";


        card.innerHTML = `

            <div class="service-icon">

                ${icon}

            </div>


            <div class="service-info">

                <h3>
                    ${service.name}
                </h3>


                <p>

                    <strong>
                        ${service.type}
                    </strong>

                </p>


                <p>
                    📍 ${service.address}
                </p>


                <p>
                    📞 ${service.phone}
                </p>


                <a
                    href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(service.name + " " + service.address)}"
                    target="_blank"
                    class="map-button"
                >

                    🗺️ Open in Google Maps

                </a>

            </div>

        `;


        results.appendChild(card);

    });

}



// ========================================
// USE CURRENT LOCATION FOR SERVICES
// ========================================

function useServiceLocation() {

    const status =
        document.getElementById(
            "serviceLocationStatus"
        );


    if (!navigator.geolocation) {

        status.textContent =
            "❌ Location is not supported.";

        return;

    }


    status.textContent =
        "📍 Detecting your location...";


    navigator.geolocation.getCurrentPosition(

        function(position) {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;


            status.innerHTML = `

                ✅ Location detected.

                <br>

                <small>
                    ${latitude.toFixed(5)},
                    ${longitude.toFixed(5)}
                </small>

            `;


            // Open Google Maps nearby search

            window.open(

                `https://www.google.com/maps/search/animal+hospital+pet+store/@${latitude},${longitude},14z`,

                "_blank"

            );

        },


        function() {

            status.textContent =
                "❌ Location permission denied.";

        }

    );

}
// ========================================
// IMAGE UPLOAD
// ========================================

const animalImage =
    document.getElementById("animalImage");

const imageName =
    document.getElementById("imageName");


if (animalImage) {

    animalImage.addEventListener("change", function() {

        if (this.files.length > 0) {

            imageName.textContent =
                "✅ " + this.files[0].name;

        }

    });

}
