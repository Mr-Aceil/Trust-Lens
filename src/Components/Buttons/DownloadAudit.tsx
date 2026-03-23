import '../../index.css'

type Props={
    name: string;
    others?: string;
}

export default function DownloadAudit({name='button', others='max-[850px]:hidden'}:Props) {
    return (
        <button className={`text-white rounded-[10px] bg-blue hover:bg-blue7 text-p px-20 py-10 ${others}`}>{name}</button>
    )
}
