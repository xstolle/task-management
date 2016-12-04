import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as moment from 'moment';
import { Task } from './task';

@Injectable()
export class TaskService {
  static tasks: Task[] = [
    { id: 1, title: 'Christmas plan', description: 'where to go, who to meet and what to buy for gifts', state: true, priority: 2, dateCreated: '2016-11-27T23:28:56.782Z', dateStart: '2016-11-27T23:28:56.782Z', dateEnd: '2016-11-29T23:28:56.782Z', group: 'home' },
    { id: 2, title: 'swimming City', description: 'need to email Patricia to get a date and time, CityBad', state: false, priority: 2, dateCreated: '2016-12-01T23:28:56.782Z', dateStart: '2016-11-29T23:28:56.782Z', dateEnd: '2016-11-29T23:28:56.782Z', group: 'home' },
    { id: 3, title: 'hiking with SAC', description: 'when in December has a tour and if I have no other plan on the day', state: false, priority: 1, dateCreated: '2016-12-03T23:28:56.782Z', dateStart: '2016-11-27T23:28:56.782Z', dateEnd: '2016-11-27T23:28:56.782Z', group: 'home' },
    { id: 4, title: 'Christmas market', description: 'which one to check and make sure go there without dinner', state: false, priority: 1, dateCreated: '2016-12-03T23:28:56.782Z', dateStart: '2016-11-27T23:28:56.782Z', dateEnd: '2016-11-27T23:28:56.782Z', group: 'home' },
    { id: 5, title: 'call home', description: 'every two weeks', state: false, priority: 1, dateCreated: '2016-11-30T23:28:56.782Z', dateStart: '2016-12-04T23:28:56.782Z', dateEnd: '2016-11-27T23:28:56.782Z', group: 'home' },
    { id: 6, title: 'food shopping', description: 'twice a week', state: false, priority: 3, dateCreated: '2016-11-30T23:28:56.782Z', dateStart: '2016-12-03T23:28:56.782Z', dateEnd: '2016-11-27T23:28:56.782Z', group: 'home' },
    { id: 7, title: 'January ski', description: 'gentleman ski club coming to Austria, prepare with ski clothes and tickets', state: false, priority: 1, dateCreated: '2016-12-01T23:28:56.782Z', dateStart: '2016-11-27T23:28:56.782Z', dateEnd: '2016-11-27T23:28:56.782Z', group: 'city' },
    { id: 8, title: 'hot pot', description: 'for new years party, we are going to have a hot pot!', state: false, priority: 1, dateCreated: '2016-12-04T23:28:56.782Z', dateStart: '2016-11-27T23:28:56.782Z', dateEnd: '2016-11-27T23:28:56.782Z', group: 'city' },
    { id: 9, title: 'trip to Berlin', description: 'cream, cookies, ...', state: false, priority: 1, dateCreated: '2016-12-03T23:28:56.782Z', dateStart: '2016-12-03T23:28:56.782Z', dateEnd: '2016-11-27T23:28:56.782Z', group: 'city' }
  ];

  static priorities = [
    { level: 1, color: 'grey' },
    { level: 2, color: 'orange' },
    { level: 3, color: 'red' }];

  static filter: string = 'all';
  static filteredTasks: Task[] = TaskService.tasks.slice();
  static selectedTask: Task = TaskService.filteredTasks[0];
  static selectedTaskClone: Task = TaskService.cloneTask(TaskService.selectedTask); //Object.assign({}, TaskService.filteredTasks[0]);

  static tasksSubject: BehaviorSubject<Array<Task>> = new BehaviorSubject(TaskService.filteredTasks);
  static taskSubject: BehaviorSubject<Task> = new BehaviorSubject(TaskService.selectedTaskClone);

  static isNewTask = false;
  static isEditingTask = false;
  static isNextPrev = false;

  constructor() {
    console.log('constructing task service.');
  }

  static getPriority() {
    return this.priorities;
  }

  static getFilteredTasksObservable() {
    console.log('getFilteredTasksObservable tasksSubject', this.tasksSubject);
    return this.tasksSubject;
  }

  static getSelectedTasksObservable() {
    console.log('getSelectedTasksObservable taskSubject', this.taskSubject);
    return this.taskSubject;
  }

