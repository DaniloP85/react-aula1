
import React from 'react'
import "./CustomLabel.css"

type IProps = {
    info: String;
}

const CustomLabel = ({info}: IProps)  => {
  return (
    <div className='customLabel'>{info}</div>
  )
}

export default CustomLabel;