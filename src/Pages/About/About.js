import React from 'react';
import Author from "../../Assets/filename.jpg";
import DefaultLayout from '../../Components/DefaultLayout/DefaultLayout';
import {WhatsAppOutlined,LinkedinOutlined,InstagramOutlined ,FacebookOutlined,MailOutlined} from "@ant-design/icons"
import "./About.css";
import { Space } from 'antd';

const About = () => {


    const user={
    facebook: 'https://www.facebook.com/profile.php?id=100012141661981',
    email:'mohammadjobairhossain@gmail.com',
    whatsapp:+8801630372177,
    linkedinHandle:''
    }
    return (
        <DefaultLayout>
            <div className='d-flex flex-column mb-3 align-items-center'>
            <div className='p2'>
               <h1>Creating & Developing By </h1>
               <hr/>
            </div>
            <div className='p2'>
                <img src={Author} alt=""></img>
            </div>
            <div className='my-2'>
                <h3><b>Mohammed Jobair Hossain  </b>(MERN  Developer )</h3>
                <p>Address: Nazir Road, Feni Sadar, Feni. Bangladesh</p>
                <h4>Contact: +8801630372177</h4>
                <h4> Email : mohammadjobairhossain@gmail.com  </h4>
            </div>
            <div className='d-flex justify-content-between '>
            <Space size={[9, 18]} wrap>
            <WhatsAppOutlined onClick={<a href={user.whatsapp}></a>} ></WhatsAppOutlined> 
             <LinkedinOutlined />
             <InstagramOutlined />
            <FacebookOutlined><a href={user.whatsapp}></a></FacebookOutlined>
            <MailOutlined />
            </Space>
            </div>
        </div>
        </DefaultLayout>
    );
};

export default About;