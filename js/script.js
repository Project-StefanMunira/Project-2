/*
1. read the API docs and get API key
2. make namespaced object
3. call the API with fetch
4. construct a new URL to add search params
5.display photos from API
- call init function
-making init method 
-make a function that calls the API 
-display photos function
-append all elements

*/

//  const getPokemon = () => {
//     for (let i = 1; i < 150; i++) {

//         const apiUrl = `https://pokeapi.co/api/v2/pokemon/${i}`
//         fetch(apiUrl)
//         .then(res => {
//             return res.json();
//         })
//         .then(data => {
//             console.log(data);
//             for (let i = 1; i < 150; i++) {

//             }
//             const pokemon = {
//                 name: data.name,
//                 id: data.id,
//                 image: data.sprites['front_default'],
//                 type: data.types.map((type) => type.type.name).join(', ')
//             };
//             console.log(pokemon);
//         })
//     }

//  }

// getPokemon()

const pokedex = document.getElementById("pokemons");
const searchBar = document.getElementById("searchBar");
// create a let variable of an empty array so we can filter out the user input into a new array
let pokemon = [];
searchBar.addEventListener("keyup", (e) => {
  // if the user inputs a capital Letter it automatically converts it to lowercase()
  const string = e.target.value.toLowerCase();
  console.log(e);
  const filteredPokemons = pokemon.filter((character) => {
    return character.name.toLowerCase().includes(string);
  });
  //    we call the displaypokemon function with a new parameter that we created above to filter out user input
  displayPokemon(filteredPokemons);
});

// We crate a function to get the API to get us the pokemon
const getPokemon = () => {
  // we create an empty array for the promiseAll function so when we push all of the promises from the API then can repopulate the new empty promise array
  const promises = [];
  //   We create a for loop so we can loop thru all of the pokemons
  for (let i = 1; i <= 130; i++) {
    //   we put template literals at the end of the url ${i} so the loop iterates through all of the pokemons
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    // this is where we use the push method to push a new promise from the "fetch" and ".then" which then reurns the "res.json" to ,const promises = [],  array
    promises.push(fetch(url).then((res) => res.json()));
  }
  // outside of our for loop we are  passing the promises.push into the promise.all
  // promise all makes our pokemons all come in at once rather than individually
  Promise.all(promises).then((responses) => {
    // change the pokemon fronm a const to a let  varible
    // map() will iterate through an array and it will return a new array by converting each item. It iterates through all and then it returns an object with the extracted pokemon information
    pokemon = responses.map((result) => ({
      // extra pokemon data that is converted into a new array by using map()
      name: result.name,
      id: result.id,
      image: result.sprites["front_default"],
      type: result.types.map((type) => type.type.name).join(", "),
    }));
    displayPokemon(pokemon);
  });
};

// creating a display pokemon function
const displayPokemon = (pokemon) => {
  console.log(pokemon);
  //   we generate a string in html to repopulate the empty ul in the html
  const pokemonString = pokemon.map(
    // we use map() to return for each poke a li string with the newl generated pokemon
    (poke) => `
        <li class="card">
            <img class="pokeImg" src="${poke.image}"/>
            <h2 class="pokeName">${poke.name}</h2>
            <p class="pokeType">Type: ${poke.type}</p>
        </li>
    `
  );
  // .join("");
  // take the pokemon string and set it as innerHtml
  pokedex.innerHTML = pokemonString;
};

// calling the getpokemon function

getPokemon();
