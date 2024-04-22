import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

export const Item = (props) => {
    return (
        <div className='item'>
           <Link to={`/product/${props.id}`}> <img onClick={window.scrollTo(0,0)} src={props.image} alt="" /> </Link> 
           <Link to={`/product/${props.id}`} style={{textDecoration:'none', color:'black'}}><p>{props.name}</p></Link>
        </div>
    )
}
