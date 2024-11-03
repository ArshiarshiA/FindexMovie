import React from "react"

interface IRating{
    value: string
    children: React.ReactNode
}

export default function RatingBlock({value , children}: IRating) {
    return (
        <div className='rounded-sm w-fit text-white'>
            <span className="flex items-center gap-2">{children} : {value}</span>
        </div>
    )
}