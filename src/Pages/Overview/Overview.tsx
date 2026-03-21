import '../../index.css'
import { useState } from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Button from '../../Components/Buttons/DownloadAudit'
import MarketCards from './Components/OverviewCards'
import { GaugeComponent } from 'react-gauge-component';
import ChainCards from './Components/ChainCards'
import Base from '../../assets/Chain cards/Basepng.png'
import Arbitrum from '../../assets/Chain cards/arbitrum-one.png'
import Navbar from '../../Components/Nav-bar/nav'

// ─── Types ────────────────────────────────────────────────────────────────────
interface LedgerEntry {
    id: number
    timestamp: string
    chainlinkFeedId: string
    verifiedReserveValue: string
    status: 'Success' | 'Pending' | 'Failed'
    proof: string
}

// ─── Mock data ────────────────────────────────────────────────────────────────
// When your API is ready, remove MOCK_LEDGER and replace the `entries` variable
// inside the component with a useEffect + useState fetch, e.g.:
//
//   const [entries, setEntries] = useState<LedgerEntry[]>([])
//   useEffect(() => {
//     fetch('/api/ledger')
//       .then(r => r.json())
//       .then((data) => setEntries(data))
//   }, [])
//
const MOCK_LEDGER: LedgerEntry[] = Array.from({ length: 67 }, (_, i) => ({
    id: i + 1,
    timestamp: '2026-03-07  10:45 UTC',
    chainlinkFeedId: 'Chainlink 7F1903D',
    verifiedReserveValue: '$25,000,000',
    status: 'Success',
    proof: 'https://en.o.blockchain/Arbiscan...',
}))

const PER_PAGE = 10

const STATUS_STYLES: Record<LedgerEntry['status'], string> = {
    Success: 'bg-green-100 text-green-700 border border-green-300',
    Pending: 'bg-yellow-100 text-yellow-700 border border-yellow-300',
    Failed:  'bg-red-100 text-red-700 border border-red-300',
}

