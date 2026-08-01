"use client";
import React, { useMemo } from 'react';
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
  colour: string;
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
    const bodyStyles = useMemo(() => {
        const styles = productsList.map((car: any) => car.Body || car.bodyType || car.category || 'SUV').filter(Boolean);
        return ['All Body Styles', ...Array.from(new Set(styles))];
    }, []);

    const makes = useMemo(() => {
        const brands = productsList.map((car: any) => car.brand).filter(Boolean);
        return ['ALL MAKES', ...Array.from(new Set(brands))];
    }, []);

    const models = useMemo(() => {
        const mods = productsList.map((car: any) => car.model).filter(Boolean);
        return ['All Models', ...Array.from(new Set(mods))];
    }, []);

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

    const colours = ['All colours', 'White', 'Black', 'Silver', 'Grey', 'Red', 'Blue', 'Pearl', 'Gold', 'Green'];

    const handleChange = (field: keyof FilterState, value: string) => {
        onChange({ ...filters, [field]: value });
    };

    const handleReset = () => {
        onChange({
            search: '',
            bodyStyle: '',
            make: '',
            model: '',
            minPrice: '0',
            maxPrice: '100000',
            yearFrom: '',
            yearTo: '',
            colour: '',
            location: '',
            fuelType: '',
            transmission: '',
        });
    };

    const formatPriceInput = (val: string, isMax: boolean) => {
        const num = parseInt(val.replace(/[^0-9]/g, '')) || 0;
        if (isMax && num >= 100000) return '$100,000+';
        return '$' + num.toLocaleString();
    };

    const FilterSelect = ({ value, options, onChange, placeholder }: any) => (
        <div style={{ position: 'relative', marginBottom: '10px' }}>
            <select
                value={value || placeholder}
                onChange={(e) => {
                    const val = e.target.value;
                    onChange(val === placeholder ? '' : val);
                }}
                style={{
                    width: '100%',
                    padding: '11px 34px 11px 14px',
                    borderRadius: '8px',
                    border: '1px solid #e5e5e5',
                    background: '#fff',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: value && value !== placeholder ? '#1a1a2e' : '#555',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    cursor: 'pointer',
                    outline: 'none',
                }}
            >
                <option value={placeholder}>{placeholder}</option>
                {options.filter((o: string) => o !== placeholder).map((opt: string, i: number) => (
                    <option key={i} value={opt}>{opt}</option>
                ))}
            </select>
            <i className="fas fa-chevron-down" style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#aaa',
                fontSize: '11px',
                pointerEvents: 'none'
            }}></i>
        </div>
    );

    return (
        <div className="product_sidebar bg-white p-4 rounded shadow-sm border w-100">
            
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

            <FilterSelect value={filters.bodyStyle} options={bodyStyles} onChange={(val: string) => handleChange('bodyStyle', val)} placeholder="All Body Styles" />
            <FilterSelect value={filters.make} options={makes} onChange={(val: string) => handleChange('make', val)} placeholder="ALL MAKES" />
            <FilterSelect value={filters.model} options={models} onChange={(val: string) => handleChange('model', val)} placeholder="All Models" />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
                <input
                    type="text"
                    value={formatPriceInput(filters.minPrice, false)}
                    onChange={(e) => handleChange('minPrice', e.target.value.replace(/[^0-9]/g, ''))}
                    style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: '8px',
                        border: '1px solid #e5e5e5',
                        fontSize: '13px',
                        fontWeight: 700,
                        color: '#1a1a2e',
                        outline: 'none'
                    }}
                />
                <input
                    type="text"
                    value={formatPriceInput(filters.maxPrice, true)}
                    onChange={(e) => handleChange('maxPrice', e.target.value.replace(/[^0-9]/g, ''))}
                    style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: '8px',
                        border: '1px solid #e5e5e5',
                        fontSize: '13px',
                        fontWeight: 700,
                        color: '#1a1a2e',
                        outline: 'none'
                    }}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
                <div style={{ position: 'relative' }}>
                    <select
                        value={filters.yearFrom || 'Any Year'}
                        onChange={(e) => handleChange('yearFrom', e.target.value === 'Any Year' ? '' : e.target.value)}
                        style={{
                            width: '100%',
                            padding: '11px 30px 11px 14px',
                            borderRadius: '8px',
                            border: '1px solid #e5e5e5',
                            background: '#fff',
                            fontSize: '13px',
                            fontWeight: 700,
                            color: filters.yearFrom ? '#1a1a2e' : '#555',
                            appearance: 'none',
                            outline: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        {years.map((y, i) => <option key={i} value={y}>{y}</option>)}
                    </select>
                    <i className="fas fa-chevron-down" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#aaa', fontSize: '10px', pointerEvents: 'none' }}></i>
                </div>
                <div style={{ position: 'relative' }}>
                    <select
                        value={filters.yearTo || 'Any Year'}
                        onChange={(e) => handleChange('yearTo', e.target.value === 'Any Year' ? '' : e.target.value)}
                        style={{
                            width: '100%',
                            padding: '11px 30px 11px 14px',
                            borderRadius: '8px',
                            border: '1px solid #e5e5e5',
                            background: '#fff',
                            fontSize: '13px',
                            fontWeight: 700,
                            color: filters.yearTo ? '#1a1a2e' : '#555',
                            appearance: 'none',
                            outline: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        {years.map((y, i) => <option key={i} value={y}>{y}</option>)}
                    </select>
                    <i className="fas fa-chevron-down" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#aaa', fontSize: '10px', pointerEvents: 'none' }}></i>
                </div>
            </div>

            <FilterSelect value={filters.colour} options={colours} onChange={(val: string) => handleChange('colour', val)} placeholder="All colours" />
            <FilterSelect value={filters.location} options={locations} onChange={(val: string) => handleChange('location', val)} placeholder="All Locations" />
            <FilterSelect value={filters.fuelType} options={fuelTypes} onChange={(val: string) => handleChange('fuelType', val)} placeholder="All Fuel Types" />
            <FilterSelect value={filters.transmission} options={transmissions} onChange={(val: string) => handleChange('transmission', val)} placeholder="All Transmissions" />

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