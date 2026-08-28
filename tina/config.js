import { defineConfig } from "tinacms";

// 💡 THE ULTIMATE BYPASS: Tells the internal engine to act like a local hard drive even on Vercel
const isLocal = true;

export default defineConfig({
  branch: "main",
  clientId: null, 
  token: null,    
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
  // Force local production flags
  isCloud: false,
  local: true, 
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
        ],
      },
    ],
  },
});
