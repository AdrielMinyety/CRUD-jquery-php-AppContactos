<?php 

	require 'db.php';

	$query = " SELECT * FROM contacto";
	$result = mysqli_query($conn, $query);

	if (!$result) {
		die("Error: ". mysqli_error($conn));
	}

	$json = array();
	while ($row = mysqli_fetch_array($result)) {
		$json[] = array(
			'id' => $row['id'],
			'nombre' => $row['nombre_contacto'],
			'numero' => $row['numero_contacto']
		);
	}

	$jsonConverted = json_encode($json);

	echo $jsonConverted;


?>