import Wrapper from "../components/Wrapper";
import TaskContainer from "../components/TaskContainer";
const TasksContainer = ({
  tasksList,
  type,
  primaryButtonClick,
  secondaryButtonClick,
  updateTask,
}) => {
  // console.log("tasksList", tasksList);
  const title = type === "completed" ? "Completed Tasks" : "Pending Tasks";
  return (
    <Wrapper>
      <h3>{title}</h3>
      {tasksList &&
        tasksList.map((task) => (
          <TaskContainer
            key={task.taskid}
            id={task.taskid}
            taskName={task.title}
            type={type}
            primaryButtonClick={primaryButtonClick}
            secondaryButtonClick={secondaryButtonClick}
            updateTask={updateTask}
          />
        ))}
    </Wrapper>
  );
};
export default TasksContainer;
