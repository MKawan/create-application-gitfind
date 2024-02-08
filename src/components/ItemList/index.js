import React from 'react';
import './styles.css';

export default function ItemList({title, decription}) {
  return (
    <div className='item-list'>
        <strong>{title}</strong>
        <p>{decription}</p>
    </div>
  )
}
