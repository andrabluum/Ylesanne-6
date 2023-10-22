(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let oopaev = "EL"; //ennelõunat või pealelõunat

            if (h >= 12){
                h = h-12;
                oopaev = "PL";
            }
            if (h == 0){
                oopaev = 'EL'
                h = 12;
            }

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }
            

            c.innerHTML = h + ":" + m + ":" + s + ' ' + oopaev;
            
        };
        
    });
    
    // forms
    
    //Ma mõtlesin, et kuna ma tean, mis miski maksab, siis ma pannen need array'sse. Ma ise tean, mis indeksil, mille hind on. 
    
    // Tallinn - indeks 0, Tartu - 1, Narva - 2, Pärnu - 3, Kingitus - 4, Kontaktivaba tarne - 5.
    let hinnad = [0, 2.5, 2.5, 3, 5, 1];
    //let values = ['Tallinn', 'Tartu', 'Narva', 'P&auml;rnu', 'present', 'contactless']
    let dropdown = document.getElementById('linn');
    let lõppHind = 0.0;
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");

    e.innerHTML = "0,00 &euro;";

    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let linn = document.getElementById("linn");

        if (linn.value === "") {
            alert("Palun valige linn nimekirjast");
            linn.focus();
            return;
            
        }
        
        if(!document.getElementById("tarne1").checked && !document.getElementById("tarne2").checked){
            alert("Palun valige tarneviis");
            return;
        } 
        if(document.getElementById("fname").value === "" || document.getElementById("lname").value === ""){
            alert("Ees- või perekonnanime väli ei tohi olla tühi");
            return;
        }
        if(/\d/.test(document.getElementById("fname").value) || /\d/.test(document.getElementById("lname").value)){
            alert("Ees- või pereonnanime väli ei tohi sisaldada numbreid");
            return;
        }
        else {
            
            let cb1 = document.getElementById('v1');
            let cb2= document.getElementById('v2');
            //Kalkuleerime hinna
            //Dropdowni element - indeksiga
            //Tallinn - 1, Tartu - 2, Narva - 3, Pärnu - 4
            if (linn.value === 'trt' || linn.value == 'nrv'){
                lõppHind += 2.5;
                
            }
            if(linn.value == 'prn'){
                lõppHind += 3;
                
            }
            if (cb1.checked){
                lõppHind += 5;
                
            }
            if (cb2.checked){
                lõppHind += 1;
                
            }
                       
            e.innerHTML = lõppHind + ' €';
            
        }        
        
        console.log("Tarne hind on arvutatud");
        //document.getElementById("form").reset();
    }
    
    
})();

// map

let mapAPIKey = "AlYvRkBS4D5J24x7mUBwZEgiSxWuN1thrXdCpuG94_mPxlO1zGynR9r6zLuyfq-P"; //Ma muutsin seda
let map;
let infobox;

function GetMap() {
    
    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );
    
    let centerPoint2 = new Microsoft.Maps.Location(
            59.442688, 
            24.7531967
        );
    // Arvutame keskpunkti 
    let centerLat = (58.38104+59.442688) /2;     
    let centerLon = (26.71992+24.7531967) /2;   
    let center = new Microsoft.Maps.Location(
        centerLat, 
        centerLon
    );
    
    
    //Kaardi muutmine. Võetud siit: https://learn.microsoft.com/en-us/bingmaps/articles/custom-map-styles-in-bing-maps
    var myStyle = {
        "elements": {
            "water": { "fillColor": "#2596be" },
            "waterPoint": { "iconColor": "#62517c" },
            "transportation": { "strokeColor": "#de99eb" },
            "road": { "fillColor": "#48583f" },
            "railway": { "strokeColor": "#f48cbf" },
            "structure": { "fillColor": "#984985" },
            "runway": { "fillColor": "#ff7fed" },
            "area": { "fillColor": "#74876a" },
            "political": { "borderStrokeColor": "#fe6850", "borderOutlineColor": "#55ffff" },
            "point": { "iconColor": "#ffffff", "fillColor": "#FF6FA0", "strokeColor": "#DB4680" },
            "transit": { "fillColor": "#AA6DE0" }
        },
        "version": "1.0" 
    };

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: center,
        zoom: 7,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true,
        customMapStyle: myStyle
    });

    //Infobox for markers
    //Help from here: https://learn.microsoft.com/en-us/bingmaps/v8-web-control/map-control-concepts/infoboxes/infobox-when-pushpin-clicked
    infobox = new Microsoft.Maps.Infobox(centerPoint, {
        visible: false
    });

    infobox.setMap(map);

    let pushpin = new Microsoft.Maps.Pushpin(centerPoint, {
            title: 'Tartu Ülikool',
            description: 'Tartu Ülikool',
            })
            //subTitle: 'Hea koht',
            //text: 'UT'
        
    pushpin.metadata =  {
        title: 'Tartu Ülikool',
        description: 'Tartu Ülikool, mis asub Tartus'
    };
    let pushpin2 = new Microsoft.Maps.Pushpin(centerPoint2, {
            title: 'Tallinn',
            description: 'Tallinna kaubamaja',
            //subTitle: 'Kaubamaja',
            //text: 'Tallinna kaubamaja'
        });
        pushpin2.metadata = {
                title: 'Tallinna kaubamaja',
                description: 'Kaubamaja, mis asub Tallinnas'
            }

    Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked);
    map.entities.push(pushpin);
    map.entities.push(pushpin2);
    


}
function pushpinClicked(e) {
    
    if (e.target.metadata) {
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