export default function Overview() {
    // ── Ledger pagination state ───────────────────────────────────────────────
    const entries: LedgerEntry[] = MOCK_LEDGER          // swap for API data later
    const [page, setPage] = useState(1)
    const totalPages = Math.ceil(entries.length / PER_PAGE)
    const rangeStart = (page - 1) * PER_PAGE
    const pageRows = entries.slice(rangeStart, rangeStart + PER_PAGE)

    return (
        <>
        <Sidebar obg='bg-blue' oicon='white' otext='text-white' ohover='hover:none'/>

        <section className='flex flex-col w-full pl-[100px] gap-[30px] pb-[20px]'>
            <Navbar name='Overview'/>

            <section className='flex flex-col gap-[5px] inpad'>
                {/* First section */}
                <section className='flex gap-[5px]'>
                    <MarketCards name='Market Liabilities' amount='$450,000,000' Percentage='+42%' />
                    <MarketCards name='Verified Reserves' amount='$86,000,000' Percentage='+17%' />
                    <MarketCards name='Health Factor' amount='185%' Percentage='+17%' />
                    <MarketCards name='Netwrok reach' amount='3 chains' Percentage='+1 new chain this quarter' time='' />
                </section>

                {/* Global solvency gauge section */}
                <section className='flex gap-[5px] w-full'>
                    <section className='w-full flex flex-col items-center borders bg-white px-[20px] py-[20px] gap-[20px]'>
                        <div className='flex justify-between w-full'>
                            <p className='text-h5 font-medium'>Global solvency gauge</p>
                            
                            {/* Live */}
                            <div className='rounded-[5px] bg-green-200 flex gap-[5px] items-center px-[15px]'>
                                <hr className='w-[7px] h-[7px] rounded-full bg-green-800'/>
                                <p className='text-p text-green-800'>Live</p>
                            </div>
                        </div>

                        {/* The Gauge */}
                        <div className='flex w-full max-h-[350px] flex flex-col items-center'>
                            <GaugeComponent
                                value={85}
                                type="semicircle"
                                arc={{
                                    width: 0.1,
                                    padding: 0.002,
                                    cornerRadius: 0,
                                    subArcs: [
                                        { limit: 25, color: '#007DFC', showTick: true }, 
                                        { limit: 50, color: '#3397FD', showTick: true }, 
                                        { limit: 75, color: '#66B1FD', showTick: true }, 
                                        { limit: 100, color: '#99CBFE', showTick: true },
                                    ]
                                }}
                                pointer={{
                                    color: '#007DFC',
                                    length: 0.80,
                                    width: 5,
                                    elastic: true,
                                }}
                                labels={{
                                    valueLabel: { 
                                        formatTextValue: value => value + '%',
                                        style: { fontSize: "20px", fill: "black", border: 'none', boxShadow: 'none', fontWeight: "300" } 
                                    },
                                    tickLabels: {
                                        type: 'inner',
                                        ticks: [{ value: 0 }, { value: 50 }, { value: 100 }]
                                    }
                                }}
                            />
                            <p className='text-h5 text-subText'>CURRENT HEALTH FACTOR</p>
                        </div>
                    </section>

                    {/* Chain cards */}
                    <div className='flex flex-col gap-[5px] w-full max-w-[500px]'>
                        <div className='bg-white borders px-[15px] py-[10px]'>
                            <p className='text-h5 w-fit'>Chain cards</p>
                        </div>
                        <ChainCards link='https://etherscan.io/address/0x321C2fE4446C7c963dc41Dd58879AF648838f98D' ChainName='Ethereum Mainnet' Verify='Verify on Etherscan'/>
                        <ChainCards link='https://arbiscan.io/address/0x84F5c2cFba754E76DD5aE4fB369CfC920425E12b' ChainLogo={Arbitrum} ChainName='Arbitrum One' Verify='Verify on Arbiscan'/>
                        <ChainCards link='https://basescan.org/address/0xBB22Ff867F8Ca3D5F2251B4084F6Ec86D4666E14' ChainLogo={Base} ChainName='Base' Verify='Verify on Basescan'/>
                    </div>
                </section>

                {/* ── Verification Ledger ───────────────────────────────────── */}
                <section className='w-full flex flex-col borders bg-white px-[20px] py-[20px] gap-[20px]'>

                    {/* Header */}
                    <div className='flex justify-between items-center w-full'>
                        <p className='text-h5'>Verification ledger</p>
                        <p className='text-p text-subText'>Source 15/27</p>
                    </div>

                    {/* Table */}
                    <div className='w-full overflow-x-auto'>
                        <table className='w-full text-left border-collapse'>
                            <thead>
                                <tr className='border-b border-gray-200'>
                                    <th className='py-[10px] px-[12px] text-p font-medium text-subText whitespace-nowrap'>Time stamp</th>
                                    <th className='py-[10px] px-[12px] text-p font-medium text-subText whitespace-nowrap'>Chainlink feed ID</th>
                                    <th className='py-[10px] px-[12px] text-p font-medium text-subText whitespace-nowrap'>Verified reserve value</th>
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
                                        <td className='py-[12px] px-[12px] text-p whitespace-nowrap font-mono text-sm'>
                                            {row.chainlinkFeedId}
                                        </td>
                                        <td className='py-[12px] px-[12px] text-p font-medium whitespace-nowrap font-mono text-sm'>
                                            {row.verifiedReserveValue}
                                        </td>
                                        <td className='py-[12px] px-[12px]'>
                                            <span className={`inline-flex items-center gap-[5px] px-[10px] py-[3px] rounded-full text-sm font-medium ${STATUS_STYLES[row.status]}`}>
                                                <span className={`w-[6px] h-[6px] rounded-full ${
                                                    row.status === 'Success' ? 'bg-green-600' :
                                                    row.status === 'Pending' ? 'bg-yellow-600' : 'bg-red-600'
                                                }`} />
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
                    <div className='flex justify-between items-center w-full pt-[5px]'>
                        <p className='text-p text-subText text-sm'>
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
