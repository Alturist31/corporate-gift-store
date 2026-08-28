import React, { useState } from 'react';

// We accept productName as a prop to build a clean custom WhatsApp notification message
export default function BulkCounter({ initialQty = 100, basePrice = 450, productName = "Product" }) {
  const [quantity, setQuantity] = useState(initialQty);
  const totalCost = quantity * basePrice;

  // 💡 CONFIGURATION: Set your active corporate sales contact line here
    // Ensure your active corporate mobile link contains no spaces or symbols
  const whatsappNumber = "919372737661"; 

  const messageText = "Hello! I would like to request a bulk quote for \"" + productName + "\".\n• Quantity: " + quantity + " units\n• Estimated Base Value: ₹" + totalCost.toLocaleString() + "\nPlease share details on custom branding options.";
  
  // 💡 THE FAIL-SAFE FIX: Uses standard string concatenation so it can never misinterpret variables!
  const whatsappUrl = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(messageText);


  return (
    <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '15px', marginTop: '15px' }}>
      <label style={{ fontSize: '14px', fontWeight: '500' }}>Order Qty: </label>
      <input 
        type="number" 
        value={quantity} 
        min={initialQty}
        onChange={(e) => setQuantity(Number(e.target.value))}
        style={{ padding: '6px', width: '70px', borderRadius: '4px', border: '1px solid #d1d5db' }}
      />
      <p style={{ marginTop: '10px', fontSize: '15px', color: '#059669' }}>
        Est. Total: <strong>₹{totalCost.toLocaleString()}</strong>
      </p>

      {/* 🚀 THE MISSING PIECE: The B2B call-to-action quote submission link component */}
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ 
          display: 'block', textBy: 'center', textAlign: 'center', background: '#25D366', color: 'white', 
          textDecoration: 'none', padding: '10px', borderRadius: '6px', marginTop: '12px', 
          fontWeight: 'bold', fontSize: '14px' 
        }}
      >
        💬 Request Bulk Quote
      </a>
    </div>
  );
}
