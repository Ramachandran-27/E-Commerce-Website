import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Profile from '../pages/Profile/Profile';
import ProductList from '../pages/ProductList/ProductList';
import ProductDetails from '../pages/ProductDetails/ProductDetails';
import Cart from '../pages/Cart/Cart';
import Checkout from '../pages/Checkout/Checkout';
import Orders from '../pages/Orders/Orders';
import OrderDetails from '../pages/OrderDetails/OrderDetails';
import Wishlist from '../pages/Wishlist/Wishlist';
import AddressList from '../pages/Address/AddressList';
import Navbar from '../layouts/Navbar';

function AppRoutes(){
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
                <Route path='/profile' element={<Profile />}></Route>
                <Route path='/address' element={<AddressList />} ></Route>
                <Route path='/products' element={<ProductList />}></Route>
                <Route path='/products/:id' element={<ProductDetails />}></Route>
                <Route path='/cart' element={<Cart />}></Route>
                <Route path='/checkout' element={<Checkout />}></Route>
                <Route path='/orders' element={<Orders />}></Route>
                <Route path='/orders/:id' element={<OrderDetails />}></Route>
                <Route path='/wishlist' element={<Wishlist />}></Route>
            </Routes>
        </Router>
    );
}

export default AppRoutes;