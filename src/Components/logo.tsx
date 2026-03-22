import '../index.css'
import Logo from '../assets/Logo/logo.svg'

export default function logo() {
    return (
        <img src={Logo} alt="Trust lens logo" className="h-[2em] w-[2em] hidden max-[850px]:block 
                                                        max-[500px]:h-[1.5em]
                                                        max-[500px]:w-[1.5em]
                                                        " />
    )
}
