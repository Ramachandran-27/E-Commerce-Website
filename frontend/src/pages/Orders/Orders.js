import React, { useEffect, useState } from 'react';
import { getOrdersByUser } from '../../services/orderService';
import { Link } from 'react-router-dom';
import './Orders.css';

export default function Order() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try{
      const userId = JSON.parse(localStorage.getItem('user')).id;
      const res = await getOrdersByUser(userId);
      console.log(res);
      setOrders(res || []);
      }catch(error){
        console.log(error);
        setOrders([]);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="order-container">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <div className="order-empty">No orders found.</div>
      ) : (
        <div className="order-list">
          {orders.map(order => (
            <Link to={`/orders/${order.id}`} className="order-card" key={order.id}>
              <div>
                <div className="order-id">Order #{order.id}</div>
                <div className="order-date">{new Date(order.created_at).toLocaleString()}</div>
                <div className="order-total">Total: <span>${order.total_amount}</span></div>
              </div>
              <div className="order-status">{order.status}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}