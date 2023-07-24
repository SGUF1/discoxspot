import React from 'react'
import {auth} from '@clerk/nextjs'
const UserPage = () => {
  return (
    <div>UserPage {auth().userId}</div>
  )
}

export default UserPage