var namaToko = "";
var toko1 = new google.maps.LatLng(-7.3304510, 110.5037740);
var toko2 = new google.maps.LatLng(-7.3265390, 110.5046580);
var toko3 = new google.maps.LatLng(-7.3316900, 110.5039900);
var toko4 = new google.maps.LatLng(-7.3327679, 110.5055100);
var toko5 = new google.maps.LatLng(-7.3248136, 110.5050564);
var toko6 = new google.maps.LatLng(-7.3302413, 110.5034625);

var tampungKoordinat;

function getTampungKoordinat() {
    if (tampungKoordinat == null) {
        $.mobile.changePage('#warningDialog', 'pop', true, true);
        alert('Toko belum dipilih');
    } else {
        return this.tampungKoordinat;
    }
    return null;
}

// menentukan koordinat titik peta
var myKos = new google.maps.LatLng(-7.3152592, 110.4982408);
var tengah = new google.maps.LatLng(-7.3282144, 110.5044851);
var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();



function pindah(url) {
    window.location = url;
}

function webpage() {
    if (namaToko == "callista") {
        pindah('toko/toko-callista.html');
    } else if (namaToko == "felicia_jensud") {
        pindah('toko/toko-felicia_jensud.html');
    } else if (namaToko == "felicia_sukowati") {
        pindah('toko/toko-felicia_sukowati.html');
    } else if (namaToko == "msons_kids") {
        pindah('toko/toko-msons_kids.html');
    } else if (namaToko == "ramayana") {
        pindah('toko/toko-ramayana.html');
    } else {
        $.mobile.changePage('#warningDialog', 'pop', true, true);
        alert('Toko belum dipilih');
    }
}

function calcRoute() {
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
}

function cari(tujuan) {
    var defaultLatLng = myKos;

    if (navigator.geolocation) {
        function success(pos) {
            drawMap(pos.coords.latitude, pos.coords.longitude);
        }

        function fail(error) {
            drawMap(defaultLatLng);
        }

        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy: true, timeout: 6000});

    } else {
        drawMap(defaultLatLng);
    }

    function drawMap(lat, lng) {
        var myOption = {
            zoom: 15, center: new google.maps.LatLng(lat, lng),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"), myOptions);
        var markerorigin = new google.maps.Marker({
            position: new google.maps.LatLng(parseFloat(lat), parseFloat(lng)),
            map: map,
            title: "Origin",
            visible: false
        });

        var request = {
            origin: markerorigin.getPosition(),
            destination: dest,
            provideRouteAlternatives: true,
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });
//        // menampiklkan rute pada peta dan juga direction panel sebagai petunjuk text
        directionsDisplay.setMap(map);
        //directionsDisplay.setPanel(document.getElementById('directions-panel'));

        // menampilkan layer traffic atau lalu-lintas pada peta
        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);
    }
}

function initialize()
{
    // pengaturan zoom dan titik tengah peta
    var myOptions = {
        zoom: 15,
        center: tengah
    };

    directionsDisplay = new google.maps.DirectionsRenderer();

    // menampilkan output pada element
    var map = new google.maps.Map(document.getElementById("map"), myOptions);
    directionsDisplay.setMap(map);

    // menambahkan marker
    var marker = new google.maps.Marker({
        position: myKos,
        map: map,
        title: 'Kos Willy'
    });
    var infoKosWilly = new google.maps.InfoWindow({
        content: 'Kos Willy'
    });
    google.maps.event.addListener(marker, 'click', function() {
        map.setZoom(17);
        map.setCenter(marker.getPosition());
        infoKosWilly.open(map, marker);
        namaToko = "kos willy";
    });

    // marker toko 1
    var marker1 = new google.maps.Marker({
        position: toko1,
        map: map,
        title: 'Toko1'
    });
    var infoToko1 = new google.maps.InfoWindow({
        content: 'Toko Callista'
    });

    google.maps.event.addListener(marker1, 'click', function() {
        map.setZoom(17);
        map.setCenter(marker1.getPosition());
        infoToko1.open(map, marker1);
        namaToko = "callista";
        tampungKoordinat = toko1;
    });

    // marker toko 2
    var marker2 = new google.maps.Marker({
        position: toko2,
        map: map,
        title: 'Toko2'
    });
    var infoToko2 = new google.maps.InfoWindow({
        content: 'Toko Felicia Jensud'
    });

    google.maps.event.addListener(marker2, 'click', function() {
        map.setZoom(17);
        map.setCenter(marker2.getPosition());
        infoToko2.open(map, marker2);
        namaToko = "felicia_jensud";
        tampungKoordinat = toko2;
    });

    // toko 3
    var marker3 = new google.maps.Marker({
        position: toko3,
        map: map,
        title: 'Toko3'
    });
    var infoToko3 = new google.maps.InfoWindow({
        content: 'Toko Felicia Sukowati'
    });

    google.maps.event.addListener(marker3, 'click', function() {
        map.setZoom(17);
        map.setCenter(marker3.getPosition());
        infoToko3.open(map, marker3);
        namaToko = "felicia_sukowati";
        tampungKoordinat = toko3;
    });

    // toko 4
    var marker4 = new google.maps.Marker({
        position: toko4,
        map: map,
        title: 'Toko4'
    });
    var infoToko4 = new google.maps.InfoWindow({
        content: 'Toko MsonS Kids'
    });

    google.maps.event.addListener(marker4, 'click', function() {
        map.setZoom(17);
        map.setCenter(marker4.getPosition());
        infoToko4.open(map, marker4);
        namaToko = "msons_kids";
        tampungKoordinat = toko4;
    });

    // toko 5
    var marker5 = new google.maps.Marker({
        position: toko5,
        map: map,
        title: 'Toko5'
    });
    var infoToko5 = new google.maps.InfoWindow({
        content: 'Ramayana'
    });

    google.maps.event.addListener(marker5, 'click', function() {
        map.setZoom(17);
        map.setCenter(marker5.getPosition());
        infoToko5.open(map, marker5);
        namaToko = "ramayana";
        tampungKoordinat = toko5;
    });

    // toko 6
    var marker6 = new google.maps.Marker({
        position: toko6,
        map: map,
        title: 'Toko6'
    });
    var infoToko6 = new google.maps.InfoWindow({
        content: 'Natali'
    });

    google.maps.event.addListener(marker6, 'click', function() {
        map.setZoom(17);
        map.setCenter(marker6.getPosition());
        infoToko6.open(map, marker6);
        namaToko = "natali";
        tampungKoordinat = toko6;
    });

}
google.maps.event.addDomListener(window, 'load', initialize);