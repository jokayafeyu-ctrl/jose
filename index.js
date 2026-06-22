const formulario = document.getElementById("formulario");
const tipoSolicitud = document.getElementById("tipoSolicitud")

const campoAusencia = document.getElementById("campoAsusencia")
const campoReunion = document.getElementById("campoReunion");
const campoApoyo = document.getElementById("campoApoyo");

const mensajeRespuesta = document.getElementById("mensajeRespuesta");
const resumen = document.getElementById("resumen");
const datosResumen = document.getElementById("datosResumen");

tipoSolicitud.addEventListener("change", function () { 
    campoAusencia.style.display = "none";
    campoReunion.style.display = "none" ;
    campoApoyo.style.display = "none";

    if (tipoSolicitud.value === "justificacion de aucencia"){
        campoAusencia.style.display = "block"
    }

    if (
        tipoSolicitud.value === "Reunion con docente" ||
        tipoSolicitud.value === "Reunion con orientacion"
    ){
        campoReunion.style.display = "block";
    }

    if (tipoSolicitud.value === "Apoyo educativo"){
        campoApoyo.style.display = "block";
    }
});

formulario.addEventListener("submit", function (evento){
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const identificacion = document.getElementById("identificacion").value.trim();
    const edad = document.getElementById("edad").value.trim();
    const nivel = document.getElementById("nivel").value.trim();
    const seccion = document.getElementById("seccion").value.trim();
    const jornada = document.getElementById("jornada").value.trim();

    const encargado = document.getElementById("encargo").value.trim();
    const parentesco = document.getElementById("parentesco").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const correo = document.getElementById("correo").value.trim();

    const solicitu = document.getElementById("solicitud").value.trim();
    const urgencia = document.getElementById("urgencia").value.trim();
    const detalle = document.getElementById("detalle").value.trim();

    const autoriazcion = document.getElementById("autorizacion").value.trim();
    const veracidad = document.getElementById("veracisdad").value.trim();

    if (
        nombre === "" ||
        identificacion ==="" ||
        edad === "" ||
        nivel === " " ||
        seccion === "" ||
        jornada === "" ||
        encargado === "" ||
        parengtescos === "" ||
        telefono === "" ||
        correo  === "" ||
        solicitu=== "" ||
        urgencia === "" ||
        detalle === "" 
    )

    {
        mostrarMensaje("complete todos los campos obligatorio", "error");
        resumen.style.display = "none"
        return;
    }

    if (edad < 5 || edad >80 ) {
        mostrarMensaje("la edad debe estar entre 5 y 80 años", "error");
        resumen.style.display = "none";
        return;
    }

    if (!valiadarCorreo(correo)){
        mostrarMensaje("digite un correo valido", "error");
        resumen.style.display = "none"
        return;
    }
    
    if (solicitu === "Justificacion de aucencia"){
        const fechaAusencia = document.getElementById("fechaAusencia").value;
        const motivoAusencia = document.getElementById("motivoAusencia").value;

        if (fechaAusencia === ""|| motivoAusencia ===""){
            mostrarMensaje("Completemla fecha y el motivo de la A   usencia", "error");
            resumen.style.display ="none";
            return;
        }
    }

    if (
        solicitu ==="Reunion con docente" ||
        solicitu ==="Reunion con orientacion"
    ) {
        const fechaReunion = documentz.getElementById("fechaReunion").value;
        const horaReunion = document.getElementById("horaReunion").value;

        if (fechaReunion === "" || horaReunion === ""){
            mostrarMensaje("complete la fecha y hora sugerida para la reunion.", "error")
            resumen.style.display = "none";
            return;
        }
    }
    if (!autorizacion || !veracidad){
        mostrarMensaje("debe de aceptar las autorizaciones para enviar el formulario.", "error");
        resumen.style.display ="none"
        return
    }
    let areasApoyo = [];
    const checkboxes = campoApoyo.querySelectorAll('input[type="checkbox"]:checked');

    checkboxes.forEach(function(check){
        areasApoyo.push(check.value);
    });

    mostrarMensaje("Formulario enviado correctamente. La solicitud fue resgistrada", "exito");
    datosResumen.innerHTML =`
    <strong>Estudiantes: </strong> ${nombre}<br>
    <strong>Identificacion: </strong> ${Identificacion}<br>
    <strong>Edad: </strong> ${Edad}<br>
    <strong>Nivel: </strong> ${Nivel}<br>
    <strong>Seccion: </strong> ${Seccion}<br>
    <strong>Jornada: </strong> ${Jornada}<br>

    <strong>Encargados: </strong> ${encargado}<br>
    <strong>Parentesco: </strong> ${parentesco}<br>
    <strong>Telefono: </strong> ${telefono}<br>
    <strong>Correo: </strong> ${correo}<br>

    <strong>Tipo de solicitud: </strong> ${solicitu}<br>
    <strong>Nivel de urgencia: </strong> ${urgencia}<br>
    <strong>Area de apollo: </strong> ${areasApoyo.length > 0 ? areasApoyo.join(",") : "No aplicar"}<br>
    <strong>Detallle: </strong> ${detalle}<br>
    `;

    resumen.style.display = "block"

})

formulario.addEventListener("reset", function(){
    mensajeRespuesta.style.display = "none";
    resumen.style.display = "none";
    campoAusencia.style.display = "none";
    campoReunion.style.display = "none";
    campoApoyo.style.display = "none";
});

function mostrarMensaje(texto, tipo) {
    mensajeRespuesta.textContent = texto;
    mensajeRespuesta.className = "mensaje" + tipo;
    mensajeRespuesta.style.display= "block";
}

function valiadarCorreo(correo){
    const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresion.test(correo);
}
