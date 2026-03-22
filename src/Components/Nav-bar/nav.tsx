import '../../index.css'
import Button from '../../Components/Buttons/DownloadAudit'
import Hamburger from '../../assets/Nav/Hamburger/Hamnurger.svg'
import Cancel from '../../assets/Nav/Hamburger/cancel.svg'
import { useState } from 'react'
import Logo from '../../assets/Logo/Logo.png'
import Pages from '../Sidebar/HamburgerPages'


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
                <img src={Logo} alt="Trust lens logo" className="h-[2em] w-[2em] hidden max-[850px]:block" />
                <p className='font-mfont text-h5 font-medium'>{name}</p>
            </div>
            <Button name='Download audit'/>

            {/* Hamburger Button */}
            <img src={Hamburger} onClick={() => sethamburger(!hamburger)} alt="" className='w-[20px] h-[20px] hidden max-[850px]:block' />
        </nav>

        {/* Hamburger */}
        <section className={`fixed flex flex-col w-full h-full bg-white z-[12]  transition-all ease-in-out ${hamburger ? 'translate-x-full' : 'translate-x-0'}`}>
            <div className='flex justify-between inpadi bordersb items-center'>
                <div className='flex gap-[5px] items-center'>
                    <img src={Logo} alt="Trust lens logo" className="h-[2em] w-[2em]"/>
                    <p className='text-h5 font-medium'>Trust lens</p>
                </div>

                <img src={Cancel} onClick={() => sethamburger(!hamburger)} alt="" className='w-[20px] h-[20px] hidden max-[850px]:block' />
            </div>

            <section className='flex flex-col gap-[10px]'>
                <Pages name='Overview' to='/' bg={obg} textColor={otext}/>
                <Pages name='Vaults' to='/vaults' bg={vbg} textColor={vtext}/>
                <Pages name='Analysis' to='/analysis' bg={abg} textColor={atext}/>
            </section>
        </section>
        </>
    )
}
