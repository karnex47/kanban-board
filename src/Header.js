import React, { createRef } from 'react';
import './Header.scss'

const Header = ({ columns, setColumns }) => {
    const input = createRef();
    const addColumn = () => {
        const newColumn = {
            name: input.current.value || 'Default',
            id: Date.now(),
            tasks: [],
        }
        setColumns(columns.concat(newColumn));
    };
    return (
        <div className="header">
            <input ref={input} className="column-name" type="text"></input>
            <button className="add-column" onClick={addColumn}>+</button>
        </div>
    )
}

export default Header;