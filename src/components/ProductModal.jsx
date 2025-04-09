import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const ProductModal = ({ isOpen, onClose, product, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    compareAtPrice: '',
    cost: '',
    sku: '',
    inventory: '',
    categories: [],
    images: [],
    specifications: {},
    weight: '',
    dimensions: '',
    isPublished: false,
    isFeatured: false,
    tags: [],
    seo: {
      title: '',
      description: '',
      keywords: []
    }
  });

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        categories: product.categories || [],
        images: product.images || [],
        specifications: product.specifications || {},
        tags: product.tags || [],
        seo: product.seo || { title: '', description: '', keywords: [] }
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayInput = (e, field) => {
    const value = e.target.value.split(',').map(item => item.trim());
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSeoChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        [name]: name === 'keywords' ? value.split(',').map(k => k.trim()) : value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e80071] focus:ring-[#e80071]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">SKU</label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e80071] focus:ring-[#e80071]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e80071] focus:ring-[#e80071]"
                required
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Pricing</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e80071] focus:ring-[#e80071]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Compare at Price</label>
                <input
                  type="number"
                  name="compareAtPrice"
                  value={formData.compareAtPrice}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e80071] focus:ring-[#e80071]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cost per Item</label>
                <input
                  type="number"
                  name="cost"
                  value={formData.cost}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e80071] focus:ring-[#e80071]"
                />
              </div>
            </div>
          </div>

          {/* Inventory */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Inventory</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                name="inventory"
                value={formData.inventory}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e80071] focus:ring-[#e80071]"
                required
              />
            </div>
          </div>

          {/* Categories and Tags */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Organization</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Categories</label>
                <input
                  type="text"
                  value={formData.categories.join(', ')}
                  onChange={(e) => handleArrayInput(e, 'categories')}
                  placeholder="Enter categories separated by commas"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e80071] focus:ring-[#e80071]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tags</label>
                <input
                  type="text"
                  value={formData.tags.join(', ')}
                  onChange={(e) => handleArrayInput(e, 'tags')}
                  placeholder="Enter tags separated by commas"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e80071] focus:ring-[#e80071]"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Images</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image URLs</label>
              <input
                type="text"
                value={formData.images.join(', ')}
                onChange={(e) => handleArrayInput(e, 'images')}
                placeholder="Enter image URLs separated by commas"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e80071] focus:ring-[#e80071]"
              />
            </div>
          </div>

          {/* SEO */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">SEO</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Meta Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.seo.title}
                  onChange={handleSeoChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e80071] focus:ring-[#e80071]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Meta Description</label>
                <textarea
                  name="description"
                  value={formData.seo.description}
                  onChange={handleSeoChange}
                  rows={2}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e80071] focus:ring-[#e80071]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Keywords</label>
                <input
                  type="text"
                  name="keywords"
                  value={formData.seo.keywords.join(', ')}
                  onChange={handleSeoChange}
                  placeholder="Enter keywords separated by commas"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e80071] focus:ring-[#e80071]"
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Status</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-[#e80071] focus:ring-[#e80071] border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">Published</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-[#e80071] focus:ring-[#e80071] border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">Featured</label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e80071]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-[#e80071] border border-transparent rounded-md shadow-sm hover:bg-[#c4005f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e80071]"
            >
              {product ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;