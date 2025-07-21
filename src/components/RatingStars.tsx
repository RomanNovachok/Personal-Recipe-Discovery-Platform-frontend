import { useState } from 'react'
import { FaStar } from 'react-icons/fa'

interface RatingStarsProps {
  rating: number            
  onRate: (value: number) => void 
  editable?: boolean    
}

const RatingStars = ({ rating, onRate, editable = true }: RatingStarsProps) => {
  const [hovered, setHovered] = useState<number | null>(null)

  const handleClick = (value: number) => {
    if (editable) onRate(value)
  }

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((value) => {
        const isFilled = hovered !== null ? value <= hovered : value <= rating
        return (
          <FaStar
            key={value}
            className={`cursor-pointer ${isFilled ? 'text-yellow-400' : 'text-gray-300'}`}
            onClick={() => handleClick(value)}
            onMouseEnter={() => editable && setHovered(value)}
            onMouseLeave={() => editable && setHovered(null)}
            size={20}
          />
        )
      })}
    </div>
  )
}

export default RatingStars
