import '../../index.css'
import Button from '../../Components/Buttons/DownloadAudit'
import Hamburger from '../../assets/Nav/Hamburger/Hamnurger.svg'
import Cancel from '../../assets/Nav/Hamburger/cancel.svg'
import { useState } from 'react'
import Logo from '../../assets/Logo/Logo.png'
import Pages from '../Sidebar/HamburgerPages'


type Props={
    name: string
}

export default function nav({name='Page Name'}:Props) {
    const [hamburger, sethamburger] = useState(true)

    return (
        <>
        <nav className='bg-[#f5f5f54c] backdrop-blur-sm flex justify-between items-center inpad py-[20px] bordersb sticky top-0 z-[10]'>
            <div className='flex gap-[10px] items-center'>
                <img src={Logo} alt="Trust lens logo" className="h-[2em] w-[2em] hidden max-[850px]:block" />
                <p className='font-mfont text-h4 font-medium'>{name}</p>
            </div>
            <Button name='Download audit'/>
            <img src={Hamburger} onClick={() => sethamburger(!hamburger)} alt="" className='w-[30px] h-[30px] hidden max-[850px]:block' />
        </nav>

        {/* Hamburger */}
        <section className={`fixed flex flex-col w-full h-full bg-white z-[12]  transition-all ease-in-out ${hamburger ? 'translate-x-full' : 'translate-x-0'}`}>
            <div className='flex justify-between inpadi bordersb'>
                <div className='flex gap-[5px]'>
                    <img src={Logo} alt="Trust lens logo" className="h-[2em] w-[2em]"/>
                    <p className='text-[1.5em] font-medium'>Trust lens</p>
                </div>

                <img src={Cancel} onClick={() => sethamburger(!hamburger)} alt="" className='w-[30px] h-[30px] hidden max-[850px]:block' />
            </div>

            <section className='flex flex-col gap-[10px]'>
                <Pages name='Overview' to='/'/>
                <Pages name='Vaults' to='/vaults'/>
                <Pages name='Analysis' to='/analysis'/>
            </section>
        </section>
        </>
    )
}
