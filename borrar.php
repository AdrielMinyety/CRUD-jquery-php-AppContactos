<?php 

	require 'db.php';

	$id = $_POST['id'];

	if (!empty(intval($id))) {
		$query = "DELETE FROM contacto WHERE id = '$id'";
		$result = mysqli_query($conn, $query);

		if (!$result) {
			die("Error: ". mysqli_error($conn));
		}

		echo "contacto borrado";
	}

?>