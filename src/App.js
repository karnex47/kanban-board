import React, { useState } from 'react';
import { clone } from 'lodash';
import Column from './Column';
import Header from './Header';
import { arrayMove } from './utils';
import data from './data.json';

import './App.scss';

const App = () => {
  const [columns, setColumns] = useState(data);
  const [colFrom, setColFrom] = useState(-1);
  const [colTo, setColTo] = useState(-1);
  const [taskFrom, setTaskFrom] = useState([-1, -1]);
  const [taskTo, setTaskTo] = useState([-1, -1]);
  const updateData = data => {
    // Handle database stuff here
    setColumns(data)
  }
  const moveColumn = () => {
    if (colFrom !== colTo) {
      const newcols = arrayMove(clone(columns), colFrom, colTo);
      updateData(newcols);
    }
    setColFrom(-1);
    setColTo(-1);
  }
  const moveTask = () => {
    const [formTask, fromCol] = taskFrom;
    const [toTask, toCol] = taskTo;
    if (formTask !== toTask || fromCol !== toCol) {
      const newCols = clone(columns);
      if (fromCol === toCol) {
        arrayMove(newCols[fromCol].tasks, formTask, toTask);
        updateData(newCols);
      } else {
        const fromTasks = newCols[fromCol].tasks;
        const task = fromTasks[formTask];
        fromTasks.splice(formTask, 1);
        const toTasks = newCols[toCol].tasks;
        toTasks.splice(toTask, 0, task);
        newCols[fromCol].tasks = fromTasks;
        newCols[toCol].tasks = toTasks;
        updateData(newCols);
      }
    }
  }
  const setColumnName = (name, index) => {
    const newCols = clone(columns);
    newCols[index].name = name;
    updateData(newCols);
  }
  const addNewTask = (index) => {
    const newCols = clone(columns);
    newCols[index].tasks.push({ title: `New task ${newCols[index].tasks.length + 1}`, id: Date.now() });
    updateData(newCols);
  }
  const onEditTask = (value, columnIndex, taskIndex) => {
    const newCols = clone(columns);
    newCols[columnIndex].tasks[taskIndex].title = value;
    updateData(newCols);
  }
  const onRemoveTask = (columnIndex, taskIndex) => {
    const newCols = clone(columns);
    newCols[columnIndex].tasks.splice(taskIndex, 1);
    updateData(newCols);
  }
  const onRemoveColumn = (columnIndex) => {
    const newCols = clone(columns);
    newCols.splice(columnIndex, 1);
    updateData(newCols);
  }
  return (
    <div className="App">
      <Header columns={columns} setColumns={updateData} />
      <div className="columns">
        {columns.map((column, index) => (
          <Column
            data={column}
            key={column.id}
            columnIndex={index}
            colFrom={colFrom}
            colTo={colTo}
            setColFrom={setColFrom}
            setColTo={setColTo}
            moveColumn={moveColumn}
            setTaskFrom={setTaskFrom}
            setTaskTo={setTaskTo}
            moveTask={moveTask}
            setColumnName={setColumnName}
            addNewTask={addNewTask}
            onEditTask={onEditTask}
            onRemoveTask={onRemoveTask}
            onRemoveColumn={onRemoveColumn}
          />
        )
        )}
      </div>
    </div>
  );
}

export default App;
