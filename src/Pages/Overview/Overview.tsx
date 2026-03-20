import '../../index.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Button from '../../Components/Buttons/DownloadAudit'
import MarketCards from './Components/OverviewCards'

export default function Overview() {
    return (
        <>
        <Sidebar obg='bg-blue' oicon='white' otext='text-white' ohover='hover:none'/>

        <section className='flex flex-col w-full pl-[100px] gap-[30px]'>
            <nav className='flex justify-between items-center inpad py-[20px] bordersb sticky top-0 z-[10]'>
                <p className='font-mfont text-h4'>Overview</p>
                <Button name='Download audit'/>
            </nav>

            <section className='flex flex-col gap-[10px] inpad'>
                <div className='flex gap-[5px]'>
                    <MarketCards name='Market Liabilities' amount='$450,000,000' Percentage='+42%' />
                    <MarketCards name='Verified Reserves' amount='$86,000,000' Percentage='+17%' />
                    <MarketCards name='Health Factor' amount='185%' Percentage='+17%' />
                    <MarketCards name='Netwrok reach' amount='3 chains' Percentage='+1 new chain this quarter' time='' />
                </div>
            </section>
        </section>
        </>
    )
}
