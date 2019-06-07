$(function() {
$('div.alert').fadeOut(1);

cargarLista();
buscarContacto();

var edit = false;

function cargarLista() {
		$.ajax({
		url: 'lista_contacto.php',
		type: 'GET',
		success: function (response) {
			let data = JSON.parse(response);		
			let template = "";

			data.forEach(contactos => {
				template += `
				<tr>					
					<td>
						${contactos.id}
					</td>
					<td>
						<b class="edit">
							${contactos.nombre}
						</b>	
					</td>
					<td>
						${contactos.numero}
					</td>
					<td>
				      	<button id="borrar" contactId="${contactos.id}" class="btn-block btn-danger">
				      		<i class="far fa-trash-alt mx-auto"></i>
				      	</button>
					</td>
				</tr>`;				
			});
			$('#contenedor').html(template);
		}
	});
}

function buscarContacto() {
$('#search').keyup(function(e) {
	if ($('#search').val()) {
		let search = $('#search').val();

		$.ajax({
			url: 'buscar_contacto.php',
			type: 'POST',
			data: {search},
			success: function (response) {
				// $('#contenedor').toggle(1500);				
				notificacion(response);
				let contactos = JSON.parse(response);
				let template = "";


				contactos.forEach(contacto => {
					// console.log(contacto.nombre);
					template += `
					<tr>					
						<td>
							${contacto.id}
						</td>
						<td>
							<b class="edit">
								${contacto.nombre}
							</b>	
						</td>
						<td>
							${contacto.numero}
						</td>
						<td>
					      	<button id="borrar" contactId="${contacto.id}" class="btn-block btn-danger">
					      		<i class="far fa-trash-alt mx-auto"></i>
					      	</button>
						</td>						
					</tr>`;					

				});
				
				$('#contenedor').html(template)/*.toggle(5)*/;				
			}
		});
	} else {
		cargarLista();
	}
});
}


$('form').submit(function (e) {
	const postData = {
		id: $('#contactoId').val(),
		nombre: $('#nombre').val(),
		numero: $('#numero').val()
	};

	let url = edit === false ? 'agregar_contacto.php' : 'editar.php';
	// console.log(url);

	$.post(url, postData, function (response) {
		console.log(response);
		notificacion(response);
		if (response == "Agregado correctamente" || response == "contacto actualizado") {
			$('form.mainform').trigger('reset');
			cargarLista();
		}
	});

	e.preventDefault();
});

function notificacion(response) {
	$('div.alert').removeClass("alert-success");
	$('div.alert').removeClass("alert-warning");
	$('div.alert').removeClass("alert-info");
	$('div.alert').removeClass("alert-danger");
	
	if (response == "Agregado correctamente") {
		// console.log('notificación: success');
		$('div.alert').fadeIn().delay(3000).fadeOut();
		$('div.alert').toggleClass("alert-success").html("Agregado correctamente");
	}

	if (response == "Ya existe ese contacto") {
		// console.log('notificación: info');
		$('div.alert').fadeIn().delay(3000).fadeOut();
		$('div.alert').toggleClass("alert-info").html("Ya existe ese contacto");
	}
	if (response == "Datos no validos") {
		// console.log('notificación: danger');
		$('div.alert').fadeIn().delay(3000).fadeOut();
		$('div.alert').toggleClass("alert-danger").html("Datos no validos");
	}
	if (response == "contacto borrado") {
		// console.log('notificación: warning');
		$('div.alert').fadeIn().delay(3000).fadeOut();
		$('div.alert').toggleClass("alert-danger").html("Contacto borrado");
	}
	if (response == "contacto actualizado") {
		// console.log('notificación: warning');
		$('div.alert').fadeIn().delay(3000).fadeOut();
		$('div.alert').toggleClass("alert-info").html("Contacto actualizado");
	}
}


$(document).on('click', '#borrar', function () {
	let elemento = $(this)[0]/*.parentElement.parentElement*/;
	let id = $(elemento).attr('contactId');
	let contacto = $(this).parent().parent().children().eq(1).text();
	// console.log(contacto);
	let e = $(elemento).parent().parent();
	e.css("background-color", "#f8d7da");

	if (confirm("Seguro que quieres borrar el contacto ?\n"+"- "+contacto.trim())) {
		e.delay(1500).toggle(1000);
		$.post('borrar.php', {id}, function (response) {
			console.log(response);
			notificacion(response);
		});
	}else {
		e.css("background-color", "");
	}
});


$(document).on('click', '.edit', function () {
	let id = $(this).parent().parent().children().eq(0).text();
	let e = $(this).parent().parent();
	e.css("background-color", "rgba(0,0,0,0.10)");

	$.post('getdata.php', {id}, function (response) {
		const contacto = JSON.parse(response);
		// console.log(contacto);

		$('#contactoId').val(contacto.id);
		$('#nombre').val(contacto.nombre);
		$('#numero').val(contacto.numero);

		edit = true;
	});
});


});