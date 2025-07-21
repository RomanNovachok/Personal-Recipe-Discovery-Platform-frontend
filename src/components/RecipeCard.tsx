import { Recipe } from '../types/Recipe'
import { useNavigate } from 'react-router-dom'
import RatingStars from './RatingStars'

interface Props {
  recipe: Recipe
}

const RecipeCard = ({ recipe }: Props) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/recipes/${recipe.id}`)
  }

  return (
    <div
      onClick={handleClick}
      className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
    >
      <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
      <p className="text-gray-600 line-clamp-3 mb-2">{recipe.description}</p>
      <div className="text-sm text-gray-500 mb-1">
        By: {recipe.author?.email ?? 'Unknown'}
      </div>
      <RatingStars rating={recipe.avgRating ?? 0} onRate={() => {}} editable={false} />
    </div>
  )
}

export default RecipeCard
