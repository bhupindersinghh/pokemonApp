import React, { useEffect, useState } from "react";
import PokemonThumbnail from "./Components/PokemonThumbnail";

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [alreadySearchedPokemon, setAlreadySearchedPokemon] = useState([]);
  const [loadPoke, setLoadPoke] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  const searchPokemon = async () => {
    if (inputValue) {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${inputValue.toLowerCase()}`
        );
        const data = await res.json();
        setIsLoading(false);
        setAllPokemons([data]);
        setAlreadySearchedPokemon((prev) => [...prev, inputValue]);
      } catch {
        setIsLoading(false);
        setAllPokemons([]);
      }
    }
  };

  const resetPokemonData = () => {
    setAllPokemons([]);
  };

  const createPokemonObject = async (result, isReset) => {

    result.forEach(async (pokemon) => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      const data = await res.json();
      setIsLoading(false);
      setAllPokemons((currentList) => [...currentList, data]);
    });
  };

  const getAllPokemons = async (resetUrl) => {
    setIsLoading(true);
    const res = await fetch(resetUrl ? resetUrl : loadPoke);
    const data = await res.json();
    setLoadPoke(data.next);

    createPokemonObject(data.results, resetUrl ? true : false);
  };
  useEffect(() => {
    getAllPokemons();
  }, []);

  const handleSearch = () => {
    // setPokemonSearched({po});
    if (inputValue) {
      searchPokemon();
    }
  };

  return (
    <div className="app-container">
      <h1>Pokemon World</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="search here.."
        />
        <button  onClick={handleSearch}>
          Search
        </button>
        <button
          
          onClick={() => {
            const resetUrl = `https://pokeapi.co/api/v2/pokemon?limit=20`;
            resetPokemonData();
            getAllPokemons(resetUrl);
          }}
        >
          Reset
        </button>
      </div>
      <div>
        <h2 style={{color: "white"}}>Already Searched : </h2>
        {alreadySearchedPokemon.map((item) => (
          <p style={{color: "yellow", display: "inline"}}>{item.toLowerCase()} &nbsp;</p>
          
        ))}
      </div>

      <div className="pokemon-container">
        {isLoading ? (
          <div class="loader">Loading...</div>
        ) : allPokemons.length === 0 ? (
          <h2 style={{color: "white"}}>Nothing Found..</h2>
        ) : (
          <>
            <div className="all-container">
              {allPokemons.map((pokemon, index) => (
                <PokemonThumbnail
                  id={pokemon.id}
                  name={pokemon.name}
                  image={pokemon.sprites.other.dream_world.front_default}
                  type={pokemon.types[0].type.name}
                  key={index}
                  height={pokemon.height}
                  weight={pokemon.weight}
                  stat1={pokemon.stats[0].stat.name}
                  stat2={pokemon.stats[1].stat.name}
                  stat3={pokemon.stats[2].stat.name}
                  bs1={pokemon.stats[0].base_stat}
                  bs2={pokemon.stats[1].base_stat}
                  bs3={pokemon.stats[2].base_stat}
                />
              ))}
            </div>
            <button className="load-more" onClick={() => getAllPokemons()}>
              More Pokemons
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
