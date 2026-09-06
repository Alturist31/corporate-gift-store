import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

export default function BulkCounter({ initialQty = 100, basePrice = 450, productName = "Product", availableColors = [], productDesc = "", categoryName = "", productImage = "" }) {
  const [quantity, setQuantity] = useState(initialQty);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [formError, setFormError] = useState('');
  
  const [selectedColor, setSelectedColor] = useState(() => {
    if (Array.isArray(availableColors) && availableColors.length > 0) {
      return availableColors;
    }
    return typeof availableColors === 'string' ? availableColors : "";
  });
  
  const totalCost = quantity * basePrice;
  const corporateContactEmail = "venture.solutions3@gmail.com"; 
  const whatsappNumber = "919372737661"; 

  const safeColorString = typeof selectedColor === 'string' ? selectedColor : "";
  const variantText = safeColorString ? `• Chosen Variant: ${safeColorString.toUpperCase()}` : "• Chosen Variant: Default/Standard";
  
  const waMessage = `Hello! I would like to request a bulk quote for "${productName}".\n• Quantity: ${quantity} units\n${variantText}\n• Estimated Base Value: ₹${totalCost.toLocaleString()}\nPlease share details on custom branding options.`;
  const whatsappUrl = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(waMessage);

  const emailSubject = `Corporate RFQ Request: ${productName} (${quantity} Units)`;
  const emailBody = `Dear Venture Solutions Gifting Team,\n\nI would like to request a formal business quotation for the following catalog item:\n\nProduct Name: ${productName}\nQuantity Required: ${quantity} units\nSelected Color/Variant: ${safeColorString.toUpperCase() || 'Default'}\nEstimated Base Value: ₹${totalCost.toLocaleString()}\n\nClient Contact Details:\n• Name: ${clientName || '[Not Provided]'}\n• Company Name: ${companyName || '[Not Provided]'}\n• Email Address: ${clientEmail}\n\nPlease share your corporate pricing slabs and custom logo branding options with us.\n\nRegards.`;
  const mailtoUrl = `mailto:${corporateContactEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  const handleEmailSubmission = (e) => {
    if (!clientEmail.trim() || !clientEmail.includes('@')) {
      e.preventDefault();
      setFormError('⚠️ A valid business email address is required to submit a formal quote inquiry.');
    } else {
      setFormError('');
    }
  };

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

  // 🚀 UPDATED EFFECT HUB: Wipes form memory completely whenever the popup modal visibility toggles off
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      setFormError('');
    } else {
      document.body.style.overflow = '';
      // 💡 THE PRIVACY FIX: Resets all text values instantly upon closing!
      setClientName('');
      setCompanyName('');
      setClientEmail('');
      setFormError('');
      setQuantity(initialQty); // Optional reset order qty to baseline MOQ
    }
    return () => { document.body.style.overflow = ''; };
  }, [isModalOpen]);
  return (
    <div style={{ marginTop: '15px' }}>
      <button type="button" onClick={() => setIsModalOpen(true)} style={{ display: 'block', width: '100%', background: '#0A3D33', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', marginBottom: '12px' }}>
        🔎 View Details & Estimate
      </button>

      {isModalOpen && typeof document !== 'undefined' && ReactDOM.createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999999, padding: '20px', backdropFilter: 'blur(4px)' }} onClick={() => setIsModalOpen(false)}>
          
          <div style={{ background: 'white', width: '100%', maxWidth: '940px', height: '580px', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: '#f3f4f6', border: 'none', width: '32px', height: '32px', borderRadius: '50%', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', color: '#4b5563', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>✕</button>

            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', width: '100%', height: '100%', alignItems: 'stretch' }}>
              
              {/* LEFT HALF PANEL */}
              <div style={{ flex: '0 0 45%', width: '45%', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '30px', borderRight: '1px solid #e2e8f0', boxSizing: 'border-box' }}>
                <img src={productImage} alt={productName} style={{ width: '100%', height: 'auto', maxHeight: '100%', objectFit: 'contain', borderRadius: '12px' }} />
              </div>

              {/* RIGHT HALF PANEL */}
              <div style={{ flex: '0 0 55%', width: '55%', padding: '35px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', boxSizing: 'border-box' }}>
                
                <div style={{ overflowY: 'auto', paddingRight: '5px', flexGrow: 1, marginBottom: '15px' }}>
                  <span style={{ background: '#E6F0EE', color: '#0A3D33', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}>{categoryName}</span>
                  <h2 style={{ margin: '12px 0 10px 0', fontSize: '24px', color: '#111827', fontWeight: '800', lineHeight: '1.2' }}>{productName}</h2>
                  <div style={{ fontSize: '13px', color: '#4b5563', lineHeight: '1.5', whiteSpace: 'pre-wrap', borderLeft: '3px solid #0A3D33', paddingLeft: '15px' }}>
                    <strong>Product Specification Details:</strong><br />{cleanDescription || "Custom logo options available."}
                  </div>
                </div>

                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', flexShrink: 0 }}>
                  {availableColors && availableColors.length > 0 && (
                    <div style={{ marginBottom: '10px' }}>
                      <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '6px' }}>Select Color Variant: <span style={{ color: '#0A3D33' }}>{safeColorString.toUpperCase()}</span></label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {availableColors.map((color) => {
                          const hexColor = color === "tan" ? "#d2b48c" : color;
                          const isSelected = selectedColor === color;
                          return <button key={color} type="button" onClick={() => setSelectedColor(color)} style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: hexColor, border: isSelected ? '2px solid #0A3D33' : '1px solid #d1d5db', transform: isSelected ? 'scale(1.15)' : 'scale(1)', cursor: 'pointer', padding: 0 }} />;
                        })}
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Order Qty: </label>
                    <input type="number" value={quantity} min={initialQty} step={initialQty} onChange={(e) => setQuantity(Number(e.target.value))} onBlur={(e) => handleQuantityEnforcement(e.target.value)} style={{ padding: '6px', width: '95px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: 'bold' }} />
                    <span style={{ fontSize: '12px', color: '#64748b' }}>(Multiples of {initialQty} only)</span>
                  </div>

                  <div style={{ background: 'white', padding: '12px', borderRadius: '8px', border: '1px dashed #cbd5e1', marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Corporate Email RFQ Parameters (Email is Required):</span>
                    <input type="email" placeholder="Business Email ID *" value={clientEmail} onChange={(e) => { setClientEmail(e.target.value); setFormError(''); }} style={{ width: '100%', padding: '8px 12px', fontSize: '12px', borderRadius: '6px', border: clientEmail ? '1px solid #0A3D33' : '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }} required />
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input type="text" placeholder="Your Name" value={clientName} onChange={(e) => setClientName(e.target.value)} style={{ width: '50%', padding: '8px 12px', fontSize: '12px', borderRadius: '6px', border: '1px solid #e2e8f0', outline: 'none', boxSizing: 'border-box' }} />
                      <input type="text" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} style={{ width: '50%', padding: '8px 12px', fontSize: '12px', borderRadius: '6px', border: '1px solid #e2e8f0', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    {formError && <div style={{ fontSize: '11px', fontWeight: '600', color: '#ef4444', marginTop: '2px' }}>{formError}</div>}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid #e2e8f0', paddingTop: '12px', gap: '10px', boxSizing: 'border-box' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Estimated Value:</span>
                      <span style={{ fontSize: '22px', color: '#059669', fontWeight: '800', wordBreak: 'break-all' }}>₹{totalCost.toLocaleString()}</span>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                      <a href={mailtoUrl} onClick={handleEmailSubmission} style={{ flex: '1', background: '#0F172A', color: 'white', textDecoration: 'none', padding: '10px 8px', borderRadius: '8px', fontWeight: 'bold', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', whiteSpace: 'nowrap', textAlign: 'center', boxSizing: 'border-box' }}>✉️ Email RFQ</a>
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ flex: '1', background: '#25D366', color: 'white', textDecoration: 'none', padding: '10px 8px', borderRadius: '8px', fontWeight: 'bold', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', whiteSpace: 'nowrap', textAlign: 'center', boxSizing: 'border-box' }}>💬 WhatsApp</a>
                    </div>
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

