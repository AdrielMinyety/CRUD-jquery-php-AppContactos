<?php 

	require 'db.php';

	$id = trim($_POST['id']);

	if (!empty(intval(trim($id)))) {
		$query = "SELECT * FROM contacto WHERE id = '$id'";
		$result = mysqli_query($conn, $query);

		if (!$result) {
			die("Error: ". mysqli_error($conn));
		}

		while ( $row = mysqli_fetch_array($result) ) {
			$json = array(
				'id' => $row['id'],
				'nombre' => $row['nombre_contacto'],
				'numero' => $row['numero_contacto']
			);
		}

		$jsonConverted = json_encode($json);
		echo $jsonConverted;
	}

?>