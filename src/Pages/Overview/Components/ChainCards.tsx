import '../../../index.css'
import Eth from '../../../assets/Chain cards/eth.png'

type Props={
    ChainName: string
    Amount: string
    SubAmount: string
    ChainLogo: string
}

export default function ChainCards({ChainLogo=Eth, ChainName='Chain name', Amount= '$0', SubAmount= '$0', }:Props) {
    return (
        <div className='bg-white borders p-[15px] w-full gap-[10px] flex flex-col'>
            <div className='flex gap-[10px] justify-between items-center w-full'>
                <img src={ChainLogo} alt="Chain Logo" className='w-[40px] h-[40px]' />

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

            <button className='bg-mainbg hover:bg-blue2 text-p text-subText borders w-full p-[10px]'>
                Verify on Etherscan
            </button>
        </div>
    )
}
