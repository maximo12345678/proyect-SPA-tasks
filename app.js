// asi, por la consola nos muestra ese codigo html console.log(document.getElementById('formTask')); //. elementById busca el ID. asi llamamos al formulario

document.getElementById("formTask").addEventListener("submit", saveTask); //addEventListener es para detectar un evento, submit es el boton de guardar, y luego llamamos a la funcion para interactuar cuando suceda ese evento


function saveTask(e){
    // console.log(e);
    // alert("Enviando formulario.");

    //guardar los datos. navegador nos da una funcionalidad, una API. ES CODIGO YA ESCRITO.
    // LOCALSTORAGE, nos permite almacenar datos en la memoria del navegador, y aunque se cierre y vuelva a abrir seguira ahi la informacion
    //convertir un objeto a un string
    //localStorage.setItem("tasks", JSON.stringify(task)) //metodo SETITEM permite almacenar un dato. pide el nombre de como llamar los datos y el valor como parametros. JSON, para no mandar directamente el objeto.
    
    //JSON.parse para mostrarlo como un objeto y no como string
    // console.log(JSON.parse(localStorage.getItem("tasks"))); //get es para mostrar.


    // OBTENER LOS DATOS de los 2 inputs, cada uno tiene su ID
    let title = document.getElementById("title").value; //VALUE es para que aparezca el valor, sino solo aparece el input
    let description = document.getElementById("description").value;

    title = title.toUpperCase(); //por si el usuario lo ingresae en minuscula, lo dejo todo en mayuscula el titulo
    description = description.toLowerCase(); //la descripcion va TODA en minuscula.

    const task = { //creamos un objeto llamado TAREA, y almacenamos el titulo y la descripcion ingresada
        title: title, // esto es lo mismo que poner title, description  };
        description: description
    };

   
    // GUARDAR LOS DATOS
    if (localStorage.getItem("tasks") === null){ //si no hay nada, creamos
        let tasks = [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));

    }
    else{ //si ya hay creados, obtengo, actualizo y vuelvo a almacenar
        let tasks = JSON.parse(localStorage.getItem("tasks")); //aca tenemos las tareas

        tasks.push(task); //agrego la nueva tarea (task es el objeto que creamos arriba)

        localStorage.setItem("tasks", JSON.stringify(tasks)); //almacenamos otra vez

    }

    // let formulario = document.getElementById("alert");
    // formulario.innerHTML = ' ';
    // formulario.innerHTML += `
    //     <div class="alert alert-warning alert-dismissible fade show" role="alert">
    //         <strong>Holy guacamole!</strong> You should check in on some of those fields below.
    //         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    //             <span aria-hidden="true">&times;</span>
    //         </button>
    //     </div>`;
         

    showMessage('Task Added Succeffuly!!', 'success');


    //cada vez que se guarde una, queremos que se vea en la lista
    getTasks(); 

    document.getElementById("formTask").reset();

    //es para prevenir el evento que viene por defecto, de actualizarce o refrescarse el navegador cuando se pone SAVE
    e.preventDefault();
}

function getTasks(){
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let tasksView = document.getElementById("tasks");


    tasksView.innerHTML = ' '; //lo dejamos limpio

    //insertamos, recorremos TASKS que es un arreglo de tareas, si devuelve algo son tareas que vamos a recorrer
    for (let i = 0; i < tasks.length; i++){
        // console.log(tasks[i]);
        let title = tasks[i].title;
        let description = tasks[i].description;
        
        tasksView.innerHTML +=  //si no pones el +, solo muestra la ultima tarea 
        `<div class="card mb-3"> <!-- MB = margen button -->
           <div class="card-body">
             <p>Title: <b>${title}</b> <br> Description: ${description} </p>
             <a type="button" class="btn btn-outline-danger" onclick="deleteTasks('${title}')">
               Delete
             </a>
             <!-- <a class="btn btn-danger" onclick="deleteTasks('${title}')">Delete</a>    si la persona toca el boton, llama a la funcion deleteTask y le pasa por parametro el titulo -->
           </div>
        
        </div>`
    }

}

function deleteTasks(title){ // este metodo, obtiene un titulo de la tarea, lo busca y lo elimina.
    //console.log(title);
    //teniendo el titulo, tengo que buscar en todas las tareas, buscar si coincide con alguna tarea
    let tasks = JSON.parse(localStorage.getItem("tasks"));

    for (let i = 0; i < tasks.length; i++){
        if (tasks[i].title == title){
            tasks.splice(i, 1); //splice quita un dato de un array, pasandole el indice. contrario de PUSH. 1 los datos que quita.
             
        }

    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showMessage('Task Deleted Succeffuly!!', 'info');
    getTasks(); // llamamos a este, para que cuando eliminamos se actualiza la vista del usuario


}




function showMessage(message, cssClass){ //para mostrar un mensaje de alerta cuando se agrega o elimina un producto, primer parametro el mensaje, segundo una clase de css, para saber si es mensaje de eliminar o de agregar 
    const div = document.createElement('div');
    div.className = `alert alert-${cssClass} row pt-3 `; //clase ALERT
    div.appendChild(document.createTextNode(message));

    //showing in DOOM
    const container = document.querySelector('.container'); //para seleccionar la clase container, para agarrar todo el conteniido del documento  // . = CLASE    # = ID
    const app = document.querySelector('#App'); //id AP. todo el codigo de la app en html, este adentro del conteiner
    container.insertBefore(div, app); //quiero colocar el cartel de alerta (div, que creamos) antes de la app, por eso va asi y muestra en pantalla arriba de tood
    setTimeout(function(){
        document.querySelector('.alert').remove(); //TODAS las clases ALERT van a ser remoividas, asi sean de agregar, eliminar o editar un producto
    }, 1500);//SETTIMOUT recibe 2 parametros este metodo, la funcion que queremos ejecutar, y despues el tiempo. este metodo le da un tiempo para remover y que no quede siempre ahi. esta en milisegundos.
}




getTasks();