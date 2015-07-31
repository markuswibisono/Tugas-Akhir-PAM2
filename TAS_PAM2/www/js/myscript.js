var serviceURL = "http://localhost/hotel/";
var hotel;

$('#main').bind('pageinit', function(event) {
    getDataHotel();
});

$('#refreshBtn').click(function() {
    getDataHotel();
});

function getDataHotel() {
    $.getJSON(serviceURL + 'lihatdata.php', function(data) {
        $('#hotellist li').remove();
        hotel = data.items;
        $.mobile.showPageLoadingMsg(true); // load spinner
        $.each(hotel, function(index, employee) {
            $('#hotellist').append('<li><a href="hoteldetail.html?id=' + employee.id + '" data-transition="slide">' +
                    '<img src="' + employee.img_url + '"/>' +
                    '<h4>' + employee.nama_hotel + '</h4>' +
                    '<p>' + employee.alamat_hotel + '</p></a></li>');
        });
        $('#hotellist').listview('refresh');
        $.mobile.hidePageLoadingMsg(); // hide spinner
    });

    $('#detailPage').live('pagebeforeshow', function(event) {
        var id = getUrlVars()["id"];
        $.getJSON(serviceURL + 'hoteldetail.php?id=' + id, displayHotel);
    });

    function displayHotel(data) {
        $.mobile.showPageLoadingMsg(true);
        var hotel = data.item;
        $('#employeePic').attr('src', hotel.img_url);
        $('#nama_hotel').text(hotel.nama_hotel);
        $('#address').text(hotel.alamat_hotel);
        $('#detailList').append('<li data-icon="false"><a href="mailto:' + hotel.email_hotel + '"><h3>Email</h3>' +
                '<p>' + hotel.email_hotel + '</p></a></li>');
        $('#detailList').append('<li data-icon="false"><a href="tel:' + hotel.telp_hotel + '"><h3>Call</h3>' +
                '<p>' + hotel.telp_hotel + '</p></a></li>');
        $('#detailList').listview('refresh');
        $('#editBtn').attr('href', 'hoteledit.html?id=' + hotel.id);
        $.mobile.hidePageLoadingMsg();
    }
    function getUrlVars() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

$('#saveBtn').click(function(){
    var _nama = $('#NamaHotel');
    var _alamat = $('#AlamatHotel');
    var _telepon = $('#TeleponHotel');
    var _email = $('#EmailHotel');
    var _img = $('#img');
    
    $.post(serviceURL+'inserthotel.php',{
        nama : _nama.val(),
         alamat : _alamat.val(),
        telp : _telepon.val(),
        email : _email.val(),
        img : _img.val()
    },function(data){
        _nama.val('');
        _alamat.val('');
        _email.val('');
        _img.val('');
        $.mobile.changePage('#savedDialog', 'pop', true, true);
            getDataHotel(); 
    });
    
});
}

$('#editPage').live('pagebeforeshow',function(event){     
     var id = getUrlVars()["id"];
     $.getJSON(serviceURL + 'hoteldetail.php?id='+id, editHotel);
});

//tampilkan form edit
function editHotel(data) {    
	var hotel = data.item;  
        $('#pegId').val(hotel.id);
	$('#editNama').val(hotel.nama_hotel);
	$('##editalamat').val(hotel.alamat_hotel);
	$('#edittelp').append(hotel.telp_hotel); 
        $('#editemail').val(hotel.email_hotel); 
         $('#editImg').val(hotel.img_url);   
    
        $('#updateBtn').click(function(){  
         var _id = $('#pegId');
         var _nama = $('#editNama');
         var _alamat = $('#editalamat');
         var _telp = $('#edittelp');
         var _email = $('#editemail');
         var _img = $('#editImg');
           
        $.post(serviceURL+'updatehotel.php',{
            id: _id.val(),
            nama_hotel : _nama.val(),
            alamat_hotel : _alamat.val(),
            telp_hotel : _alamat.val(),
            email_hotel : _email.val(),     
            img_url : _img.val()
        },function(data){            
            _id.val('');
            _nama.val('');
            _alamat.val('');
            _telp.val('');
            _email.val('');
            _img.val('');
            alert('Employee Updated!')
            getDataHotel();
        });         
    });
}