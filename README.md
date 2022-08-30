# Project Planner
Increase your productivity with new methodize of a task management. Break up your project into many subtasks and organize them into a tree-like entity. Divide and Conquer!
## Problem
If you've tried using task planners to organize work on your personal project, you may not have felt sufficiently supported. I haven't. Because all the personal planners in this world that I've tried are good for making a grocery list or reminding me to clean up, but not for organizing project work.
Okay, there are a lot of big, flexible, customizable organizers out there, but they're usually designed for teamwork. And that's not what I need.
## My solution
Project Planer is based on a simple philosophical idea - "All tasks in this world are actually subtasks". This is a very simple idea to understand, but not obvious enough.
If you've ever tried to answer the question of what the meaning of life is and ended up wanting to hang yourself, you probably haven't built a sufficient chain of sub-questions.
It is impossible to get the task of "living life" right. But it is possible to break it down into an infinite number of subtasks. Agree, the task "to drink coffee" sounds much easier than "to live life," but the person who was able to formulate it has already made a step forward.
Task splitting is the only problem my Project Planner solves. And, in my opinion, the only necessary one.
## Architecture
The UI of the application consists of only two elements - a task and a list of subtasks. The user can create, edit, delete a task and associate new subtasks to it.
All the data of the application stores in the IndexedDB. Synchronization with other devices is not expected.
## What about the code?
The application does not use any frameworks or libraries for UI rendering and state management.
The application uses a component approach to rendering and some specific abstractions for state management, such as Map, Visual Map, Branch. To understand the code base, I recommend that you study the documentation first.
## Available scripts

Create the final bundle (using webpack):
```
npm run build
```
Run development server (using webpack serve):
```
npm run dev
```
  Generate documentation (using JSDoc):
```
npm run docs
```
