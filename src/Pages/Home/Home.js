import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../Components/DefaultLayout/DefaultLayout';
import axios from 'axios';
import { Col, Row } from 'antd';
import Item from '../../Components/Item/Item';
import { useDispatch } from 'react-redux';
import './Home.css';


const Home = () => {

  const [itemData, setItemData] = useState([])
  const [selectedCategory,setSelectedCategory]=useState('vegetables');
  const dispatch = useDispatch();


  // Category
  const category=[
    {
      name:'fruits',
      imgUrl:'https://cdn.pixabay.com/photo/2015/12/30/11/57/fruits-1114060_960_720.jpg',
    },
    {
      name:'vegetables',
      imgUrl:'https://cdn.pixabay.com/photo/2016/02/20/21/41/vegetables-1212845_960_720.jpg',
    },
    {
      name:'meats',
      imgUrl:'https://cdn.pixabay.com/photo/2018/02/08/15/01/meat-3139640_960_720.jpg',
    }

  ]

  // get All Item
  const getAllitem = async () => {
    dispatch({ type: 'showLoading' })
    await axios.get('https://pos-application-yuj3.onrender.com/api/items/get-all-items').then((response) => {
      setItemData(response.data);
      dispatch({ type: 'hideLoading' })
    }).catch((error => {
      console.log(error)
      dispatch({ type: 'hideLoading' })
    }))
  }

  useEffect(() => {
    getAllitem()
  }, [])


  return (
    <DefaultLayout>
      <div className='d-flex'>
        {
          category.map((category)=>{
            return <div
            onClick={()=>setSelectedCategory(category.name)}
            className={`d-flex category ${selectedCategory===category.name && 'selected-category'}`}>
                <h4>{category.name}</h4>
                <img src={category.imgUrl} height='60' width="80" alt=''></img>
            </div>
          })
        }
      </div>


      <Row gutter={20}>
        {
          itemData.filter((i)=>i.category === selectedCategory).map((item) => {
            return <Col key={item._id} span={6} xs={24} lg={6} md={12} sm={6}>
              <Item item={item} ></Item>
            </Col>
          })
        }
      </Row>

    </DefaultLayout>
  );
};

export default Home;