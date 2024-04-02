export const addTask = (task) => ({
  type: 'ADD_TASK',
  payload: task
});

export const updateTask = (task) => ({
  type: 'UPDATE_TASK',
  payload: task
});

export const deleteTask = (taskId) => ({
  type: 'DELETE_TASK',
  payload: taskId
});
