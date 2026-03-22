import '../../../index.css'

type Props={
    name?: string
    bg?: string
    text?: string
    hover?: string
}

export default function VaultsButtons({name='no name', bg, text, hover='hover:bg-buttonh'}:Props) {
    return (
        <button className={`px-[10px] py-[15px] max-[500px]:py-[5px] text-p max-[500px]:text-small ${bg} ${text} ${hover} borders`}>
            {name}
        </button>
    )
}
