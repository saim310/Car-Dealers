const fs = require('fs');

function updateFile(filePath) {
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Target exact string or pattern for card labels
        const targetString = "Yard {product.yard || 'N/A'}: {String(product.yard) === '1' ? 'Maidstone' : String(product.yard) === '2' ? 'Mordialloc' : String(product.yard) === '4' ? 'Slacks Creek' : product.city || 'N/A'}";
        
        // Replacement that handles explicit city/yard mapping
        const replacement = "Yard {product.yard || 'N/A'}: {String(product.yard) === '4' || String(product.city).toLowerCase().includes('brisbane') || String(product.city).toLowerCase().includes('slack') ? 'Slacks Creek' : String(product.yard) === '1' ? 'Maidstone' : String(product.yard) === '2' ? 'Mordialloc' : product.city || 'N/A'}";

        if (!content.includes('Slacks Creek')) {
            content = content.replace(/Yard \{product\.yard \|\| 'N\/A'\}: \{[^\}]+\}/g, replacement);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${filePath}`);
        }
    }
}

updateFile('src/sections/products/ProductGridView.tsx');
updateFile('src/sections/products/ProductListView.tsx');
