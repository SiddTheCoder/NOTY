import React from 'react'

function UseUserToken(length) {
    const token = Math.random().toString(36).substring(2, length)
    return token
}


export default UseUserToken
