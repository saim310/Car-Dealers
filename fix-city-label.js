const fs = require('fs');

function updateCityLabel(filePath) {
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // New condition to prefer displaying city if city filter/view is active, or map accordingly
        const newMarkup = "Yard {product.yard || product.Yard || 'N/A'}: {window.location.search.includes('city=Melbourne') ? 'Melbourne' : String(product.yard || product.Yard) === '1' ? 'Maidstone' : String(product.yard || product.Yard) === '2' ? 'Mordialloc' : String(product.yard || product.Yard) === '4' ? 'Slacks Creek' : product.city || 'N/A'}";
        
        content = content.replace(/Yard\s+\{[^}]+\}[^<]*/g, newMarkup);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated city label in ${filePath}`);
    }
}

updateCityLabel('src/sections/products/ProductGridView.tsx');
updateCityLabel('src/sections/products/ProductListView.tsx');
