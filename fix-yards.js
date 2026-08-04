const fs = require('fs');

function replaceInFile(filePath, searchRegex, replaceText) {
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace(searchRegex, replaceText);
        fs.writeFileSync(filePath, content, 'utf8');
    }
}

// Grid View (Card update)
replaceInFile(
    'src/sections/products/ProductGridView.tsx',
    /Yard \{product\.yard \|\| 'N\/A'\}: \{product\.city \|\| 'N\/A'\}/g,
    "Yard {product.yard || 'N/A'}: {String(product.yard) === '1' ? 'Maidstone' : String(product.yard) === '2' ? 'Mordialloc' : String(product.yard) === '4' ? 'Slacks Creek' : product.city || 'N/A'}"
);

// List View (Card update)
replaceInFile(
    'src/sections/products/ProductListView.tsx',
    /Yard \{product\?\.yard \|\| 'N\/A'\}: \{product\?\.city \|\| 'N\/A'\}/g,
    "Yard {product?.yard || 'N/A'}: {String(product?.yard) === '1' ? 'Maidstone' : String(product?.yard) === '2' ? 'Mordialloc' : String(product?.yard) === '4' ? 'Slacks Creek' : product?.city || 'N/A'}"
);

console.log("Card Yard names updated successfully!");
