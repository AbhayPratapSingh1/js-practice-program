const createTask = (name, duration) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ finishedTask: name, duration }), duration);
  });
};

const doTasks = async (tasks) => {
  for (let index = 0; index < tasks.length; index++) {
    console.log("Taks:", tasks[index]);
  }
};

const makeDummyTasks = (tasksDetail) => {
  const tasks = [];
  for (let index = 0; index < tasksDetail.length; index++) {
    const asyncTasks = tasksDetail[index];
    const currentTask = [];
    for (let idx = 0; idx < asyncTasks.length; idx++) {
      const task = createTask(asyncTasks[idx].name, asyncTasks[idx].duration);
      currentTask.push(task);
    }
    tasks.push(currentTask);
  }
  return tasks;
};

const tasks = makeDummyTasks(tasksDetails);

// console.log({ tasks });

// doTasks(tasks);
// console.log("hee");
