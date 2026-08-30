// tina/config.js
import { defineConfig } from "tinacms";
import { jsx, jsxs } from "react/jsx-runtime";
var isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true" || false;
var config_default = defineConfig({
  branch: isLocal ? void 0 : process.env.TINA_BRANCH || "main",
  clientId: isLocal ? void 0 : process.env.TINA_CLIENT_ID,
  token: isLocal ? void 0 : process.env.TINA_TOKEN,
  //branch: "main",
  //clientId: process.env.TINA_CLIENT_ID || null,
  //token: process.env.TINA_TOKEN || null,
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
  //isCloud: isProduction,
  //local: !isProduction,
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
                return jsxs("div", { style: { marginBottom: "20px" }, children: [
                  jsx("label", { style: { display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "8px", color: "#374151" }, children: field.label }),
                  jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: "16px", background: "#f9fafb", padding: "12px", borderRadius: "6px", border: "1px solid #e5e7eb" }, children: options.map((option) => {
                    const isChecked = (input.value || []).includes(option.value);
                    return jsxs("label", { style: { display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontSize: "14px", color: "#1f2937", fontWeight: "500" }, children: [
                      jsx(
                        "input",
                        {
                          type: "checkbox",
                          value: option.value,
                          checked: isChecked && jsx("span", { style: {
                            position: "absolute",
                            width: "4px",
                            height: "8px",
                            border: "solid white",
                            borderWidth: "0 2px 2px 0",
                            transform: "rotate(45deg) translate(-1px, -1px)",
                            display: "block",
                            zIndex: 1
                          } }),
                          onChange: (e) => {
                            const newValue = [...input.value || []];
                            if (e.target.checked) {
                              newValue.push(option.value);
                            } else {
                              const index = newValue.indexOf(option.value);
                              if (index > -1) newValue.splice(index, 1);
                            }
                            input.onChange(newValue);
                          }
                        }
                      ),
                      option.label
                    ] }, option.value);
                  }) })
                ] });
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
        ]
      }
    ]
  }
});
export {
  config_default as default
};
