function imprimir() {
    console.log(animales);
};


// Nombrar variables

const cartas = 6;
let arrastrables = document.querySelector(".arrastrables");
let lugarDondeSoltar = document.querySelector(".lugarDondeSoltar");
let animalesCartas = [];
let puntos = 0;


// Elige al azar cuantas tarjetas diga la const cartas

for (let i = 1; i <= cartas; i++) {
    let idImg = idRamdom(animales.length);
    let animal = animales.find(animal => animal.id === idImg);
    animalesCartas.push(animal)
};

function idRamdom(max) {
    return Math.floor((Math.random() * max) + 1);
};


// Crea los arrastrables apartir de los objetos elegidos

animalesCartas.forEach(animalCarta => {
    let nuevoAnimal = document.createElement("div");
    nuevoAnimal.innerHTML = `
    <div class="animal" id="${animalCarta.nombre}">
        <img class="imagen" src="${animalCarta.imagen}" alt="${animalCarta.emogi}" draggable="true">
    </div>
    `;
    arrastrables.appendChild(nuevoAnimal);
});


// Nombra nuevas variables y creacion de array de solo nombres de los objetos elegidos, y con sus funcionalidades

let imagenAnimal = arrastrables.querySelectorAll(".animal");
let arrayNombres = [];
for (let animalCarta of animalesCartas) {arrayNombres.push(animalCarta.nombre);};
arrayNombres = arrayNombres.sort(() => Math.random() - 0.5);
arrayNombres = arrayNombres.map(nombre => {
    return nombre.charAt(0).toUpperCase() + nombre.slice(1);
});


// Agregando a funcion drag a los arrastrables

imagenAnimal.forEach(elemento => {
    elemento.addEventListener("dragstart", event => {
        elemento.classList.add("dragging");
        event.dataTransfer.setData("id", elemento.id);
    });

    elemento.addEventListener("dragend", () => {
        elemento.classList.remove("dragging");
    });
});


// Creando los lugares donde se van a depositar los arrastrables

arrayNombres.forEach(nombre => {
    lugarDondeSoltar.innerHTML += `
    <div class="nombres">
        <p class="dentroCuadro">${nombre}</p>
    </div>
    `
});


// Nombramiento de nuevas variables

let nombresFijados = document.querySelectorAll(".dentroCuadro");
let frase = document.querySelector(".frase");
nombresFijados = [...nombresFijados];


// Anadiendo el elemento drop a los lugares donde se depositaran los arrastrables y creacion de frases 

nombresFijados.forEach(nombre => {
    nombre.addEventListener("dragover", event => {
        event.preventDefault();
    });

    nombre.addEventListener("drop", event => {
        const elementoArrastradoInfo = event.dataTransfer.getData("id");
        
        if (elementoArrastradoInfo == (nombre.innerHTML.toLowerCase())) {
            let elementoPegado = document.querySelector(`#${elementoArrastradoInfo}`);
            console.log("Si");
            puntos++;

            frase.innerHTML = "Bien 😃!"
            frase.style.color = "green";
            nombre.innerHTML = "";
            nombre.appendChild(elementoPegado);
            elementoPegado.classList.add("drop");

            let imagenFinal = elementoPegado.querySelector(".imagen");
            imagenFinal.style.border = "none";
            imagenFinal.style.background = "none";
            imagenFinal.draggable = false;

            if (puntos == cartas) {
                arrastrables.style.display = "flex";
                arrastrables.style.color = "green";
                arrastrables.innerHTML = `
                    <h2 id="felicitaciones">Felicidades! Uniste todas las cartas 🎉</h2>
                `;

                frase.innerHTML = "Ganaste 🎉!"
                frase.style.color = "green";              
            }
        } else {
            console.log("No");
            frase.innerHTML = "Ups 😖!"
            frase.style.color = "red";
        }
    })
});