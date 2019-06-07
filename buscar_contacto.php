<?php 
	include 'db.php';

	$search = $_POST['search'];

	if (!empty($search)) {
		$query = " SELECT * FROM contacto WHERE nombre_contacto LIKE '$search%' ";
		$result = mysqli_query($conn, $query);

		if (!$result) {
			die("Error de consulta: ". mysqli_error($conn));
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
	}

?>