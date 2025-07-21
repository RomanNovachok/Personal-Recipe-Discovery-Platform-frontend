import { useEffect, useState } from 'react'
import { fetchRecipes } from '../services/recipeService'
import { Recipe } from '../types/Recipe'
import RecipeCard from '../components/RecipeCard'
import { useAuth } from '../hooks/useAuth'

const RecipesList = () => {
  const { token } = useAuth()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchRecipes(token ?? undefined)
        setRecipes(data)
      } catch (err) {
        console.error('Failed to fetch recipes:', err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [token])

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    const ratingA = typeof a.avgRating === 'number' ? a.avgRating : 0
    const ratingB = typeof b.avgRating === 'number' ? b.avgRating : 0
    return ratingB - ratingA // highest first
  })

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">All Recipes</h1>

      <input
        type="text"
        placeholder="Search recipes by title..."
        className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <div className="text-center text-gray-500">Loading recipes...</div>
      ) : sortedRecipes.length === 0 ? (
        <div className="text-center text-gray-500">No recipes found.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  )
}

export default RecipesList
