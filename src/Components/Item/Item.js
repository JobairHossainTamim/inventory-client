import { Button } from 'antd';
import React from 'react';
import './item.css';
import { useDispatch } from 'react-redux'

const Item = ({ item }) => {

    const dispatch = useDispatch();

    function addToCart(){
        dispatch({type:'addToCart' , payload : {...item , quantity:1}})
    }



    return (
        <div className='item'>
            <h4 className="itemName">{item.name}</h4>
            <img src={item.image} alt="" height='100' width='100'></img>
            <h4 className="itemPrice"><b>Price :</b> {item.price} $/</h4>
            <div className='d-flex justify-content-end'>
                <Button onClick={() => { addToCart() }}> Add to cart</Button>
            </div>
        </div>
    );
};

export default Item;