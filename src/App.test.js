import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('Add recipe button toggles visibility of a form on the page ', async () => {

    render(<App/>);
    // `queryBy...` methods will return null if the element is not found:
    const recipeForm = screen.queryByText("Instructions:");

    // `getBy...` methods will "throw" an error if the element is not found:
    // const recipeForm = screen.getByText("Instructions:");

    expect(recipeForm).toBeNull();
    await userEvent.click(screen.getByText("Add Recipe"));

    expect(screen.getByLabelText("Instructions:")).toBeInTheDocument();
});

test('typing in the recipe name makes the recipe name appear in the input', async () => {
    render(<App/>);

    const recipeName = 'No pockets';
    await userEvent.click(screen.getByText("Add Recipe"));
    await userEvent.type(screen.getByLabelText('Recipe name:'), recipeName);

    expect(screen.getByLabelText('Recipe name:').value).toEqual(recipeName);
});

const setup = async () => {
    render(<App/>);

    await userEvent.click(screen.getByText('Add Recipe'));

    // Add the submit button to your setup method:
    const submitButton = screen.getByRole('button')
    const instructionsInput = screen.getByLabelText('Instructions:')
    const nameInput = screen.getByLabelText('Recipe name:')

    return {
        instructionsInput,
        nameInput,
        submitButton
    }
}

test('typing in the recipe instructions makes the instructions appear in the form', async () => {
    const {instructionsInput} = await setup();

    const recipeInstructions = "kinda hard to write instructions without knowing what I'm cooking";

    await userEvent.type(instructionsInput, recipeInstructions);
    expect(instructionsInput.value).toEqual(recipeInstructions);
});

test('recipe name from state appears in an unordered list', async () => {
    const {instructionsInput, nameInput, submitButton} = await setup();
    const recipeName = "Lean Pockets"
    const recipeInstructions = "place in toaster oven on 350 for 45 minutes"

    await userEvent.type(instructionsInput, recipeInstructions)
    await userEvent.type(nameInput, recipeName)
    await userEvent.click(submitButton);

    expect(screen.getByRole('listitem')).toBeInTheDocument();
    expect(screen.getByText(recipeName)).toBeInTheDocument();
})
