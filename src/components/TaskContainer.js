import Button from "./Button";
import { useState } from "react";
import Input from "./Input";
const TaskContainer = ({
  taskName,
  type,
  id,
  primaryButtonClick,
  secondaryButtonClick,
  updateTask,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [updatedTask, setUpdateTask] = useState(taskName);

  const changeTaskName = () => {
    updateTask(id, updatedTask);
    setUpdateTask("");
    setIsEdit(false);
  };

  return (
    <div className="task-container">
      {isEdit && (
        <>
          <Input value={updatedTask} setTaskNameFunc={setUpdateTask} />
          <Button buttonClass="save" handleClick={changeTaskName} />
          <Button buttonClass="cancel" handleClick={() => setIsEdit(false)} />
        </>
      )}
      {type === "pending" && !isEdit && (
        <>
          <p>{taskName}</p>
          <Button
            buttonClass="done"
            handleClick={() => primaryButtonClick(id)}
          />
          <Button buttonClass="edit" handleClick={() => setIsEdit(true)} />
        </>
      )}
      {type === "completed" && (
        <>
          <p>{taskName}</p>

          <Button
            buttonClass="undo"
            handleClick={() => primaryButtonClick(id)}
          />
          <Button
            buttonClass="delete"
            handleClick={() => secondaryButtonClick(id)}
          />
        </>
      )}
    </div>
  );
};
export default TaskContainer;
