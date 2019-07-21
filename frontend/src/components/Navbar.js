import React, { Component } from 'react';
import axios from 'axios';
import { Menu, Icon } from 'antd';
import 'antd/lib/menu/style/css';
import 'antd/lib/icon/style/css';

import { Modal, Form, Input,notification } from 'antd';
import 'antd/lib/modal/style/css';
import 'antd/lib/form/style/css';
import 'antd/lib/input/style/css';

import { Button, Checkbox } from 'antd';
import 'antd/lib/button/style/css';
import 'antd/lib/checkbox/style/css';
import qs from 'qs'

const cryptico = require('cryptico')
const PUBLICK_KEY = 'uXjrkGqe5WuS7zsTg6Z9DuS8cXLFz38ue+xrFzxrcQJCXtVccCoUFP2qH/AQ4qMvxxvqkSYBpRm1R5a4/NdQ5ei8sE8gfZEq7dlcR+gOSv3nnS4/CX1n5Z5m8bvFPF0lSZnYQ23xlyjXTaNacmV0IuZbqWd4j9LfdAKq5dvDaoE='


// 注册错误后出现的提示信息
// 1.某项信息为空
const openRENotification = () => {
    notification.open({
        message: '注册错误',
        description:
            '注册错误，请检查你的用户名是否为空，真实姓名是否为空，密码是否为空',
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
    });
};
// 2.密码长度过小
// 密码过短的错误
const openPassWordNotification = () => {
    notification.open({
        message: '注册错误',
        description:
            '密码长度过短，请保证密码至少为8位以上长度',
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
    });
};

// 登录错误时出现的错误信息
const openLENotification = () => {
    notification.open({
        message: '登录错误',
        description:
            '登录错误，用户名为空或密码为空',
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
    });
};

//
const openLEPNotification = () => {
    notification.open({
        message: '登录错误',
        description:
            '登录错误，用户名与密码不符，请重新尝试',
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
    });
};

const openNetNotification = () => {
    notification.open({
        message: '网络错误',
        description:
            '404 Not Found',
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
    });
};

// 登录错误时出现的错误信息
const openEXISTNotification = () => {
    notification.open({
        message: '注册错误',
        description:
            '注册错误，用户名已存在！',
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
    });
};




class Navbar extends Component {
    state = {
        current: 'mainpage',
        hasLogined: false,
        loginVisble: false,
        registerVisible: false,
	    username:'',
	    pwd:''
    };

	handleChange = (key, val) => {
		this.setState({
			[key]: val
		})
	}
// 登录
    showLoginModal = () => {
        this.setState({
            loginVisble: true
        });
    }
// 注册
    showRegisterModal = () => {
        this.setState({
            registerVisble: true
        });
    }
// 处理登录提交
    handleLoginSubmit = e => {

        this.props.form.validateFields((err, fieldsValue) => {
            if (err) return;
            // 判断用户名是否存在
            if (fieldsValue['loginusername'] === undefined || fieldsValue['loginusername'] === "" || fieldsValue['loginusername'] === null
                || fieldsValue['loginpassword'] === undefined || fieldsValue['loginpassword'] === "" || fieldsValue['loginpassword'] === null) {
                this.setState({
                        loginVisble: false,
                    }, () => {
                        openLENotification();
                    }
                );
            }
//            密码是否小于8位
            else if(fieldsValue['loginpassword'].length<8){
                this.setState({
                        registerVisble: false,
                    },() => {
                        openPassWordNotification();
                    }
                );
            }
            // 密码是否正确
            else {
                const pwdEncrypt = cryptico.encrypt(fieldsValue['loginpassword'], PUBLICK_KEY);
                console.log('pwdEncrypt: ', pwdEncrypt);
                const values = {
                    username: fieldsValue['loginusername'],
                }
                values['pwd'] = pwdEncrypt['cipher']
                axios.post('/user/login', qs.stringify(values))
                    .then(res => {
                    if (!res.status === 200) {
                        console.log('网络错误');
                        this.setState({
                                loginVisble: false,
                            }, () => {
                                openNetNotification();
                            }
                        );
                    } else if (res.data.code === 0) {
                        console.log('正确');
                        this.setState({
                            loginVisble: false,
                            hasLogined: true,
                        });
                        sessionStorage.setItem('auth', true);
                    }else {
                        this.setState({
                                loginVisble: false,
                            }, () => {
                                openLEPNotification();
                            }
                        );
                    }
                });
            }
        })
    };


    // 处理注册提交
    handleRegisterSubmit = e => {
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
                username: fieldsValue['username'],
                realname: fieldsValue['realname'],
                password: fieldsValue['password']
            }

            // 判断用户名是否为空
            if(fieldsValue['username'] === undefined || fieldsValue['username']==="" || fieldsValue['username'] === null
                || fieldsValue['realname'] === undefined || fieldsValue['realname']==="" || fieldsValue['realname'] === null
                || fieldsValue['password'] === undefined || fieldsValue['password']==="" || fieldsValue['password'] === null ){
                console.log(values)
                this.setState({
                        registerVisble: false,
                    },() => {
                        openRENotification();
                    }
                );
            }

