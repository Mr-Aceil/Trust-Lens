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
}

export default function Pages({
    name= "button name", 
    text='text-black', 
    bg='bg-white', 
    hover='hover:bg-buttonh', 
    link, 
    width , 
    hide, 
    logo,}: Props) {
    

    return (
        <Link to={link ?? '#'}>
            <div className={`${width} transition-all duration-300 ease-in-out h-54 flex gap-[1em] items-center ${hover} ${text} p-[1em] rounded-[1em] ${bg}`}>
                {logo}
                <p className={` transition-all duration-300 ease-in-out text-p font-mfont ${hide}`}>{name}</p>
            </div>
        </Link>
    )
}




