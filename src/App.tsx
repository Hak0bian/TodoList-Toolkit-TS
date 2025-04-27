
import { ITasks } from './types'
import { useAppDispatch, useAppSelector } from './hooks'
import { getTodos } from './store/slices/todoSlice'
import { useEffect } from 'react'
import axios from 'axios'
import TasksDiv from './components/TasksDiv/TasksDiv'
import Form from './components/Form/Form'
import st from './App.module.css'

function App() {
  const dispatch = useAppDispatch()
  const {tasks} = useAppSelector((state) => state.todoState)

  useEffect(() => {
    axios.get<ITasks[]>('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then((res) => dispatch(getTodos(res?.data)))
      .catch((err) => console.error(err))
  }, [])

  return (
    <section className={st.mainDiv}>
      <Form />
      {
        tasks?.map((task) => (
            <TasksDiv 
              key={task.id}
              id={task.id}
              title={task.title}
              completed={task.completed}
            />
          ))
      }
    </section>
  )
}

export default App