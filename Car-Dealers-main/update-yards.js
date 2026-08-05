const fs = require('fs');

function applyFix(filePath) {
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Correct replacement string handling all yards
        const newMarkup = "Yard {product.yard || product.Yard || 'N/A'}: {String(product.yard || product.Yard) === '1' ? 'Maidstone' : String(product.yard || product.Yard) === '2' ? 'Mordialloc' : String(product.yard || product.Yard) === '4' ? 'Slacks Creek' : product.city || 'N/A'}";
        
        // Replace the line starting with Yard {
        content = content.replace(/Yard\s+\{[^}]+\}[^<]*/g, newMarkup);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Successfully updated ${filePath}`);
    }
}

applyFix('src/sections/products/ProductGridView.tsx');
applyFix('src/sections/products/ProductListView.tsx');
