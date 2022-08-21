//Esta primera linea lo que hace es esperar a que cargue el HTML
//Una vez cargue, ejecuta lo que esta entre llaves.
//Esto es util si queremos poner el scrip encima de head por ejemplo.
//Aun asi, puedes ponerlo y dejar el script al final para prevenir cualquier
//posible error de carga de la pagina. 
window.onload = () => {
    console.log("--- Intro a DOM desde main.js ---");

    const parrafo = document.getElementById("text");
    console.log(parrafo.innerText);

    //Podemos cambiar el texto, pero no crear elementos HTML, para ello tendremos
    //que crear otro nuevo. Lo veremos mas adelante.  
    parrafo.innerText = "Text actualizado"
    
    //AGREGAR ELEMENTOS HTML A OTRO
    //Nos añade una lista de dos elementos. Hay que usar innerHTML, si 
    //usamos innerText, no nos convierte el texto a elementos HTML.
    parrafo.innerHTML = "<li>Elemento 1</li><li>Elemento 2</li>"

    
}