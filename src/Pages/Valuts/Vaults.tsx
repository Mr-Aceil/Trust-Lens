import '../../index.css'
import { useState } from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Navbar from '../../Components/Nav-bar/nav'
import VaultsButtons from './Components/VaultsButtons'
import OverviewCards from '../Overview/Components/OverviewCards'

// ─── Types ────────────────────────────────────────────────────────────────────
interface LiabilityEntry {
    id: number
    timestamp: string
    tcapLiability: string
    verifiedCollateral: string
    status: 'Solvent' | 'At Risk' | 'Insolvent'
    proof: string
}

// ─── Mock data ────────────────────────────────────────────────────────────────
// ✅ API INTEGRATION POINT:
// When your API is ready, remove MOCK_LEDGER and replace the `entries` variable
// inside the component with a useEffect + useState fetch, e.g.:
//
//   const [entries, setEntries] = useState<LiabilityEntry[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//
//   useEffect(() => {
//     fetch('/api/vaults/liability-ledger')               // 👈 swap URL here
//       .then(r => r.json())
//       .then((data: LiabilityEntry[]) => {
//         setEntries(data)
//         setLoading(false)
//       })
//       .catch(err => {
//         setError(err.message)
//         setLoading(false)
//       })
//   }, [])
//
const MOCK_LEDGER: LiabilityEntry[] = Array.from({ length: 167 }, (_, i) => ({
    id: i + 1,
    timestamp: '2026-03-07  10:45 UTC',
    tcapLiability: '$162,200,000',
    verifiedCollateral: '$300,000,000',
    status: 'Solvent',
    proof: 'https://en.o.blockchain/Arbiscan...',
}))

const PER_PAGE = 10

// ✅ API INTEGRATION POINT: extend this map as your API returns new statuses
const STATUS_STYLES: Record<LiabilityEntry['status'], string> = {
    Solvent:   'bg-green-100 text-green-700 border border-green-300',
    'At Risk': 'bg-yellow-100 text-yellow-700 border border-yellow-300',
    Insolvent: 'bg-red-100 text-red-700 border border-red-300',
}

const STATUS_DOT: Record<LiabilityEntry['status'], string> = {
    Solvent:   'bg-green-600',
    'At Risk': 'bg-yellow-600',
    Insolvent: 'bg-red-600',
}

