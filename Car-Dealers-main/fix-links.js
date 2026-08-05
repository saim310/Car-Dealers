const fs = require('fs');
const filePath = 'src/components/elements/MainManuList.tsx';
if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Replace <Link href="...">text</Link> with <a href="...">text</a>
    content = content.replace(/<Link\s+href="([^"]+)">([^<]+)<\/Link>/g, '<a href="$1">$2</a>');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Menu links updated to standard anchor tags successfully!");
}
