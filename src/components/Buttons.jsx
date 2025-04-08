import React from 'react';
import PropTypes from 'prop-types';
import './ButtonGrid.scss'
Buttons.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

function Buttons({label, onClick}) {
    return (
        <button className='cal-btn btn btn-dark '
            onClick={() => onClick(label)}
        >
            {label}
        </button>
    );
}

export default Buttons;