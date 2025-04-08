import React from 'react';
import Buttons from './Buttons';
import PropTypes from 'prop-types';
import './ButtonGrid.scss'

ButtonGrid.propTypes = {
    onButtonClick: PropTypes.func.isRequired,
}

function ButtonGrid({onButtonClick}) {
    const buttons = [
        '(', ')', '%', '/',
        '7', '8', '9', '*',
        '4', '5', '6', '-',
        '1', '2', '3', '+',
        '0', '.', 'AC', '=',
    ]

    return (
        <div className='button-grid d-grid'>
            {buttons.map((label,index) => (
                <Buttons key={index}
                    label={label}
                    onClick={onButtonClick}
                />
            ))}
        </div>
    );
}

export default ButtonGrid;