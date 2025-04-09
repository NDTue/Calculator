import PropTypes from 'prop-types';
import React, { useState } from 'react';

Display.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func,
    history: PropTypes.array,   // lưu lịch sử kết quả
    onClearHistory: PropTypes.func, // Xóa lịch sử
    showHistory: PropTypes.bool, // cập nhật lại phía App.jsx
    toggleHistory: PropTypes.func, // toggle bật/tắt danh sách
}

function Display({ value, onChange, onKeyDown = null, history = [], onClearHistory = null, showHistory = false, toggleHistory = null }) {

    // Ngăn sự kiện click từ input/icon lan ra ngoài
    const stopPropagation = (e) => e.stopPropagation()


    return (
        <>
            <div className='form-floating position-relative'
                onClick={stopPropagation}
            >
                <input id="floatingInput"
                    className='bg-light rounded form-control border border-2 mb-2 text-end'
                    type='text'
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    onKeyDown={onKeyDown}
                />

                {/* Icon history */}
                <div className='history-icon' onClick={toggleHistory} >
                    <i className="fa-solid fa-clock-rotate-left"></i>
                </div>

                {/* Hiển thị ds history nếu showHistory = true */}
                {showHistory && (
                    <div className='display-history'>
                        <ul className='list-unstyled mt-2'>
                            {history.length == 0 ? (
                                <li>Chưa có lịch sử</li>
                            ) : (// slice().reverse() để hiển thị lịch sử từ mới nhất đến cũ nhất
                                history.slice().reverse().map((result, index) => (
                                    <li className=''
                                        key={index}
                                    >
                                        {result}
                                    </li>
                                ))
                            )}
                            <span className='text-bg-warning btn btn-sm rounded px-2 float-end me-1 mb-1 mt-3'
                                onClick={onClearHistory}
                            >Clear</span>
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}

export default Display;