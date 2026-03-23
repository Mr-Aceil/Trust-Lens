import '../../index.css'
import { Link } from 'react-router-dom'

type Props={
    name: string;
    to: string;
    bg?: React.ReactNode;
    textColor?: React.ReactNode;
    icon?: React.ReactNode;
}

export default function HamburgerPages({name='Page name', to, bg, textColor, icon}:Props) {
    return (
        <Link to={to} className={`flex gap-10 inpad py-20 bordersb items-center  ${bg}`}>
            {icon}
            <p className={`text-p font-medium ${textColor}`}>{name}</p>  
        </Link>
    )
}
