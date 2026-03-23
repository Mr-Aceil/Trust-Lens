// ─── Analysis API Service ─────────────────────────────────────────────────────
//
// HOW TO SWAP TO REAL API:
//   1. Set USE_MOCK = false
//   2. Update BASE_URL to your backend base URL, e.g. "https://api.yourapp.com"
//   3. Confirm your endpoints match the routes defined below
//   4. Make sure each endpoint returns data matching the types in analysisTypes.ts
//
// ─────────────────────────────────────────────────────────────────────────────

import type { TimeRange, SolvencyDataPoint, AssetDataPoint, CollateralItem } from './analysisTypes'

// ── Config ────────────────────────────────────────────────────────────────────

const USE_MOCK = true                           // ← flip to false when API is ready
const BASE_URL = 'https://api.yourapp.com'     // ← replace with your real base URL

// ── API Endpoints (edit these to match your backend routes) ──────────────────

const ENDPOINTS = {
    solvency:   (range: TimeRange) => `${BASE_URL}/api/analysis/solvency?range=${range}`,
    assets:     (range: TimeRange) => `${BASE_URL}/api/analysis/assets?range=${range}`,
    collateral: ()                 => `${BASE_URL}/api/analysis/collateral`,
}

// ── Mock Data ─────────────────────────────────────────────────────────────────
// Safe to delete this entire section once USE_MOCK = false

const MONTHS = ['jan', 'feb', 'mar', 'aprl', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

const MOCK_SOLVENCY: Record<TimeRange, SolvencyDataPoint[]> = {
    '1Y': MONTHS.map((month, i) => ({
        month,
        healthFactor: [78, 90, 85, 75, 65, 60, 43, 58, 62, 80, 63, 82][i],
    })),
    '1M': Array.from({ length: 30 }, (_, i) => ({
        month: `Day ${i + 1}`,
        healthFactor: Math.round(70 + Math.sin(i / 3) * 15),
    })),
    '1W': Array.from({ length: 7 }, (_, i) => ({
        month: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
        healthFactor: Math.round(75 + Math.sin(i) * 10),
    })),
    '1D': Array.from({ length: 24 }, (_, i) => ({
        month: `${i}:00`,
        healthFactor: Math.round(78 + Math.sin(i / 4) * 8),
    })),
}

const MOCK_ASSETS: Record<TimeRange, AssetDataPoint[]> = {
    '1Y': MONTHS.map((month, i) => ({
        month,
        totalTCAP:            [600, 1000, 2000, 1700, 1300, 1600, 1800, 2200, 2400, 3200, 3400, 3900][i],
        totalReserves:        [400,  900, 1800, 1600, 1100, 1500, 1700, 2000, 2200, 3000, 3100, 3600][i],
        totalCollateralValue: [800, 1600, 1900, 1800, 1400, 1700, 1900, 2100, 2300, 3100, 3300, 3200][i],
    })),
    '1M': Array.from({ length: 30 }, (_, i) => ({
        month: `Day ${i + 1}`,
        totalTCAP:            Math.round(2000 + i * 60 + Math.sin(i / 4) * 300),
        totalReserves:        Math.round(1800 + i * 55 + Math.sin(i / 4 + 1) * 250),
        totalCollateralValue: Math.round(1900 + i * 58 + Math.sin(i / 4 + 2) * 280),
    })),
    '1W': Array.from({ length: 7 }, (_, i) => ({
        month: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
        totalTCAP:            Math.round(3200 + Math.sin(i) * 200),
        totalReserves:        Math.round(3000 + Math.sin(i + 1) * 180),
        totalCollateralValue: Math.round(3100 + Math.sin(i + 2) * 190),
    })),
    '1D': Array.from({ length: 24 }, (_, i) => ({
        month: `${i}:00`,
        totalTCAP:            Math.round(3800 + Math.sin(i / 4) * 150),
        totalReserves:        Math.round(3600 + Math.sin(i / 4 + 1) * 130),
        totalCollateralValue: Math.round(3700 + Math.sin(i / 4 + 2) * 140),
    })),
}

const MOCK_COLLATERAL: CollateralItem[] = [
    { label: 'ETH',    value: 46, color: '#007DFC' },
    { label: 'WBTC',   value: 28, color: '#7B2D2D' },
    { label: 'USDC',   value: 17, color: '#3D6B6B' },
    { label: 'Others', value: 5,  color: '#E0A800' },
    { label: '',       value: 4,  color: '#A0A0A0' },
]

// ── API Functions ─────────────────────────────────────────────────────────────
// These are the only functions the rest of the app should call.
// The mock / real split is handled here — the UI never needs to know.

export async function fetchSolvencyData(range: TimeRange): Promise<SolvencyDataPoint[]> {
    if (USE_MOCK) return MOCK_SOLVENCY[range]
    const res = await fetch(ENDPOINTS.solvency(range))
    if (!res.ok) throw new Error(`Failed to fetch solvency data: ${res.status}`)
    return res.json()
}

export async function fetchAssetData(range: TimeRange): Promise<AssetDataPoint[]> {
    if (USE_MOCK) return MOCK_ASSETS[range]
    const res = await fetch(ENDPOINTS.assets(range))
    if (!res.ok) throw new Error(`Failed to fetch asset data: ${res.status}`)
    return res.json()
}

export async function fetchCollateralData(): Promise<CollateralItem[]> {
    if (USE_MOCK) return MOCK_COLLATERAL
    const res = await fetch(ENDPOINTS.collateral())
    if (!res.ok) throw new Error(`Failed to fetch collateral data: ${res.status}`)
    return res.json()
}
