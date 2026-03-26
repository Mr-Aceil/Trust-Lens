import '@/index.css'

type Props={
    name: string;
    icon: string;
}

export default function Options({name, icon}:Props) {
    return (
        <section className='p-20 hover:bg-buttonh flex gap-10 items-center'>
            <img src={icon} alt="Option icon" className='w-20 h-20' />
            <p>{name}</p>
        </section>
    )
}