  static getFilterdTask(type: string, term?: string) {
    this.filter = type;

    this.filteredTasksObservable(term);

    if (this.filteredTasks[0]) {
      console.log('filteredTasks[0]', this.filteredTasks[0]);
      this.selectedTask = this.cloneTask(this.filteredTasks[0]);
      this.selectedTaskClone = this.cloneTask(TaskService.selectedTask);
    }

    this.selectedTaskObservable()
  }

  static addTask() {
    this.isNewTask = true;
    this.isEditingTask = false;
    this.isNextPrev = false;

    this.selectedTaskClone = new Task();
    this.selectedTaskClone.id = this.getLastId(this.tasks) + 1;
    this.selectedTaskClone.dateCreated = moment().format();
    this.selectedTaskClone.dateStart = moment().format();
    this.selectedTaskClone.dateEnd = moment().format();
    this.selectedTaskClone.state = false;
    this.selectedTaskClone.priority = 1;

    this.selectedTaskObservable();
  };

  static nextTask() {
    console.log('task nav: next');
    this.isNextPrev = true;
    const i = this.indexSelectedTask(this.filteredTasks, this.selectedTaskClone.id);
    if (i < this.filteredTasks.length - 1) {
      this.selectedTaskClone = this.cloneTask(this.filteredTasks[i + 1]);
      this.selectedTaskObservable();
    }
  }

  static prevTask() {
    console.log('task nav: prev');
    this.isNextPrev = true;
    const i = this.indexSelectedTask(this.filteredTasks, this.selectedTaskClone.id);
    if (i > 0) {
      this.selectedTaskClone = this.cloneTask(this.filteredTasks[i - 1]);
      this.selectedTaskObservable();
    }
  }

  static selectTask(task) {
    console.log('task list: click on task to select');
    this.isNewTask = false;
    this.isEditingTask = true;
    this.isNextPrev = false;

    this.selectedTaskClone = this.cloneTask(task);
    this.selectedTask = this.cloneTask(task);
    this.selectedTaskObservable();
  }

  static deleteTask(taskid) {
    console.log('task list: delete');
    const i = this.indexSelectedTask(this.filteredTasks, taskid);

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
  }

  static save(task) {
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
        this.tasks[this.indexSelectedTask(this.tasks, task.id)] = task;
      }
    }

    this.selectedTask = this.cloneTask(task);
    this.selectedTaskClone = this.cloneTask(task);

    this.filteredTasksObservable();
    this.selectedTaskObservable();
  }

  static cancel() {
    console.log('task detail: cancel');
    this.selectedTaskClone = this.cloneTask(this.selectedTask);

    this.tasks[this.indexSelectedTask(this.tasks, this.selectedTask.id)] = this.selectedTask;

    this.filteredTasksObservable();
    this.selectedTaskObservable();
  }

  static filteredTasksObservable(term?) {
    const tasks = this.tasks.slice();
    const today = moment().format('L');
    const week = moment().startOf('day').add(7, 'days').format('L');
    if (this.filter === 'today') {
      this.filteredTasks = tasks.filter((item) => moment.utc(item.dateCreated).format('L') === today)
    } else if (this.filter === 'week') {
      this.filteredTasks = tasks.filter((item) => moment.utc(item.dateCreated).format('L') >= today
        && moment.utc(item.dateCreated).format('L') <= week)
    } else if (this.filter === 'all') {
      this.filteredTasks = tasks;
    } else if (this.filter === 'active') {
      this.filteredTasks = tasks.filter((item) => item.state === false)
    } else if (this.filter === 'search') {
      this.filteredTasks = tasks.filter((item) => item.title.toUpperCase().indexOf(term.toUpperCase()) !== -1)
    }

    this.tasksSubject.next(this.filteredTasks);
  }

  static selectedTaskObservable() {
    this.taskSubject.next(this.selectedTaskClone);
  }

  static formatDateDisplay(date) {
    return date.substring(0, 10);;
  }

  static formatDateSave(date) {
    return moment(date).format();
  }

  static indexSelectedTask(tasks, selectedtaskid) {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === selectedtaskid) {
        return i;
      }
    }
  }

  static cloneTask(task) {
    let clonetask = Object.assign({}, task);

    clonetask.dateCreated = this.formatDateDisplay(clonetask.dateCreated);
    clonetask.dateStart = this.formatDateDisplay(clonetask.dateStart);
    clonetask.dateEnd = this.formatDateDisplay(clonetask.dateEnd);

    return clonetask
  }

  static getLastId(tasks) {
    return tasks.map((task) => task.id)
      .reduce((p, v) => (p > v ? p : v));
  }

}
