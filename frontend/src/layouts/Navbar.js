import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getCategories } from "../services/categoryService";
import { logoutUser } from '../services/userService';
import './Navbar.css';

export default function Navbar() {

    const [formData, setFormData] = useState({
        searchTerm: '',
        category: ''
    });

    const [categories, setCategories] = useState([]);

    const isLoggedIn = !!localStorage.getItem("token");

    

    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/');
    };
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                console.log(response);
                setCategories(response);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.searchTerm.trim() || formData.category!=='') {
            navigate(`/products?search=${formData.searchTerm.trim()}&category=${formData.category!==''?categories.find((category)=>category.name===formData.category).id:""}`);
        }
    };

    return (
        <header>
            <nav className="navbar">
                <div className="navbar-logo">
                   <Link to='/'> <span className="navbar-logo-icon">🛒</span>
                    <span className="navbar-logo-text">Shopify</span></Link>
                </div>
                <form className="search-form" onSubmit={handleSubmit}>
                    <select name="category" onChange={handleChange} value={formData.category} className="search-select">
                        <option value="">All Categories</option>
                        {Array.isArray(categories) && categories.map((category, index) => (
                            <option value={category.name} key={index}>{category.name}</option>
                        ))}
                    </select>
                    <input
                        type="search"
                        name="searchTerm"
                        onChange={handleChange}
                        value={formData.searchTerm}
                        placeholder="Search products"
                        className="search-input"
                    />
                    <button type="submit" className="search-btn">Search</button>
                </form>
                <div className="navbar-links">
                    <Link to='/wishlist'>Wishlist</Link>
                    <Link to='/orders'>Orders</Link>
                    
                    <Link to='/cart' className="cart-link">
                        <span role="img" aria-label="cart">🛒</span> Cart
                    </Link>
                    {isLoggedIn? (
                    <>
                        <Link to='/profile'>Profile</Link>
                        <Link to='/' onClick={handleLogout}>Logout</Link>
                    </>):(
                    <>
                        <Link to='/register'>Sign Up</Link>
                        <Link to='/login'>Login</Link>
                    </>)}
                </div>
            </nav>
        </header>
    );
}