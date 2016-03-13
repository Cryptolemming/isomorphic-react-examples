import { createStore } from 'redux'
import todoApp from './reducers'
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from './actions'

let store = createStore(todoApp, window.STATE_FROM_SERVER)

console.log(store.getState())

let unsubscribe = store.subscribe(() => 
	console.log(store.getState())
)

store.dispatch(addTodo('Learn about actions'))
store.dispatch(addTodo('Learn about reducers'))
store.dispatch(addTodo('Learn about store'))
store.dispatch(completeTodo(0))
store.dispatch(completeTodo(1))
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))

unsubscribe()