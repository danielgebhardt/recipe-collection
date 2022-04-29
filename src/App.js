import './App.css';
import {useState} from "react";

const App = () => {
    const [isAddRecipeFormDisplayed, setIsAddRecipeFormDisplayed] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [newRecipeName, setNewRecipeName] = useState("");
    const [newRecipeInstructions, setNewRecipeInstructions] = useState("");

    const toggleAddRecipeForm = () => {
        setIsAddRecipeFormDisplayed(!isAddRecipeFormDisplayed);
    };

    const handleRecipeNameChange = (event) => {
        const value = event.target.value;
        setNewRecipeName(value);
    };

    const handleRecipeInstructionsChange = (event) => {
        const value = event.target.value;
        setNewRecipeInstructions(value);
    };

    const submitRecipe = (event) => {
        event.preventDefault();
        setRecipes([...recipes,
                {
                    name: newRecipeName,
                    instructions: newRecipeInstructions
                }
            ]);
    }

    const addNewRecipeForm = (
        <form id="recipe-form" onSubmit={submitRecipe}>
            <label htmlFor="newRecipeName">Recipe name: </label>
            <input type="text" id="newRecipeName" onChange={handleRecipeNameChange} value={newRecipeName}/>
            <label htmlFor="newRecipeInstructions">Instructions:</label>
            <textarea id="newRecipeInstructions" onChange={handleRecipeInstructionsChange} value={newRecipeInstructions}
                      placeholder="write recipe instructions here..."/>
            <input type="submit"/>
        </form>
    );

    return (
        <div className="App">
            <h1 className="App-header">My Recipes</h1>
            {
                isAddRecipeFormDisplayed
                    ? addNewRecipeForm
                    : <button id="add-recipe" onClick={toggleAddRecipeForm}>Add Recipe</button>
            }
            {
                recipes.length > 0 ?
                    <ul>
                        {recipes.map((recipe, index) => <li key={index}>{recipe.name}</li>)}
                    </ul> :
                    <p>There are no recipes to list.</p>
            }
        </div>
    );
}

export default App;