import '../../index.css'
import Button from '../../Components/Buttons/DownloadAudit'

type Props={
    name: string
}

export default function nav({name='Page Name'}:Props) {
    return (
        <nav className='bg-[#f5f5f54c] backdrop-blur-sm flex justify-between items-center inpad py-[20px] bordersb sticky top-0 z-[10]'>
            <p className='font-mfont text-h4'>{name}</p>
            <Button name='Download audit'/>
        </nav>
    )
}
