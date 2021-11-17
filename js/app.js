const contenido = document.querySelector('#contenido');
const listaTweets = document.querySelector('#lista-tweets');
const formulario = document.querySelector('#formulario');
evenstListener();
let tweets = [];

function evenstListener() {
    //Cuaando el documento agrega algo
    formulario.addEventListener('submit', agregarTweet);
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets'))||[];
        crearHTML();
    });
}
//funciones
function agregarTweet(e) {

    e.preventDefault();

    //text area donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    if (tweet === '') {
        mostrarError('No puede ir vacio');
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }
    tweets = [...tweets, tweetObj];
    //Reiniciar el formulario
    crearHTML();
    //Reiniciar el formulario
    formulario.reset();
}


function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');;
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('error');

    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}


//Muestra un listado de los tweets
function crearHTML() {
    limpiartHTML();
    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            const btn=document.createElement('a');
            btn.classList.add('borrar-tweet');
            btn.textContent='X'
            //Anadir funcion
            btn.onclick=()=>{
                borrarTweet(tweet.id);
            }


            const li = document.createElement('li');
            li.innerText = tweet.tweet

            li.appendChild(btn);
            //agregarlo al html;
            listaTweets.appendChild(li);
        });
    }
    sincronizarStorage();
}

// Agrega los Tweets actuales a localStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}
//Elimina un tweet()
function borrarTweet(id){
    tweets=tweets.filter(tweet => tweet.id!==id);
    crearHTML();
}

//limpiarhtml
function limpiartHTML() {

    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}