export default function Vaults() {
    // ── Ledger data ───────────────────────────────────────────────────────────
    // ✅ API INTEGRATION POINT: replace MOCK_LEDGER with your state variable
    const entries: LiabilityEntry[] = MOCK_LEDGER

    // ── Pagination state ──────────────────────────────────────────────────────
    const [page, setPage] = useState(1)
    const totalPages  = Math.ceil(entries.length / PER_PAGE)
    const rangeStart  = (page - 1) * PER_PAGE
    const pageRows    = entries.slice(rangeStart, rangeStart + PER_PAGE)

    // ── Download handler ──────────────────────────────────────────────────────
    // ✅ API INTEGRATION POINT: swap this for a real download/export endpoint
    const handleDownloadAudit = () => {
        console.log('Download audit triggered — wire to your export API here')
    }

    return (
        <>
        <Sidebar vbg='bg-blue' vicon='white' vtext='text-white' vhover='hover:none'/>
        
        <section className='flex flex-col w-full leftpad gap-[30px] pb-[20px]'>
            <Navbar name='Vaults' vbg='bg-blue' vtext='text-white' vicon='white'/>

            <section className='flex flex-col gap-[5px] w-full inpad'>
                {/* Vault selector tabs */}
                <section className='bg-white w-fit p-[10px] borders flex flex-wrap items-center gap-[10px]'>
                    <VaultsButtons name='Ethererum vault' bg='bg-blue' text='text-white' hover=''/>
                    <VaultsButtons name='Arbitrum vault'/>
                    <VaultsButtons name='Base vault'/>
                </section>

                {/* Vault value card */}
                <OverviewCards name='Total vault value' amount='$425,000,000' Percentage='last updated' time='2 minutes ago'/>

                {/* ── Liability & Collateral Ledger ──────────────────────────────────────── */}
                <section className='w-full flex flex-col borders overflow-hidden bg-white px-[20px] py-[20px] gap-[20px]'>

                    {/* Header */}
                    <div className='flex justify-between items-center w-full'>
                        <p className='text-h5'>Liability &amp; collateral ledger</p>

                        <div className='flex items-center gap-[10px]'>
                            <p className='text-p text-subText'>Source 15/27</p>
                        </div>
                    </div>

                    {/* Table */}
                    <div className='w-full overflow-x-auto'>
                        <table className='w-full text-left border-collapse'>
                            <thead>
                                <tr className='border-b border-gray-200'>
                                    <th className='py-[10px] px-[12px] text-p font-medium text-subText whitespace-nowrap'>Time stamp</th>
                                    <th className='py-[10px] px-[12px] text-p font-medium text-subText whitespace-nowrap'>TCAP Liability</th>
                                    <th className='py-[10px] px-[12px] text-p font-medium text-subText whitespace-nowrap'>Verified Collateral</th>
                                    <th className='py-[10px] px-[12px] text-p font-medium text-subText whitespace-nowrap'>Status</th>
                                    <th className='py-[10px] px-[12px] text-p font-medium text-subText whitespace-nowrap'>Proof</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pageRows.map((row) => (
                                    <tr key={row.id} className='border-b border-gray-100 hover:bg-gray-50 transition-colors'>
                                        <td className='py-[12px] px-[12px] text-p text-gray-600 whitespace-nowrap font-mono text-sm'>
                                            {row.timestamp}
                                        </td>
                                        <td className='py-[12px] px-[12px] text-p font-medium whitespace-nowrap font-mono text-sm'>
                                            {row.tcapLiability}
                                        </td>
                                        <td className='py-[12px] px-[12px] text-p font-medium whitespace-nowrap font-mono text-sm'>
                                            {row.verifiedCollateral}
                                        </td>
                                        <td className='py-[12px] px-[12px]'>
                                            <span className={`inline-flex items-center gap-[5px] px-[10px] py-[3px] rounded-full text-sm font-medium ${STATUS_STYLES[row.status]}`}>
                                                <span className={`w-[6px] h-[6px] rounded-full ${STATUS_DOT[row.status]}`} />
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className='py-[12px] px-[12px]'>
                                            <a
                                                href={row.proof}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                className='text-sm text-blue-500 hover:text-blue-700 hover:underline font-mono truncate max-w-[220px] block transition-colors'
                                                title={row.proof}
                                            >
                                                {row.proof}
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className='flex justify-between items-center w-full pt-[5px] max-[500px]:overflow-x-scroll'>
                        <p className='text-p text-subText text-sm max-[850px]:hidden'>
                            Showing {rangeStart + 1} to {Math.min(rangeStart + PER_PAGE, entries.length)} of {entries.length} entries
                        </p>

                        <div className='flex items-center gap-[8px]'>
                            {/* Previous */}
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className='px-[14px] py-[6px] text-sm borders rounded-[6px] text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
                            >
                                Previous
                            </button>

                            {/* Page numbers with ellipsis */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                                .reduce<(number | '...')[]>((acc, p, idx, arr) => {
                                    if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) acc.push('...')
                                    acc.push(p)
                                    return acc
                                }, [])
                                .map((p, idx) =>
                                    p === '...'
                                        ? <span key={`dots-${idx}`} className='px-[6px] text-subText text-sm'>…</span>
                                        : <button
                                            key={p}
                                            onClick={() => setPage(p as number)}
                                            className={`min-w-[32px] px-[10px] py-[6px] text-sm rounded-[6px] borders transition-colors ${
                                                page === p
                                                    ? 'bg-blue-600 text-white border-blue-600'
                                                    : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            {p}
                                        </button>
                                )
                            }

                            {/* Next */}
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className='px-[14px] py-[6px] text-sm borders rounded-[6px] text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
                            >
                                Next
                            </button>
                        </div>
                    </div>

                </section>
            </section>
        </section>
        </>
    )
}
