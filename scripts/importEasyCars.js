

const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const CSV_FILE = "/home/easycars/stock.csv";
const IMAGE_DIR = "/home/easycars/images";
const OUTPUT_FILE = "./src/all-content/products/productData.ts";

const products = [];

function findImages(stockNumber) {
  if (!fs.existsSync(IMAGE_DIR)) return [];

  return fs.readdirSync(IMAGE_DIR)
    .filter(file => file.startsWith(stockNumber + "_"))
    .sort()
    .map(file => `/assets/images/cars/${file}`);
}

fs.createReadStream(CSV_FILE)
  .pipe(csv())
  .on("data", (row) => {

console.log(row);
    const stock = Object.values(row)[0]?.trim();
console.log("STOCK:", stock);

    if (!stock || stock === "undefined") return;


    const images = findImages(stock);

products.push({
    id: Number(stock),
    title: `${row.Make || ""} ${row.Model || ""} ${row.Year || ""}`.trim(),
    image: images[0] || "",

    price: Number(row.Price) || 0,
    previousPrice: 0,
    rating: 5,
    isNew: false,
    discount: "",

    brand: row.Make || "",
    model: row.Model || "",
    year: row.Year || "",
    mileage: row.Odometer || "",
    transmission: row.GearType || "",
    fuel: row.FuelType || "",
    persons: row.Seats || "",
	city: row.City || (row.YardCode === '4' ? 'Brisbane' : 'Melbourne'),
    yard: row.YardName || row.YardCode || 'Maidstone Yard',

    status: row.SpecialPrice && Number(row.SpecialPrice) > 0 ? 'sale' : 'regular',
    salePrice: Number(row.SpecialPrice) || 0,

});

  })
  .on("end", () => {

    const content = `import type { ProductItem } from "./productType";

export const productsList: ProductItem[] = ${JSON.stringify(products, null, 2)};
`;

    fs.writeFileSync(OUTPUT_FILE, content);

    console.log(
      `Done! Imported ${products.length} cars`
    );

  });
