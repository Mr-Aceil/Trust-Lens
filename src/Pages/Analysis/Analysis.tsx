import '../../index.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Navbar from '../../Components/Nav-bar/nav'
import {
    AreaChart,
    Area,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'
import { useState } from 'react'
import type { TimeRange } from './analysisTypes'
import { useAnalysisData } from './useAnalysisData'

// ─── Helpers ──────────────────────────────────────────────────────────────────

const TIME_RANGES: TimeRange[] = ['1Y', '1M', '1W', '1D']

function TimeRangeToggle({
    value,
    onChange,
}: {
    value: TimeRange
    onChange: (v: TimeRange) => void
}) {
    return (
        <div className='flex gap-1'>
            {TIME_RANGES.map((r) => (
                <button
                    key={r}
                    onClick={() => onChange(r)}
                    className={`px-10 py-4 text-sm rounded-4 transition-colors ${
                        value === r
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-500 hover:bg-gray-100'
                    }`}
                >
                    {r}
                </button>
            ))}
        </div>
    )
}

function formatYAxis(value: number) {
    if (value >= 1000) return `${value / 1000}B`
    return `${value}M`
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Analysis() {
    const [solvencyRange, setSolvencyRange] = useState<TimeRange>('1D')
    const [assetRange,    setAssetRange]    = useState<TimeRange>('1D')

    // All data + loading/error state comes from the hook.
    // To switch to real API data: open analysisApi.ts and set USE_MOCK = false
    const { solvencyData, assetData, collateralData, loading, error } =
        useAnalysisData(solvencyRange, assetRange)

    const Help = (
        <svg height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M12.838 17.638C13.0793 17.396 13.2 17.1 13.2 16.75C13.2 16.4 13.0793 16.104 12.838 15.862C12.5967 15.62 12.3007 15.4993 11.95 15.5C11.5993 15.5007 11.3037 15.6217 11.063 15.863C10.8223 16.1043 10.7013 16.4 10.7 16.75C10.6987 17.1 10.8197 17.396 11.063 17.638C11.3063 17.88 11.602 18.0007 11.95 18C12.298 17.9993 12.594 17.8783 12.838 17.637M12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88334 20.6867 5.825 19.9743 4.925 19.075C4.025 18.1757 3.31267 17.1173 2.788 15.9C2.26333 14.6827 2.00067 13.3827 2 12C1.99933 10.6173 2.262 9.31733 2.788 8.1C3.314 6.88267 4.02633 5.82433 4.925 4.925C5.82367 4.02567 6.882 3.31333 8.1 2.788C9.318 2.26267 10.618 2 12 2C13.382 2 14.682 2.26267 15.9 2.788C17.118 3.31333 18.1763 4.02567 19.075 4.925C19.9737 5.82433 20.6863 6.88267 21.213 8.1C21.7397 9.31733 22.002 10.6173 22 12C21.998 13.3827 21.7353 14.6827 21.212 15.9C20.6887 17.1173 19.9763 18.1757 19.075 19.075C18.1737 19.9743 17.1153 20.687 15.9 21.213C14.6847 21.739 13.3847 22.0013 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20ZM12.1 7.7C12.5167 7.7 12.8793 7.83333 13.188 8.1C13.4967 8.36667 13.6507 8.7 13.65 9.1C13.65 9.46667 13.5377 9.79167 13.313 10.075C13.0883 10.3583 12.834 10.625 12.55 10.875C12.1667 11.2083 11.8293 11.575 11.538 11.975C11.2467 12.375 11.1007 12.825 11.1 13.325C11.1 13.5583 11.1877 13.7543 11.363 13.913C11.5383 14.0717 11.7423 14.1507 11.975 14.15C12.225 14.15 12.4377 14.0667 12.613 13.9C12.7883 13.7333 12.9007 13.525 12.95 13.275C13.0167 12.925 13.1667 12.6127 13.4 12.338C13.6333 12.0633 13.8833 11.8007 14.15 11.55C14.5333 11.1833 14.8627 10.7833 15.138 10.35C15.4133 9.91667 15.5507 9.43333 15.55 8.9C15.55 8.05 15.2043 7.35433 14.513 6.813C13.8217 6.27167 13.0173 6.00067 12.1 6C11.4667 6 10.8627 6.13333 10.288 6.4C9.71333 6.66667 9.27567 7.075 8.975 7.625C8.85834 7.825 8.821 8.03767 8.863 8.263C8.905 8.48833 9.01733 8.659 9.2 8.775C9.43333 8.90833 9.675 8.95 9.925 8.9C10.175 8.85 10.3833 8.70833 10.55 8.475C10.7333 8.225 10.9627 8.03333 11.238 7.9C11.5133 7.76667 11.8007 7.7 12.1 7.7Z'
                fill='black'
            />
        </svg>
    )

    return (
        <>
        <Sidebar abg='bg-blue' aicon='white' atext='text-white' ahover='hover:none'/>

        <section className='flex flex-col w-full leftpad gap-30 pb-20'>
            <Navbar name='Ananlysis' abg='bg-blue' atext='text-white' aicon='white'/>
            <section className='flex flex-col gap-5 inpad'>

                {/* Global error banner — only shows when an API call fails */}
                {error && (
                    <div className='w-full px-15 py-10 bg-red-50 border border-red-200 rounded-6 text-sm text-red-700'>
                        Failed to load data: {error}
                    </div>
                )}

                <section className='flex gap-5 max-[1100px]:flex-col'>

                    {/* ── Network solvency history ─────────────────────────── */}
                    <div className='w-full bg-white borders px-15 py-20 flex flex-col gap-20'>
                        <div className='flex justify-between items-center flex-wrap gap-10'>
                            <p className='text-h5'>Network solvency history</p>
                            {Help}
                        </div>

                        {/* Legend + Toggle */}
                        <div className='flex justify-between items-center flex-wrap gap-10'>
                            <div className='flex items-center gap-6'>
                                <span className='w-12 h-12 rounded-2' style={{ background: '#007DFC' }} />
                                <span className='text-sm text-gray-600'>Health factor</span>
                            </div>
                            <TimeRangeToggle value={solvencyRange} onChange={setSolvencyRange} />
                        </div>

                        {/* Chart */}
                        <div className='w-full relative' style={{ height: 280 }}>
                            {loading && (
                                <div className='absolute inset-0 flex items-center justify-center bg-white bg-opacity-60 z-10'>
                                    <span className='text-sm text-gray-400'>Loading...</span>
                                </div>
                            )}
                            <ResponsiveContainer width='100%' height='100%'>
                                <AreaChart data={solvencyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id='solvencyGrad' x1='0' y1='0' x2='0' y2='1'>
                                            <stop offset='5%'  stopColor='#007DFC' stopOpacity={0.18} />
                                            <stop offset='95%' stopColor='#007DFC' stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid vertical={true} horizontal={false} stroke='#f0f0f0' />
                                    <XAxis
                                        dataKey='month'
                                        tick={{ fontSize: 12, fill: '#888' }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        tickFormatter={(v) => `${v}%`}
                                        tick={{ fontSize: 12, fill: '#888' }}
                                        axisLine={false}
                                        tickLine={false}
                                        domain={[20, 100]}
                                        ticks={[20, 40, 60, 80, 100]}
                                        width={42}
                                    />
                                    <Tooltip
                                        formatter={(value: number) => [`${value}%`, 'Health factor']}
                                        contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13 }}
                                    />
                                    <Area
                                        type='monotone'
                                        dataKey='healthFactor'
                                        stroke='#007DFC'
                                        strokeWidth={2}
                                        fill='url(#solvencyGrad)'
                                        dot={false}
                                        activeDot={{ r: 4, fill: '#007DFC' }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* ── Asset health ─────────────────────────────────────── */}
                    <div className='w-full bg-white borders px-15 py-20 flex flex-col gap-20'>
                        <div className='flex justify-between items-center flex-wrap gap-10'>
                            <p className='text-h5'>Asset health</p>
                            {Help}
                        </div>

                        {/* Legend + Toggle */}
                        <div className='flex justify-between items-center flex-wrap gap-10'>
                            <div className='flex items-center gap-12 flex-wrap'>
                                <div className='flex items-center gap-6'>
                                    <span className='w-12 h-12 rounded-2' style={{ background: '#007DFC' }} />
                                    <span className='text-sm text-gray-600'>Total TCAP supply</span>
                                </div>
                                <div className='flex items-center gap-6'>
                                    <span className='w-12 h-12 rounded-2' style={{ background: '#3D8C4A' }} />
                                    <span className='text-sm text-gray-600'>Total reserves</span>
                                </div>
                                <div className='flex items-center gap-6'>
                                    <span className='w-12 h-12 rounded-2' style={{ background: '#7B2D2D' }} />
                                    <span className='text-sm text-gray-600'>Total Collateral Value</span>
                                </div>
                            </div>
                            <TimeRangeToggle value={assetRange} onChange={setAssetRange} />
                        </div>

                        {/* Chart */}
                        <div className='w-full relative' style={{ height: 280 }}>
                            {loading && (
                                <div className='absolute inset-0 flex items-center justify-center bg-white bg-opacity-60 z-10'>
                                    <span className='text-sm text-gray-400'>Loading...</span>
                                </div>
                            )}
                            <ResponsiveContainer width='100%' height='100%'>
                                <LineChart data={assetData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                                    <CartesianGrid vertical={true} horizontal={false} stroke='#f0f0f0' />
                                    <XAxis
                                        dataKey='month'
                                        tick={{ fontSize: 12, fill: '#888' }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        tickFormatter={formatYAxis}
                                        tick={{ fontSize: 12, fill: '#888' }}
                                        axisLine={false}
                                        tickLine={false}
                                        width={52}
                                    />
                                    <Tooltip
                                        formatter={(value: number, name: string) => {
                                            const labels: Record<string, string> = {
                                                totalTCAP: 'Total TCAP supply',
                                                totalReserves: 'Total reserves',
                                                totalCollateralValue: 'Total Collateral Value',
                                            }
                                            return [`${value}M`, labels[name] ?? name]
                                        }}
                                        contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13 }}
                                    />
                                    <Line type='monotone' dataKey='totalTCAP'            stroke='#007DFC' strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                                    <Line type='monotone' dataKey='totalReserves'        stroke='#3D8C4A' strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                                    <Line type='monotone' dataKey='totalCollateralValue' stroke='#7B2D2D' strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </section>

                {/* ── Collateral mix ───────────────────────────────────────── */}
                <div className='w-full bg-white borders px-15 py-20 flex flex-col gap-20'>
                    <div className='flex justify-between items-center'>
                        <p className='text-h5'>Collateral mix</p>
                        {Help}
                    </div>

                    {/* Legend */}
                    <div className='flex items-center gap-15 flex-wrap'>
                        {collateralData.filter(d => d.label).map((d) => (
                            <div key={d.label} className='flex items-center gap-6'>
                                <span className='w-12 h-12 rounded-2' style={{ background: d.color }} />
                                <span className='text-sm text-gray-600'>{d.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Stacked bar */}
                    <div className='w-full flex flex-col gap-8'>
                        <div className='w-full flex rounded-4 overflow-hidden' style={{ height: 40 }}>
                            {collateralData.map((d, i) => (
                                <div
                                    key={i}
                                    style={{ width: `${d.value}%`, background: d.color }}
                                    title={d.label ? `${d.label}: ${d.value}%` : `Others: ${d.value}%`}
                                />
                            ))}
                        </div>

                        {/* X axis labels */}
                        <div className='flex justify-between'>
                            {[0, 20, 40, 60, 80, 100].map((v) => (
                                <span key={v} className='text-sm text-gray-500'>{v}%</span>
                            ))}
                        </div>
                    </div>
                </div>

            </section>
        </section>
        </>
    )
}
