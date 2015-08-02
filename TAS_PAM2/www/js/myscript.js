var serviceURL = "http://localhost/TR.PAM2/";
           
var DataBoneka;
    
$('#main').bind('pageinit', function(event) {               
    getDataBoneka();
});
            
$('#refreshBtn').click(function(){
     getDataBoneka();
});



//ambil daftar boneka
function getDataBoneka() {
    $.getJSON(serviceURL + 'BonekaList.php', function(data) {
        $('#ListBoneka li').remove();
	    DataBoneka = data.items;
        $.mobile.showPageLoadingMsg(true); // load spinner
	    $.each(DataBoneka, function(index,Boneka) {
	       $('#ListBoneka').append('<li><a href="pegawaidetail.html?id=' + Boneka.id + '" data-transition="flip" >' +
	       '<img src="' + Boneka.img + '"/>' +
	       '<h4>' + Boneka.NamaBoneka+ '</h4>');
	   });
	   $('#ListBoneka').listview('refresh'); 
       $.mobile.hidePageLoadingMsg(); // hide spinner
    });
}

//baca data pegawai diserver saat page detail ditampilkan
$('#detailPage').live('pagebeforeshow', function(event) {    
    var id = getUrlVars()["id"];
    $.getJSON(serviceURL + 'BonekaDetail.php?id='+id, displayBoneka);
});

$('#editPage').live('pagebeforeshow',function(event){     
     var id = getUrlVars()["id"];
     $.getJSON(serviceURL + 'BonekaDetail.php?id='+id, editEmployee);
});

//tampilkan form edit
function editEmployee(data) {    
	var employee = data.item;  
    $('#pegId').val(employee.id);
	$('#editNama').val(employee.nama);
	$('#editJabatan').val(employee.jabatan);
	$('#editAlamat').append(employee.alamat); 
    $('#editEmail').val(employee.email); 
    $('#editTelp').val(employee.telp); 
    $('#editImg').val(employee.img_url);   
    
    $('#updateBtn').click(function(){  
         var _id = $('#pegId');
         var _nama = $('#editNama');
         var _jabatan = $('#editJabatan');
         var _alamat = $('#editAlamat');
         var _email = $('#editEmail');
         var _telp = $('#editTelp');
         var _img = $('#editImg');
           
        $.post(serviceURL+'updatepegawai.php',{
            id: _id.val(),
            nama : _nama.val(),
            jabatan : _jabatan.val(),
            alamat : _alamat.val(),
            email : _email.val(),
            telp : _telp.val(),
            img : _img.val()
        },function(data){            
            _id.val('');
            _nama.val('');
            _jabatan.val('');
            _alamat.val('');
            _email.val('');
            _telp.val('');
            _img.val('');
            alert('Employee Updated!')
            getEmployeeList();
        });         
    });
}


    
//mengambil parameter dari url
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++){
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
            
//tampilkan data
function displayBoneka(data) {
    $.mobile.showPageLoadingMsg(true);
	var JenisBoneka = data.item;	
    $('#BonekaPicture').attr('src', JenisBoneka.img);
	$('#Nama_Boneka').text(JenisBoneka.NamaBoneka);
    $('#Ukuran').text(JenisBoneka.Ukuran);
	$('#Harga').text(JenisBoneka.Harga);
	
	
    $.mobile.hidePageLoadingMsg();
}


$('#saveBtn').click(function(){
    var _nama = $('#nama');
    var _jabatan = $('#jabatan');
    var _alamat = $('#alamat');
    var _email = $('#email');
    var _telp = $('#telp');
    var _img = $('#img');
    
    $.post(serviceURL+'insertpegawai.php',{
        nama : _nama.val(),
        jabatan : _jabatan.val(),
        alamat : _alamat.val(),
        email : _email.val(),
        telp : _telp.val(),
        img : _img.val()
    },function(data){
        _nama.val('');
        _jabatan.val('');
        _alamat.val('');
        _email.val('');
        _telp.val('');
        _img.val('');
        $.mobile.changePage('#savedDialog', 'pop', true, true);
        getEmployeeList();
    });
    
});




