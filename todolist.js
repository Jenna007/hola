let cuerpo = document.querySelector("body")
let contenedorTareas = document.querySelector(".tareas")
let boton = document.querySelector("button.agregar")
let botonBorrar = document.querySelector("button.borrar")
let comenzarDesde = 3
let tareas = []
console.log("mira lo que hay", cuerpo);

botonBorrar.addEventListener("click", function(evento){
evento.preventDefault()
borrar("clave-bti")
contenedorTareas.innerHTML =""
const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ["heart"],
    colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
  };
  
  confetti({
    ...defaults,
    particleCount: 50,
    scalar: 2,
  });
  
  confetti({
    ...defaults,
    particleCount: 25,
    scalar: 3,
  });
  
  confetti({
    ...defaults,
    particleCount: 10,
    scalar: 4,
  });
})
/* for (const clave in cuerpo.children) {
    clave.children[1]?.textContent;
} */
cuerpo.addEventListener("click", function (evento) {
    console.log("hiciste click en", evento.target.id);
    if (
        evento.target.tagName == "INPUT" &&
        evento.target.type == "checkbox"
    ) {
        let id = evento.target.id
        document.querySelector("label[for=" + id + "]").remove()
        document.querySelector("." + id).remove()
        evento.target.remove()
        guardarTodo()
        if (contenedorTareas.children.length == 0) {
            const defaults = {
                spread: 360,
                ticks: 100,
                gravity: 0,
                decay: 0.94,
                startVelocity: 30,
                shapes: ["heart"],
                colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
              };
              
              confetti({
                ...defaults,
                particleCount: 50,
                scalar: 2,
              });
              
              confetti({
                ...defaults,
                particleCount: 25,
                scalar: 3,
              });
              
              confetti({
                ...defaults,
                particleCount: 10,
                scalar: 4,
              });
        }
    }
})

boton.addEventListener("click", function (evento) {
    console.log("comenzar", comenzarDesde);
    let texto = document.querySelector("#texto")
    console.log("mira el texto que estaba en el input", texto.value);

    if (texto.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'eyeyey...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
        })
        return

    }
    let contenedor = document.createElement("div")
    contenedor.className = `tarea${comenzarDesde}`

    let tarea = `
                    <label for="tarea${comenzarDesde}">${texto.value}</label>
                    <input type="checkbox" id="tarea${comenzarDesde}">
              `
    contenedor.innerHTML = tarea
    tareas.push({
        "id": `tarea${comenzarDesde}`,
        "tarea": `${texto.value}`
    })
    comenzarDesde = comenzarDesde + 1
    contenedor.innerHTML = tarea
    contenedorTareas.appendChild(contenedor)
    //tareas.push(texto.value)
    guardar("clave-bti", JSON.stringify(tareas))
})


console.log(
    recuperar("clave-bti")
);

let tareasArealizar = recuperar("clave-bti")
console.log("tareas a analizar, tareasArealizar");
if (tareasArealizar != null) {
    let tareasJson = JSON.parse(tareasArealizar)
    console.log(tareasJson);

    tareasJson.map(
        function (tarea) {
            let contenedor = document.createElement("div")
            contenedor.className = `${tarea.id}`

            let texto = `
                         <label for="${tarea.id}">${tarea.tarea}</label>
                         <input type="checkbox" id="${tarea.id}">
                   `
            contenedor.innerHTML = texto
            contenedorTareas.appendChild(contenedor)

        }
    )


}
/*  */
console.log("que tiene el contenedor tareas?" , contenedorTareas.children);
function guardarTodo(){
    const nuevasTareas = []
    for (const clave of contenedorTareas.children) {
        console.log("clave",clave.className);
        console.log("texto",clave.children[1].textContent);
        nuevasTareas.push({
            "id": `${clave.className}`,
            "tarea": `${clave.children[1].textContent}`
        })
    } 
    guardar("clave-bti", JSON.stringify(nuevasTareas))
}