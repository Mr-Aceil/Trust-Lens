import '../../index.css'
import Button from '../../Components/Buttons/DownloadAudit'
import Hamburger from '../../assets/Nav/Hamburger/Hamnurger.svg'
import Cancel from '../../assets/Nav/Hamburger/cancel.svg'
import { useState } from 'react'
import Logo from '../logo'
import Pages from '../Sidebar/HamburgerPages'
import DownloadButton from '../../assets/Download-Audit/material-symbols_download-rounded.svg'


type Props={
    name: string
    obg?: string
    vbg?: string
    abg?: string
    otext?: string
    vtext?: string
    atext?: string
}

export default function nav({name='Page Name',
                            obg,
                            vbg,
                            abg,
                            otext,
                            vtext,
                            atext,
                            }:Props) {
    const [hamburger, sethamburger] = useState(true)

    return (
        <>
        <nav className='bg-[#f5f5f54c] backdrop-blur-sm flex justify-between items-center inpadi bordersb sticky top-0 z-[10]'>
            <div className='flex gap-[10px] items-center'>
                <img src={Hamburger} onClick={() => sethamburger(!hamburger)} alt="" className='w-[20px] h-[20px] hidden max-[850px]:block' />
                
                <div className='flex gap-[5px] items-center'>
                    <Logo />
                    <p className='text-h5 font-medium'>{name}</p>
                </div>
            </div>
            <Button name='Download audit'/>

            {/* Hamburger Button */}
            <img src={DownloadButton} alt="Downlaod audit button" className='hidden max-[850px]:block'/>
        </nav>

        {/* Hamburger */}
        <section className={`fixed flex-col w-[80%] shadow-2xl h-full bg-white z-[12]  transition-all ease-in-out ${hamburger ? 'hidden' : 'flex'}`}>
            <div className='flex justify-between inpadi bordersb items-center'>
                <div className='flex gap-[10px] items-center'>
                    <img src={Cancel} onClick={() => sethamburger(!hamburger)} alt="" className='w-[20px] h-[20px] hidden max-[850px]:block' />
                    
                    <div className='flex gap-[5px] items-center'>
                        <Logo />
                        <p className='text-h5 font-medium'>Trust lens</p>
                    </div>
                </div>
            </div>

            <section className='flex flex-col '>
                <Pages name='Overview' to='/' bg={obg} textColor={otext}/>
                <Pages name='Vaults' to='/vaults' bg={vbg} textColor={vtext}/>
                <Pages name='Analysis' to='/analysis' bg={abg} textColor={atext}/>
            </section>
        </section>
        </>
    )
}
