import '../../index.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Button from '../../Components/Buttons/DownloadAudit'
import MarketCards from './Components/OverviewCards'
import { GaugeComponent } from 'react-gauge-component';

export default function Overview() {
    return (
        <>
        <Sidebar obg='bg-blue' oicon='white' otext='text-white' ohover='hover:none'/>

        <section className='flex flex-col w-full pl-[100px] gap-[30px]'>
            <nav className='bg-[#f5f5f54c] backdrop-blur-sm flex justify-between items-center inpad py-[20px] bordersb sticky top-0 z-[10]'>
                <p className='font-mfont text-h4'>Overview</p>
                <Button name='Download audit'/>
            </nav>

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
                            <p className='text-h4 font-medium'>Global solvency gauge</p>
                            
                            {/* Live */}
                            <div className='rounded-[5px] bg-green-200 flex gap-[5px] items-center px-[15px]'>
                                <hr className='w-[7px] h-[7px] rounded-full bg-green-800'/>
                                <p className='text-p text-green-800'>Live</p>
                            </div>
                        </div>

                        <div className='flex w-full max-h-[300px] relative'>
                            <GaugeComponent
                                value={85} // This would come from your API
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
                                    style: { fontSize: "20px", fill: "black", border: 'none', boxShadow:'none', fontWeight: "300" } 
                                },
                                subLabel: {
                                    text: 'Current health factor',
                                    style: { fontSize: "12px", fill: "#666", fontWeight: "400" },
                                    verticalConfig: { offset: 25 } // Adjust this to move it further down
                                },
                                tickLabels: {
                                    type: 'inner',
                                    ticks: [{ value: 0 }, { value: 50 }, { value: 100 }]
                                }
                            }}
                            />
                        </div>
                    </section>

                    <div className=''>

                    </div>
                </section>
            </section>
        </section>
        </>
    )
}
