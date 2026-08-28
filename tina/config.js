import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: null, // Null for local development mode
  token: null,    // Null for local development mode
 isCloud: false, 
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
  schema: {
    collections: [
      {
        name: "product",
        label: "Corporate Products",
        path: "src/content/products", // Reads from your active content folder
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
