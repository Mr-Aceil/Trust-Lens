// ─── Shared Types ─────────────────────────────────────────────────────────────
// These types define exactly what shape the API must return.
// When your backend is ready, make sure each endpoint returns data
// that matches these interfaces.

export type TimeRange = '1Y' | '1M' | '1W' | '1D'

// GET /api/analysis/solvency?range=1Y
// Returns an array of { month: string, healthFactor: number }
export interface SolvencyDataPoint {
    month: string        // e.g. "jan", "Day 1", "Mon", "0:00"
    healthFactor: number // percentage value, e.g. 85
}

// GET /api/analysis/assets?range=1Y
// Returns an array of { month, totalTCAP, totalReserves, totalCollateralValue }
export interface AssetDataPoint {
    month: string
    totalTCAP: number            // in millions (M)
    totalReserves: number        // in millions (M)
    totalCollateralValue: number // in millions (M)
}

// GET /api/analysis/collateral
// Returns an array of collateral asset breakdown
export interface CollateralItem {
    label: string  // e.g. "ETH", "WBTC", "USDC", "Others"
    value: number  // percentage, e.g. 46 (means 46%)
    color: string  // hex color for the chart segment, e.g. "#007DFC"
}
