import React, { useReducer } from 'react';

const initialState = { items: [], total: 0 };

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
          ),
          total: state.total + action.payload.price
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, qty: 1 }],
        total: state.total + action.payload.price
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.payload.id),
        total: state.total - (action.payload.price * action.payload.qty)
      };
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
}

const products = [
  { id: 1, name: 'Smartphone', price: 65000 },
  { id: 2, name: 'Headphones', price: 4500 },
  { id: 3, name: 'Smartwatch', price: 15000 },
  { id: 4, name: 'Tablet', price: 32000 },
];

// HOL 7: State Management with useReducer
function App() {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", padding: '20px', display: 'flex', gap: '30px' }}>
      <div style={{ flex: 1 }}>
        <h2>Products</h2>
        {products.map(p => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #eee' }}>
            <span>{p.name} — ₹{p.price.toLocaleString()}</span>
            <button onClick={() => dispatch({ type: 'ADD_ITEM', payload: p })}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, background: '#eef2f5', padding: '16px', borderRadius: '8px' }}>
        <h2>Cart ({cart.items.length} items)</h2>
        {cart.items.length === 0 ? <p style={{ color: '#888' }}>Cart is empty</p> : (
          <>
            {cart.items.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                <span>{item.name} x{item.qty}</span>
                <span>
                  ₹{(item.price * item.qty).toLocaleString()}
                  <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item })} style={{ marginLeft: '8px', color: '#c9302c', background: 'none', border: '1px solid #c9302c', cursor: 'pointer' }}>Remove</button>
                </span>
              </div>
            ))}
            <hr />
            <strong>Total: ₹{cart.total.toLocaleString()}</strong><br />
            <button onClick={() => dispatch({ type: 'CLEAR_CART' })} style={{ marginTop: '10px', padding: '8px 20px', background: '#d9534f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Clear Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
