import React, { useEffect, useState } from 'react';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  LoginOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";
import { Layout, Menu } from 'antd';
import './Layout.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Header, Sider, Content } = Layout;

const DefaultLayout = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const { cartItems, loading } = useSelector((state) => state.rootReducer);
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);


  return (
    <Layout>
      {loading && (
        <div className="spinner">
          <div className="spinner-border" role="status">
            {/* <span class="sr-only">Loading...</span> */}
          </div>
        </div>
      )}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" >
          <h3>Tamim POS</h3>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
        >
          <Menu.Item key="/home" icon={<HomeOutlined />}>
            <Link to="/home">Home</Link>
          </Menu.Item>
          <Menu.Item key="/cart" icon={<ShoppingCartOutlined />}>
            <Link to="/cart">Cart</Link>
          </Menu.Item>
          <Menu.Item key="/bills" icon={<CopyOutlined />}>
            <Link to="/bills">Bills</Link>
          </Menu.Item>
          <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
            <Link to="/items">Items</Link>
          </Menu.Item>
          <Menu.Item key="/customers" icon={<UserOutlined />}>
            <Link to="/customers">Customers</Link>
          </Menu.Item>
          <Menu.Item key="/reg" icon={<UserAddOutlined />}>
            <Link to="/reg">Create New user </Link>
          </Menu.Item>
          <Menu.Item key="/about" icon={<InfoCircleOutlined />}>
            <Link to="/about">About Site </Link>
          </Menu.Item>
          <Menu.Item key="/logout" icon={<LoginOutlined />} onClick={() => {
            localStorage.removeItem('pos-user')
            navigate('/')
          }}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 10,
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}

          <div className="cart-count d-flex align-items-center " onClick={() => { navigate('/cart') }}>
            <b> <p>{cartItems.length}</p></b>
            <ShoppingCartOutlined />
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '10px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;