import '../../index.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Navbar from '../../Components/Nav-bar/nav'
import VaultsButtons from './Components/VaultsButtons'
import OverviewCards from '../Overview/Components/OverviewCards'

export default function Vaults() {
    return (
        <>
        <Sidebar vbg='bg-blue' vicon='white' vtext='text-white' vhover='hover:none'/>
        
        <section className='flex flex-col w-full pl-[100px] gap-[30px] pb-[20px]'>
            <Navbar name='Vaults'/>

            <section className='flex flex-col gap-[5px] w-full inpad'>
                <section className='bg-white w-fit p-[10px] borders flex items-center gap-[10px]'>
                    <VaultsButtons name='Ethererum vault' bg='bg-blue' text='text-white' hover=''/>
                    <VaultsButtons name='Arbitrum vault'/>
                    <VaultsButtons name='Base vault'/>
                </section>

                <OverviewCards name='Total vault value' amount='$425,000,000' Percentage='last updated' time='2 minutes ago'/>
            </section>
        </section>
        </>
    )
}
