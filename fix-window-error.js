const fs = require('fs');

function fixFile(filePath) {
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Replace window.location.search check with a SSR-safe approach or fallback
        content = content.replace(
            /window\.location\.search\.includes\('city=Melbourne'\)\s*\?\s*'Melbourne'\s*:\s*/g,
            "typeof window !== 'undefined' && window.location.search.includes('city=Melbourne') ? 'Melbourne' : "
        );
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed window error in ${filePath}`);
    }
}

fixFile('src/sections/products/ProductGridView.tsx');
fixFile('src/sections/products/ProductListView.tsx');
