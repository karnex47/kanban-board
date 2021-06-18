import React, { useState } from 'react';
import className from 'classnames';
import Task from './Task';
import EditableText from './EditableText';
import { hasClass } from './utils';
import './Column.scss';

const Column = ({ data, columnIndex, setColFrom, setColTo, colFrom, colTo, moveColumn, setTaskFrom, setTaskTo, moveTask, setColumnName, addNewTask, onEditTask, onRemoveTask, onRemoveColumn }) => {
    const [taskDragPosition, setTaskDragPosition] = useState(data.tasks.length);
    const onDragLeave = () => {
        if (colFrom !== -1) {
            setColTo(columnIndex);
        }
    }
    const onDragOver = (event) => {
        event.preventDefault();
        if (colFrom === -1) {
            setTaskTo([taskDragPosition, columnIndex]);
        }
    }
    const onDragStart = (event) => {
        if (hasClass(event.target, 'column')) {
            setColFrom(columnIndex);
        }
    }
    const onDragEnd = () => {
        if (colFrom !== -1) {
            moveColumn();
        }
    }
    const setTaskMove = (taskIndex) => setTaskFrom([taskIndex, columnIndex]);

    const classNames = className('column', {
        dragging: colFrom === columnIndex,
        'drag-left': colTo === columnIndex && colFrom > columnIndex,
        'drag-right': colTo === columnIndex && colFrom < columnIndex,
    })
    return (
        <div className={classNames} draggable onDragLeave={onDragLeave} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
            <div className="title-section">
                <EditableText onEdit={name => setColumnName(name, columnIndex)} className="title">{data.name}</EditableText>
                <div className="actions">
                    <button className="add-task" onClick={() => addNewTask(columnIndex)}>+</button>
                    <button className="remove-column" onClick={() => onRemoveColumn(columnIndex)}>x</button>
                </div>
            </div>
            <div className="tasks">
                {data.tasks.map((task, index) => (
                    <Task
                        data={task}
                        key={task.id}
                        taskIndex={index}
                        setTaskMove={setTaskMove}
                        setTaskDragPosition={setTaskDragPosition}
                        moveTask={moveTask}
                        onEditTask={(value) => onEditTask(value, columnIndex, index)}
                        onRemoveTask={() => onRemoveTask(columnIndex, index)}
                    />
                )
            )}
            </div>
        </div>
    )
}

export default Column;