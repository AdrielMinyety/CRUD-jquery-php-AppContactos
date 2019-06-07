<?php 
	require 'db.php';

	$nombre = $_POST['nombre'];
	$numero = $_POST['numero'];

	if( strlen(trim($nombre)) < 1 || strlen(trim($numero)) < 1 ) {
		die("Datos no validos");
	}else {
		if (!empty($nombre) && !empty($numero)) {
		 	$query = "SELECT nombre_contacto, numero_contacto FROM contacto WHERE nombre_contacto = '$nombre' AND numero_contacto = '$numero'";
		    $result = mysqli_query($conn, $query);
		    $getData = mysqli_fetch_array($result);

		    $nombredb = $getData['nombre_contacto'];
		    $numerodb = $getData['numero_contacto'];

		    if ( $nombre == $nombredb || $numero == $numerodb ) {
				echo "Ya existe ese contacto";
		    } else { 
				$query = "INSERT INTO contacto (nombre_contacto, numero_contacto) VALUES ('$nombre', '$numero')";
				$result = mysqli_query($conn, $query);

				if (!$result) {
					die("Error: ". mysqli_error($conn));			
				}

				echo "Agregado correctamente";	
			}
		}	
	}

?>