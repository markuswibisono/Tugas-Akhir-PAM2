<?php
header("Access-Control-Allow-Origin: *");
include 'config.php';

$sql = "select id,NamaBoneka,Ukuran,img from tbboneka";

try {
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbh->query($sql);  
	$pegawailist = $stmt->fetchAll(PDO::FETCH_OBJ);
	$dbh = null;
	echo '{"items":'. json_encode($pegawailist) .'}'; 
} catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}

?>
