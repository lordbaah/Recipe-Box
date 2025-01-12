import axios from "axios";

const url = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export const searchRecipes = async (query = "", offset = 0, number = 20) => {
  try {
    const response = await axios.get(
      `${url}/recipes/complexSearch?apiKey=${apiKey}&query=${query}&addRecipeInformation=true&offset=${offset}&number=${number}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.message || error.response.statusText);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("No response received from server");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(error.message);
    }
  }
};

export const fetchRecipesPaginated = async (
  offset = 0,
  number = 20,
  dietType = "",
  cuisineType = "",
  mealType = ""
) => {
  try {
    const response = await axios.get(
      `${url}/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&offset=${offset}&number=${number}&diet=${dietType}&cuisine=${cuisineType}&type=${mealType}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.message || error.response.statusText);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("No response received from server");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(error.message);
    }
  }
};

export const fetchRecipesDetails = async (recipeId) => {
  try {
    const response = await axios.get(
      `${url}/recipes/${recipeId}/information?apiKey=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.log(`error: ${error}`);
  }
};
