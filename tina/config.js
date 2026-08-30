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
              component: 'checkbox-group', // Reinforces the checkbox panel view
              direction: 'row'            // Automatically shifts options from vertical to horizontal
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
