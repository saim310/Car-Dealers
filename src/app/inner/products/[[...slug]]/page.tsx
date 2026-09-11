import AllProducts from "@/sections/products/AllProducts";
import { productsList } from "@/all-content/products/productData";

interface PageProps {
  params: {
    slug?: string[];
  };
}

export default function ProductsPage({ params }: PageProps) {
  const slug = params?.slug || [];

  let make = '';
  let model = '';
  let bodyStyle = '';
  let stockStatus = '';

  // Extract all unique stock statuses for server-side matching
  const knownStockStatuses = Array.from(
    new Set(
      productsList
        .map((car: any) => (car.stockStatus || car.status || '').replace(/_/g, ' ').trim().toLowerCase())
        .filter(Boolean)
    )
  );

  // Extract all unique body styles
  const knownBodyStyles = Array.from(
    new Set(
      productsList
        .map((car: any) => (car.bodyStyle || car.Body || car.bodyType || '').trim().toLowerCase())
        .filter(Boolean)
    )
  );

  slug.forEach((segment) => {
    const rawDecoded = decodeURIComponent(segment);
    const cleanSegment = rawDecoded.toLowerCase().replace(/-/g, ' ');

    // 1. Check for Stock Status match
    const isStock = knownStockStatuses.includes(cleanSegment);
    if (isStock && !stockStatus) {
      stockStatus = rawDecoded;
      return;
    }

    // 2. Check for Body Style match
    const isBody = knownBodyStyles.includes(cleanSegment);
    if (isBody && !bodyStyle) {
      bodyStyle = rawDecoded;
      return;
    }

    // 3. Check for Make match
    const isMakeMatch = productsList.some(
      (item: any) => String(item.brand || item.make || '').toLowerCase() === rawDecoded.toLowerCase()
    );
    if (isMakeMatch && !make) {
      make = rawDecoded;
      return;
    }

    // 4. Check for Model match
    const isModelMatch = productsList.some(
      (item: any) => String(item.model || '').toLowerCase() === rawDecoded.toLowerCase()
    );
    if (isModelMatch && !model) {
      model = rawDecoded;
      return;
    }
  });

  return (
    <AllProducts 
      initialMake={make} 
      initialModel={model} 
      initialBodyStyle={bodyStyle} 
      initialStockStatus={stockStatus}
    />
  );
}