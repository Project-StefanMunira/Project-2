const pokedex = document.getElementById("pokemons");
const searchBar = document.getElementById("searchBar");
const pokemonCount = 150;
const btnTop = document.getElementById('scrollTop');
// create a let variable of an empty array so we can filter out the user input into a new array
let pokemon = [];
searchBar.addEventListener("keyup", (e) => {
  // if the user inputs a capital Letter it automatically converts it to lowercase()
  const string = e.target.value.toLowerCase();
  console.log(e);
  const filteredPokemons = pokemon.filter((pokeCharacter) => {
    return pokeCharacter.pokename.toLowerCase().includes(string);
  });
  //    we call the displaypokemon function with a new parameter that we created above to filter out user input
  displayPokemonCard(filteredPokemons);
});

// We crate a function to get the API to get us the pokemon
const getPokemon = () => {
  // we create an empty array for the promiseAll function so when we push all of the promises from the API then can repopulate the new empty promise array
  const promisesArr = [];
  //   We create a for loop so we can loop thru all of the pokemons
   for (let i = 1; i <= pokemonCount; i++) {
  //   //   we put template literals at the end of the url ${i} so the loop iterates through all of the pokemons
    const urlApi = `https://pokeapi.co/api/v2/pokemon/${i}`;
  //   // this is where we use the push method to push a new promise from the "fetch" and ".then" which then reurns the "res.json" to ,const promises = [],  array
    promisesArr.push(
      fetch(urlApi)
      .then((response) => {
        return response.json();
      })
    );
  }
  
// outside of our for loop we are  passing the promises.push into the promise.all
  // promise all makes our pokemons all come in at once rather than individually
  Promise.all(promisesArr)
  .then((responses) => {
    // change the pokemon fronm a const to a let  varible
    // map() will iterate through an array and it will return a new array by converting each item. It iterates through all and then it returns an object with the extracted pokemon information
    pokemon = responses.map((result) => ({
      // extra pokemon data that is converted into a new array by using map()
      pokename: result.name,
      pokeimage: result.sprites["front_default"],
     
      poketype: result.types.map(
        (type) => 
        type.type.name),
      
    }));
    
    displayPokemonCard(pokemon);
  });
};

// creating a display pokemon function
const displayPokemonCard = (pokemon) => {
  console.log(pokemon);
  //   we generate a string in html to repopulate the empty ul in the html
  // we use map() to return for each poke a li string with the newl generated pokemon
  const pokeString = pokemon.map((poke) => `
        <li class="pokeCard">
        <h1 class="pokeName">${poke.pokename}</h2>
            <img class="pokeImg" src="${poke.pokeimage}"/>
            <p class="pokeType">Type: ${poke.poketype}</p>
        </li>
        
    `
  )
  .join('')
  

  // take the pokemon string and set it as innerHtml
  pokedex.innerHTML = pokeString;
};

// calling the getpokemon function

getPokemon();

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
