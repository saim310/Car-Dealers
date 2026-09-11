"use client";

import React, { useMemo, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { productsList } from "@/all-content/products/productData";

export interface FilterState {
  search: string;
  bodyStyle: string;
  make: string;
  model: string;
  minPrice: string;
  maxPrice: string;
  yearFrom: string;
  yearTo: string;
  stockStatus: string;
  location: string;
  fuelType: string;
  transmission: string;
}

interface ProductSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  resultCount: number;
}

export default function ProductSidebar({ filters, onChange, resultCount }: ProductSidebarProps) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  // -------------------------------------------------------------
  // OPTIONS GENERATORS
  // -------------------------------------------------------------
  const bodyStyles = useMemo(() => {
    const rawStyles = productsList
      .map((car: any) => car.bodyStyle || car.Body || car.bodyType)
      .filter(Boolean);

    const formatted = rawStyles.map((style: string) =>
      String(style)
        .trim()
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    );

    const uniqueStyles = Array.from(new Set(formatted)).sort();
    return ['All Body Styles', ...uniqueStyles];
  }, []);

  const makes = useMemo(() => {
    const brands = productsList.map((car: any) => car.brand || car.make).filter(Boolean);
    return ['ALL MAKES', ...Array.from(new Set(brands))];
  }, []);

  const models = useMemo(() => {
    const relevantProducts = (filters.make && filters.make !== 'ALL MAKES')
      ? productsList.filter((car: any) => String(car.brand || car.make || '').toUpperCase() === filters.make.toUpperCase())
      : productsList;
    const mods = relevantProducts.map((car: any) => car.model).filter(Boolean);
    return ['All Models', ...Array.from(new Set(mods))];
  }, [filters.make]);

  const stockStatuses = useMemo(() => {
    const statuses = productsList
      .map((car: any) => {
        const val = car.stockStatus || car.status;
        if (!val) return null;
        return String(val).replace(/_/g, ' ').trim();
      })
      .filter(Boolean);

    return ['All Stock Statuses', ...Array.from(new Set(statuses))];
  }, []);

  // Helper function to format stock string for URLs (e.g. "In Stock" -> "in-stock")
  const formatSlugPart = (str: string) => {
    return str.toLowerCase().replace(/\s+/g, '-');
  };

  // Helper function to match URL slugs with option values
  const matchOption = (options: string[], slugSegment: string) => {
    if (!slugSegment) return '';
    const cleanSegment = decodeURIComponent(slugSegment).toLowerCase().replace(/-/g, ' ');
    return options.find(opt => opt.toLowerCase() === cleanSegment) || '';
  };

  // -------------------------------------------------------------
  // URL SLUG & QUERY SYNC (Handles Dynamic Slugs with Stock Status)
  // -------------------------------------------------------------
  useEffect(() => {
    const slug = (params?.slug as string[]) || [];
    
    let urlMake = '';
    let urlModel = '';
    let urlBody = '';
    let urlStock = '';

    // Smart slug detection based on dataset matching
    slug.forEach((segment) => {
      const decoded = decodeURIComponent(segment).toUpperCase();
      const decodedClean = decoded.replace(/-/g, ' ');

      // Match Stock Status first
      const isStock = stockStatuses.some(
        s => s.toUpperCase() === decodedClean
      );
      if (isStock && !urlStock) {
        urlStock = stockStatuses.find(s => s.toUpperCase() === decodedClean) || '';
        return;
      }

      // Match Body Style
      const isBody = bodyStyles.some(
        b => b.toUpperCase() === decodedClean
      );
      if (isBody && !urlBody) {
        urlBody = bodyStyles.find(b => b.toUpperCase() === decodedClean) || '';
        return;
      }

      // Match Make
      const isMake = productsList.some(
        c => String(c.brand || c.make || '').toUpperCase() === decoded
      );
      if (isMake && !urlMake) {
        urlMake = productsList.find(
          c => String(c.brand || c.make || '').toUpperCase() === decoded
        )?.brand || productsList.find(
          c => String(c.brand || c.make || '').toUpperCase() === decoded
        )?.make || decoded;
        return;
      }

      // Match Model
      const isModel = productsList.some(
        c => String(c.model || '').toUpperCase() === decoded
      );
      if (isModel && !urlModel) {
        urlModel = productsList.find(
          c => String(c.model || '').toUpperCase() === decoded
        )?.model || decoded;
        return;
      }
    });

    if (
      urlMake !== filters.make ||
      urlModel !== filters.model ||
      urlBody !== filters.bodyStyle ||
      urlStock !== filters.stockStatus
    ) {
      onChange({
        ...filters,
        make: urlMake,
        model: urlModel,
        bodyStyle: urlBody,
        stockStatus: urlStock,
      });
    }
  }, [params.slug]);

  // -------------------------------------------------------------
  // DYNAMIC URL PUSH FUNCTION (MAKE / MODEL / BODY / STOCK STATUS)
  // -------------------------------------------------------------
  const updateUrlAndFilters = (newFilters: FilterState) => {
    onChange(newFilters);

    let newPath = "/inner/products";
    const selectedMake = newFilters.make && newFilters.make !== 'ALL MAKES' ? newFilters.make.toLowerCase() : '';
    const selectedModel = newFilters.model && newFilters.model !== 'All Models' ? newFilters.model.toLowerCase() : '';
    const selectedBody = newFilters.bodyStyle && newFilters.bodyStyle !== 'All Body Styles' ? formatSlugPart(newFilters.bodyStyle) : '';
    const selectedStock = newFilters.stockStatus && newFilters.stockStatus !== 'All Stock Statuses' ? formatSlugPart(newFilters.stockStatus) : '';

    if (selectedMake) {
      newPath += `/${encodeURIComponent(selectedMake)}`;
      if (selectedModel) {
        newPath += `/${encodeURIComponent(selectedModel)}`;
      }
    }

    if (selectedBody) {
      newPath += `/${encodeURIComponent(selectedBody)}`;
    }

    if (selectedStock) {
      newPath += `/${encodeURIComponent(selectedStock)}`;
    }

    const queryString = searchParams.toString();
    const finalUrl = queryString ? `${newPath}?${queryString}` : newPath;

    router.push(finalUrl, { scroll: false });
  };

  const years = useMemo(() => {
    const yrs = productsList.map((car: any) => car.year).filter(Boolean).sort((a: any, b: any) => parseInt(b) - parseInt(a));
    return ['Any Year', ...Array.from(new Set(yrs))];
  }, []);

  const locations = useMemo(() => {
    const cities = productsList.map((car: any) => car.city).filter(Boolean);
    return ['All Locations', ...Array.from(new Set(cities))];
  }, []);

  const fuelTypes = useMemo(() => {
    const fuels = productsList.map((car: any) => car.fuel).filter(Boolean);
    return ['All Fuel Types', ...Array.from(new Set(fuels))];
  }, []);

  const transmissions = useMemo(() => {
    const trans = productsList.map((car: any) => car.transmission).filter(Boolean);
    return ['All Transmissions', ...Array.from(new Set(trans))];
  }, []);

  // -------------------------------------------------------------
  // CHANGE HANDLERS
  // -------------------------------------------------------------
  const handleChange = (field: keyof FilterState, value: string) => {
    let updated: FilterState;

    if (field === 'make') {
      const cleanValue = value === 'ALL MAKES' ? '' : value;
      updated = { ...filters, make: cleanValue, model: '' };
      updateUrlAndFilters(updated);
    } else if (field === 'model') {
      const cleanValue = value === 'All Models' ? '' : value;
      updated = { ...filters, model: cleanValue };
      updateUrlAndFilters(updated);
    } else if (field === 'bodyStyle') {
      const cleanValue = value === 'All Body Styles' ? '' : value;
      updated = { ...filters, bodyStyle: cleanValue };
      updateUrlAndFilters(updated);
    } else if (field === 'stockStatus') {
      const cleanValue = value === 'All Stock Statuses' ? '' : value;
      updated = { ...filters, stockStatus: cleanValue };
      updateUrlAndFilters(updated);
    } else {
      updated = { ...filters, [field]: value };
      onChange(updated);
    }
  };

  const handleReset = () => {
    const resetFilters: FilterState = {
      search: '',
      bodyStyle: '',
      make: '',
      model: '',
      minPrice: '0',
      maxPrice: '100000',
      yearFrom: '',
      yearTo: '',
      stockStatus: '',
      location: '',
      fuelType: '',
      transmission: '',
    };

    updateUrlAndFilters(resetFilters);
  };

  const formatPriceInput = (val: string, isMax: boolean) => {
    const num = parseInt(val.replace(/[^0-9]/g, '')) || 0;
    if (isMax && num >= 100000) return '$100,000+';
    return '$' + num.toLocaleString();
  };

  return (
    <div className="product_sidebar bg-white p-4 rounded shadow-sm border w-100">
      {/* SEARCH INPUT */}
      <div style={{ marginBottom: '14px' }}>
        <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#1a1a2e', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Search Stock
        </label>
        <div style={{ display: 'flex', position: 'relative' }}>
          <input 
            type="text" 
            placeholder="Search cars..." 
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            style={{
              width: '100%',
              padding: '11px 42px 11px 14px',
              borderRadius: '8px',
              border: '1px solid #e5e5e5',
              fontSize: '13px',
              outline: 'none',
              fontWeight: 600,
              color: '#1a1a2e'
            }}
          />
          <button style={{
            position: 'absolute',
            right: '4px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '34px',
            height: '34px',
            borderRadius: '6px',
            background: '#ffc107',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            <i className="fa fa-search" style={{ color: '#1a1a2e', fontSize: '13px' }}></i>
          </button>
        </div>
      </div>

      {/* BODY STYLE */}
      <div style={{ position: 'relative', marginBottom: '10px' }}>
        <select
          value={filters.bodyStyle || "All Body Styles"}
          onChange={(e) => handleChange('bodyStyle', e.target.value)}
          style={{ width: '100%', padding: '11px 34px 11px 14px', borderRadius: '8px', border: '1px solid #e5e5e5', background: '#fff', fontSize: '13px', fontWeight: 700, color: filters.bodyStyle ? '#1a1a2e' : '#555', appearance: 'none', cursor: 'pointer', outline: 'none' }}
        >
          {bodyStyles.map((opt, i) => (
            <option key={i} value={opt}>{opt}</option>
          ))}
        </select>
        <i className="fas fa-chevron-down" style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#aaa', fontSize: '11px', pointerEvents: 'none' }}></i>
      </div>

      {/* MAKE */}
      <div style={{ position: 'relative', marginBottom: '10px' }}>
        <select
          value={filters.make || "ALL MAKES"}
          onChange={(e) => handleChange('make', e.target.value)}
          style={{ width: '100%', padding: '11px 34px 11px 14px', borderRadius: '8px', border: '1px solid #e5e5e5', background: '#fff', fontSize: '13px', fontWeight: 700, color: filters.make ? '#1a1a2e' : '#555', appearance: 'none', cursor: 'pointer', outline: 'none' }}
        >
          {makes.map((opt, i) => (
            <option key={i} value={opt}>{opt}</option>
          ))}
        </select>
        <i className="fas fa-chevron-down" style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#aaa', fontSize: '11px', pointerEvents: 'none' }}></i>
      </div>

      {/* MODEL */}
      <div style={{ position: 'relative', marginBottom: '10px' }}>
        <select
          value={filters.model || "All Models"}
          onChange={(e) => handleChange('model', e.target.value)}
          style={{ width: '100%', padding: '11px 34px 11px 14px', borderRadius: '8px', border: '1px solid #e5e5e5', background: '#fff', fontSize: '13px', fontWeight: 700, color: filters.model ? '#1a1a2e' : '#555', appearance: 'none', cursor: 'pointer', outline: 'none' }}
        >
          {models.map((opt, i) => (
            <option key={i} value={opt}>{opt}</option>
          ))}
        </select>
        <i className="fas fa-chevron-down" style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#aaa', fontSize: '11px', pointerEvents: 'none' }}></i>
      </div>

      {/* PRICE RANGE */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
        <input
          type="text"
          value={formatPriceInput(filters.minPrice, false)}
          onChange={(e) => handleChange('minPrice', e.target.value.replace(/[^0-9]/g, ''))}
          style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #e5e5e5', fontSize: '13px', fontWeight: 700, color: '#1a1a2e', outline: 'none' }}
        />
        <input
          type="text"
          value={formatPriceInput(filters.maxPrice, true)}
          onChange={(e) => handleChange('maxPrice', e.target.value.replace(/[^0-9]/g, ''))}
          style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #e5e5e5', fontSize: '13px', fontWeight: 700, color: '#1a1a2e', outline: 'none' }}
        />
      </div>

      {/* YEAR RANGE */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
        <div style={{ position: 'relative' }}>
          <select
            value={filters.yearFrom || 'Any Year'}
            onChange={(e) => handleChange('yearFrom', e.target.value === 'Any Year' ? '' : e.target.value)}
            style={{ width: '100%', padding: '11px 30px 11px 14px', borderRadius: '8px', border: '1px solid #e5e5e5', background: '#fff', fontSize: '13px', fontWeight: 700, color: filters.yearFrom ? '#1a1a2e' : '#555', appearance: 'none', outline: 'none', cursor: 'pointer' }}
          >
            {years.map((y, i) => <option key={i} value={y}>{y}</option>)}
          </select>
          <i className="fas fa-chevron-down" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#aaa', fontSize: '10px', pointerEvents: 'none' }}></i>
        </div>
        <div style={{ position: 'relative' }}>
          <select
            value={filters.yearTo || 'Any Year'}
            onChange={(e) => handleChange('yearTo', e.target.value === 'Any Year' ? '' : e.target.value)}
            style={{ width: '100%', padding: '11px 30px 11px 14px', borderRadius: '8px', border: '1px solid #e5e5e5', background: '#fff', fontSize: '13px', fontWeight: 700, color: filters.yearTo ? '#1a1a2e' : '#555', appearance: 'none', outline: 'none', cursor: 'pointer' }}
          >
            {years.map((y, i) => <option key={i} value={y}>{y}</option>)}
          </select>
          <i className="fas fa-chevron-down" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#aaa', fontSize: '10px', pointerEvents: 'none' }}></i>
        </div>
      </div>

      {/* STOCK STATUS */}
      <div style={{ position: 'relative', marginBottom: '10px' }}>
        <select
          value={filters.stockStatus || "All Stock Statuses"}
          onChange={(e) => handleChange('stockStatus', e.target.value)}
          style={{ width: '100%', padding: '11px 34px 11px 14px', borderRadius: '8px', border: '1px solid #e5e5e5', background: '#fff', fontSize: '13px', fontWeight: 700, color: filters.stockStatus ? '#1a1a2e' : '#555', appearance: 'none', cursor: 'pointer', outline: 'none' }}
        >
          {stockStatuses.map((opt, i) => (
            <option key={i} value={opt}>{opt}</option>
          ))}
        </select>
        <i className="fas fa-chevron-down" style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#aaa', fontSize: '11px', pointerEvents: 'none' }}></i>
      </div>

      {/* LOCATION */}
      <div style={{ position: 'relative', marginBottom: '10px' }}>
        <select
          value={filters.location || "All Locations"}
          onChange={(e) => handleChange('location', e.target.value === "All Locations" ? "" : e.target.value)}
          style={{ width: '100%', padding: '11px 34px 11px 14px', borderRadius: '8px', border: '1px solid #e5e5e5', background: '#fff', fontSize: '13px', fontWeight: 700, color: filters.location ? '#1a1a2e' : '#555', appearance: 'none', cursor: 'pointer', outline: 'none' }}
        >
          {locations.map((opt, i) => (
            <option key={i} value={opt}>{opt}</option>
          ))}
        </select>
        <i className="fas fa-chevron-down" style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#aaa', fontSize: '11px', pointerEvents: 'none' }}></i>
      </div>

      {/* FUEL TYPE */}
      <div style={{ position: 'relative', marginBottom: '10px' }}>
        <select
          value={filters.fuelType || "All Fuel Types"}
          onChange={(e) => handleChange('fuelType', e.target.value === "All Fuel Types" ? "" : e.target.value)}
          style={{ width: '100%', padding: '11px 34px 11px 14px', borderRadius: '8px', border: '1px solid #e5e5e5', background: '#fff', fontSize: '13px', fontWeight: 700, color: filters.fuelType ? '#1a1a2e' : '#555', appearance: 'none', cursor: 'pointer', outline: 'none' }}
        >
          {fuelTypes.map((opt, i) => (
            <option key={i} value={opt}>{opt}</option>
          ))}
        </select>
        <i className="fas fa-chevron-down" style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#aaa', fontSize: '11px', pointerEvents: 'none' }}></i>
      </div>

      {/* TRANSMISSION */}
      <div style={{ position: 'relative', marginBottom: '10px' }}>
        <select
          value={filters.transmission || "All Transmissions"}
          onChange={(e) => handleChange('transmission', e.target.value === "All Transmissions" ? "" : e.target.value)}
          style={{ width: '100%', padding: '11px 34px 11px 14px', borderRadius: '8px', border: '1px solid #e5e5e5', background: '#fff', fontSize: '13px', fontWeight: 700, color: filters.transmission ? '#1a1a2e' : '#555', appearance: 'none', cursor: 'pointer', outline: 'none' }}
        >
          {transmissions.map((opt, i) => (
            <option key={i} value={opt}>{opt}</option>
          ))}
        </select>
        <i className="fas fa-chevron-down" style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#aaa', fontSize: '11px', pointerEvents: 'none' }}></i>
      </div>

      <div style={{ textAlign: 'center', margin: '12px 0' }}>
        <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a2e', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
          More Options
        </a>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={handleReset} style={{ flex: 1, padding: '12px 8px', borderRadius: '8px', background: '#1a1a2e', color: '#fff', fontSize: '13px', fontWeight: 800, border: 'none', cursor: 'pointer', transition: 'all 0.25s ease' }}>
          Reset
        </button>
        <button style={{ flex: 1, padding: '12px 8px', borderRadius: '8px', background: '#ffc107', color: '#1a1a2e', fontSize: '13px', fontWeight: 800, border: 'none', cursor: 'pointer', transition: 'all 0.25s ease' }}>
          Search ({resultCount})
        </button>
      </div>
    </div>
  );
}