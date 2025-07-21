import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchRecipeById } from '../services/recipeService'
import { Recipe } from '../types/Recipe'
import { useAuth } from '../hooks/useAuth'
import RatingStars from '../components/RatingStars'
import axios from 'axios'

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userRating, setUserRating] = useState<number | null>(null)
  const { token, user } = useAuth()

  useEffect(() => {
    const getRecipe = async () => {
      try {
        if (!id) return
        const data = await fetchRecipeById(id)
        setRecipe(data)

        if (user?.userId && data.ratings) {
          const ownRating = data.ratings.find(r => r.userId === user.userId)
          setUserRating(ownRating?.value ?? null)
        }
      } catch (err) {
        setError('Failed to load recipe.')
      } finally {
        setLoading(false)
      }
    }

    getRecipe()
  }, [id, user?.userId])

  const handleRate = async (value: number) => {
    if (!token || !id) return

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/rating`,
        { recipeId: id, value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setUserRating(value)
      const updated = await fetchRecipeById(id)
      setRecipe(updated)
    } catch (err) {
      console.error('Rating failed:', err)
    }
  }

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading...</div>
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>
  if (!recipe) return <div className="text-center mt-10 text-gray-500">Recipe not found</div>

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-10">
      <section className="bg-gray-50 p-6 rounded-xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{recipe.title}</h1>
        <p className="text-lg text-gray-700 mb-4">{recipe.description}</p>

        <div className="text-sm text-gray-500 mb-1">
          Author: {recipe.author?.email ?? 'Unknown'}
        </div>

        <div className="mb-3 text-gray-800">
          <span className="font-semibold">Average Rating:</span>{' '}
          {typeof recipe.avgRating === 'number' ? recipe.avgRating.toFixed(1) : '–'}
        </div>

        {token && (
          <div>
            <span className="font-semibold">Your Rating:</span>{' '}
            <RatingStars rating={userRating ?? 0} onRate={handleRate} editable />
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">🧂 Ingredients</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-800 pl-2">
          {recipe.ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <hr className="border-t border-gray-200" />

      <section>
        <h2 className="text-2xl font-semibold mb-3">👨‍🍳 Instructions</h2>
        <div className="text-gray-800 whitespace-pre-line leading-relaxed bg-gray-50 rounded-xl p-4">
          {recipe.instructions}
        </div>
      </section>
    </div>
  )
}

export default RecipeDetails
