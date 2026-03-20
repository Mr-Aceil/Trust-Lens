import '../../index.css'

type Props={
    name: string;
}

export default function DownloadAudit({name='button'}:Props) {
    return (
        <div className="text-white rounded-[10px] bg-blue text-p px-[20px] py-[10px]">{name}</div>
    )
}
