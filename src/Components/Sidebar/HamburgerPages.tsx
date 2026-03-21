import '../../index.css'
import { Link } from 'react-router-dom'

type Props={
    name: string
    to: string
}

export default function HamburgerPages({name='Page name', to}:Props) {
    return (
        <Link to={to} className='text-h6 font-medium inpadi bordersb hover:bg-buttonh'>{name}</Link>
    )
}
