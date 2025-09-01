import {useRef} from 'react'
import {createPortal} from 'react-dom'

export function Test () {
    const name = useRef(null)
    return (
        <div>
            <input type="text" ref={name}/>
            console.log({name.current})
        </div>
    )
}