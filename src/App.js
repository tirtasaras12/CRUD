import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import Home from './component/Home';
import ListMember from './component/ListMember';
import AddMember from './component/AddMember';
// import InputForm from './component/InputForm';

const { Header, Sider, Content } = Layout;

class App extends React.Component {
  render() {
    return (
      <Router>
        <Layout>
          <Sider trigger={null} collapsed={false}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Link to="/">
                  <span>Home</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/list">
                  <span>List Member</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', paddingLeft: 16 }}>
              Top 10 Idol K-Pop
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
              }}
            >
              <Route exact path="/" component={Home} />
              <Route path="/list" component={ListMember} />
              <Route path="/add" component={AddMember} />
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
