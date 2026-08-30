import { defineConfig } from "tinacms";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  branch: "main",
  clientId: process.env.TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  
  isCloud: isProduction,
  local: !isProduction,

  schema: {
    collections: [
      {
        name: "product",
        label: "Corporate Products",
        path: "src/content/products",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Product Name", isTitle: true, required: true },
          { 
            type: "string", 
            name: "category", 
            label: "Category",
            options: ["Tech & Lifestyle", "Office Stationery", "Hampers", "Apparel", "Eco-Friendly", "Leather Goods", "Custom Decor"]
          },
          { type: "image", name: "image", label: "Display Image" },
          { type: "number", name: "price", label: "Base Price (₹)" },
          { type: "number", name: "moq", label: "Minimum Order Quantity (MOQ)" },
          { type: "rich-text", name: "body", label: "Product Description", isBody: true },
          // 💡 COLOR CHECKLIST: Declared only once at the bottom
          {
            type: "string",
            name: "colors",
            label: "Available Colors",
            list: true,
            ui: {
              component: ({ input, field }) => {
                const options = field.options || [];
                return (
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "8px", color: "#374151" }}>
                      {field.label}
                    </label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", background: "#f9fafb", padding: "12px", borderRadius: "6px", border: "1px solid #e5e7eb" }}>
                      {options.map((option) => {
                        const isChecked = (input.value || []).includes(option.value);
                        return (
                          <label key={option.value} style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontSize: "14px", color: "#1f2937", fontWeight: "500" }}>
                            <input
                              type="checkbox"
                              value={option.value}
                              checked={isChecked&& (
                                <span style={{
                                  position: "absolute",
                                  width: "4px",
                                  height: "8px",
                                  border: "solid white",
                                  borderWidth: "0 2px 2px 0",
                                  transform: "rotate(45deg) translate(-1px, -1px)",
                                  display: "block",
                                  zIndex: 1 
                                }} />
                              )}
                              onChange={(e) => {
                                const newValue = [...(input.value || [])];
                                if (e.target.checked) {
                                  newValue.push(option.value);
                                } else {
                                  const index = newValue.indexOf(option.value);
                                  if (index > -1) newValue.splice(index, 1);
                                }
                                input.onChange(newValue);
                              }}
                            />
                            {option.label}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              }
            },
            options: [
              { value: "black", label: "Black" },
              { value: "blue", label: "Blue" },
              { value: "brown", label: "Brown" },
              { value: "tan", label: "Tan" },
              { value: "grey", label: "Grey" },
              { value: "red", label: "Red" },
              { value: "white", label: "White" }
            ]
          }
        ],
      },
    ],
  },
});
