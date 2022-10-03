// Reto 1 - Hacer un fetch a la pokeapi y mostrar un console.log del nombre del pokemon
// Reto 2 - Hacer una array con la informacion de 151 pokemons
// Reto 2 - Hacer un html con un input y una lista y darle estilo
// Reto 3 - Hacer que al pulsar una tecla en el input se vea en un console.log el valor del input
// Reto 4 - Filtrar los pokemons por el nombre en funcion del valor de input
// Reto 5 - Pintar los pokemons en la lista en funcion del filtro
// Reto 6 - Si no se encuentra ningun pokemon pintar un mesaje de pokemon no encontrado
// Reto 7 - Poner un favicon en la web

// Hacemos una peticion a una api externa con fetch
const pokeApi = (id) => {
    return fetch('https://pokeapi.co/api/v2/pokemon/' + id);
}

// Obtenermos quantity pokemons usando la pokeapi
const getAllPokemons = async (quantity) => {
    const promises = [];
    for (let i = 1; i <= quantity; i++) {
        promises.push(pokeApi(i));
    }
    // Como no tenemos que esperar a que termine uno para pedir el siguiente hacemos todas las peticiones juntas
    // y esperamos con el Promise.all
    const data = await Promise.all(promises);
    // Tenemos una Response y queremos obtener los datos con json()
    const responses = data.map((response) => {
        return response.json();
    })
    // Volvemos a ejecutar el Promise.all para obtener el json de la respuesta
    const pokemons = await Promise.all(responses);
    return pokemons
}

// Pinta la array de pokemons
const printPokemons = (pokemons) => {
    const list = document.querySelector('#list');
    // Si no hay pokemons muestra un texto
    if (pokemons.length === 0) {
        list.innerHTML = `<div class="empty is-size-5 p-5 has-text-weight-bold">Pokemons no encontrados</div>`
        return;
    }

    let html = `<div class="p-2 has-text-centered has-text-weight-bold">${pokemons.length} pokemons encontrados</div>`
    pokemons.map(pokemon => {
        html += `
        <a class="panel-block">
            <figure class="image is-48x48">
                <img src="${pokemon.sprites.front_default}">
            </figure>
            <span class="is-capitalized has-text-weight-semibold ml-2">${pokemon.name}</span>
        </a>`
    })
    list.innerHTML = html;
}

window.addEventListener('load', async () => {
    const quantityPokemons = 151
    // Obtiene la lista de pokemons
    const pokemons = await getAllPokemons(quantityPokemons);
    // Referencia del input
    const input = document.querySelector('#search');
    // Pinta los pokemons iniciales
    printPokemons(pokemons);
    // Funcion callback que se ejecutara al pulsar un tecla en el input
    const searchPokemons = () => {
        // Filtra los pokemons
        // Si el texto que esta escrito en el input esta incluido en el nombre del pokemon lo filtra
        // Pasamos los valores a minusculas al hacer la comprobacion y ver si realmente coincide
        const pokemonFilter = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(input.value.toLowerCase()))
        // Pintamos los pokemons que se han filtrado
        printPokemons(pokemonFilter)
    }
    // Escuchamos el evento de pulsar una tecla y llamamos a la funcion callback searchPokemons
    input.addEventListener('keyup', searchPokemons)
})
