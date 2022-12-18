import { Button, Form, Input, message, Modal, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../../Components/DefaultLayout/DefaultLayout';
import './Cart.css';
import { DeleteOutlined, PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { toWordsconver } from './numToText';
import axios from "axios";




const Cart = () => {


    const { cartItems } = useSelector(state => state.rootReducer)
    const [subTotal, setSubTotal] = useState(0);
    const [billChargeModel, setBillChargeModel] = useState(false);
    const dispatch = useDispatch();

    const increaseQuantity = (record) => {
        dispatch({ type: "updateCart", payload: { ...record, quantity: record.quantity + 1 } })
    }
    const dicressQuantity = (record) => {
        if (record.quantity !== 1) {
            dispatch({ type: "updateCart", payload: { ...record, quantity: record.quantity - 1 } })
        }
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Image',
            dataIndex: 'image',
            render: (image, record) => <img src={image} alt="" height='60' width="60"></img>
        },
        {
            title: 'Price',
            dataIndex: 'price'
        },
        {
            title: 'Quantity',
            dataIndex: '_id',
            render: (id, record) => <div>
                <PlusCircleOutlined className='mx-3' onClick={() => { increaseQuantity(record) }} />
                <b>{record.quantity}</b>
                <MinusCircleOutlined className='mx-3' onClick={() => { dicressQuantity(record) }} />
            </div>

        },
        {
            title: 'Action',
            dataIndex: '_id',
            render: (id, record) => <DeleteOutlined onClick={() => { dispatch({ type: 'deleteFromCart', payload: record }) }}></DeleteOutlined>
        }
    ];
    // Subtotal calculation
    useEffect(() => {
        let temp = 0;
        cartItems.forEach((item) => {
            temp = temp + (item.price * item.quantity)
        })
        setSubTotal(temp)
    }, [cartItems])

    // Bill Calculation
    let tax = Number(((subTotal / 100) * 10).toFixed(2));
    let totalAmount = Number(subTotal + tax);


    // Order
    const onFinish = (values) => {
        const reqObject = {
            ...values,
            subTotal,
            cartItems,
            tax: tax,
            totalAmount: totalAmount,
            userId: JSON.parse(localStorage.getItem('pos-user'))._id,
            userName: JSON.parse(localStorage.getItem('pos-user')).name,
        }
        axios
            .post("https://pos-application-yuj3.onrender.com/api/bills/charge-bill", reqObject)
            .then(() => {
                message.success("Bill Charged Successfully");
                dispatch({type:'removeAllData'});

            })
            .catch(() => {
                message.success("Something went wrong");
            });
    }


    return (
        <DefaultLayout>
            <h3>Cart</h3>
            <Table columns={columns} dataSource={cartItems} bordered></Table>
            <hr />
            <div className='d-flex justify-content-end flex-column align-items-end'>
                <div className="subTotal ">
                    <h3>SUB TOTAL : <b>{subTotal}</b> $/-</h3>
                </div>
                <Button type="primary" onClick={() => setBillChargeModel(true)}>Check out</Button>


            </div>

            <Modal title="Charge Bill " visible={billChargeModel} footer={false} onCancel={() => { setBillChargeModel(false) }}>
                <Form layout='vertical' onFinish={onFinish}>
                    <Form.Item name="customerName" label="Customer Name">
                        <Input />
                    </Form.Item>
                    <Form.Item name="customerPhoneNumber" label="Phone Number">
                        <Input />
                    </Form.Item>

                    <Form.Item name="paymentMode" label="Payment Mode">
                        <Select>
                            <Select.Option value="cash">Cash</Select.Option>
                            <Select.Option value="card">Card</Select.Option>
                        </Select>
                    </Form.Item>
                    <div className='charge-bill-amount'>
                        <h5>SubTotal: <b>{subTotal} $</b></h5>
                        <h5>Tax : <b>{tax} $</b></h5>
                        <hr />
                        <h2>Grand TOTAL : {totalAmount} $</h2>
                        <h6>In word :{toWordsconver(totalAmount).toUpperCase()} </h6>
                    </div>
                    <div className='d-flex justify-content-end'>

                        <Button htmlType='submit' type='primary'>Generate Bill </Button>
                    </div>
                </Form>


            </Modal>
        </DefaultLayout>
    );
};

export default Cart;