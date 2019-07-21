import React, { Component } from 'react';

import { Menu, Icon, Card } from 'antd';
import 'antd/lib/menu/style/css';
import 'antd/lib/icon/style/css';
import 'antd/lib/card/style/css';

import { Modal, Form, Input } from 'antd';
import 'antd/lib/modal/style/css';
import 'antd/lib/form/style/css';
import 'antd/lib/input/style/css';

import { Button, Checkbox } from 'antd';
import 'antd/lib/button/style/css';
import 'antd/lib/checkbox/style/css';

import { Col, Row, Select, InputNumber, Switch, Radio, Slider, Upload, Rate } from 'antd';
import 'antd/lib/col/style/css';
import 'antd/lib/row/style/css';
import 'antd/lib/select/style/css';
import 'antd/lib/switch/style/css';
import 'antd/lib/radio/style/css';
import 'antd/lib/slider/style/css';
import 'antd/lib/upload/style/css';
import 'antd/lib/rate/style/css';
import 'antd/lib/input-number/style/css';

import { Table, Divider, Tag , notification} from 'antd';
import 'antd/lib/table/style/css';
import 'antd/lib/divider/style/css';
import 'antd/lib/tag/style/css';
import 'antd/lib/notification/style/css';

const { Meta } = Card;

const openNotification = () => {
  notification.open({
    message: '保险购买成功',
    description:
      '恭喜您！已经成功购买您的保险，我们将在几分钟内将您的交易送至区块链上。如果有疑问，请致电：18811520896',
    icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
  });
};

class InsDetailPage extends Component {
  state = {
    modalVisble: false,
  };

  showModal = () => {
    this.setState({
      modalVisble: true
    });
  }

  handleModalSubmit = e => {
    this.setState({
      modalVisble: false,
    }, () => {
      openNotification();
    });
  };

