import { addParenTaskToDB, addChildTaskToDB } from '@/lib/db/db';
/**
 * @param {{ key: string; type: string; }} e
 * @param {any} task
 * @param {(arg0: any) => void} cb
 */
function newTask(e, task, cb) {
  addParenTaskToDB(task).then((data) => {
    data.tasks = [];
    cb(data);
  });
  return true;
}

/**
 * @param {{ key: string; type: string; }} e
 * @param {any} task
 * @param {(arg0: any) => void} cb
 */
function newChildTask(e, task, cb) {
  addChildTaskToDB(task).then((data) => {
    console.log(data);
    cb(data);
  });
  return true;
}

/**
 * @param {string} string
 */
function capitalize(string) {
  const newString = string[0].toUpperCase()+string.substring(1,);
  return newString;
}

export { newTask, capitalize, newChildTask };