<?php

header("Access-Control-Allow-Origin: *");
include 'config.php';

$sql = "INSERT INTO tbboneka(NamaBoneka,Ukuran,Harga,img) 
        values(:NamaBoneka,:Ukuran,:Harga,:img)";

$namaboneka = $_REQUEST['NamaBoneka'];
$ukuran = $_REQUEST['Ukuran'];
$harga = $_REQUEST['Harga'];
$img = "http://localhost/TR.PAM2/pictures/" . $_REQUEST['img'].".jpg";


try {
    $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $dbh->prepare($sql);
    $stmt->bindParam("NamaBoneka", $namaboneka);
    $stmt->bindParam("Ukuran", $ukuran);
    $stmt->bindParam("Harga", $harga);
    $stmt->bindParam("img", $img);
    $stmt->execute();
    $dbh = null;
    echo "{'item':true}";
} catch (PDOException $e) {
    echo '{"error":{"text":' . $e->getMessage() . '}}';
}
?>
