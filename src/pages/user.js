import React from 'react';
import { connect } from 'dva';
import { Row, Card, Col, Table, Pagination } from 'antd';

@connect(({ user }) => ({
  ...user,
}))
class userManagement extends React.PureComponent {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/getUserList',
    });
  }

  handlePageChange = (current) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/changePage',
      payload: {
        current,
      },
    });
  };

  handlePageSizeChange = (current, pageSize) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/changePageSize',
      payload: {
        current,
        pageSize: parseInt(pageSize, 10),
      },
    });
  };

  render() {
    const userColumns = [
      {
        title: '用户ID',
        dataIndex: 'userId',
        key: 'userId',
      },
      {
        title: '用户名称',
        dataIndex: 'userName',
        key: 'userName',
      },
    ];
    const { userList, total, pageNum, pageSize } = this.props;
    return (
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>

        <Col span={24}>
          <div>
            <Card bordered={false}>
              <Table
                rowKey={record => record.userId}
                columns={userColumns}
                dataSource={userList}
                pagination={false}
              />
              <Pagination
                showSizeChanger
                className="ant-table-pagination"
                total={total}
                current={pageNum}
                pageSize={pageSize}
                onChange={this.handlePageChange}
                onShowSizeChange={this.handlePageSizeChange}
              />
            </Card>
          </div>
        </Col>
      </Row>
    );
  }
}

export default connect()(userManagement);
