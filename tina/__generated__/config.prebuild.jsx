// tina/config.js
import { defineConfig } from "tinacms";
var isProduction = false;
var config_default = defineConfig({
  branch: "main",
  // Bridge keys dynamically
  clientId: process.env.TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  // Safely toggles server rules based on where the app is running
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
          { type: "number", name: "price", label: "Base Price (\u20B9)" },
          { type: "number", name: "moq", label: "Minimum Order Quantity (MOQ)" },
          { type: "rich-text", name: "body", label: "Product Description", isBody: true }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
