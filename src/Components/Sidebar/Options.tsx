import '../../index.css'

type Props={
    name: string;
    Icons: string;
}

export default function Options({name='File Name',Icons}:Props) {
    return (
        <div className='flex w-full h-full pl-20 cursor-pointer'>
            <div className={`flex w-full h-full gap-10 px-10 py-15 border-l-2 border-l-solid border-l-border hover:border-l-blue`}>
                <img src={Icons} alt="Option Icon" />
                <p className='text-p'>{name}</p>
            </div>
        </div>
    )
}
