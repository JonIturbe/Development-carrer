//Creamos array vacio.
//const todos = [];
//Cambiamos un array vacio por un item que pillamos del espacio de guardado del 
//propio navegador, donde guardaremos la info para que persista aunque recarguemos 
//la pagina y demas.
//Con or ||, le damos un valor por defecto, dado que de primeras no hay nada en 
//localStorage que pueda leer.
//Usamos JSON.parse para convertir lo que devuelva el storage en un array de JS.
const todos = JSON.parse(localStorage.getItem("todos")) || [];

const render = () => {
    const todoList = document.getElementById("todo-list");
    const todosTemplate = todos.map(t => "<li>" + t + "</li>");
    todoList.innerHTML = todosTemplate.join("");
    const elementos = document.querySelectorAll("#todo-list li");

    elementos.forEach((elemento, i) => {
        elemento.addEventListener("click", () => {
            elemento.parentNode.removeChild(elemento);
            todos.splice(i, 1);
            actualizaTodos(todos);
            render();
        })
    });
}

const actualizaTodos = (todos) => {
    const todoStrings = JSON.stringify(todos);
    localStorage.setItem("todos", todoStrings);
}

window.onload = () => {
    //Llamamos a render para que, si tenemos datos persisitidos, aparezcan de primeras.
    render();

    //Guardamos en form el elemento con id todo-form.
    const form = document.getElementById("todo-form");

    //Reemplazamos la funcion onSubmit de form.
    form.onsubmit = (e) => {
        //Evita que nuestra app se refresque.
        e.preventDefault();
        //Guardamos tanto el elemento con id todo como su valor.
        const todo = document.getElementById("todo");
        const todoText = todo.value;
        //Lo sustituimos por vacio al darle al boton.
        todo.value = "";
        //Añadimos en el array vacio el contenido.
        todos.push(todoText);

        // //Convertimos en string el array de todos y lo guardamos en variable.
        // const todoStrings = JSON.stringify(todos);
        // //Llamamos al storage y le pasamos el item todos que contiene todoStrings.
        // localStorage.setItem("todos", todoStrings);
        actualizaTodos(todos);
        render();

        //Imprimimos en la consola lo que se ha introducido.
        //console.log(todoText);
        
        // const todoList = document.getElementById("todo-list");
        // // //Limpiamos la lista cada vez para que, cuando se añadan los nuevos
        // // //datos, estos no esten duplicados.
        // // todoList.innerHTML = "";
        // // //Por cada elemento dentro de la lista
        // // for(let i = 0; i < todos.length; i++){
        // //     //Añadimos un <li> Texto del array </li>
        // //     todoList.innerHTML += "<li>" + todos[i] + "</li>";
        // // }

        // //Manera mas eficiente de hacer lo que esta comentado arriba.
        // //En map hay que pasarle el elemento que estemos iterando.
        // //Se iterara tantas veces como elementos tenga el array.
        // const todosTemplate = todos.map(t => "<li>" + t + "</li>");
        // //console.log(todosTemplate);
        // //Join pilla todos los elms de un array y los junta con lo que
        // //le indiquemos.
        // todoList.innerHTML = todosTemplate.join("");
        // //querySelectorAll nos permite buscar por id, clases, o etiquetas.
        // //Queremos los elementos de la lista. # = ID + el nombre del id.
        // //Le añadimos el li para indicarle que es ele elemento que queremos dentro
        // //de aquellos elementos que tengan el id todo-list.
        // const elementos = document.querySelectorAll("#todo-list li");
        // //Por cada elemento en elementos
        // elementos.forEach((elemento, i) => {
        //     //Añadimos un evento a cada elemento, de tipo click. Osea, cuando
        //     //hagamos click en un elemento pasara lo que este dentro del metodo.
        //     elemento.addEventListener("click", () => {
        //         //console.log(elemento, i);
        //         //Pilla el padre, el <ul> para usar removeChild y asi poder
        //         //eliminar a uno de sus hijos. En este caso, el clickado.
        //         elemento.parentNode.removeChild(elemento);
        //         //Ahora hay que borrar el dato del array todos con splice.
        //         //Le decimos el indice desde el que borrar que es i y cuantos 
        //         //elementos queremos borrar. Solo uno, el seleccionado.
        //         todos.splice(i, 1);
        //     })
        // });

        //splice() es un metodo que se usa con arrays y le indicamos desde 
        //donde a donde queremos eliminar elementos del mismo.
        //Ej: arr.splice(0,2); -> elminame dos elms desde el elm 0.

    }
}