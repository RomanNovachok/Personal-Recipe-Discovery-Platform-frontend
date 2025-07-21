export interface Recipe {
  id: string
  title: string
  description: string
  ingredients: string[]
  instructions: string
  createdAt: string
  author?: {
    email: string
  }
  ratings?: {
    value: number
  }[]
  avgRating?: number 
}

