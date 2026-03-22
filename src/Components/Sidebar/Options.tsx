import '../../index.css'

type Props={
    name: string;
    Icons: string;
}

export default function Options({name='File Name',Icons}:Props) {
    return (
        <div className='flex w-full h-full pl-[20px] cursor-pointer'>
            <div className={`flex w-full h-full gap-[10px] px-[10px] py-[15px] border-l-[2px] border-l-solid border-l-border hover:border-l-blue`}>
                <img src={Icons} alt="Option Icon" />
                <p className='text-p'>{name}</p>
            </div>
        </div>
    )
}
