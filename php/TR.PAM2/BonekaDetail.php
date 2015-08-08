<?php
header("Access-Control-Allow-Origin:*");
include 'config.php';

$sql = "select id,NamaBoneka,Ukuran,Harga,img from tbboneka where id=:id";

try {
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbh->prepare($sql);  
	$stmt->bindParam("id", $_GET['id']);
	$stmt->execute();
	$boneka = $stmt->fetchObject();  
	$dbh = null;
	echo '{"item":'. json_encode($boneka) .'}'; 
} catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}

?>
