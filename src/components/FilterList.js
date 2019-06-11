import React from 'react'

import styled from 'styled-components'

import FilterItem from './FilterItem'

const FilterList = ({ items, toggleFilter }) => (
  <Wrapper>
    {items.map(item => {
      const  handleSelectChange = async e => {
        let data = await toggleFilter(item.id);
        
        console.log(data)
      }

      return <FilterItem key={item.id} {...item} handleSelectChange={handleSelectChange}/>
    })}
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export default FilterList