import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

export default function BulkCounter({ initialQty = 100, basePrice = 450, productName = "Product", availableColors = [], productDesc = "", categoryName = "", productImage = "" }) {
  const [quantity, setQuantity] = useState(initialQty);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [selectedColor, setSelectedColor] = useState(() => {
    if (Array.isArray(availableColors) && availableColors.length > 0) {
      return availableColors;
    }
    return typeof availableColors === 'string' ? availableColors : "";
  });
  
  const totalCost = quantity * basePrice;
  const whatsappNumber = "919372737661"; 

  const safeColorString = typeof selectedColor === 'string' ? selectedColor : "";
  const colorText = safeColorString ? `\n• Chosen Variant: ${safeColorString.toUpperCase()}` : "";
  const messageText = "Hello! I would like to request a bulk quote for \"" + productName + "\".\n• Quantity: " + quantity + " units" + colorText + "\n• Estimated Base Value: ₹" + totalCost.toLocaleString() + "\nPlease share details on custom branding options.";
  const whatsappUrl = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(messageText);

  const cleanDescription = productDesc && typeof productDesc === 'object' 
    ? productDesc.children?.map(c => c.children?.map(t => t.text).join('')).join('\n') 
    : productDesc;

  const handleQuantityEnforcement = (value) => {
    const numericValue = Number(value);
    if (!numericValue || numericValue <= initialQty) {
      setQuantity(initialQty);
    } else {
      const roundedMultiples = Math.ceil(numericValue / initialQty) * initialQty;
      setQuantity(roundedMultiples);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isModalOpen]);

  return (
    <div style={{ marginTop: '15px' }}>
      <button 
        type="button"
        onClick={() => setIsModalOpen(true)}
        style={{
          display: 'block', width: '100%', background: '#0A3D33', color: 'white',
          border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold',
          fontSize: '14px', cursor: 'pointer', marginBottom: '12px', transition: 'background 0.2s'
        }}
      >
        🔎 View Details & Estimate
      </button>

      {isModalOpen && typeof document !== 'undefined' && ReactDOM.createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999999, padding: '20px', backdropFilter: 'blur(4px)' }} onClick={() => setIsModalOpen(false)}>
          
          {/* 💡 LIGHTWEIGHT COMPACT CONTAINER: Adaptive auto-height on desktop, scrollable on mobile if needed */}
          <div style={{ background: 'white', width: '100%', maxWidth: '920px', maxHeight: '90vh', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)', overflowY: 'auto', position: 'relative', display: 'flex', flexDirection: 'column' }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: '#f3f4f6', border: 'none', width: '32px', height: '32px', borderRadius: '50%', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', color: '#4b5563', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>✕</button>

            {/* RESPONSIVE LAYOUT ENGINE */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', width: '100%', height: '100%' }}>
              
              {/* LEFT HALF PANEL: Image Wrapper Box */}
              <div style={{ background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '30px', borderRight: '1px solid #e2e8f0', minHeight: '320px' }}>
                <img src={productImage} alt={productName} style={{ width: '100%', height: 'auto', maxHeight: '320px', objectFit: 'contain', borderRadius: '12px' }} />
              </div>

              {/* RIGHT HALF PANEL: Content Details & B2B Calculator Forms */}
              <div style={{ padding: '35px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
                <div>
                  <span style={{ background: '#e0e7ff', color: '#4338ca', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}>{categoryName}</span>
                  <h2 style={{ margin: '12px 0 10px 0', fontSize: '24px', color: '#111827', fontWeight: '800', lineHeight: '1.2' }}>{productName}</h2>
                  
                  {/* 💡 THE COMPACT OVERFLOW FIX: Restricts description to 140px max and handles extra text via standard scrolling */}
                  <div style={{ fontSize: '13px', color: '#4b5563', lineHeight: '1.5', whiteSpace: 'pre-wrap', borderLeft: '3px solid #4338ca', paddingLeft: '15px', maxHeight: '140px', overflowY: 'auto', paddingRight: '5px' }}>
                    <strong>Product Specification Details:</strong><br />{cleanDescription || "Custom logo options available."}
                  </div>
                </div>

                {/* Fixed Pricing Slider block container */}
                <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', marginTop: '15px' }}>
                  {availableColors && availableColors.length > 0 && (
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '8px' }}>Select Color Variant: <span style={{ color: '#4338ca' }}>{safeColorString.toUpperCase()}</span></label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {availableColors.map((color) => {
                          const hexColor = color === 'tan' ? '#d2b48c' : color;
                          const isSelected = selectedColor === color;
                          return (
                            <button key={color} type="button" onClick={() => setSelectedColor(color)} style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: hexColor, border: isSelected ? '2px solid #4338ca' : '1px solid #d1d5db', transform: isSelected ? 'scale(1.15)' : 'scale(1)', cursor: 'pointer', padding: 0 }} />
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Order Qty: </label>
                    <input type="number" value={quantity} min={initialQty} step={initialQty} onChange={(e) => setQuantity(Number(e.target.value))} onBlur={(e) => handleQuantityEnforcement(e.target.value)} style={{ padding: '8px', width: '85px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: 'bold' }} />
                    <span style={{ fontSize: '12px', color: '#64748b' }}>(Multiples of {initialQty} only)</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '15px' }}>
                    <div>
                      <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>Estimated Value</span>
                      <span style={{ fontSize: '22px', color: '#059669', fontWeight: '800' }}>₹{totalCost.toLocaleString()}</span>
                    </div>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ background: '#0A3D33', color: 'white', textDecoration: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px' }}>💬 Request Quote</a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
