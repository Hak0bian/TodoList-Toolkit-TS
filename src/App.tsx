
import { useAppSelector } from './hooks'
import TasksDiv from './components/TasksDiv/TasksDiv'
import Form from './components/Form/Form'
import st from './App.module.css'

function App() {
  const {tasks} = useAppSelector((state) => state.todoState)

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