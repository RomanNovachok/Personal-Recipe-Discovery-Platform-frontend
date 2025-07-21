import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto text-center p-10">
      <h1 className="text-4xl font-bold mb-4">Welcome to FlavorAI</h1>
      <p className="text-lg text-gray-700 mb-4">
        Your personal recipe discovery and management platform. Whether you're a passionate home cook or a curious foodie,
        FlavorAI helps you save, create, and explore new recipes from around the world.
      </p>
      <p className="text-gray-600 mb-8">
        ✨ Browse community-shared recipes<br />
        ✍️ Create your own with easy editing tools<br />
        ⭐ Rate and review what you try<br />
        🔐 Secure, personalized, and simple
      </p>
      <Link
        to="/recipes"
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Explore Recipes
      </Link>
    </div>
  )
}

export default Home
