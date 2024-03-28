const pokemon_Cards = document.querySelector(".pokemon_Cards");
const pagination_Previous = document.querySelector(".previous");
const pagination_Next = document.querySelector(".next");

const url_Initial = 'https://pokeapi.co/api/v2/pokemon';
let next, previous;

// Funcion que elimina nodos (cada tarjeta del del div pokemon_Cards)
function removerNode(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

async function pokemons(url) {
    const loader = document.createElement("img");
    const result = await fetch(url);
    const data = await result.json();

    loader.classList.add("loader");
    loader.src = "/assets/tube-spinner.svg"
    pokemon_Cards.appendChild(loader);
    // console.log(data);
    next = data.next;
    previous = data.previous;

    for (let i = 0; i <= data.results.length - 1; i++) {
        let urlPokemon = data.results[i].url;
        await pokemon(urlPokemon);
    }
    loader.remove();
}

async function pokemon(url) {
    const result = await fetch(url);
    const PokemonData = await result.json();
    const type = PokemonData.types;
    const abilities = PokemonData.abilities;
    // console.log(PokemonData);
    const article_Card = document.createElement("article"); // contenedor de la tarjeta
    const div_img = document.createElement("div"); // Contenedor de la imagen
    const img_card = document.createElement("img"); // Imagen del Pokemon
    const div_info = document.createElement("div"); // Contenedor de la informacion del Pokemon
    const pokemon_Name = document.createElement("p"); // Nombre del pokemon
    const pokemon_id = document.createElement("p"); // ID del pokemon
    const pokeon_Type = document.createElement("p"); // Tipo de Pokemon
    const pokeon_Abilities = document.createElement("ul"); // Abilidades del Pokemon

    article_Card.classList.add("card");
    div_img.classList.add("img_card");
    div_info.classList.add("card_info");
    pokemon_id.classList.add("id")
    pokemon_Name.classList.add("name");

    img_card.src = PokemonData.sprites.other.home.front_default;
    pokemon_id.textContent = `# ${PokemonData.id}`;
    pokemon_Name.textContent = PokemonData.name;
    pokeon_Type.textContent = "tipo: ";
    pokeon_Abilities.textContent = "Ataques: ";

    // Tipo
    for (let i = 0; i <= type.length - 1; i++) {
        pokeon_Type.textContent += " " + type[i].type.name
    }

    //  Abilidades
    for (let i = 0; i <= abilities.length - 1; i++) {
        const ability = document.createElement("li");
        ability.textContent = abilities[i].ability.name;
        pokeon_Abilities.appendChild(ability);
    }

    div_img.appendChild(img_card);
    div_info.appendChild(pokemon_id);
    div_info.appendChild(pokemon_Name);
    div_info.appendChild(pokeon_Type);
    div_info.appendChild(pokeon_Abilities);

    article_Card.appendChild(div_img);
    article_Card.appendChild(div_info);
    pokemon_Cards.appendChild(article_Card);
}

pagination_Previous.addEventListener("click", e => {
    if (previous === null) {
        e.disabled = true;
        console.log(previous);
        return
    }
    removerNode(pokemon_Cards);
    pokemons(previous);
});

pagination_Next.addEventListener("click", e => {
    if (next === null) {
        e.disabled = true;
        console.log(previous);
        return
    }
    removerNode(pokemon_Cards);
    pokemons(next);
});

document.addEventListener("DOMContentLoaded", pokemons(url_Initial));