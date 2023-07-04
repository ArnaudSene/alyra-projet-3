import { useRouter } from 'next/navigation'

export const AppLogo = ({ textSize, pbSize, pSize }: {
    textSize: 'text-md'|'text-xl'|'text-6xl',
    pbSize: 'pb-1'|'pb-2'|'pb-10',
    pSize: 'p-1'|'p-2'|'p-4' 

}) => {
    const { push } = useRouter()

    return (
        <div className={`text-center ${textSize} ${pbSize} hover:scale-110 hover:pl-2 no-underline cursor-pointer`} onClick={() => push('/')}>
            <span className='font-bold'>Alyra</span>
            <span className={`font-semibold ${pSize} text-rose-500`}>myVote</span>
        </div>
    )
}