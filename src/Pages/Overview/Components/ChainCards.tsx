import '../../../index.css'
import Eth from '../../../assets/Chain cards/eth.png'

type Props={
    ChainName?: string
    Amount?: string
    SubAmount?: string
    ChainLogo?: string
    Verify?: string
    link?: string
}

export default function ChainCards({ChainLogo=Eth, link, ChainName='Chain name', Verify='Verify on Etherscan/ Arbiscan/ Basescan', Amount= '$0', SubAmount= '$0', }:Props) {
    return (
        <div className='bg-white borders p-15 w-full gap-10 flex flex-col'>
            <div className='flex gap-10 justify-between items-center w-full'>
                <img src={ChainLogo} alt="Chain Logo" className='w-40 h-40' />

                <div className='flex flex-col w-full'>
                    <div className='flex justify-between items-center w-fill'>
                        <p className='text-h7 font-medium'>{ChainName}</p>
                        <p className='text-h7'>{Amount}</p>
                    </div>
                    
                    <div className='flex justify-between items-center w-fill'>
                        <p className='text-small text-subText'>Total TVL</p>
                        <p className='text-small text-subText'>{SubAmount}</p>
                    </div>
                </div>
            </div>

            <a href= {link} target='_blank' className='bg-mainbg flex items-center justify-center hover:bg-blue2 text-p text-subText borders w-full p-10'>
                {Verify}
            </a>
        </div>
    )
}
