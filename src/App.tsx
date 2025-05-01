import { useAppDispatch, useAppSelector } from './hooks'
import { getTodosThunk } from './store/slices/todoThunks'
import { useEffect } from 'react'
import TasksDiv from './components/TasksDiv/TasksDiv'
import Form from './components/Form/Form'
import st from './App.module.css'

function App() {
  const dispatch = useAppDispatch()
  const {tasks} = useAppSelector((state) => state.todoState)

  useEffect(() => {
    dispatch(getTodosThunk())
  }, [])

  return (
    <section className={st.mainDiv}>
      <Form/>
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