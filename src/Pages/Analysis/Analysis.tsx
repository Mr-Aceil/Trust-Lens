import '../../index.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Navbar from '../../Components/Nav-bar/nav'

export default function Analysis() {
    return (
        <>
        <Sidebar abg='bg-blue' aicon='white' atext='text-white' ahover='hover:none'/>
        
        <section className='flex flex-col w-full leftpad gap-[30px] pb-[20px]'>
            <Navbar name='Ananlysis' abg='bg-blue' atext='text-white'/>
        </section>
        </>
    )
}
