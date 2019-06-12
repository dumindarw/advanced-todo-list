import { Container } from 'unstated'

const defaultState = {
  lists: [
    {
      list: [
        {
          id: 1,
          completed: false,
          text: 'Read README'
        },
        {
          id: 2,
          completed: false,
          text: 'Add one todo'
        },
        {
          id: 3,
          completed: false,
          text: 'Add filters'
        },
        {
          id: 4,
          completed: false,
          text: 'Add multiple lists'
        },
        {
          id: 5,
          completed: false,
          text: 'Optional: add tests'
        }
      ]
    }
  ]
}

class TodosContainer extends Container {
  constructor(props) {
    super(props)

    this.state = this.readStorage()
  }

  readStorage() {
    if (window && window.localStorage) {
      const state = window.localStorage.getItem('appState')
      if (state) {
        return JSON.parse(state)
      }
    }

    return defaultState
  }

  syncStorage() {
    if (window && window.localStorage) {
      const state = JSON.stringify(this.state)
      console.log(state);
      
      window.localStorage.setItem('appState', state)
    }
  }

  getList() {
    return this.state.lists[0].list;
  }

  toggleComplete = async id => {
    const item = this.state.lists[0].list.find(i => i.id === id)
    const completed = !item.completed

    // We're using await on setState here because this comes from unstated package, not React
    // See: https://github.com/jamiebuilds/unstated#introducing-unstated
    await this.setState(state => {
      const list = state.lists[0].list.map(item => {
        console.log(item);
        
        if (item.id !== id) return item
        return {
          ...item,
          completed
        }
      })
      let lists  = {};
      lists[0] = {list: list};
      return { lists  }
      //return { list }

    })

    this.syncStorage()
  }

  toggleFilter = async id => {

    this.state = this.readStorage()

    await this.setState(state => {
      const list = state.lists[0].list.filter(todos => {
        if (id === 2)
          return todos.completed === true;
        else if (id === 3)
          return todos.completed === false;
        else
          return todos;
      })
      let lists  = {};
      lists[0] = {list: list};
      return { lists  }

      //return { list }
    })

  }

  createTodo = async text => {
      
    await this.setState(state => {
      const item = {
        completed: false,
        text,
        id: state.lists[0].list.length + 1
      }

      const list = state.lists[0].list.concat(item)

      let lists  = {};
      lists[0] = {list: list};
      return { lists  }
    })

    this.syncStorage()
  }
}

export default TodosContainer
