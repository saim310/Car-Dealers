import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://www.ukajapan.com.au';

/**
 * Scans directories to detect every route file (page.tsx / page.jsx) automatically.
 */
function autoDetectStaticRoutes(dir: string, baseRoute = ''): string[] {
  let routes: string[] = [];
  
  if (!fs.existsSync(dir)) return routes;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Ignore API routes, components, layout directories, and dynamic parameters
      if (
        entry.name.startsWith('_') || 
        entry.name === 'api' || 
        entry.name.startsWith('[') ||
        entry.name === 'components' ||
        entry.name === 'context' ||
        entry.name === 'lib'
      ) {
        continue;
      }

      let segment = entry.name;
      if (segment.startsWith('(') && segment.endsWith(')')) {
        segment = '';
      }

      const newRoute = segment ? `${baseRoute}/${segment}` : baseRoute;
      routes = routes.concat(autoDetectStaticRoutes(fullPath, newRoute));
    } else if (entry.isFile() && /^page\.(tsx|jsx|js|ts)$/.test(entry.name)) {
      routes.push(baseRoute === '' ? '/' : baseRoute);
    }
  }

  return Array.from(new Set(routes));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Scans src/app folder which includes inner, products, and all sub-routes
  const appDir = path.join(process.cwd(), 'src/app');
  const staticPaths = autoDetectStaticRoutes(appDir);

  const staticPages: MetadataRoute.Sitemap = staticPaths.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1.0 : 0.8,
  }));

  // Fetch Dynamic Products
  let dynamicPages: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch('http://127.0.0.1:3000/api/products', { 
      cache: 'no-store' 
    });

    if (res.ok) {
      const products = await res.json();
      if (Array.isArray(products)) {
        dynamicPages = products.map((car: { slug: string; updated_at?: string }) => ({
          url: `${BASE_URL}/products/${car.slug}`,
          lastModified: car.updated_at ? new Date(car.updated_at) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        }));
      }
    }
  } catch (error) {
    console.error('Error fetching dynamic products for sitemap:', error);
  }

  return [...staticPages, ...dynamicPages];
}
