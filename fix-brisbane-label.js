const fs = require('fs');

function updateBrisbaneLabel(filePath) {
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Add safe check for city=Brisbane
        const targetCheck = "typeof window !== 'undefined' && window.location.search.includes('city=Melbourne') ? 'Melbourne' : ";
        const replacementCheck = "typeof window !== 'undefined' && window.location.search.includes('city=Melbourne') ? 'Melbourne' : typeof window !== 'undefined' && window.location.search.includes('city=Brisbane') ? 'Brisbane' : ";
        
        content = content.replace(targetCheck, replacementCheck);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated Brisbane label in ${filePath}`);
    }
}

updateBrisbaneLabel('src/sections/products/ProductGridView.tsx');
updateBrisbaneLabel('src/sections/products/ProductListView.tsx');
