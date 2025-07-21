import axios from 'axios'
import { Recipe } from '../types/Recipe'

const API = import.meta.env.VITE_API_URL + '/recipes'

export const fetchRecipes = async (token?: string): Promise<Recipe[]> => {
  const response = await axios.get(API, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  return response.data
}


export const createRecipe = async (data: {
  title: string
  description: string
  ingredients: string[]
  instructions: string
}, token: string) => {
  const response = await axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const fetchMyRecipes = async (token: string) => {
  const res = await axios.get(`${API}/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
    
  return res.data as Recipe[];
};

export const fetchRecipeById = async (id: string): Promise<Recipe> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/recipes/${id}`)
  if (!res.ok) {
    throw new Error('Failed to fetch recipe')
  }
  return res.json()
}

export const deleteRecipe = async (id: string, token: string) => {
  const res = await axios.delete(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}

export const updateRecipe = async (
  id: string,
  data: {
    title: string
    description: string
    ingredients: string[]
    instructions: string
  },
  token: string
) => {
  const res = await axios.patch(`${API}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
}
