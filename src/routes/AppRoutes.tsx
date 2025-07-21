import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import RecipesList from '../pages/RecipesList';
import RecipeDetails from '../pages/RecipeDetails';
import AddRecipe from '../pages/AddRecipe';
import MyRecipes from '../pages/MyRecipes';
import ProtectedRoute from './ProtectedRoute';
import EditRecipe from '../pages/EditRecipe'


const AppRoutes = () => (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recipes" element={<RecipesList />} />
      <Route path="/recipes/:id" element={<RecipeDetails />} />
      <Route path="/recipes/:id/edit" element={<EditRecipe />} />
      <Route
        path="/recipes/add"
        element={
          <ProtectedRoute>
            <AddRecipe />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recipes/my"
        element={
          <ProtectedRoute>
            <MyRecipes />
          </ProtectedRoute>
        }
      />
    </Routes>
  );


export default AppRoutes;
