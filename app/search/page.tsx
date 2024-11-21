'use client';
import { useState } from 'react';
import { SimpleButton } from '../../components/button';
import { getRecipes } from '../../services/recipeService';
import { runRoboflowInference } from '../../services/visionService';

export default function SearchPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [myIngredients, setMyIngredients] = useState<string[]>([]);
  const [possibleRecipes, setPossibleRecipes] = useState<string[]>([]);

  const handleSearchRecipeClick = async () => {
    // check if myIngredients is empty, then use butter eggs
    const recipes = myIngredients.length === 0 ? await getRecipes(['butter', 'eggs']) : await getRecipes(myIngredients);
    // theoretically, possible recipes should be parsed by kyle. then we map each one to a component
    setPossibleRecipes(await recipes)
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCVClick = async () => {
    if (base64Image) {
      setMyIngredients(await runRoboflowInference(base64Image));
    }
  };

  return (
    <div>
      <h1>Search Page</h1>
      <p>This is the search page.</p>
      <br />
      <SimpleButton onClick={handleSearchRecipeClick}>search recipe api</SimpleButton>
      <br />
      <input type="file" onChange={handleFileChange}/>
      <SimpleButton onClick={handleCVClick}>try cv api</SimpleButton>
    </div>
  );
}