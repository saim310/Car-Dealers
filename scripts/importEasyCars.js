const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const CSV_FILE = path.join(__dirname, '../public/data/stock.csv');
const IMAGE_DIR = path.join(__dirname, '../public/assets/images/cars');
const OUTPUT_FILE = path.join(__dirname, '../public/data/cars.json');
const TS_OUTPUT_FILE = path.join(__dirname, '../src/all-content/products/productData.ts');

// 1. Sync latest CSV dropped by EasyCars FTP automatically
const ftpSourceFile = '/home/easycars/stock.csv';
if (fs.existsSync(ftpSourceFile)) {
  try {
    fs.copyFileSync(ftpSourceFile, CSV_FILE);
    console.log("Successfully synced latest stock.csv from /home/easycars/");
  } catch (err) {
    console.error("Error copying stock.csv from FTP folder:", err);
  }
}

// 2. Sync latest images dropped by EasyCars FTP automatically
const ftpImagesDir = '/home/easycars/images';
if (fs.existsSync(ftpImagesDir)) {
  try {
    if (!fs.existsSync(IMAGE_DIR)) {
      fs.mkdirSync(IMAGE_DIR, { recursive: true });
    }
    const imageFiles = fs.readdirSync(ftpImagesDir);
    imageFiles.forEach(file => {
      const srcPath = path.join(ftpImagesDir, file);
      const destPath = path.join(IMAGE_DIR, file);
      if (fs.lstatSync(srcPath).isFile()) {
        fs.copyFileSync(srcPath, destPath);
      }
    });
    console.log("Successfully synced latest images from /home/easycars/images/");
  } catch (err) {
    console.error("Error copying images from FTP folder:", err);
  }
}

const products = [];

function findImages(stockNumber) {
  if (!fs.existsSync(IMAGE_DIR)) {
    return ["/assets/images/placeholder.jpg"];
  }

  try {
    const files = fs.readdirSync(IMAGE_DIR);
    const matchedFiles = files
      .filter(file => file.startsWith(stockNumber + "_"))
      .sort((a, b) => {
        // Extract exact number after underscore
        const partA = a.split('_')[1]?.split('.')[0] || '0';
        const partB = b.split('_')[1]?.split('.')[0] || '0';
        return parseInt(partA, 10) - parseInt(partB, 10);
      })
      .map(file => `/assets/images/cars/${file}`);

    return matchedFiles.length > 0 ? matchedFiles : ["/assets/images/placeholder.jpg"];
  } catch (err) {
    console.error(`Error reading images for stock ${stockNumber}:`, err);
    return ["/assets/images/placeholder.jpg"];
  }
}

if (!fs.existsSync(CSV_FILE)) {
  console.error("Error: stock.csv file not found at path:", CSV_FILE);
  process.exit(1);
}

fs.createReadStream(CSV_FILE)
  .pipe(csv())
  .on("data", (row) => {
    // Robust stock number extraction supporting all possible CSV headers
    const stock = (row.StockNumber || row.StockNo || row["Stock No"] || Object.values(row)[0])?.trim();

    if (!stock || stock === "undefined" || stock.toLowerCase() === 'stocknumber') return;

    const images = findImages(stock);

    products.push({
      id: Number(stock) || stock,
      title: `${row.Make || ""} ${row.Model || ""} ${row.Year || ""}`.trim(),
      image: images[0] || "/assets/images/placeholder.jpg",
      images: images,

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

      stockStatus: (row.StockStatus || row["Stock Status"] || row.Status || "Available").trim(),
      status: row.SpecialPrice && Number(row.SpecialPrice) > 0 ? 'sale' : 'regular',
      salePrice: Number(row.SpecialPrice) || 0,
    });
  })
  .on("end", () => {
    const content = `import type { ProductItem } from "./productType";

export const productsList: ProductItem[] = ${JSON.stringify(products, null, 2)};
`;

    try {
      // 1. Write to JSON
      fs.writeFileSync(OUTPUT_FILE, content);
      // 2. Write directly to Frontend TS File
      fs.writeFileSync(TS_OUTPUT_FILE, content);

      console.log(`Successfully imported ${products.length} cars and synced files.`);
    } catch (err) {
      console.error("Error writing output files:", err);
    }
  })
  .on("error", (err) => {
    console.error("CSV parsing error:", err);
  });
