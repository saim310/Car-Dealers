const fs = require('fs');
const filePath = 'src/components/elements/MainManuList.tsx';
if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Update Melbourne and Brisbane main category links in dropdown
    content = content.replace(/<a href="\/inner\/products\?city=Melbourne">Melbourne<\/a>/g, '<a href="/inner/products?city=Melbourne">Melbourne Stock</a>');
    content = content.replace(/<a href="\/inner\/products\?city=Brisbane">Brisbane<\/a>/g, '<a href="/inner/products?city=Brisbane">Brisbane Stock</a>');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("City dropdown links updated successfully!");
}
