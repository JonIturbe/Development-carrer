const loadInitialTemplate = () => {
    //Para escribir un string de varias lineas en JS hay que poner \ al final de 
    //cada linea para "escapar" y que lo pille bien.
    const template = ' \
        <h1>Usuarios</h1> \
        <form id="user-form"> \
            <div> \
                <label>Nombre</label> \
                <input name="name" /> \
            </div> \
            <div> \
                <label>Apellido</label> \
                <input name="lastname" /> \
            </div> \
            <button type="submit">Enviar</button> \
        </form> \
        <ul id="user-list"></ul> \
    ';
    const body = document.getElementsByTagName("body")[0];
    body.innerHTML = template;
}

const getUsers = async () => {
    //Buscamos todos los usuarios en el endpoint de users.
    const response = await fetch("/users");
    //Transformamos la respuesta del fetch en un JSON.
    const users = await response.json();

    //Escribirmos la plantilla que imprimira a los usuarios. Sera una funcion que recibe un usuario.
    const template = user => '\
        <li>\
            ' + user.name + " " + user.lastname + " " + '<button data-id=' + user._id + '>Eliminar</button>\
        </li>\
    '
    //Ir a buscar nuestra lista y reemplazar lo que haya dentro por todos los usuarios obtenidos
    //en la llamada a nuestra API.
    const userList = document.getElementById("user-list");

    //Vamos a iterar los usuarios devueltos por la API.
    //Queremos usar la funcion del template, pero le queremos pasar el usuario.
    userList.innerHTML = users.map(user => template(user)).join("");

    //Le damos funcionalidad a cada boton de eliminar.
    users.forEach(user => {
        //Pillamos los botones con data-id user._id.

        //ERROR A RESOLVER
        //Da error el boton de eliminar (no funciona) porque no pilla id's que empiecen
        //por un digito, pero MongoDb genera id's empezando por digitos. SOLUCIONAR. 

        const userNode = document.querySelector('[data-id='+ user._id +']');
        userNode.onclick = async e => {
            await fetch("/users/" + user._id, {
                method: "DELETE",
            })
            //Ahora hay que borrarlo del HTML. Subimos al nodo padre y borramos este.
            //En este caso borrariamos el <li> pues sino borrariamos el boton nada mas. 
            userNode.parentNode.remove();
            alert("Eliminado con exito");
        }
    });
}

const addFormListener = () => {
    const userForm = document.getElementById("user-form");
    //La e es la variable donde guardares el evento que la funcion recibe.
    userForm.onsubmit = async (e) => {
        //preventDeafult es para que la pagina no se recargue cuando le demos a enviar.
        e.preventDefault();
        //Objeto que obtiene todos los datos de un formulario si le pasamos la referencia de un
        //formulario de HTML. Le pasamos como argumento la referencia al formulario del HTML.
        const formData = new FormData(userForm);
        //Transformar los datos de formData en algo mas legible. 
        //Pilla un objeto iterable y lo transforma en un objeto JSON.
        //.entries devuelve un iterador.
        const data = Object.fromEntries(formData.entries());
        //Resultado: nos devuelve solo los datos creados por nosotros.
        console.log(data);

        //Ahora hay que mandar los datos a la API para que esta cree un usuario con MongoDB, en la BBDD.
        //Await porque queremos que queremos que se termine de crear el usuario antes de pasar a lo siguiente.
        await fetch("/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        //.reset limpia todos los campos del formulario. 
        userForm.reset();
        
        //Ahora hay que ir a la BBDD, leer todos los usuarios y volver a pintarlos en la intefaz.
        getUsers();
    }
}

window.onload = () => {
    console.log("--- Verificado ---");
    loadInitialTemplate();
    addFormListener();
    //Nada mas cargar el HTML llamamos a la BBDD para cargar todos los usuarios.
    getUsers();
}