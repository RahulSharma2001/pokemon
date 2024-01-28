const PokUrl = "https://pokeapi.co/api/v2/type/";
const sel = document.getElementById("select-opt");
const pokContainer = document.getElementById("main");
console.log(pokContainer);

const pokTypeUrl = {};
async function ft() {
  let response = await fetch(PokUrl);
  let jsonResult = await response.json();
  console.log(jsonResult.results);
  jsonResult.results.map((e) => {
    const opt = document.createElement("option");
    opt.setAttribute("value", e.name);
    opt.innerText = e.name;

    sel.appendChild(opt);

    pokTypeUrl[e.name] = e.url;

    showAllPokemon(e);
  });
}

async function showAllPokemon(e) {
  const type = e.name;
  let response = await fetch(e.url);
  let jsonResult = await response.json();
  jsonResult.pokemon.map((e) => {
    showPokmon(e, type);
  });
  /*  let fetchPokemonDetails = jsonResult; */
}

async function filter() {
  pokContainer.innerHTML = "";
  const fetTypePok = await fetch(pokTypeUrl[sel.value]);
  let response = await fetTypePok.json();
  console.log(response.pokemon[0]);
  response.pokemon.map((e) => {
    showPokmon(e, sel.value);
  });
}

async function showPokmon(e, name) {
  let pokmonName = e.pokemon.name;
  let pokmonfetch = await fetch(e.pokemon.url);
  let jasonResult = await pokmonfetch.json();
  console.log(jasonResult);

  const pokDiv = document.createElement("div");
  const h3 = document.createElement("h3");
  h3.innerText = jasonResult.id;
  pokDiv.appendChild(h3);
  const img = document.createElement("img");
  img.setAttribute("src", jasonResult.sprites.front_default);
  pokDiv.append(img);
  const h2 = document.createElement("h2");
  h2.innerText = pokmonName;
  pokDiv.appendChild(h2);
  const para = document.createElement("p");
  para.innerText = name;
  pokDiv.appendChild(para);
  pokDiv.classList.add("pokDiv");
  pokContainer.append(pokDiv);
}

async function reset() {
  ft();
}
ft();
