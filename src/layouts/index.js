import React from 'react';
import { Link } from 'dva/router';
import DocumentTitle from 'react-document-title'; // 能动态修改页面title的
import { Layout, Menu, Icon } from 'antd';
import Header from './header';
import styles from './index.css';

const { Sider, Content } = Layout;

function BasicLayout(props) {
  const pageTitle = () => {
    return '知识-Umi Pro';
  };

  const { children } = props;
  return (
    <DocumentTitle title={pageTitle()}>
      <Layout>
        <Header />
        <Layout style={{ marginTop: 64 }}>
          <Sider
            trigger={null}
            collapsible
          >
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['testPage']}>
              <Menu.Item key="firstpage">
                <Link to="firstpage">
                  <Icon type="upload" />
                  <span>首页</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="user">
                <Link to="user">
                  <Icon type="user" />
                  <span>用户信息</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ padding: 24, background: '#fff' }}>
            { children }
          </Content>
        </Layout>
      </Layout>
    </DocumentTitle>
  );
}

export default BasicLayout;
