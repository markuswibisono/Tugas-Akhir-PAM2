var serviceURL = "http://localhost/TR/data-server/";
var toko;

// mengambil parameter dari url
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

function clear() {
    var _username = $('#username');
    var _password = $('#password');
    _username.val('');
    _password.val('');
}

$('#loginBtn').click(function () {
    var _username = $('#username');
    var _password = $('#password');

    // membuat proteksi jika inputan kosong
    if (_username.val() == "" || _password.val() == "") {
        $.mobile.changePage('#warningDialog', 'pop', true, true);
    } else if (_username.val() == "admin" || _password.val() == "admin") {
        alert('masuk page admin');
        window.location = 'listboneka.html';
    } else {
        clear();
//            $.post(serviceURL + 'admin.php', {
//                username: _username.val(),
//                password: _password.val()
//            }, clear());
    }
});