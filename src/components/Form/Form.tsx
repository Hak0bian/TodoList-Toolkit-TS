import { changeText, clearAllTasks } from '../../store/slices/todoSlice'
import { addTaskThunk } from '../../store/slices/todoThunks'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useState } from 'react'
import st from "./Form.module.css"

const Form = () => {
    const dispatch = useAppDispatch()
    const {text, tasks, loading, error} = useAppSelector((state) => state.todoState)
    const [inputError, setInputError] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeText(event.target.value))
        setInputError("");
    }

    const handleAddTask = () => {
        const newTask = {
            id: Date.now(),
            title: text,
            completed: false
        }

        if(text.trim()){
            dispatch(addTaskThunk(newTask))
        }else {
            setInputError("Input field is required !");
        }
    } 

    const clearAll = () => {
        dispatch(clearAllTasks())
    }

    return (
        <div>
            <div className={st.formDiv}>
                <input
                    value={text}
                    onChange={handleChange}
                    placeholder="Add Your Task"
                    className={`${st.inp} ${inputError ? st.error : ""}`}
                />
                <button onClick={handleAddTask} className={st.btn}>Add Task</button>
                <button onClick={clearAll} className={st.clearBtn}>Clear All</button>
            </div>
            {inputError && <p className={st.errorText}>{inputError}</p>}

            <div className={st.taskCount}>
                <h3>Tasks - </h3>
                <h3>{tasks.length}</h3>
                
                { loading &&  <h3 className={st.load}>Loading...</h3> }
                { error &&  <h3 className={st.err}> {error} </h3> }
            </div>
        </div>
    )
}

export default Form