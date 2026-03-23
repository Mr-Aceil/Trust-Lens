import '../../index.css'
import Options from './Options'
import Pdf from '../../assets/Download-Audit/Download-Options/PDF.svg'
import Png from '../../assets/Download-Audit/Download-Options/PNG.svg'
import Jpeg from '../../assets/Download-Audit/Download-Options/JPEG.svg'

type Props={
    display: string;
}

export default function DownloadOptions({display}:Props) {
    return (
        <section className={`${display} flex-col w-full transition-all ease-in-out duration-500 `}>
            <Options name='PDF' Icons={Pdf}/>
            <Options name='PNG' Icons={Png}/>
            <Options name='JPEG' Icons={Jpeg}/>
        </section>
    )
}
