import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'


export default function IdrisBohra() {
    const params = useParams();

    useEffect(() => {
        console.log(1, params.id);
        window.addEventListener('message', (event) => {
            if (event.origin === 'http://127.0.0.1:5500') {
                console.log('Received message from parent:', event.data);
            }
        });
    }, [params.id])

    return (
        <div>
            hello idris bohra
        </div>
    )
}
