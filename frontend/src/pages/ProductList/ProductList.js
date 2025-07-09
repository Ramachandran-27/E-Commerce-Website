import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllProducts } from '../../services/productService';
import ProductCard from '../../components/ProductCard';
import './ProductList.css';

const SORT_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating_desc', label: 'Rating: High to Low' },
  { value: 'rating_asc', label: 'Rating: Low to High' },
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ProductList() {
  const query = useQuery();
  const [productList, setProductList] = useState([]);
  const [filters, setFilters] = useState({
    search: query.get('search') || '',
    category: query.get('category') || '',
    sort: '',
    minPrice: '',
    maxPrice: '',
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      search: query.get('search') || '',
      category: query.get('category') || '',
    }));
    setPagination(prev => ({ ...prev, page: 1 }));
    // eslint-disable-next-line
  }, [query.get('search'), query.get('category')]);

  const fetchProducts = async () => {
    setLoading(true);
    const params = {
      search: filters.search,
      category: filters.category,
      sort: filters.sort,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      offset: (pagination.page - 1) * pagination.limit,
      limit: pagination.limit,
    };
    const response = await getAllProducts(params);
    setProductList(response);
    setPagination(prev => ({
      ...prev,
      total: response.total || 0,
    }));
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, [filters, pagination.page]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
    if (['category', 'search', 'minPrice', 'maxPrice'].includes(name)) {
      setPagination(prev => ({ ...prev, page: 1 }));
    }
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchProducts();
  };

  const handleSortChange = (e) => {
    setFilters(prev => ({
      ...prev,
      sort: e.target.value,
    }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({
      ...prev,
      page: newPage,
    }));
  };

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return (
    <div className="product-list-container">
      <form className="product-list-sidebar" onSubmit={handleFilterSubmit}>
        <h3>Filters</h3>
        <label className="product-list-filter-label">Search</label>
        <input
          type="text"
          name="search"
          placeholder="Search products..."
          value={filters.search}
          onChange={handleFilterChange}
          className="product-list-search"
        />
        <label className="product-list-filter-label">Category</label>
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="product-list-select"
        >
          <option value="">All Categories</option>
          <option value="Mobiles">Mobiles</option>
          <option value="Laptops">Laptops</option>
          <option value="Accessories">Accessories</option>
          {/* Add more categories as needed */}
        </select>
        <label className="product-list-filter-label">Price Range</label>
        <div className="product-list-price-row">
          <input
            type="number"
            name="minPrice"
            placeholder="Min"
            value={filters.minPrice}
            onChange={handleFilterChange}
            className="product-list-price-input"
            min="0"
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="product-list-price-input"
            min="0"
          />
        </div>
        <label className="product-list-filter-label">Sort By</label>
        <select
          name="sort"
          value={filters.sort}
          onChange={handleSortChange}
          className="product-list-select"
        >
          {SORT_OPTIONS.map(opt => (
            <option value={opt.value} key={opt.value}>{opt.label}</option>
          ))}
        </select>
        <button type="submit" className="product-list-filter-btn">Apply Filters</button>
      </form>
      <div className="product-list-main">
        {loading ? (
          <div className="product-list-loading">Loading...</div>
        ) : (
          <>
            <div className="product-list-grid">
              {productList.length === 0 ? (
                <div className="product-list-empty">No products found.</div>
              ) : (
                Array.isArray(product) && productList.map(product => (
                  <ProductCard details={product} key={product.id} />
                ))
              )}
            </div>
            {totalPages > 1 && (
              <div className="product-list-pagination">
                <button
                  disabled={pagination.page === 1}
                  onClick={() => handlePageChange(pagination.page - 1)}
                >
                  Prev
                </button>
                <span>
                  Page {pagination.page} of {totalPages}
                </span>
                <button
                  disabled={pagination.page === totalPages}
                  onClick={() => handlePageChange(pagination.page + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}