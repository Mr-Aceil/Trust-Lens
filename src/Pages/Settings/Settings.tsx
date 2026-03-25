import '@/index.css'
import Sidebar from '@/Components/Sidebar/Sidebar'
import Navbar from '@/Components/Nav-bar/nav'

export default function Settings() {
    return (
        <>
        <Sidebar sbg='bg-blue' sicon='white' stext='text-white' shover='hover:none'/>
        
                <section className='flex flex-col w-full leftpad gap-30 pb-20'>
                    <Navbar name='Settings' sbg='bg-blue' stext='text-white' sicon='white'/>
                </section>
        </>

    )
}
