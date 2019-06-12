import React from 'react'
import { Provider, Subscribe } from 'unstated'

import styled from 'styled-components'

import TodosContainer from './store'

import TodoList from './components/TodoList'
import FilterList from './components/FilterList'
import AddTodo from './components/AddTodo'
import ShowLists from './components/ShowLists'

function App () {
  return (
    <Provider>
      <Wrapper>
        <Subscribe to={[TodosContainer]}>
          {todos => {
         
            const lists = todos.getLists()
            const list = todos.getList(0)
         
            const filterList = [{id: 1, text: "All"}, {id: 2, text: "Completed"}, {id: 3, text: "Active"}]
            return (
              <TodosWrapper>
                <FilterList items={filterList} toggleFilter={todos.toggleFilter}/>
                <ShowLists items={lists} toggleSelectList={todos.toggleSelectList}/>
                <AddTodo onAddTodo={todos.createTodo} />
                <TodoList items={list} toggleComplete={todos.toggleComplete} />
              </TodosWrapper>
            )
          }}
        </Subscribe>
      </Wrapper>
    </Provider>
  )
}

const Wrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
`

const TodosWrapper = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
`

export default App
