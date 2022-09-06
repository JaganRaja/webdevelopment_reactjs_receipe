import React, { useEffect, useState } from "react";
import "./App.css";
import Recipe from "./Recipe";

const App = () => {
  const APP_ID = "d0da2114";
  const APP_KEY = "4682ab273a8ac4dec17be74adec21bbf";

  //creating state to get, what we got through API
  const [recipes, setRecipes] = useState([]);

  //creating state for search word in search bar
  const [search, setSearch] = useState("");

  //creating state -->after clicking submit button, it will update
  const [query, setQuery] = useState("chicken"); //adding the default as chicken

  // const exampleReq = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;

  // const [counter, setCounters] = useState(0);

  //useEffect example
  // useEffect(() =>{
  //   console.log('useeffect');
  // },[]);

  useEffect(() => {
    getRecipes();
    console.log("i am from use effect");
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    console.log(data.hits);
    setRecipes(data.hits); //setting setRecipes
  };

  //instead of above we can use promise
  // fetch(https://.....)
  // .then(response => {
  //   response.json()
  // })

  const updateSearch = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  const getSearch = (e) => {
    e.preventDefault(); //prevent loading the page while clicking on submit button

    setQuery(search);

    setSearch(""); //after submiting the query, we are making the input box as empty
  };

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      {/* useEffect exmple */}
      {/* <h1 onClick={() => setCounters(counter+1)}>{counter}</h1> */}

      {/* in arrow function, after =>, instead of curlybraces{}, we use paranthesis(), because i want to return some HTML or JSX */}
      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
