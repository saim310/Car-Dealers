const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const CSV_FILE = "C:/Users/saima/Downloads/Car-Dealers-main/Car-Dealers-main/public/data/stock.csv";
const IMAGE_DIR = "C:/Users/saima/Downloads/Car-Dealers-main/Car-Dealers-main/public/assets/images/cars";
const OUTPUT_FILE = "C:/Users/saima/Downloads/Car-Dealers-main/Car-Dealers-main/src/all-content/products/productData.ts";

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

    const stock = (row.StockNo || row["Stock No"] || Object.values(row)[0])?.trim();

    if (!stock || stock === "undefined") return;

    const images = findImages(stock);

    products.push({
      id: Number(stock) || stock,
      title: `${row.Make || ""} ${row.Model || ""} ${row.Year || ""}`.trim(),
      image: images[0] || "",
      images: images, // Keep full array in case slider needs multiple images

      price: Number(row.Price) || 0,
      previousPrice: 0,
      rating: 5,
      isNew: false,
      discount: "",

      brand: (row.Make || "").trim(),
      model: (row.Model || "").trim(),
      bodyStyle: (row.Body || row.BodyStyle || row["Body Style"] || "").trim(),
      year: String(row.Year || "").trim(),
      mileage: (row.Odometer || "").trim(),
      transmission: (row.GearType || row.Transmission || "").trim(),
      fuel: (row.FuelType || row.Fuel || "").trim(),
      persons: (row.Seats || "").trim(),
      city: (row.City || (row.YardCode === '4' ? 'Brisbane' : 'Melbourne')).trim(),
      yard: (row.YardName || row.YardCode || 'Maidstone Yard').trim(),

      // ADDED: Map Stock Status column from CSV
      stockStatus: (row.StockStatus || row["Stock Status"] || row.Status || "Available").trim(),

      status: row.SpecialPrice && Number(row.SpecialPrice) > 0 ? 'sale' : 'regular',
      salePrice: Number(row.SpecialPrice) || 0,
    });

  })
  .on("end", () => {
    const content = `import type { ProductItem } from "./productType";

export const productsList: ProductItem[] = ${JSON.stringify(products, null, 2)};
`;

    fs.writeFileSync(OUTPUT_FILE, content);

    console.log(`Done! Imported ${products.length} cars`);
  });