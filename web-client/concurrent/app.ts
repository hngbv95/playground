// Sample how to run concurrent task in js
// concurrent !== parralel
// to achive parralel, another thread must be spawn using worker

function initTask(time: number) {
  return async () => {
    return new Promise((res) => {
      console.log('start ', time)
      setTimeout(() => {
        console.log('done ', time)
        res(null)
      }, time * 1000)
    }) 
  }
}

function genTasks(taskNums, maxTime) {
 const tasks: (() => Promise<unknown>)[] = [];
 
 for(let i = 0; i< taskNums; i++) {
  let taskTime = Math.random() * maxTime
  console.log(taskTime)
  let task = initTask(taskTime)
  tasks.push(task)
 }

 return tasks
}

function init() {
  let tasks = genTasks(10, 20)

  function getTask() {
    return tasks.shift()
  }

  run(3, getTask)
}

function run(concurrent: number, getTask: () => (() => Promise<unknown>) | undefined) {
  for (let i = 0; i< concurrent; i++) {
    const task = getTask()
    if (!task) {
      console.log('finish')
      return
    }

    task().then(() => { run(1, getTask) })
  }
}

init()