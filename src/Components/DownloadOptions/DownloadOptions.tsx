import '@/index.css'
import DownloadOptions2 from './Options'
import PNG from '@/assets/Download-Audit/Download-Options/PNG.svg'
import PDF from '@/assets/Download-Audit/Download-Options/PDF.svg'
import JPEG from '@/assets/Download-Audit/Download-Options/JPEG.svg'

type Props={
    triggerOptions: string;
}

export default function DownloadOptions({triggerOptions}:Props) {
    return (
        <section className={`flex-col absolute right-0 top-[3.5em] w-300 max-[500px]:w-200 bg-white shadow-2xl ${triggerOptions}`}>
            <DownloadOptions2 name='PDF' icon={PNG}/>
            <DownloadOptions2 name='PNG' icon={PDF}/>
            <DownloadOptions2 name='JPEG' icon={JPEG}/>
        </section>
    )
}
