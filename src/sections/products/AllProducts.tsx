"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { productsList } from "@/all-content/products/productData";
import { ProductItem } from '@/all-content/products/productType';
import ProductGridView from './ProductGridView';
import ProductListView from './ProductListView';
import ProductSidebar, { FilterState } from './ProductSidebar';

interface AllProductsProps {
  badgeFilter?: string;
  initialMake?: string;
  initialModel?: string;
  initialBodyStyle?: string;
  initialStockStatus?: string; // <-- ADDED PROP TYPE
}

const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (p: number) => void }) => {
  const getPages = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const btnBase: React.CSSProperties = {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: '1px solid #e5e5e5',
    background: '#fff',
    color: '#555',
    outline: 'none',
    flexShrink: 0
  };

  const activeStyle: React.CSSProperties = {
    background: '#ffc107',
    color: '#fff',
    border: '1px solid #ffc107',
    boxShadow: '0 4px 12px rgba(255,193,7,0.35)'
  };

  const arrowStyle: React.CSSProperties = {
    ...btnBase,
    border: '1.5px solid #ffc107',
    color: '#1a1a2e'
  };

  const disabledArrow: React.CSSProperties = {
    ...arrowStyle,
    opacity: 0.35,
    cursor: 'not-allowed',
    border: '1.5px solid #e5e5e5',
    color: '#ccc'
  };

  const pages = getPages();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={currentPage === 1 ? disabledArrow : arrowStyle}
      >
        <i className="fas fa-chevron-left" style={{ fontSize: '13px' }}></i>
      </button>

      {/* Numbers */}
      {pages.map((page, idx) => (
        page === '...' ? (
          <span key={`dots-${idx}`} style={{
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            fontWeight: 700,
            color: '#888',
            letterSpacing: '2px',
            userSelect: 'none'
          }}>
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            style={currentPage === page ? { ...btnBase, ...activeStyle } : btnBase}
            onMouseEnter={(e) => {
              if (currentPage !== page) {
                e.currentTarget.style.borderColor = '#ffc107';
                e.currentTarget.style.color = '#1a1a2e';
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== page) {
                e.currentTarget.style.borderColor = '#e5e5e5';
                e.currentTarget.style.color = '#555';
              }
            }}
          >
            {page}
          </button>
        )
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={currentPage === totalPages ? disabledArrow : arrowStyle}
      >
        <i className="fas fa-chevron-right" style={{ fontSize: '13px' }}></i>
      </button>
    </div>
  );
};

export default function AllProducts({
  badgeFilter,
  initialMake = '',
  initialModel = '',
  initialBodyStyle = '',
  initialStockStatus = '' // <-- ACCEPT PROP
}: AllProductsProps) {
  const searchParams = useSearchParams();

  const [urlFilters, setUrlFilters] = useState({ city: '', category: '', yard: '', stockStatus: '', bodyStyle: '' });

  const [currentPage, setCurrentPage] = useState(1);
  const [isGrid, setGrid] = useState(true);
  const [sortValue, setSortValue] = useState("Sort by popular");

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    bodyStyle: initialBodyStyle,
    make: initialMake,
    model: initialModel,
    minPrice: '0',
    maxPrice: '100000',
    yearFrom: '',
    yearTo: '',
    location: '',
    fuelType: '',
    transmission: '',
    stockStatus: initialStockStatus, // <-- LINK INITIAL STOCK STATUS
  });

  // Sync initial props/slugs when updated
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      make: initialMake || prev.make,
      model: initialModel || prev.model,
      bodyStyle: initialBodyStyle || prev.bodyStyle,
      stockStatus: initialStockStatus || prev.stockStatus,
    }));
  }, [initialMake, initialModel, initialBodyStyle, initialStockStatus]);

  // Listens to Next.js URL query param changes dynamically
  useEffect(() => {
    const initialStock = searchParams.get('stockStatus') || searchParams.get('stock_status') || '';
    const initialBody = searchParams.get('bodyStyle') || searchParams.get('body') || searchParams.get('bodyType') || searchParams.get('category') || '';

    setUrlFilters({
      city: searchParams.get('city') || '',
      category: searchParams.get('category') || '',
      yard: searchParams.get('yard') || '',
      stockStatus: initialStock,
      bodyStyle: initialBody,
    });

    setFilters(prev => ({
      ...prev,
      ...(!initialStockStatus && initialStock ? { stockStatus: initialStock } : {}),
      ...(!initialBodyStyle && initialBody ? { bodyStyle: initialBody } : {})
    }));
  }, [searchParams, initialBodyStyle, initialStockStatus]);

  // Reset page back to 1 whenever search, filters, or badgeFilter change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, urlFilters, badgeFilter]);

  const ITEMS_PER_PAGE = 12;

  const filteredProducts = useMemo(() => {
    let list = [...(productsList || [])];

    // Badge / Hot Deal filter
    if (badgeFilter) {
      const targetBadge = badgeFilter.toLowerCase().trim();
      list = list.filter((item: any) => {
        const status = String(item.status || item.stockStatus || item.stock_status || '').toLowerCase().trim();
        const badge = String(item.badge || item.badgeTitle || item.tag || '').toLowerCase().trim();
        const isHot = item.isHotDeal === true || item.hotDeal === true || item.isHot === true;

        return status === 'sale' || badge === targetBadge || badge.includes('hot') || (targetBadge.includes('hot') && isHot);
      });
    }

    // URL param filters
    if (urlFilters.category && !filters.bodyStyle) {
      const q = urlFilters.category.replace(/[-_]/g, ' ').toLowerCase().trim();
      list = list.filter((item: any) => {
        const cat = String(item.category || item.Body || item.bodyType || '').replace(/[-_]/g, ' ').toLowerCase().trim();
        return cat === q;
      });
    }
    if (urlFilters.city) {
      const q = urlFilters.city.toLowerCase().trim();
      list = list.filter((item: any) => {
        const loc = item.city || item.location || '';
        return loc.toLowerCase().includes(q);
      });
    }
    if (urlFilters.yard) {
      const q = urlFilters.yard.toLowerCase().trim();
      let targetId = q;
      if (q.includes('maidstone')) targetId = '1';
      else if (q.includes('mordialloc')) targetId = '2';
      else if (q.includes('slack') || q.includes('brisbane')) targetId = '4';

      list = list.filter((item: any) => {
        const yard = String(item.yard || item.Yard || "").toLowerCase().trim();
        const city = String(item.city || item.City || "").toLowerCase().trim();
        return yard === targetId || yard.includes(q) || city.includes(q);
      });
    }

    // Search Bar filter
    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      list = list.filter((item: any) => {
        const title = String(item.title || item.name || '').toLowerCase();
        const stockNo = String(
          item.stockNo || item.stock_no || item.stockNumber || item.stock || item.id || ''
        ).toLowerCase();
        const brand = String(item.brand || item.make || '').toLowerCase();
        const model = String(item.model || '').toLowerCase();

        return (
          title.includes(q) ||
          stockNo.includes(q) ||
          brand.includes(q) ||
          model.includes(q)
        );
      });
    }

    // BODY STYLE FILTER (Case-Insensitive Fix)
    if (filters.bodyStyle && filters.bodyStyle !== 'All Body Styles') {
      const targetBody = filters.bodyStyle.replace(/[-_]/g, ' ').toLowerCase().trim();
      list = list.filter((item: any) => {
        const itemBody = String(item.Body || item.bodyType || item.category || item.bodyStyle || '').replace(/[-_]/g, ' ').toLowerCase().trim();
        return itemBody === targetBody;
      });
    }

    // MAKE / BRAND FILTER (Case-Insensitive Fix)
    if (filters.make && filters.make !== 'ALL MAKES') {
      const targetMake = filters.make.toLowerCase().trim();
      list = list.filter((item: any) => {
        const itemBrand = String(item.brand || item.make || '').toLowerCase().trim();
        return itemBrand === targetMake;
      });
    }

    // MODEL FILTER (Case-Insensitive Fix)
    if (filters.model && filters.model !== 'All Models') {
      const targetModel = filters.model.toLowerCase().trim();
      list = list.filter((item: any) => {
        const itemModel = String(item.model || '').toLowerCase().trim();
        return itemModel === targetModel;
      });
    }

    // LOCATION FILTER
    if (filters.location && filters.location !== 'All Locations') {
      const targetLoc = filters.location.toLowerCase().trim();
      list = list.filter((item: any) => String(item.city || '').toLowerCase().trim() === targetLoc);
    }

    // FUEL TYPE FILTER
    if (filters.fuelType && filters.fuelType !== 'All Fuel Types') {
      const targetFuel = filters.fuelType.toLowerCase().trim();
      list = list.filter((item: any) => String(item.fuel || '').toLowerCase().trim() === targetFuel);
    }

    // TRANSMISSION FILTER
    if (filters.transmission && filters.transmission !== 'All Transmissions') {
      const targetTrans = filters.transmission.toLowerCase().trim();
      list = list.filter((item: any) => String(item.transmission || '').toLowerCase().trim() === targetTrans);
    }

    // Stock Status filter
    if (filters.stockStatus && filters.stockStatus !== 'All Stock Statuses') {
      const targetStock = filters.stockStatus.replace(/[-_]/g, ' ').toLowerCase().trim();
      list = list.filter((item: any) => {
        const itemStatus = String(item.stockStatus || item.stock_status || item.status || '').replace(/[-_]/g, ' ').toLowerCase().trim();
        return itemStatus === targetStock;
      });
    }

    // Price Filter
    const min = parseInt(filters.minPrice) || 0;
    const max = parseInt(filters.maxPrice) || 999999;
    list = list.filter((item: any) => {
      const price = Number(item.price || item.Price || 0);
      if (price === 0) return true;
      return price >= min && price <= max;
    });

    // Year Filter
    const fromYear = filters.yearFrom && filters.yearFrom !== 'Any Year' ? parseInt(filters.yearFrom) : 0;
    const toYear = filters.yearTo && filters.yearTo !== 'Any Year' ? parseInt(filters.yearTo) : 9999;
    if (fromYear > 0 || toYear < 9999) {
      list = list.filter((item: any) => {
        const y = parseInt(item.year) || 0;
        return y >= fromYear && y <= toYear;
      });
    }

    // Sorting
    if (sortValue === 'Sort by Price') {
      list.sort((a: any, b: any) => {
        const pa = Number(a.price || a.Price || 0);
        const pb = Number(b.price || b.Price || 0);
        return pb - pa;
      });
    } else if (sortValue === 'Sort by Ratings') {
      list.sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0));
    } else {
      list.sort((a: any, b: any) => {
        const pa = Number(a.price || a.Price || 0);
        const pb = Number(b.price || b.Price || 0);
        if (pa > 0 && pb === 0) return -1;
        if (pa === 0 && pb > 0) return 1;
        if (pa === 0 && pb === 0) return 0;
        return pb - pa;
      });
    }

    return list;
  }, [filters, urlFilters, sortValue, badgeFilter]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <section style={{ padding: '30px 0 60px', background: '#fff' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ marginBottom: '20px' }}>
          <nav style={{ fontSize: '13px', color: '#888' }}>
            <span style={{ color: '#ffc107', fontWeight: 600, cursor: 'pointer' }}>Home</span>
            <span style={{ margin: '0 8px', color: '#ccc' }}>/</span>
            <span style={{ color: '#666' }}>Used Cars</span>
            <span style={{ margin: '0 8px', color: '#ccc' }}>/</span>
            <span style={{ color: '#1a1a2e', fontWeight: 700 }}>
              {badgeFilter 
                ? `${badgeFilter}s` 
                : filters.make 
                  ? `${filters.make}${filters.model ? ` / ${filters.model}` : ''}${filters.bodyStyle ? ` / ${filters.bodyStyle}` : ''}${filters.stockStatus ? ` / ${filters.stockStatus}` : ''}` 
                  : filters.bodyStyle 
                    ? filters.bodyStyle 
                    : filters.stockStatus
                      ? filters.stockStatus
                      : 'All Cars'}
            </span>
          </nav>
        </div>

        {/* Header Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <h5 style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
            Showing <span style={{ fontWeight: 900 }}>{currentProducts.length}</span> of <span style={{ fontWeight: 900 }}>{filteredProducts.length}</span> results
          </h5>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ position: 'relative' }}>
              <select
                value={sortValue}
                onChange={(e) => { setSortValue(e.target.value); setCurrentPage(1); }}
                style={{
                  padding: '9px 32px 9px 14px',
                  borderRadius: '8px',
                  border: '1px solid #e5e5e5',
                  background: '#fff',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#555',
                  appearance: 'none',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="Sort by popular">Sort by popular</option>
                <option value="Sort by Price">Sort by Price</option>
                <option value="Sort by Ratings">Sort by Ratings</option>
              </select>
              <i className="fas fa-chevron-down" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#aaa', fontSize: '10px', pointerEvents: 'none' }}></i>
            </div>

            <button
              onClick={() => setGrid(true)}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                border: isGrid ? 'none' : '1px solid #e5e5e5',
                background: isGrid ? '#ffc107' : '#fff',
                color: isGrid ? '#1a1a2e' : '#888',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <i className="fas fa-th" style={{ fontSize: '14px' }}></i>
            </button>

            <button
              onClick={() => setGrid(false)}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                border: !isGrid ? 'none' : '1px solid #e5e5e5',
                background: !isGrid ? '#ffc107' : '#fff',
                color: !isGrid ? '#1a1a2e' : '#888',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <i className="fas fa-list" style={{ fontSize: '14px' }}></i>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="row">
          <div className="col-xl-9 col-lg-8">
            <div className="row">
              {currentProducts.length > 0 ? (
                currentProducts.map((item: ProductItem) =>
                  isGrid
                    ? <ProductGridView product={item} key={item?.id} />
                    : <ProductListView product={item} key={item?.id} />
                )
              ) : (
                <div className="text-center py-5 w-100">
                  <h4 style={{ color: '#666' }}>No cars found matching your criteria.</h4>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>

          <div className="col-xl-3 col-lg-4">
            <div style={{ position: 'sticky', top: '20px' }}>
              <ProductSidebar
                filters={filters}
                onChange={setFilters}
                resultCount={filteredProducts.length}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}