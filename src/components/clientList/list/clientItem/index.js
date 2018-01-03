import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'dva';
import { Card, Row, Col, Icon } from 'antd';
import TopInfo from './topInfo';
import ConsumeInfo from './consumeInfo';
import MoreBtn from './moreBtn';
import styles from './index.less';

class ClientItem extends Component {
  static propTypes = {
    clientData: PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = {
      isShowConsume: false,
    };
  }
  showConsume = () => {
    this.setState({
      isShowConsume: !this.state.isShowConsume,
    });
  }
  render() {
    return (
      <Card style={{ width: '100%' }} className={styles['client-item']}>
        <TopInfo clientData={this.props.clientData} />
        {this.state.isShowConsume && <ConsumeInfo clientData={this.props.clientData} />}
        <MoreBtn />
        <span onClick={this.showConsume} className={`${styles['show-btn']} ${this.state.isShowConsume ? styles.close : styles.open}`}>
          <Icon type={this.state.isShowConsume ? 'up' : 'down'} />
          {this.state.isShowConsume ? ' 收起详细信息' : ' 展开详细信息'}
        </span>
      </Card>
    );
  }
}

// const ClientItem = ({ clientData }) => {
//   // console.log(clientData, 'clientClientItem');
//   let isShowConsume = false;
//   return (
//     <Card style={{ width: '100%' }} className={styles['client-item']}>
//       <TopInfo clientData={clientData} />
//       <ConsumeInfo clientData={clientData} />
//       <MoreBtn />
//     </Card>
//   )
// };

// ClientItem.propTypes = {
//   clientData: PropTypes.object,
// };

export default ClientItem;
// export default connect(state => ({ clientClientItem: state.clientClientItem }))(ClientItem);