  handleModalCancel = e => {
    console.log(e);
    this.setState({
      modalVisble: false,
    });
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const { Option } = Select;

    return (
      <div>
        具体保险页
        <Row gutter={8}>
          <Col span={5}>
            <Card
              hoverable
              style={{}}
              cover={<img alt="example" src="data:image/jpeg;base64,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" />}
            >
              <Meta title="汽车保险" description="汽车保险是一款基于区块链技术和人工智能技术的保险品牌，通过快速识别API，我们能在分钟级别实现对您的赔付，欢迎体验！" />
              <Button type="primary" onClick={this.showModal} style={{ marginTop :10}}>立刻购买</Button>
            </Card>           
          </Col>
          <Col span={18} align="left">
            <h2>汽车保险是什么</h2>
            <text>机动车辆保险即汽车保险（简称车险），是指对机动车辆由于自然灾害或意外事故所造成的人身伤亡或财产损失负赔偿责任的一种商业保险。
机动车辆保险即“车险”，是以机动车辆本身及其第三者责任等为保险标的一种运输工具保险。</text>
            <br></br><br></br>
            <h2>汽车保险市场</h2>
            <text>随着经济的发展，机动车辆的数量不断增加。当前，机动车辆保险已成为中国财产保险业务中最大的险种。机动车辆保险已涵盖汽车危险事故的大部分，中国交通部已强制购车人员购买机动车辆保险，以保证在车祸事故中，受害人正当权益得到保障。比如交强险就是以保证第三方的权益为目的险种。</text>
            <br></br><br></br>
            <h2>我们的汽车保险项目</h2>
            <br></br>
            {/* <text></text>
            <br></br> */}
            <text>我们的汽车保险项目是一款基于区块链技术和人工智能技术的保险品牌，通过快速识别API，我们能在分钟级别实现对您的赔付，欢迎体验！</text>
            <br></br><br></br>
            <text><h3 ><b><font color="#FF0000">点击左侧购买汽车保险</font></b></h3></text>
            <br></br>
            <a href = 'https://baike.baidu.com/item/%E6%9C%BA%E5%8A%A8%E8%BD%A6%E8%BE%86%E4%BF%9D%E9%99%A9/3973897?fromtitle=%E6%B1%BD%E8%BD%A6%E4%BF%9D%E9%99%A9&fromid=4403945&fr=aladdin' target="view_window">点击此处了解更多汽车保险相关信息</a>
            <br></br>
            <text>同时您可拨打12332112345了解更多信息关于汽车保险的信息</text> 
          </Col>
        </Row>

        <h2><b>我们的优势</b></h2>

        <div style={{  background: '#ECECEC',padding: '30px' }} >
          <Meta title="防止弄虚作假。" description="“唯一性”是保险行业管理的重点和难点，无论是展业承保，还是定损理赔，以养老金冒领为例，许多参保人的家属故意隐瞒其死亡信息的现象十分严重，由于社保机构无法及时、高效地识别受益人是否存活，有相关数据显示，仅在2013年，我国社保养老基金冒领人数达到3.5万人，冒领金额近1.5亿元，给保险公司带来巨额的不必要损失，同时，相关部门还需耗费大量成本进行调查和追讨。引入区块链技术后，可以建立医疗机构区块链、交通运输公司区块链、殡仪机构区块链，以便及时更新信息，可以有效防止此类情况出现." />
          <br></br>
          <Meta title="提高保险行业效率" description="保险行业的效率痛点在投保人和保险公司双方都存在。投保人方面，对于保险质量的不清楚，也不能很好地了解到每款保险的价值、该款保险与自身的适应性，因此经常出现犹豫不决的情况，同时，对传统保险推销的抵触，也会使投保人在选择过程中力求了解更多的保险详细信息，效率十分低下；保险公司方面，需要提前了解投保人信息，需要搜集多方面的相关数据，确定是否可以提供保险，在最后执行保险条款时也需要反复确认信息是否真实、是否符合赔保条件。综合了人工智能和区块链的特点，一方面能够提供便捷的服务，帮助投保人尽快选到适合自身的保险。另一方面，能够为保方提供详细的信息，记录投保人的信息，便于双方做出决策。"/>
          <br></br>
          <Meta title="隐私保护和保密" description="区块链使用的密码学技术确保数据仅对“拥有”该数据的参与者可见。可以在信息披露的同时适当做到保密性，加以设计可以达到双赢的结果。"/>
        </div>
        {/* <div style={{  background: '#ECECEC',padding: '30px' }}>
        <Meta title="区块链技术" description="汽车保险是一款基于区块链技术的保险品牌，通过充分利用区块链技术的优点，使得赔付更加可靠，欢迎体验！"/>
        </div> */}

        {/*购买界面与InsPage中的购买界面相同*/}

        <Modal
            title="闪电保险购买界面"
            visible={this.state.modalVisble}
            onOk={this.handleModalSubmit}
            onCancel={this.handleModalCancel}
          >
          
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="操作类型">
              <span className="ant-form-text">购买闪电保险</span>
            </Form.Item>
            <Form.Item label="保险类型" hasFeedback>
                <Select placeholder="请选择合适的保险类型">
                  <Option value="skin">闪电保险 - 汽车保险</Option>
                  <Option value="car">闪电保险 - 汽车保险</Option>
                </Select>
            </Form.Item>

            <Form.Item label="特殊情况调查">
                <Select mode="multiple" placeholder="请选择您是否具有以下性质">
                  <Option value="red">曾经购买过该类保险</Option>
                  <Option value="green">正在参与该类保险</Option>
                  <Option value="blue">有相关病史经历</Option>
                </Select>
            </Form.Item>

            <Form.Item label="参保人数">
              <InputNumber min={1} max={3} />
              <span className="ant-form-text"> 人</span>
            </Form.Item>

            <Form.Item label="隐私保护模式">
              <Switch />
            </Form.Item>

            <Form.Item label="选择保期">
              <Slider
                marks={{
                  0: '1年',
                  20: '2年',
                  40: '3年',
                  60: '4年',
                  80: '5年',
                  100: '6年',
                }}
              />
            </Form.Item>

            <Form.Item label="保险类型">
              <Radio.Group>
                <Radio value="a">个人投保</Radio>
                <Radio value="b">家庭投保</Radio>
                <Radio value="c">组织投保</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="身份验证">
              <div className="dropbox">
                <Upload.Dragger name="files" action="/upload.do">
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">请上传您的身份证正反面</p>
                  <p className="ant-upload-hint">请保持正反双面清晰</p>
                </Upload.Dragger>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      
    );
  }
}

export default InsDetailPage;