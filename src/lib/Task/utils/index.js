/**
 * @param {{ key: string; type: string; }} e
 * @param {any} task
 * @param {(arg0: any) => void} cb
 */
function newTask(e, task, cb) {
  cb(task);
  return true;
}

/**
 * @param {string} string
 */
function capitalize(string) {
  const newString = string[0].toUpperCase()+string.substring(1,);
  return newString;
}

export { newTask, capitalize};