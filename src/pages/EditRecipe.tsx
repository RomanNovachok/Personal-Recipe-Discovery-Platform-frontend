import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchRecipeById, updateRecipe } from '../services/recipeService'
import { useAuth } from '../hooks/useAuth'

const EditRecipe = () => {
  const { id } = useParams<{ id: string }>()
  const { token } = useAuth()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [instructions, setInstructions] = useState('')
  const [ingredients, setIngredients] = useState('')

  useEffect(() => {
    const load = async () => {
      if (!id) return
      const recipe = await fetchRecipeById(id)
      setTitle(recipe.title)
      setDescription(recipe.description)
      setInstructions(recipe.instructions)
      setIngredients(recipe.ingredients.join(', '))
    }
    load()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token || !id) return
    try {
      await updateRecipe(id, {
        title,
        description,
        instructions,
        ingredients: ingredients.split(',').map(i => i.trim()),
      }, token)
      navigate(`/recipes/${id}`)
    } catch {
      alert('Failed to update recipe')
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Recipe</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input className="border p-2 rounded" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        <textarea className="border p-2 rounded" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required />
        <input className="border p-2 rounded" value={ingredients} onChange={e => setIngredients(e.target.value)} placeholder="Ingredients (comma separated)" required />
        <textarea className="border p-2 rounded" value={instructions} onChange={e => setInstructions(e.target.value)} placeholder="Instructions" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Update</button>
      </form>
    </div>
  )
}

export default EditRecipe
