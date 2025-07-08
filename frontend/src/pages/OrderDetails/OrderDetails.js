import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../services/orderService';
import './OrderDetails.css';

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getOrderById(id);
        setOrder(res);
      } catch (error) {
        console.log(error);
        setOrder(null);
      }
    };
    fetchOrder();
  }, [id]);

  if (!order) return <div className="order-details-container">Loading...</div>;

  return (
    <div className="order-details-container">
      <h2>Order #{order.order_id}</h2>
      <div className="order-details-info">
        <div>
          <strong>Date:</strong> {new Date(order.created_at).toLocaleString()}
        </div>
        <div>
          <strong>Status:</strong> {order.status}
        </div>
        <div>
          <strong>Shipping Address:</strong>{' '}
          {order.address.address_line1}, {order.address.address_line2}, {order.address.city}, {order.address.state}
        </div>
      </div>
      <div className="order-details-items">
        <h3>Items</h3>
        <ul>
          {order.products.map(item => (
            <li key={item.product_id}>
              <div style={{fontWeight:"bold",display:"inline-block","width":"200px"}}>{item.name}</div> x {item.quantity}{' '}
              <span>${(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="order-details-total">
          Total: <span>${order.total_amount}</span>
        </div>
      </div>
    </div>
  );
}