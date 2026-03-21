import { button } from 'framer-motion/client'
import '../../../index.css'

type Props={
    name: string
    bg: string
    text: string
    hover: string
}

export default function VaultsButtons({name='no name', bg, text, hover='hover:bg-buttonh'}:Props) {
    return (
        <button className={`px-[10px] py-[15px] ${bg} ${text} ${hover} borders`}>
            {name}
        </button>
    )
}
