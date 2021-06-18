import React, { useState } from 'react';

const EditableText = ({ children, onEdit, className }) => {
    const [showForm, setShowForm] = useState(false);
    const [value, setValue] = useState(children);
    const onSubmit = () => {
        if (value !== children) {
            onEdit(value);
        }
        setShowForm(false);
    }
    const onChange = event => {
        setValue(event.target.value)
    }
    const onEditClick = () => {
        setShowForm(true);
    }
    if (showForm) {
        return (
            <form onSubmit={onSubmit}>
                <input type="text" name="edit" onChange={onChange} defaultValue={value}></input>
            </form>
        )
    } else {
        return <div onDoubleClick={onEditClick} className={className}>{value}</div>
    }
}

export default EditableText;