import React from 'react'

const BackendErrorMessages = ({backendErrors}) => {
    const errorMessages = Object.keys(backendErrors).map(name =>{
        const messages = backendErrors[name].join(' ')
        return `${name} ${messages}`
    })
    return <ul className="error-messages">
        {errorMessages.map(errorMessages => (
            <li key={errorMessages}>
                {errorMessages}
            </li>
        ))}
    </ul>
}

export default BackendErrorMessages