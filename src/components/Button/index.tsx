import React from 'react'
import { Button, StyleSheet } from 'react-native'

const ButtonComponent = ({ children, deleteButton = false, ...props }) => {
  return(
    <Button
      { ...props }
    >
      { children }
    </Button>
  )
}

export default ButtonComponent