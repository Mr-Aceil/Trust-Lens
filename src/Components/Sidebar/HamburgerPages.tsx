import '../../index.css'
import { Link } from 'react-router-dom'

type Props={
    name: string
    to: string
}

export default function HamburgerPages({name='Page name', to}:Props) {
    return (
        <Link to={to} className='text-[1.5em] font-medium inpadi bordersb hover:bg-buttonh'>{name}</Link>
    )
}
