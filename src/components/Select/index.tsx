import React from 'react'
import { Picker } from '@react-native-community/picker'

export const Option = (props) => {
  return(
    <Picker.Item { ...props } />
  )
}

const Select = ({ items = [], children, renderItem, ...props }) => {
  return(
    <Picker { ...props }>
      {children}
      {/* <Option>{children}</Option> */}
      {/* {items.map(item => renderItem(item))} */}
    </Picker>
  )
}

export default Select