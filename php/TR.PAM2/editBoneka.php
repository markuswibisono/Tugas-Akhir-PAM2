<?php

header("Access-Control-Allow-Origin: *");
include 'config.php';

$sql = "Update tbboneka SET NamaBoneka=?, Ukuran=?, Harga=?, img=? WHERE id=?";
    

$id = $_REQUEST['id'];
$NamaBoneka = $_REQUEST['NamaBoneka'];
$Ukuran = $_REQUEST['Ukuran'];
$Harga = $_REQUEST['Harga'];
$img = $_REQUEST['img'];

try {
    $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);    
    $stmt = $dbh->prepare($sql);    
    $stmt->execute(array($NamaBoneka,$Ukuran,$Harga,$img,$id));
    $dbh = null;
    echo "{'item':$id}";
} catch (PDOException $e) {
    echo '{"error":{"text":' . $e->getMessage() . '}}';
}
?>
