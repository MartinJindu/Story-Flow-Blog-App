"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Category {
  id: string;
  name: string;
  slug: string;
  posts: { id: string }[];
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get("/api/admin/categories");
        setCategories(res.data);
      } catch (err) {
        setError("Failed to fetch categories");
      }
    }
    fetchCategories();
  }, []);

  const createCategory = async () => {
    if (!newCategory) return;

    try {
      const res = await axios.post("/api/admin/categories", {
        name: newCategory,
      });
      setCategories([...categories, res.data]);
      setNewCategory("");
    } catch (err) {
      setError("Failed to create category");
    }
  };

  const updateCategory = async () => {
    if (!editingCategory) return;

    try {
      const res = await axios.put("/api/admin/categories", {
        id: editingCategory.id,
        name: editingCategory.name,
      });

      setCategories(
        categories.map((c) => (c.id === editingCategory.id ? res.data : c))
      );
      setEditingCategory(null);
    } catch (err) {
      setError("Failed to update category");
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await axios.delete("/api/admin/categories", { data: { id } });
      setCategories(categories.filter((c) => c.id !== id));
    } catch (err) {
      setError("Cannot delete category with posts");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Category Management</h1>

      {error && <p className="text-red-500">{error}</p>}

      {/* Add New Category */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border p-2 w-full"
        />
        <button
          onClick={createCategory}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Add
        </button>
      </div>

      {/* Category List */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Slug</th>
            <th className="border p-2">Posts</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="border">
              <td className="border p-2">
                {editingCategory?.id === category.id ? (
                  <input
                    type="text"
                    value={editingCategory.name}
                    onChange={(e) =>
                      setEditingCategory({
                        ...editingCategory,
                        name: e.target.value,
                      })
                    }
                    className="border p-1"
                  />
                ) : (
                  category.name
                )}
              </td>
              <td className="border p-2">{category.slug}</td>
              <td className="border p-2">{category.posts?.length || 0}</td>
              <td className="border p-2">
                {editingCategory?.id === category.id ? (
                  <button
                    onClick={updateCategory}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setEditingCategory(category)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                )}
                {category.posts.length === 0 && (
                  <button
                    onClick={() => deleteCategory(category.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
