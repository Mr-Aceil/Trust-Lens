import '../../index.css'

type Props={
    name: string;
}

export default function DownloadAudit({name='button'}:Props) {
    return (
        <button className="text-white rounded-[10px] bg-blue hover:bg-blue7 text-p px-[20px] py-[10px] max-[850px]:hidden">{name}</button>
    )
}
