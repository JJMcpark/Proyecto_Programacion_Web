document.getElementById("formulario").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const clase = document.getElementById("clase").value;

  if (!nombre || !email || !clase) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  const inscripcion = {
    nombre,
    email,
    clase,
  };

  localStorage.setItem("inscripcion", JSON.stringify(inscripcion));

  const resultado = document.getElementById("resultado");
  let mensaje = `¡Gracias <strong>${nombre}</strong>!<br>Te has inscrito a <strong>${clase}</strong>`;
  mensaje += `<br>El día <strong>${fecha}</strong>.`;
  resultado.innerHTML = mensaje;
  resultado.style.display = "block";

  document.getElementById("formulario").reset();
});