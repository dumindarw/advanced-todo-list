import React from 'react'

import styled from 'styled-components'

const ShowLists = ({ items, handleSelectChange }) => (
    <Wrapper>
        <Select>
        {items.map(item => {
      const onComplete = e => {
        handleSelectChange(item.id)
      }  
      return <option key={item.id}  onComplete={onComplete} >{item.name}</option>
    })}

      </Select>
    </Wrapper>
)

const Wrapper = styled.div`
    font-size: 24px;
    cursor: pointer;
    margin: 25px;
    alignItems: 'center';
    justifyContent: 'center';
  `

  const Select = styled.select`
  width: 100%;
  height: 35px;
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 14px;
  border: none;
  margin-left: 10px;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

  export default ShowLists