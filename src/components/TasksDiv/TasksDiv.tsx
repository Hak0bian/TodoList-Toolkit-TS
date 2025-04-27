import { toggleComplete, updateTask, removeTaskAction } from "../../store/slices/todoSlice";
import { TasksDivProps } from "../../types"
import { useAppDispatch } from "../../hooks";
import { useState } from "react";
import { LuBookmarkCheck } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import st from "./TasksDiv.module.css"

const TasksDiv = ({id, title, completed} : TasksDivProps) => {
    const dispatch = useAppDispatch()
    const [edit, setEdit] = useState<boolean>(true);
    const [newTitle, setNewTitle] = useState<string>(title);
    const [removed, setRemoved] = useState<boolean>(false);

    const addNewTitle = () => {
        if (newTitle.trim() && newTitle !== title) {
            dispatch(updateTask({ id, newTitle }));
        }
        setEdit(true);
    };

    const completedTask = (id: number) => {
        edit && dispatch(toggleComplete(id));
    }

    const removeTask = (id: number) => {
        dispatch(removeTaskAction(id))
    }

    const removeByAnimation = () => {
        setRemoved(true);
        setTimeout(() => {
            removeTask(id);
        }, 1000);
    };

    return (
        <div key={id} className={`${st.task} ${removed ? st.removeAnimation : ""}`}>
            {edit
                ? (
                    <p className={completed ? st.line : ""} onDoubleClick={() => setEdit(false)}>
                        {title}
                    </p>
                ) : (
                    <input
                        className={st.newInp}
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                )}

            <div className={st.iconsDiv}>
                <button onClick={addNewTitle} className={st.save}>
                    <LuBookmarkCheck />
                </button>
                <button onClick={() => completedTask(id)} className={st.check}>
                    <FaCheck />
                </button>
                <button onClick={removeByAnimation} className={st.delete}>
                    <IoCloseSharp />
                </button>
            </div>
        </div>
    )
}

export default TasksDiv