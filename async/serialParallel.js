const createTask = (name, delay, shouldFail = false) => {
  return () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldFail) {
          reject(new Error(`${name} : rejected`));
        } else {
          resolve(`${name} rresolve`);
        }
      }, delay);
    });
  };
};

const resolveParallel = async (tasks) => {
  const runningTask = tasks.map((task) =>
    task()
      .then((mes) => ({ isPassed: true, mes }))
      .catch((mes) => ({ isPassed: false, mes: mes.message }))
  );

  const resolvedTask = await Promise.all(runningTask);

  return resolvedTask.reduce((response, taskDetail) => {
    if (taskDetail.isPassed) {
      response.results.push(taskDetail.mes);
    } else {
      response.errors.push(taskDetail.mes);
    }
    return response;
  }, { results: [], errors: [] });
};

const resolveSerially = async (tasks) => {
  const errors = [];
  const results = [];
  for (const task of tasks) {
    try {
      await task()
        .then((mes) => {
          results.push(mes);
        });
    } catch (mes) {
      errors.push(mes.message);
    }
  }
  return { errors, results };
};

const taskRawData = [
  {
    name: "a",
    delay: 500,
    shouldFail: true,
  },
  {
    name: "b",
    delay: 500,
    shouldFail: false,
  },
  {
    name: "c",
    delay: 500,
    shouldFail: true,
  },
  {
    name: "d",
    delay: 500,
    shouldFail: true,
  },
  {
    name: "e",
    delay: 500,
    shouldFail: false,
  },
  {
    name: "f",
    delay: 500,
    shouldFail: true,
  },
];

const tasks = taskRawData.map(({ name, shouldFail, delay }) =>
  createTask(name, delay, shouldFail)
);

const data = await resolveSerially(tasks);
console.log(data);
console.log("Runnning parallel");
const data2 = await resolveParallel(tasks);
console.log(data2);
