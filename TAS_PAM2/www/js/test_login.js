var serviceURL = "http://localhost/TR.PAM2/";
           
var DataBoneka;
    
$('#loginBtn').click(function(){

    getUserName();
});


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

function test_login(data) {    
	var DataBoneka = data.item;  
    $('#username').val(DataBoneka.username);
	$('#password').val(DataBoneka.password);
    
    $('#loginBtn').click(function(){  
         var _userName = $('#username');
         var _password = $('#password');
                    
        $.post(serviceURL+'Login.php',{
            username: _userName.val(),
            password : _password.val(),
            
            
        });         
    });
}
