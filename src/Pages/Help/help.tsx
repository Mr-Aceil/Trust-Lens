import '@/index.css'
import Sidebar from '@/Components/Sidebar/Sidebar'
import Navbar from '@/Components/Nav-bar/nav'

export default function help() {
    return (
        <>
        <Sidebar hbg='bg-blue' hicon='white' htext='text-white' hhover='hover:none'/>
        
        <section className='flex flex-col w-full leftpad gap-30 pb-20'>
            <Navbar name='Help' hbg='bg-blue' htext='text-white' hicon='white'/>
        </section>
        </>
    )
}
