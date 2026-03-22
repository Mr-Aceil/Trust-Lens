import '../../index.css'
import { Link } from 'react-router-dom'

type Props={
    name: string;
    to: string;
    bg?: React.ReactNode;
    textColor?: React.ReactNode;
}

export default function HamburgerPages({name='Page name', to, bg, textColor}:Props) {
    return (
        <Link to={to} className={`text-h5 font-medium inpadi bordersb  ${bg} ${textColor}`}>{name}</Link>
    )
}
