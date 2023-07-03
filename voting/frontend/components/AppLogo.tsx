import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export const AppLogo = ({size = '6xl'}: {size?: 'md'|'xl'|'6xl'}) => {
    const [pbSize, setPbSize] = useState<number>()
    const [pSize, setPSize] = useState<number>()

    const { push } = useRouter()

    useEffect(() => {
        switch (size) {
            case 'md':
                setPbSize(1)
                setPSize(1)
                break
            case 'xl':
                setPbSize(4)
                setPSize(2)
                break
            case '6xl':
            default:
                setPbSize(10)
                setPSize(4)
                break
        }
    }, [size])

    return (
        <div className={`text-center text-${size} pb-${pbSize} hover:scale-110 hover:pl-2 no-underline cursor-pointer`} onClick={() => push('/')}>
            <span className='font-bold'>Alyra</span>
            <span className={`font-semibold p-${pSize} text-rose-500`}>myVote</span>
        </div>
    )
}