
const pokeApp = {};
const pokedex = document.getElementById("pokemons");
const searchBar = document.getElementById("searchBar");
const pokemonCount = 150;
const btnTop = document.getElementById('scrollTop');
pokeApp.pokemon = [];
searchBar.addEventListener("keyup", (e) => {
  // if the user inputs a capital Letter it automatically converts it to lowercase()
  const string = e.target.value.toLowerCase();
  console.log(e);
  const filteredPokemons = pokemon.filter((character) => {
    return character.pokeName.toLowerCase().includes(string);
  });
  //    we call the displaypokemon function with a new parameter that we created above to filter out user input
  pokeApp.displayPokemon(filteredPokemons);
});
pokeApp.getPokemon = () => {

  const promises = [];
  //   We create a for loop so we can loop thru all of the pokemons
  for (let i = 1; i <= pokemonCount; i++) {
    //   we put template literals at the end of the url ${i} so the loop iterates through all of the pokemons
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    // this is where we use the push method to push a new promise from the "fetch" and ".then" which then reurns the "res.json" to ,const promises = [],  array
    promises.push(
      fetch(url)
       .then((res) => res.json()));
  }
  // outside of our for loop we are  passing the promises.push into the promise.all
  // promise all makes our pokemons all come in at once rather than individually
  Promise.all(promises)
    .then((responses) => {
    // change the pokemon from a const to a let  varible
    // map() will iterate through an array and it will return a new array by converting each item. It iterates through all and then it returns an object with the extracted pokemon information
    pokemon = responses.map((result) => ({
      // extra pokemon data that is converted into a new array by using map()
      pokeName: result.name,
      pokeImage: result.sprites["front_default"],
      pokeType: result.types.map(
        (type) => type.type.name)
        .join(", "),
    }));
    // console.log (pokemon);
    pokeApp.displayPokemon(pokemon);
  });
};
// creating a display pokemon function
pokeApp.displayPokemon = (pokemon) => {
  console.log(pokemon);
  //   we generate a string in html to repopulate the empty ul in the html
  const pokemonString = pokemon.map(
    // we use map() to return for each poke a li string with the newl generated pokemon
    (poke) => `
        <li class="pokeCard">
            <h2 class="pokeName">${poke.pokeName}</h2>
            <img class="pokeImg" src="${poke.pokeImage}"/>
            <p class="pokeType">Type: ${poke.pokeType}</p>
        </li>
    `
  )
  .join('')
  
  // take the pokemon string and set it as innerHtml
  pokedex.innerHTML = pokemonString;
};

// Button bottom function 
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    btnTop.style.display = "block";
  } else {
    btnTop.style.display = "none";
  }
}
 function topFunction() {

   document.documentElement.scrollTop = 0; 
 } 



pokeApp.init = () => {
  pokeApp.getPokemon();
};
pokeApp.init();
