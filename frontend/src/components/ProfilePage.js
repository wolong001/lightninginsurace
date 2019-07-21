import React, { Component } from 'react';
import axios from 'axios';

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
import { exec } from 'child_process';

const openNotification = () => {
  notification.open({
    message: '上传文件成功',
    description:
      '恭喜您！已经成功上传您的证明材料，我们后台已经收到，请耐心等候几分钟，我们正在验证您的材料中。如果有疑问，请致电：18811520896',
    icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
  });
};

const openENotification = () => {
  notification.open({
    message: '上传文件失败',
    description:
      '很遗憾！上传您的证明材料失败，请检查信息是否填写完整，并保证上传的图片格式为JPEG。如果有疑问，请致电：18811520896',
    icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
  });
};

const columns = [
  {
    title: '保险名称',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: '合约有效时期（年）',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '描述',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '当前状态',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === '不可赔保') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: '操作',
    key: 'action',
    dataIndex: 'key',
    render: (key, record) => {
      if(key == 1 || key == 4) {
        return (
          <span>
            <a href="javascript:;" >申请赔保</a>
            <Divider type="vertical" />
            <a href="javascript:;">查看详情</a>
          </span>
        );
      } else {
        return (
          <span>
            <a href="javascript:;" disabled={true} >申请赔保</a>
            <Divider type="vertical" />
            <a href="javascript:;">查看详情</a>
          </span>
        );
      }
    },
  },
];

const data = [
  {
    key: '4',
    name: '闪电保险-汽车险',
    age: 2,
    address: '可申请赔保',
    tags: ['正在等待核保文件上传'],
  },
  {
    key: '1',
    name: '闪电保险-皮肤癌险',
    age: 4,
    address: '可申请赔保',
    tags: ['正在等待核保文件上传'],
  },
  {
    key: '2',
    name: '传统工伤保险',
    age: 2,
    address: '传统保险模式无法进行线上赔保',
    tags: ['不可赔保'],
  },
  {
    key: '3',
    name: '闪电保险-汽车保险',
    age: 3,
    address: '已完成赔保行为，祝您未来一切顺利',
    tags: ['已核保通过'],
  },
];


class ProfilePage extends Component {

  state = {
    modalVisble: false,
  };

  showModal = () => {
    this.setState({
      modalVisble: true
    });
  }

  handleModalSubmit = e => {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ptype: fieldsValue['ptype'],//赔保类型
        sscd:fieldsValue['sscd'],//受损程度
        plevel:fieldsValue['plevel'],//申请赔偿级别
        evaluate: fieldsValue['evaluate'],//满意度评分
        pic: fieldsValue['pic'],//证明图片（材料）
        // iden:fieldsValue['iden'],//
    }

    if(!values['ptype'] || values['ptype']=== undefined 
    ||!values['sscd'] || values['sscd']=== undefined 
    ||!values['plevel'] || values['plevel']=== undefined 
    ||!values['evaluate'] || values['evaluate']=== undefined 
    ||!values['pic'] || values['pic']=== undefined){
      // 用于 debug
      console.log(!values['ptype'] || values['ptype'] === undefined);
      console.log(!values['sscd'] || values['sscd'] === undefined);
      console.log(!values['plevel'] || values['plevel'] === undefined );
      console.log(!values['evaluate'] ||values['evaluate'] === undefined );
      console.log(!values['pic'] ||values['pic'] === undefined );

      console.log(values);
      axios.post('http://localhost:8000/user/login', values).then(res => {
        console.log('res=>',res)
    })
      this.setState({
        modalVisble: false,//modal不可见
      },() => {
        openENotification();//显示错误信息
      }
      );

    }
    else{
      this.setState({
        modalVisble: false,//modal不可见
      }, () => {
        openNotification();//显示成功信息

        // todo
        // 图片传到al
        // exec("python ../../ai/test.py");

        // 读取json文件
        // open(pathname) and get
         
        // 根据结果判断是否需要理赔以及理赔金额是否对

        // 将信息记录到区块链上
      });
    }
  })
    // this.setState({
    //   modalVisble: false,
    // }, () => {
    //   openNotification();
    // });
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
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div>
        我当前购买过的保险

        <Table columns={columns} dataSource={data} />

        <Modal
            title="闪电保险 - 赔付界面"
            visible={this.state.modalVisble}
            onOk={this.handleModalSubmit}
            onCancel={this.handleModalCancel}
          >
          
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="申请类型">
              <span className="ant-form-text">保险赔保申请</span>
            </Form.Item>
            <Form.Item label="赔保类型" hasFeedback>
            {getFieldDecorator("ptype")(
                <Select placeholder="请选择赔保类型">
                  <Option value="skin">闪电线上 - 皮肤癌赔保（推荐，快速）</Option>
                  <Option value="car">闪电线上 - 汽车赔保（推荐，快速）</Option>
                  <Option value="usa">传统赔保</Option>
                </Select>)}
            </Form.Item>


            <Form.Item label="受损程度">
            {getFieldDecorator("sscd")(
              <Radio.Group>
                <Radio value="a">轻伤</Radio>
                <Radio value="c">重症</Radio>
              </Radio.Group>)}
            </Form.Item>

            <Form.Item label="申请赔偿级别">
            {getFieldDecorator("plevel")(
              <Radio.Group>
                <Radio.Button value="a">千元级</Radio.Button>
                <Radio.Button value="b">万元级</Radio.Button>
                <Radio.Button value="c">十万元级</Radio.Button>
              </Radio.Group>)}
            </Form.Item>

            <Form.Item label="本次满意度评分">
            {getFieldDecorator("evaluate")(
              <Rate />)}
            </Form.Item>

            <Form.Item label="上传证明照片" extra="请出示您的受损图片以提交核保">
            {getFieldDecorator("pic")(
                <Upload name="logo" action="/user/upload" listType="picture">
                  <Button>
                    <Icon type="upload" /> 点击上传
                  </Button>
                </Upload>)}
            </Form.Item>
          </Form>
        </Modal>

        <Button type="primary" onClick={this.showModal}>
          申请赔保
        </Button>

      </div>
    );
  }
}


const WrappedProfilePageForm = Form.create()(ProfilePage);
export default WrappedProfilePageForm;
// export default ProfilePage;