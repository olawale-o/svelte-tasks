function newTask(e, field, task, cb) {
  if ((e.key === 'Enter' || e.type === 'click') && field?.trim()) {
    cb(task);
    return true
  }
  return false;
}

export { newTask };