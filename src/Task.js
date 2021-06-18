import React, { createRef } from 'react';
import EditableText from './EditableText';
import { hasClass } from './utils';
import './Task.scss';

const Task = ({ data, taskIndex, setTaskMove, setTaskDragPosition, moveTask, onEditTask, onRemoveTask }) => {
    const ref = createRef();
    const onDragStart = (event) => {
        if (hasClass(event.target, 'task')) {
            setTaskMove(taskIndex);
        }
    }
    const onDragEnd = () => {
        moveTask();
    }

    const onDragOver = (event) => {
        event.preventDefault();
        if (hasClass(event.target, 'task')) {
            setTaskDragPosition(taskIndex);
        }
    }
    return (
        <div draggable ref={ref} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver} className="task">
            <EditableText onEdit={onEditTask}>{data.title}</EditableText>
            <button onClick={onRemoveTask} className="remove-task">x</button>
        </div>
    )
}

export default Task;