            // 密码是否小于8位
            else if(fieldsValue['password'].length<8){
                console.log(values)
                this.setState({
                        registerVisble: false,
                    },() => {
                        openPassWordNotification();
                    }
                );
            }

            else{
                const pwdEncrypt = cryptico.encrypt( fieldsValue['password'], PUBLICK_KEY);
                console.log('pwdEncrypt: ', pwdEncrypt);
                const values = {
                    username: fieldsValue['username'],
                    realname: fieldsValue['realname'],
                }
                values['pwd'] = pwdEncrypt['cipher']
                axios.post('/user/register', qs.stringify(values))
                    .then(res => {
                        if (!res.status === 200) {
                            console.log('网络错误');
                            this.setState({
                                    loginVisble: false,
                                }, () => {
                                    openNetNotification();
                                }
                            );
                        } else if( res.data.code === 0){
                            console.log('成功！');
                            this.setState({
                                registerVisble: false,
                                hasLogined: true,
                            });
                            sessionStorage.setItem('auth', true);
                        } else {
                            console.log('失败！');
                            this.setState({
                                    registerVisble: false,
                                }, () => {
                                    openEXISTNotification();
                                }
                            );
                        }
                    })
            }
        })
    };

    handleLoginCancel = e => {
        console.log(e);

        // todo

        this.setState({
            loginVisble: false,
        });
    };

    handleRegisterCancel = e => {
        console.log(e);
        this.setState({
            registerVisble: false,
        });
    };

    handleBarClick = e => {
        this.setState({
            current: e.key,
        });
    };

    loadSession = () => {
        const sLogined = sessionStorage.getItem('auth');
        if(sLogined) {
            this.setState({
                hasLogined: true
            });
        }
    };

    exitLogin = () => {
        // axios.get('/user/loginOut')
        //     .then(res => {
        //         if (res.status === 200 && res.data.code === 0) {
        //             this.setState({
        //                 hasLogined: false,
        //             });
        //             sessionStorage.clear();
        //         } else {
        //             alert('退出失败')
        //         }
        //     })
        this.setState({
            hasLogined: false,
        });
        sessionStorage.clear();

    }



    render() {
        // BUG FIX 1 此处要加IF语句，不然就会反复修改Component
        if(!this.state.hasLogined)
            this.loadSession();
        const { form } = this.props;
        const { getFieldDecorator } = form;

        return (
            <Menu onClick={this.handleBarClick} selectedKeys={[this.state.current]} mode="horizontal">
                <Menu.Item key="mainpage">
                    <a href="/">
                        <Icon type="mail" />
                        闪电保险 —— 创新型人工智能区块链快速赔保平台
                    </a>
                </Menu.Item>

                {/* Part A: has not logined */}
                {
                    !this.state.hasLogined &&
                    <Menu.Item key="login" onClick={this.showLoginModal}>
                        登录
                    </Menu.Item>
                }
                {
                    !this.state.hasLogined &&
                    <Menu.Item key="register" onClick={this.showRegisterModal}>
                        注册
                    </Menu.Item>
                }

                {/* Part B: has logined */}

                {
                    this.state.hasLogined &&
                    <Menu.Item key="purchase">
                        <a href="/ins">
                            购买保险
                        </a>
                    </Menu.Item>
                }
                {
                    this.state.hasLogined &&
                    <Menu.Item key="profile">
                        <a href="/profile">
                            我的保险
                        </a>
                    </Menu.Item>
                }
                {
                    this.state.hasLogined &&
                    <Menu.Item key="exit" onClick={this.exitLogin}>
                        <a href="/">
                            安全退出
                        </a>
                    </Menu.Item>
                }

                {/* 登录模块 */}

                <Modal
                    title="用户请登录"
                    visible={this.state.loginVisble}
                    onOk={this.handleLoginSubmit}
                    onCancel={this.handleLoginCancel}
                >

                    <Form onSubmit={this.handleLoginSubmit} className="login-form">
                        <b>用户名</b>
                        <Form.Item>
                            {getFieldDecorator("loginusername")(<Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                                onChange={(e) => this.handleChange('username', e.target.value)}

                            />)}
                        </Form.Item>
                        <b>密码</b>
                        <Form.Item>
                            {getFieldDecorator("loginpassword")(<Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                                onChange={(e) => this.handleChange('pwd', e.target.value)}
                            />)}
                        </Form.Item>
                    </Form>
                </Modal>

                {/* 注册模块 */}

                <Modal
                    title="新用户，欢迎注册！"
                    visible={this.state.registerVisble}
                    onOk={this.handleRegisterSubmit}
                    onCancel={this.handleRegisterCancel}
                >

                    <Form onSubmit={this.handleRegisterSubmit} className="register-form">
                        <b>用户名</b>
                        <Form.Item>
                            {getFieldDecorator("username")(<Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />)}
                        </Form.Item>

                        <b>真实姓名</b>
                        <Form.Item>
                            {getFieldDecorator("realname")(<Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Realname"
                            />)}
                        </Form.Item>

                        <b>密码</b>
                        <Form.Item>
                            {getFieldDecorator("password")(<Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />)}

                        </Form.Item>
                    </Form>
                </Modal>

            </Menu>
        );
    }
}

const WrappedNavbarForm = Form.create()(Navbar);
export default WrappedNavbarForm;