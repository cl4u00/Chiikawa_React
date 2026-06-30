// Ubicación: proyectoChiikawa/src/components/Cart.jsx
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function Cart({ onClose }) {
  // Traemos los datos del carrito desde nuestro contexto
  const { cart } = useContext(CartContext);
  
  // Calculamos el total sumando el precio por la cantidad de cada producto
  const total = cart.reduce((suma, item) => suma + (item.price * item.quantity), 0);

  return (
    <div style={{
      position: 'fixed', top: '0', right: '0', width: '300px', height: '100%',
      backgroundColor: '#fff', boxShadow: '-4px 0 10px rgba(0,0,0,0.2)',
      padding: '20px', zIndex: 9999, overflowY: 'auto', fontFamily: 'sans-serif'
    }}>
      <button 
        onClick={onClose} 
        style={{ float: 'right', cursor: 'pointer', background: 'none', border: 'none', fontSize: '18px' }}
      >
        ❌
      </button>
      
      <h2 style={{ color: '#4980f8' }}>Tu Carrito 🛒</h2>
      <hr style={{ border: '1px solid #f0f0f0', marginBottom: '20px' }} />

      {cart.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '50px' }}>El carrito está vacío 🥺</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cart.map((item, index) => (
              <li key={index} style={{ marginBottom: '15px', borderBottom: '1px dashed #ccc', paddingBottom: '10px' }}>
                <b style={{ fontSize: '16px' }}>{item.name}</b> <br />
                <span style={{ color: '#666' }}>Cantidad: {item.quantity}</span> 
                <span style={{ float: 'right', fontWeight: 'bold' }}>${item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          
          <h3 style={{ textAlign: 'right', marginTop: '20px' }}>Total: ${total}</h3>
          
          <button style={{ 
            width: '100%', padding: '12px', backgroundColor: '#ff6b81', 
            color: 'white', border: 'none', borderRadius: '8px', 
            fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', marginTop: '10px'
          }}>
            Ir a Pagar 🤑
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;