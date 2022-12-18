import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import DefaultLayout from './../../Components/DefaultLayout/DefaultLayout';
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Table, Form, Select, message } from 'antd';
import "./Item.css";

const Items = () => {
    const [itemData, setItemData] = useState([])
    const [modalPopup, setModelPopup] = useState(false);
    const [editingItems, setEditingItems] = useState(null);

    const dispatch = useDispatch();

    // get All Item
    const getAllitem = async () => {
        dispatch({ type: 'showLoading' })
        await axios.get('https://pos-application-yuj3.onrender.com/api/items/get-all-items').then((response) => {
            setItemData(response.data);
            dispatch({ type: 'hideLoading' })
        }).catch((error => {

            dispatch({ type: 'hideLoading' })
        }))
    }

    useEffect(() => {
        getAllitem()
    }, []);



    // Save item
    const onFinish = (values) => {
        dispatch({ type: 'showLoading' })

        // Axios confiq
        const customConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        // Configuration OF Add & Edit
        if (editingItems === null) {
            // For Add Data Requested Accepted ;
            axios.post("https://pos-application-yuj3.onrender.com/api/items/add-item", values, customConfig).then((response) => {
                dispatch({ type: 'hideLoading' })
                message.success("Item Add Success ");
                setModelPopup(false);
                getAllitem();

            }).catch(error => {
                console.log(error.response);
                message.error("Something went wrong Add Items");
                dispatch({ type: 'hideLoading' })
            });


        }
        else {
            // Edit  Item Data 
            axios.post("https://pos-application-yuj3.onrender.com/api/items/edit-item", { ...values, itemId: editingItems._id }, customConfig).then((response) => {
                dispatch({ type: 'hideLoading' })
                message.success("Item Edit Success ");
                setModelPopup(false);
                getAllitem();
                setEditingItems(null);

            }).catch(error => {
                console.log(error.response);
                message.error("Something went wrong in Editing Items");
                dispatch({ type: 'hideLoading' })
            });

        }


    }
    const deleteItem = (record) => {

        dispatch({ type: 'showLoading' })

        // Axios confiq
        const customConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios
            .post("https://pos-application-yuj3.onrender.com/api/items/delete-item", { itemId: record._id }, customConfig)
            .then(res => {
                dispatch({ type: 'hideLoading' })

                message.success("Deleted Success ");
                getAllitem();
            })
            .catch(err => message.error(`Deleted Failed ` + err));

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
            dataIndex: 'price',
        },
        {
            title: 'Category',
            dataIndex: 'category',
        }
        ,
        {
            title: 'Action',
            dataIndex: '_id',
            render: (id, record) => <div className='d-flex'>
                <DeleteOutlined onClick={() => deleteItem(record)} className='mx-2' />
                <EditOutlined className='mx-2' onClick={() => {
                    setEditingItems(record);
                    setModelPopup(true)
                }} />
            </div>

        }
    ];


    return (
        <DefaultLayout>
            <div className="d-flex justify-content-between">
                <h3>Items</h3>
                <Button type="primary" onClick={() => { setModelPopup(true) }}>Add Item</Button>
            </div>
            <Table key={itemData._id} columns={columns} dataSource={itemData} bordered></Table>



            {/* Modal  Add Data edit Data */}

            {
                modalPopup && (
                    <Modal onCancel={() => {
                        setModelPopup(false)
                        setEditingItems(null)
                    }}
                        visible={modalPopup}
                        title={`${editingItems !== null ? 'Edit Items' : "Add Items"}`}
                        footer={false} >

                        <Form
                            initialValues={editingItems}
                            layout="vertical" onFinish={onFinish}>
                            <Form.Item name='name' label='Name' >
                                <Input />
                            </Form.Item>
                            <Form.Item name='price' label='Price' >
                                <Input />
                            </Form.Item>
                            <Form.Item name='image' label='Image URL' >
                                <Input />
                            </Form.Item>
                            <Form.Item name='category' label='Category' >
                                <Select>
                                    <Select.Option value='fruits'>Fruits</Select.Option>
                                    <Select.Option value='vegetables'>Vegetables</Select.Option>
                                    <Select.Option value='meats'>Meats</Select.Option>
                                </Select>
                            </Form.Item>
                            <div className='d-flex justify-content-end'>

                                <Button htmlType='submit' type='primary'>Save</Button>
                            </div>
                        </Form>
                    </Modal>
                )
            }





            {/* Edit Data  */}


        </DefaultLayout>
    );
};

export default Items;