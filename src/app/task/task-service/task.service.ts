import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as moment from 'moment';
import * as R from 'ramda';
import { Task } from './task';

@Injectable()
export class TaskService {
  tasks: Task[] = this.initTasks();

  priorities = [
    { level: 1, color: 'grey' },
    { level: 2, color: 'orange' },
    { level: 3, color: 'red' }];

  filter: string = 'all';
  filteredTasks = this.orderByDate(this.tasks, 'dateStart');
  selectedTask: Task = this.filteredTasks[0];
  selectedTaskClone: Task = this.cloneTask(this.selectedTask);
  tasksSubject: BehaviorSubject<Array<Task>> = new BehaviorSubject(this.filteredTasks);
  taskSubject: BehaviorSubject<Task> = new BehaviorSubject(this.selectedTaskClone);

  isNewTask = false;
  isEditingTask = false;
  isNextPrev = false;

  constructor() {
    console.log('constructing task service.');
  }

  initTasks() {
    let initTasks = [
    { id: 1, title: 'SAC flower hiking on Saturday', description: 'email to ask if still happening, then to Karin', state: true, priority: 1, dateCreated: '2017-04-21T09:28:56.782Z', dateStart: '2017-04-21T09:28:56.782Z', dateEnd: '2017-04-22T09:28:56.782Z', group: 'home' },
    { id: 2, title: 'Sunday hiking with Linda', description: 'Zug hiking or Zurich Zoo? route, plan', state: false, priority: 1, dateCreated: '2017-04-21T09:28:56.782Z', dateStart: '2017-04-21T09:28:56.782Z', dateEnd: '2017-04-23T09:28:56.782Z', group: 'home' },
    { id: 3, title: 'Do something with Ellen', description: 'email reply and plan', state: false, priority: 2, dateCreated: '2017-04-21T09:28:56.782Z', dateStart: '2017-04-21T09:28:56.782Z', dateEnd: '2017-04-30T09:28:56.782Z', group: 'home' },
    { id: 4, title: 'Berlin One Year Party', description: 'place, time to start, planning, people to invite', state: false, priority: 1, dateCreated: '2017-04-21T09:28:56.782Z', dateStart: '2017-04-21T09:28:56.782Z', dateEnd: '2017-06-17T09:28:56.782Z', group: 'home' },
    { id: 5, title: 'call home', description: 'every two weeks', state: false, priority: 1, dateCreated: '2016-11-30T23:28:56.782Z', dateStart: '2016-12-05T23:28:56.782Z', dateEnd: '2016-12-10T23:28:56.782Z', group: 'home' },
    { id: 6, title: 'Anna Party on Saturday', description: 'buy carrots and cucummber', state: false, priority: 1, dateCreated: '2017-04-21T09:28:56.782Z', dateStart: '2017-04-21T09:28:56.782Z', dateEnd: '2017-04-22T09:28:56.782Z', group: 'home' },
    { id: 7, title: 'Reiners University search', description: 'what and where to study, how to get there', state: false, priority: 1, dateCreated: '2017-04-21T09:28:56.782Z', dateStart: '2017-04-21T09:28:56.782Z', dateEnd: '2018-04-21T09:28:56.782Z', group: 'home' },
    { id: 8, title: 'Armins long term goal', description: 'finding the place in Berlin', state: false, priority: 1, dateCreated: '2017-04-21T09:28:56.782Z', dateStart: '2017-04-21T09:28:56.782Z', dateEnd: '2019-04-21T09:28:56.782Z', group: 'home' },
    { id: 9, title: 'Reiners bank account in US', description: 'figure out how to change the name for him', state: false, priority: 1, dateCreated: '2017-04-21T09:28:56.782Z', dateStart: '2017-04-21T09:28:56.782Z', dateEnd: '2017-04-30T09:28:56.782Z', group: 'home' },
    { id: 10, title: 'Today', description: 'makeup appointment at 4pm, Theater Stor at 8pm', state: false, priority: 1, dateCreated: '2017-04-21T09:28:56.782Z', dateStart: '2017-04-21T09:28:56.782Z', dateEnd: '2017-04-21T09:28:56.782Z', group: 'home' }
    ]
    if(!localStorage.getItem('tasks')) {
      localStorage.setItem('tasks', JSON.stringify(initTasks)); 
    } else {
      initTasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return initTasks;
  }

  getPriority() {
    return this.priorities;
  }

  getFilteredTasksObservable() {
    console.log('getFilteredTasksObservable tasksSubject', this.tasksSubject);
    return this.tasksSubject;
  }

  getSelectedTasksObservable() {
    console.log('getSelectedTasksObservable taskSubject', this.taskSubject);
    return this.taskSubject;
  }

  getFilterdTask(type: string, term?: string) {
    this.filter = type;

    this.filteredTasksObservable(term);

    if (this.filteredTasks[0]) {
      this.selectedTask = this.cloneTask(this.filteredTasks[0]);
      this.selectedTaskClone = this.cloneTask(this.selectedTask);
    }

    this.selectedTaskObservable()
  }

  addTask() {
    this.isNewTask = true;
    this.isEditingTask = false;
    this.isNextPrev = false;

    const newTask = new Task();
    newTask.id = this.getLastId(this.tasks) + 1;
    newTask.dateCreated = moment().format();
    newTask.dateStart = moment().format();
    newTask.dateEnd = moment().format();
    newTask.state = false;
    newTask.priority = 1;

    this.selectedTaskClone = this.cloneTask(newTask);

    this.selectedTaskObservable();
  };

  nextTask() {
    console.log('task nav: next');
    this.isNextPrev = true;
    const i = this.indexOfSelectedTask(this.filteredTasks, this.selectedTaskClone.id);
    if (i < this.filteredTasks.length - 1) {
      this.selectedTaskClone = this.cloneTask(this.filteredTasks[i + 1]);
      this.selectedTaskObservable();
    }
  }

  prevTask() {
    console.log('task nav: prev');
    this.isNextPrev = true;
    const i = this.indexOfSelectedTask(this.filteredTasks, this.selectedTaskClone.id);
    if (i > 0) {
      this.selectedTaskClone = this.cloneTask(this.filteredTasks[i - 1]);
      this.selectedTaskObservable();
    }
  }

  selectTask(task) {
    console.log('task list: click on task to select');
    this.isNewTask = false;
    this.isEditingTask = true;
    this.isNextPrev = false;

    this.selectedTaskClone = this.cloneTask(task);
    this.selectedTask = this.cloneTask(task);
    this.selectedTaskObservable();
  }

  deleteTask(taskid) {
    console.log('task list: delete');
    const i = this.indexOfSelectedTask(this.filteredTasks, taskid);

    if (i === 0) {
      this.selectedTaskClone = this.cloneTask(this.filteredTasks[0]);
    } else {
      this.selectedTaskClone = this.cloneTask(this.filteredTasks[i - 1]);
    }
    if (!this.selectedTaskClone) {
      this.addTask();
      console.log('no tasks on filteredTasks', this.selectedTaskClone);
    }

    this.tasks.forEach((task, i) => {
      if (task.id === taskid) { this.tasks.splice(i, 1) }
    })

    this.selectedTaskObservable();
    this.filteredTasksObservable();

    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  save(task) {
    console.log('task detail: save', task);
    if (!task.title) {
      task.error = 'title is required field';
    } else {
      task.dateCreated = this.formatDateSave(task.dateCreated);
      task.dateStart = this.formatDateSave(task.dateStart);
      task.dateEnd = this.formatDateSave(task.dateEnd);

      if (this.isNewTask) {
        this.tasks.push(task);
        this.isNewTask = false;
      } else if (this.isEditingTask) {
        this.tasks[this.indexOfSelectedTask(this.tasks, task.id)] = task;
      }
    }

    this.selectedTask = this.cloneTask(task);
    this.selectedTaskClone = this.cloneTask(task);

    this.filteredTasksObservable();
    this.selectedTaskObservable();

    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  cancel() {
    console.log('task detail: cancel');
    this.selectedTaskClone = this.cloneTask(this.selectedTask);

    this.tasks[this.indexOfSelectedTask(this.tasks, this.selectedTask.id)] = this.selectedTask;

    this.filteredTasksObservable();
    this.selectedTaskObservable();
  }

  filteredTasksObservable(term?) {
    const tasks = R.clone(this.tasks);
    const today = moment().endOf('day').format();
    const week = moment().startOf('day').add(7, 'days').format();
    let filteredTasksUnSorted: Task[];
    if (this.filter === 'today') {
      filteredTasksUnSorted = tasks.filter((item) =>
        item.dateStart <= today && item.dateEnd >= today)
    } else if (this.filter === 'week') {
      filteredTasksUnSorted = tasks.filter((item) =>
        item.dateStart <= week && item.dateEnd >= today)
    } else if (this.filter === 'all') {
      filteredTasksUnSorted = tasks;
    } else if (this.filter === 'active') {
      filteredTasksUnSorted = tasks.filter((item) => item.state === false)
    } else if (this.filter === 'search') {
      filteredTasksUnSorted = tasks.filter((item) => item.title.toUpperCase().indexOf(term.toUpperCase()) !== -1)
    }

    this.filteredTasks = this.orderByDate(filteredTasksUnSorted, 'dateStart');

    this.tasksSubject.next(this.filteredTasks);
  }

  selectedTaskObservable() {
    this.taskSubject.next(this.selectedTaskClone);
  }

  formatDateDisplay(date) {
    return date.substring(0, 10);;
  }

  formatDateSave(date) {
    return moment(date).format();
  }

  indexOfSelectedTask(tasks, selectedtaskid) {
    return R.findIndex(R.propEq('id', selectedtaskid))(tasks);
  }

  cloneTask(task) {
    let clonetask = R.clone(task);

    clonetask.dateCreated = this.formatDateDisplay(clonetask.dateCreated);
    clonetask.dateStart = this.formatDateDisplay(clonetask.dateStart);
    clonetask.dateEnd = this.formatDateDisplay(clonetask.dateEnd);

    return clonetask
  }

  getLastId(tasks) {
    return R.last(tasks).id;
  }

  orderByDate(arr, dateProp) {
    const sort = (a, b) => { return a[dateProp] < b[dateProp] ? -1 : 1; };
    return R.sort(sort, arr)
  }

}
