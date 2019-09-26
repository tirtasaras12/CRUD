import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Form, Button, Row, Col, Table, Modal } from 'antd';

const { Search } = Input;

const buttonItemLayout = {
    wrapperCol: { span: 14, offset: 4 },
};

export default class ListMember extends React.Component {

    state = {
        member: [],
        input: "",
        id: "",
        nama: "",
        image: "",
        status: "tambah",
    }

    componentDidMount() {
        this.getArtist()
    }

    async getArtist() {
        const response = await fetch('http://10.1.17.192:3000/artist')
        const myJson = await response.json();
        this.setState({ member: myJson })
    }

    handleChange = (event) => {
        this.setState({ input: event.target.value })
    }

    handleSubmit = async () => {
        const { input } = this.state;
        const response = await fetch("http://10.1.17.192:3000/artist?nama=" + input)
        const myJson = await response.json();
        this.setState({ member: myJson })
    }

    addItem = () => {
        this.setState({ show: !this.state.show })
    }

    showConfirm = id => {
        const { confirm } = Modal;
        confirm({
            title: 'Do you want to delete these items?',
            content: 'When clicked the OK button, this dialog will be closed after 1 second',
            onOk: () => this.deleteItem(id),
            onCancel() { },
        });
    }

    deleteItem = async (id) => {
        const response = await fetch('http://10.1.17.192:3000/artist/' + id, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        return await response.json();
    }

    render() {
        const { member } = this.state;

        const columns = [
            {
                title: 'Name',
                dataIndex: 'nama',
            },
            {
                title: 'Image',
                dataIndex: 'image',
                render: (text, record, index) =>
                    <img className="img" src={text} alt="" />
            },

            {
                title: 'Edit',
                dataIndex: 'edit',
                render: (text, record, index) => {
                    return (
                        <div>
                            {/* <Button type="primary" icon="edit" onClick={() => null}>Update</Button> */}
                            <Link to={{
                                pathname: "/add",
                                state: {
                                    data: record,
                                    status: "edit"
                                }
                            }}>
                                <Button type="primary" icon="edit" onClick={() => null}>Update</Button>
                            </Link>
                            <Button type="danger" icon="delete" onClick={() => this.showConfirm(record.id)} >Delete</Button>
                        </div>
                    )
                }
            }
        ];
        return (
            <div>
                <Form layout="horizontal">
                    <Row>
                        <Col span={20}>
                            <Search placeholder="Search" onChange={this.handleChange} onSearch={value => this.handleSubmit()} enterButton />
                        </Col>
                        <Col span={1}></Col>
                        <Col span={3}>
                            <Link to="/add">
                                <Button type="primary">
                                    Add Data
                            </Button>
                            </Link>
                        </Col>
                    </Row>
                </Form>
                <Table columns={columns} dataSource={member} size="middle" />
            </div>
        );
    }
}