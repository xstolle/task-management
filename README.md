Task Management

demo on github page
https://xwilluhn.github.io/task-management/dist

--> App
  --> Task
    --> (Task Data Service)
    : Task Nav
    , Task List
    , Task Detail

install all necessary packages:
npm install

run the application: 
npm run

build the application: 
npm run build:dev

Task Management is a single page web application. The Task management component is consist of three components: Task Nav component, Task List component and Task Detail component. The Task Service provides all data access from the components. Code can be found under src/app/task

run the application in Google Chrome and Firefox.



Task Management Overview
A single page that shows a list of all tasks, as well as details of the currently selected task:

A task should contain at least the following data:
title
description
state (“done”/”open”/…)
 
The user should be able to do:
create new tasks
edit existing tasks
mark tasks as “done”
 

