import { useEffect, useState } from 'react'
import { fetchMyRecipes } from '../services/recipeService'
import { useAuth } from '../hooks/useAuth'
import { Recipe } from '../types/Recipe'
import RecipeCard from '../components/RecipeCard'

const MyRecipes = () => {
  const { token } = useAuth()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchMyRecipes(token!)
        setRecipes(data)
      } catch (err) {
        console.error('Failed to fetch my recipes:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [token])

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">My Recipes</h1>

      <input
        type="text"
        placeholder="Search my recipes by title..."
        className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <div className="text-center text-gray-500">Loading your recipes...</div>
      ) : filteredRecipes.length === 0 ? (
        <div className="text-center text-gray-500">You haven't added any matching recipes.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  )
}

export default MyRecipes
