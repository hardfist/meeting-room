import React, { Component } from 'react'
import { Form, Modal, Input, Button, message, Select, Checkbox, DatePicker } from 'antd';
import fetch from 'lib/fetch';
const Option = Select.Option;

const FormItem = Form.Item;

class CreateModal extends Component {
    state = {
        loading: false
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.visible !== nextProps.visible) {
            this.setState({
                loading: false
            });
        }
    }
    render () {
        const { visible, title, onOk, okText, cancelText, onCancel } = this.props;
        const { loading } = this.state;
        return (
            <Modal
                title={title}
                onCancel={() => {
                    this.setState({
                        loading: false
                    });
                    onCancel()
                }}
                visible={visible}
                footer={[
                    <Button key="back" onClick={onCancel}>{cancelText}</Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={() => {
                        onOk(() => {
                            this.setState({
                                loading: true
                            });
                        }, () => {
                            this.setState({
                                loading: false
                            });
                        })
                    }}>
                        {okText}
                    </Button>,
                ]}
            >
                {this.props.children}
            </Modal>
        )
    }
}

export default (type, onCreated) => {
    const brands = JSON.parse(localStorage.getItem('__meeting_brand')|| '[]');
    const divisions = JSON.parse(localStorage.getItem('__meeting_division'));
    const devices = JSON.parse(localStorage.getItem('__meeting_device'));

    let areas = [
        {
            id: '1',
            name: '北京'
        },
        {
            id: '2',
            name: '上海'
        }
    ];
    const brandAdminRoles = [
        {
            id: '2',
            name: '超级管理员'
        },
        {
            id: '1',
            name: '普通管理员'
        }
    ];
    switch (type) {
        case 'device':
            return Form.create()((props) => {
                const { modalVisible, form, handleModalVisible, values, isEdit } = props;
                const okHandle = (before, after) => {
                    before && before();
                    form.validateFields((err, fieldsValue) => {
                        if (err) return;
                        if(values.id) {
                            fieldsValue.id = values.id;
                        }
                        fetch.post(`${isEdit ? '/api/device/update' : '/api/device/add'}?token=${localStorage.getItem('__meeting_token')}`, {
                            token: localStorage.getItem('__meeting_token'),
                            ...fieldsValue
                        }).then(() => {
                            handleModalVisible(false);
                            after && after();
                            onCreated();
                        }).catch(() => {
                            message.error('修改失败')
                            handleModalVisible(false);
                        });
                    });
                };
                return (
                    <CreateModal
                        title={ isEdit ? '编辑设备' : '新建设备'}
                        visible={modalVisible}
                        onOk={okHandle}
                        okText="确认"
                        cancelText="取消"
                        onCancel={() => handleModalVisible(false)}
                    >
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="设备名称"
                        >
                            {form.getFieldDecorator('name', {
                                rules: [{ required: true, message: '"请输入设备名称' }],
                                initialValue: values.name
                            })(
                                <Input placeholder="请输入设备名称" />
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="描述"
                        >
                            {form.getFieldDecorator('description', {
                                rules: [{ required: false, message: '请输入描述' }],
                                initialValue: values.description || ''
                            })(
                                <Input placeholder="请输入描述" />
                            )}
                        </FormItem>
                    </CreateModal>
                );
            });
        case 'brand':
            return Form.create()((props) => {
                const { modalVisible, form, handleModalVisible, values, isEdit } = props;
                const okHandle = (before, after) => {
                    before && before();
                    form.validateFields((err, fieldsValue) => {
                        if (err) return;
                        if(values.id) {
                            fieldsValue.id = values.id;
                        }
                        fetch.post(`${isEdit ? '/api/brand/update' : '/api/brand/add'}?token=${localStorage.getItem('__meeting_token')}`, {
                            token: localStorage.getItem('__meeting_token'),
                            ...fieldsValue
                        }).then(() => {
                            handleModalVisible(false);
                            after && after();
                            onCreated();
                        }).catch(() => {
                            message.error('修改失败')
                            handleModalVisible(false);
                        });
                    });
                };
                return (
                    <CreateModal
                        title={ isEdit ? '编辑品牌' : '新建品牌'}
                        visible={modalVisible}
                        onOk={okHandle}
                        okText="确认"
                        cancelText="取消"
                        onCancel={() => handleModalVisible(false)}
                    >
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="品牌名称"
                        >
                            {form.getFieldDecorator('name', {
                                rules: [{ required: true, message: '"请输入品牌名称' }],
                                initialValue: values.name
                            })(
                                <Input placeholder="请输入品牌名称" />
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="描述"
                        >
                            {form.getFieldDecorator('description', {
                                rules: [{ required: false, message: '请输入描述' }],
                                initialValue: values.description || ''
                            })(
                                <Input placeholder="请输入描述" />
                            )}
                        </FormItem>
                    </CreateModal>
                );
            });
        case 'division':
            return Form.create()((props) => {
                const { modalVisible, form, handleModalVisible, values, isEdit } = props;
                const okHandle = (before, after) => {
                    before && before();
                    form.validateFields((err, fieldsValue) => {
                        if (err) return;
                        if(values.id) {
                            fieldsValue.id = values.id;
                            fieldsValue.areaId = values.areaId;
                        }
                        fetch.post(`${isEdit ? '/api/division/update' : '/api/division/add'}?token=${localStorage.getItem('__meeting_token')}`, {
                            ...fieldsValue
                        }).then(() => {
                            handleModalVisible(false);
                            after && after();
                            onCreated();
                        }).catch(() => {
                            message.error('修改失败')
                            handleModalVisible(false);
                        });
                    });
                };
                return (
                    <CreateModal
                        title={ isEdit ? '编辑部门' : '新建部门'}
                        visible={modalVisible}
                        onOk={okHandle}
                        okText="确认"
                        cancelText="取消"
                        onCancel={() => handleModalVisible(false)}
                    >
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="品牌ID"
                        >
                            {form.getFieldDecorator('brandId', {
                                rules: [{ required: true, message: '请输入名称' }],
                                initialValue: values.brandId
                            })(
                                <Input placeholder="请输入" />
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="部门名称"
                        >
                            {form.getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入名称' }],
                                initialValue: values.name
                            })(
                                <Input placeholder="请输入" />
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="描述"
                        >
                            {form.getFieldDecorator('remark', {
                                rules: [{ required: true, message: '请输入描述' }],
                                initialValue: values.remark
                            })(
                                <Input placeholder="请输入" />
                            )}
                        </FormItem>
                    </CreateModal>
                );
            });
        case 'admin':
            return Form.create()((props) => {
                const { modalVisible, form, handleModalVisible, values, isEdit } = props;
                const okHandle = (before, after) => {
                    form.validateFields((err, fieldsValue) => {
                        if (err) return;
                        if(values.id){
                            fieldsValue.id = values.id;
                        }
                        fieldsValue.cityIds =fieldsValue.cityIds.join(',');
                        before && before();
                        fetch.post(`${isEdit ? '/api/brandAdmin/update' : '/api/brandAdmin/add'}?token=${localStorage.getItem('__meeting_token')}`, {
                            ...fieldsValue
                        }).then(() => {
                            handleModalVisible(false);
                            onCreated();
                            after && after();
                        }).catch(() => {
                            handleModalVisible(false);
                            after && after();
                            message.error('编辑失败')
                        });
                    });
                };
                return (
                    <CreateModal
                        title="编辑用户"
                        visible={modalVisible}
                        onOk={okHandle}
                        okText="确定"
                        cancelText="取消"
                        onCancel={() => handleModalVisible()}
                    >
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="品牌"
                        >
                            {form.getFieldDecorator('brandId', {
                                rules: [{ required: true, message: '请输入品牌ID' }],
                                initialValue: values.brandId
                            })(
                                <Select style={{ width: 120 }}>
                                    {brands.map(item => <Option value={item.id}>{item.name}</Option>)}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="姓名"
                        >
                            {form.getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入姓名' }],
                                initialValue: values.name
                            })(
                                <Input placeholder="请输入姓名" />
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="域用户名"
                        >
                            {form.getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入域用户名' }],
                                initialValue: values.userName
                            })(
                                <Input placeholder="请输入域用户名" />
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="邮箱"
                        >
                            {form.getFieldDecorator('mail', {
                                rules: [{ required: true, message: '请输入邮箱' }],
                                initialValue: values.mail
                            })(
                                <Input placeholder="请输入邮箱" />
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="联系方式"
                        >
                            {form.getFieldDecorator('tel', {
                                rules: [{ required: false }],
                                initialValue: values.tel
                            })(
                                <Input placeholder="请输入联系方式" />
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="角色"
                        >
                            {form.getFieldDecorator('brandAdminRoleId', {
                                rules: [{ required: true, message: '请选择角色' }],
                                initialValue: '' + (values.brandAdminRoleId || '')
                            })(
                                <Select style={{ width: 130 }} placeholder="请选择角色" >
                                    {brandAdminRoles.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="所属城市"
                        >
                            {form.getFieldDecorator('cityIds', {
                                rules: [{ required: true, message: '请输入区域' }],
                                initialValue: values.cityIds ? values.cityIds.split(',') : []
                            })(
                                <Select mode="multiple" style={{ width: 120 }} placeholder="请输入区域" >
                                    { areas.map((item) => (<Option key={item.id} value={item.id}>{item.name}</Option>)) }
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="职位"
                        >
                            {form.getFieldDecorator('jobPosition', {
                                rules: [{ required: true, message: '请输入职位' }],
                                initialValue: values.jobPosition
                            })(
                                <Input style={{ width: 120 }} placeholder="请输入职位" />

                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="账号状态"
                        >
                            {form.getFieldDecorator('state', {
                                rules: [{ required: true, message: '请输入' }],
                                initialValue: values.state || '1',
                            })(
                                <Select style={{ width: 120 }} placeholder="请输入区域" >
                                    <Option key="1" value="1">正常</Option>
                                    <Option key="2" value="2">禁用</Option>
                                </Select>
                            )}
                        </FormItem>
                    </CreateModal>
                );
            });
        case 'room':
            return Form.create()((props) => {
                const { modalVisible, form, handleModalVisible, values, isEdit } = props;
                const okHandle = (before, after) => {
                    form.validateFields((err, fieldsValue) => {
                        if (err) return;
                        before && before();
                        if(values.id) {
                            fieldsValue.id = values.id;
                        }
                        fieldsValue.deviceIds = fieldsValue.deviceIds.join(',');
                        fetch.post(`${isEdit ? '/api/trainingRoom/update' : '/api/trainingRoom/add'}?token=${localStorage.getItem('__meeting_token')}`, {
                            ...fieldsValue
                        }).then(() => {
                            handleModalVisible(false);
                            after && after();
                            onCreated();
                        }).catch(() => {
                            message.error(isEdit ? '修改失败' : '创建失败')
                            handleModalVisible(false);
                        });
                    });
                };
                return (
                    <CreateModal
                        title={ isEdit ? '编辑会议室' : '新建会议室'}
                        visible={modalVisible}
                        onOk={okHandle}
                        okText="确定"
                        cancelText="取消"
                        onCancel={() => handleModalVisible()}
                    >
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="会议室名称"
                        >
                            {form.getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入会议室名称' }],
                                initialValue: values.name
                            })(
                                <Input placeholder="请输入会议室名称" />
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="英文名称"
                        >
                            {form.getFieldDecorator('enName', {
                                rules: [{ required: true, message: '请输入会议室名称' }],
                                initialValue: values.enName
                            })(
                                <Input placeholder="请输入会议室名称" />
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="品牌"
                        >
                            {form.getFieldDecorator('brandId', {
                                rules: [{ required: true, message: '请输入品牌ID' }],
                                initialValue: values.brandId
                            })(
                                <Select placeholder="选择品牌" style={{ width: 120 }}>
                                    {brands.map(item => <Option value={item.id}>{item.name}</Option>)}
                                </Select>
                            )}
                        </FormItem>
                        {/* <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="邮箱"
                        >
                            {form.getFieldDecorator('mail', {
                                rules: [{ required: true, message: '请输入邮箱' }],
                                initialValue: values.mail
                            })(
                                <Input placeholder="请输入邮箱" />
                            )}
                        </FormItem> */}
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="城市"
                        >
                            {form.getFieldDecorator('cityId', {
                                rules: [{ required: true, message: '请输入区域' }],
                                initialValue: values.cityId
                            })(
                                <Select style={{ width: 120 }} placeholder="请输入城市" >
                                    { areas.map((item) => (<Option key={item.id} value={item.id}>{item.name}</Option>)) }
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="设备"
                        >
                            {form.getFieldDecorator('deviceIds', {
                                rules: [{ required: true, message: '请输入设备' }],
                                initialValue: values.deviceIds ? values.deviceIds.split(',') : []
                            })(
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    placeholder="请选择设备"
                                >
                                    {devices.map(item => (<Option key={item.id} value={'' + item.id}>{item.name}</Option>))}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="容量"
                        >
                            {form.getFieldDecorator('capacity', {
                                rules: [{ required: true, message: '请输入容量' }],
                                initialValue: values.capacity
                            })(
                                <Input placeholder="请输入容量" />
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="所属部门"
                        >
                            {form.getFieldDecorator('divisionId', {
                                rules: [{ required: true, message: '请输入部门' }],
                                initialValue: values.divisionId
                            })(
                                <Select style={{ width: 120 }} placeholder="请输入部门" >
                                    { divisions.map((item) => (<Option key={item.id} value={item.id}>{item.name}</Option>)) }
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="账号状态"
                        >
                            {form.getFieldDecorator('lockState', {
                                rules: [{ required: true, message: '请输入' }],
                                initialValue: values.lockState,
                            })(
                                <Select style={{ width: 120 }} placeholder="请输入账号状态" >
                                    <Option key="0" value="1">未锁定</Option>
                                    <Option key="1" value="2">已锁定</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="备注"
                        >
                            {form.getFieldDecorator('remark', {
                                rules: [{ required: false, message: '请输入备注' }],
                                initialValue: values.remark
                            })(
                                <Input placeholder="请输入备注" />
                            )}
                        </FormItem>
                    </CreateModal>
                );
            });
        case 'festival':
            return Form.create()((props) => {
                const { modalVisible, form, handleModalVisible, values, isEdit } = props;
                const okHandle = (before, after) => {
                    before && before();
                    form.validateFields((err, fieldsValue) => {
                        if (err) return;
                        if(values.id) {
                            fieldsValue.id = values.id;
                        }
                        fetch.post(`${'/api/festival/toggleFestival'}?token=${localStorage.getItem('__meeting_token')}`, {
                            ...fieldsValue
                        }).then(() => {
                            handleModalVisible(false);
                            after && after();
                            onCreated();
                        }).catch(() => {
                            message.error('修改失败')
                            handleModalVisible(false);
                        });
                    });
                };
                return (
                    <CreateModal
                        title={ isEdit ? '编辑品牌' : '新建品牌'}
                        visible={modalVisible}
                        onOk={okHandle}
                        okText="确认"
                        cancelText="取消"
                        onCancel={() => handleModalVisible(false)}
                    >
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="日期"
                        >
                            {form.getFieldDecorator('theDate', {
                                rules: [{ required: true, message: '"请输入品牌名称' }],
                                initialValue: values.theDate
                            })(
                                <DatePicker placeholder="请输入日期" />
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="描述"
                        >
                            {form.getFieldDecorator('description', {
                                rules: [{ required: false, message: '请输入描述' }],
                                initialValue: values.description || ''
                            })(
                                <Input placeholder="请输入描述" />
                            )}
                        </FormItem>
                    </CreateModal>
                );
            });
    }
}