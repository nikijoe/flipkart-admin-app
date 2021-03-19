import React from 'react'
import './style.css'

export default function Card(props) {
    return (
        <div className="card" {...props}>
            {(props.headerleft || props.headerright) &&
            <div className='cardHeader'>
                {
                    props.headerleft && <div>{props.headerleft}</div>
                }
                {
                    props.headerright && props.headerright
                }
            </div>
            }
            {props.children}
        </div>
    )
}
