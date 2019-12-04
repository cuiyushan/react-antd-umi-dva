import React from 'react';
import { Button, Card, Col, Pagination, Row, Table } from 'antd';
import router from 'umi/router';
import styles from './firstpage.css';

class firstPage extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <div className={styles.welcome} />
      </React.Fragment>
    );
  }
}

export default firstPage;
