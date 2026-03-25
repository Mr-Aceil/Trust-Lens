import '../../index.css';
import { Link } from 'react-router-dom'

type Props={
    name?: string;
    text?: string;
    bg?: React.ReactNode;
    logo?: React.ReactNode;
    hover?: React.ReactNode;
    link?: string;
    hide?: string;
    width?: string;
    others?: string;
}

export default function Pages({
    name= "button name", 
    text='text-black', 
    bg='bg-white', 
    hover='hover:bg-buttonh', 
    link, 
    width , 
    hide, 
    others, 
    logo,}: Props) {
    

    return (
        <Link to={link ?? '#'}>
            <div className={` transition-all items-center duration-300 ease-in-out h-54 flex gap-[1em] p-[1em] rounded-[1em] ${others}  ${hover} ${text} ${width} ${bg}`}>
                {logo}
                <p className={` transition-all duration-300 ease-in-out text-p font-mfont ${hide}`}>{name}</p>
            </div>
        </Link>
    )
}




