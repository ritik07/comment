import React from 'react';
import { Input } from 'antd';


const CustomInput = ({ placeholder, setOnChange, isTextArea, inputValue, defaultInputValue }) => {
  const onInputChange = (value) => {
    setOnChange(value.target.value)
  }
  return <div>
    {isTextArea ?
      <Input.TextArea value={inputValue} placeholder={placeholder} onChange={onInputChange} />
      :
      <Input defaultValue={defaultInputValue} value={inputValue} placeholder={placeholder} onChange={onInputChange} />}
  </div>
};

export default CustomInput;

