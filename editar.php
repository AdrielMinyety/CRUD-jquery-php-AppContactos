<?php 
	require 'db.php';

	$id = $_POST['id'];
	$nombre = $_POST['nombre'];
	$numero = $_POST['numero'];

	if( strlen(trim($nombre)) < 1 || strlen(trim($numero)) < 1 ) {
		die("Datos no validos");
	}else {
		$query = "UPDATE contacto SET nombre_contacto = '$nombre', numero_contacto = '$numero'WHERE id = $id"; 
		$result = mysqli_query($conn, $query);

		if (!$result) {
			die("Error: ". mysqli_error($conn));
		}

		echo "contacto actualizado";
	}
?>