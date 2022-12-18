import React, { useEffect, useRef, useState } from 'react';
import DefaultLayout from './../../Components/DefaultLayout/DefaultLayout';
import axios from "axios";
import { useDispatch } from "react-redux";
import {  EyeOutlined } from "@ant-design/icons";
import { Button,  Modal, Table } from "antd";
import { toWordsconver } from '../Cart/numToText';
import './bills.css';
import ReactToPrint from 'react-to-print';
import { useReactToPrint } from 'react-to-print';



const Bills = () => { 
    const componentRef = useRef();
    const [billsData, setBillsData] = useState([]);
    const [printBillModalVisibility, setPrintBillModalVisibilty] = useState(false);
    const [selectedBill, setSelectedBill] = useState(null);


    const dispatch = useDispatch();



    // Get Bills axios

    const getAllBills = () => {
      dispatch({ type: "showLoading" });
      axios
        .get("https://pos-application-yuj3.onrender.com/api/bills/get-all-bills")
        .then((response) => {
          dispatch({ type: "hideLoading" });
          const data = response.data
          data.reverse()
          setBillsData(data);
        })
        .catch((error) => {
          dispatch({ type: "hideLoading" });
          console.log(error);
        });
    };
  
    const columns = [
      {
        title: "Id",
        dataIndex: "_id",
      },
      {
        title: "Customer",
        dataIndex: "customerName",
      },
      {
        title: "SubTotal",
        dataIndex: "subTotal",
      },
      {
        title: "Tax",
        dataIndex: "tax",
      },
      {
        title: "Total",
        dataIndex: "totalAmount",
      },
      {
        title: "Actions",
        dataIndex: "_id",
        render: (id, record) => (
          <div className="d-flex">
            <EyeOutlined
              className="mx-2"
              onClick={() => {
                setSelectedBill(record);
                setPrintBillModalVisibilty(true);
              }}
            />
          </div>
        ),
      },
    ];
    const cartcolumns = [
      {
        title: "Name",
        dataIndex: "name",
      },
      {
        title: "Price",
        dataIndex: "price",
      },
      {
        title: "Quantity",
        dataIndex: "_id",
        render: (id, record) => (
          <div>
            <b>{record.quantity}</b>
          </div>
        ),
      },
      {
          title: "Total fare",
          dataIndex: "_id",
          render: (id, record) => (
            <div>
              <b>{record.quantity * record.price}</b>
            </div>
          ),
        },
    ];
  
    useEffect(() => {
      getAllBills();
    }, []);
  
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });
    
    
  
    return (
      <DefaultLayout>
        <div className="d-flex justify-content-between">
          <h3>Items</h3>
        </div>
        <Table columns={columns} dataSource={billsData} bordered />
  
        {printBillModalVisibility && (
          <Modal
            onCancel={() => {
              setPrintBillModalVisibilty(false);
            }}
            visible={printBillModalVisibility}
            title="Bill Details"
            footer={false}
            width={800}
          >
            <div className="bill-model p-3" ref={componentRef}>
              <div className="d-flex justify-content-between bill-header pb-2">
                <div>
                  <h1>
                    <b>XYZ MARKET</b>
                  </h1>
                </div>
                <div>
                  <p>Trunk Road , House No : 3254, EHasan Market</p>
                  <p>Provider : Mohammed Jobair Hossain </p>
                  <p>Phone : 016******</p>
                </div>
                <hr/>
              </div>
              <div className="bill-customer-details my-2">
                <p>
                  <b>Name</b> : {selectedBill.customerName}
                </p>
                <p>
                  <b>Phone Number</b> : {selectedBill.customerPhoneNumber}
                </p>
                <p>
                  <b>Date</b> :{" "}
                  {selectedBill.createdAt.toString().substring(0, 10)}
                </p>
              </div>
              <Table dataSource={selectedBill.cartItems} columns={cartcolumns} pagination={false}/>
  
              <div className="dotted-border">
                  <p><b>SUB TOTAL</b> : {selectedBill.subTotal}</p>
                  <p><b>Tax</b> : {selectedBill.tax}</p>
              </div>
  
              <div>
                  <h2><b>GRAND TOTAL : {selectedBill.totalAmount}</b></h2>
              </div>
              <div>
                  <h6><b>In word : {toWordsconver(selectedBill.totalAmount).toUpperCase()}</b></h6>
              </div>
              <div className="dotted-border"></div>
  
              <div className="text-center">
                    <p>Amount Received By : {selectedBill.userName}</p>
                    <p>Thanks</p>
                    <p>Visit Again : </p>
              </div>
            </div>
  
            <div className="d-flex justify-content-end">
                    <Button onClick={handlePrint} type='primary' >Print Bill</Button>
            </div>
          </Modal>
        )}
      </DefaultLayout>
    );
};

export default Bills;