// ─── useAnalysisData hook ─────────────────────────────────────────────────────
// Fetches all three chart datasets and re-fetches automatically when the
// selected time range changes. Exposes loading and error states so the UI
// can show spinners / error messages without any fetch logic in the component.

import { useState, useEffect } from 'react'
import type { TimeRange, SolvencyDataPoint, AssetDataPoint, CollateralItem } from './analysisTypes'
import { fetchSolvencyData, fetchAssetData, fetchCollateralData } from './analysisApi'

interface AnalysisData {
    solvencyData:    SolvencyDataPoint[]
    assetData:       AssetDataPoint[]
    collateralData:  CollateralItem[]
}

interface UseAnalysisDataReturn extends AnalysisData {
    loading: boolean
    error:   string | null
}

export function useAnalysisData(
    solvencyRange: TimeRange,
    assetRange:    TimeRange,
): UseAnalysisDataReturn {
    const [solvencyData,   setSolvencyData]   = useState<SolvencyDataPoint[]>([])
    const [assetData,      setAssetData]      = useState<AssetDataPoint[]>([])
    const [collateralData, setCollateralData] = useState<CollateralItem[]>([])
    const [loading,        setLoading]        = useState(true)
    const [error,          setError]          = useState<string | null>(null)

    // Re-fetch solvency whenever its range changes
    useEffect(() => {
        setLoading(true)
        setError(null)
        fetchSolvencyData(solvencyRange)
            .then(setSolvencyData)
            .catch((e: Error) => setError(e.message))
            .finally(() => setLoading(false))
    }, [solvencyRange])

    // Re-fetch assets whenever its range changes
    useEffect(() => {
        setLoading(true)
        setError(null)
        fetchAssetData(assetRange)
            .then(setAssetData)
            .catch((e: Error) => setError(e.message))
            .finally(() => setLoading(false))
    }, [assetRange])

    // Collateral has no range — fetch once on mount
    useEffect(() => {
        fetchCollateralData()
            .then(setCollateralData)
            .catch((e: Error) => setError(e.message))
    }, [])

    return { solvencyData, assetData, collateralData, loading, error }
}
