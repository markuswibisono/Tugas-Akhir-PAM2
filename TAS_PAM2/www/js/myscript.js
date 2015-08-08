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
	       $('#ListBoneka').append('<li><a href="bonekadetail.html?id=' + Boneka.id + '" data-transition="flip" >' +
	       '<img src="' + Boneka.img + '"/>' +
	       '<h4>' + Boneka.NamaBoneka+ '</h4>');
	   });
	   $('#ListBoneka').listview('refresh'); 
       $.mobile.hidePageLoadingMsg(); // hide spinner
    });
}

//baca data boneka diserver saat page detail ditampilkan
$('#detailPage').live('pagebeforeshow', function(event) {    
    var id = getUrlVars()["id"];
    $.getJSON(serviceURL + 'BonekaDetail.php?id='+id, displayBoneka);
});

$('#editPage').live('pagebeforeshow',function(event){     
     var id = getUrlVars()["id"];
     $.getJSON(serviceURL + 'BonekaDetail.php?id='+id, editBoneka);
});

//tampilkan form edit
function editBoneka(data) {    
	var DataBoneka = data.item;  
    $('#pegId').val(DataBoneka.id);
	$('#EditNamaBoneka').val(DataBoneka.NamaBoneka);
	$('#EditUkuranBoneka').val(DataBoneka.Ukuran);
	$('#EditHargaBoneka').append(DataBoneka.Harga); 
    $('#editImg').val(DataBoneka.img);   
    
    $('#updateBtn').click(function(){  
         var _id = $('#pegId');
         var _NamaBoneka = $('#EditNamaBoneka');
         var _Ukuran = $('#EditUkuranBoneka');
         var _Harga = $('#EditHargaBoneka');
         var _img = $('#editImg');
           
        $.post(serviceURL+'editBoneka.php',{
            id: _id.val(),
            NamaBoneka : _NamaBoneka.val(),
            Ukuran : _Ukuran.val(),
            Harga : _Harga.val(),
            img : _img.val()
        },function(data){            
            _id.val('');
            _NamaBoneka.val('');
            _Ukuran.val('');
            _Harga.val('');
            _img.val('');
            alert('Boneka Updated!');           
            getDataBoneka();
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
//    $('#Ukuran').text(JenisBoneka.Ukuran);
//	$('#Harga').text(JenisBoneka.Harga);
	
	 $('#detailList').append('<li data-icon="false"><h3>Ukuran Boneka:</h3><br>' +
	   '<b>' + JenisBoneka.Ukuran + '</b></li>');
    
     $('#detailList').append('<li data-icon="false"><h3>Harga Boneka: </h3><br>' +
	   '<b>' + JenisBoneka.Harga + '</b></li>');
    $('#detailList').listview('refresh');
    $('#editBtn').attr('href','bonekaedit.html?id='+JenisBoneka.id);
    $.mobile.hidePageLoadingMsg();
}


$('#saveBtn').click(function(){
    var _NamaBoneka = $('#NamaBoneka');
    var _UkuranBoneka = $('#UkuranBoneka');
    var _HargaBoneka = $('#HargaBoneka');
    var _img = $('#img');
  
if(_NamaBoneka.val()=="" || _UkuranBoneka.val()=="" || _HargaBoneka.val=="" || _img=="")
{
      $.mobile.changePage('#datakosong', 'pop', true, true);
}else{
    $.post(serviceURL+'insertdata.php',{
        NamaBoneka : _NamaBoneka.val(),
        Ukuran : _UkuranBoneka.val(),
        Harga : _HargaBoneka.val(),
        img : _img.val()
    },function(data){
        _NamaBoneka.val('');
        _UkuranBoneka.val('');
        _HargaBoneka.val('');
        _img.val('');
        $.mobile.changePage('#savedDialog', 'pop', true, true);
        getDataBoneka();
    });
}
});

$('#logoutBtn').click(function() {
    $.mobile.changePage('#dialogLogout', 'pop', true, true);
});

//$('#loginBtn').click(function(){
//
//    getUserName();
//});
//

//function getUserName() {
//    $.getJSON(serviceURL + 'Login.php', function(data) {
//        var _UserName = $('#username');
//        var _Password = $('#password');
//	    DataBoneka = data.items;
//        $.mobile.showPageLoadingMsg(true); // load spinner
//	    $.each(DataBoneka, function(index,Boneka) {
//	       if(_UserName.val()==Boneka.username && _Password.val==Boneka.password)
//           {
//               alert("test");
//           }
//            else
//            {
//                alert("test1");
//            }
//	   });
//	   
//       $.mobile.hidePageLoadingMsg(); // hide spinner
//    });
//}


