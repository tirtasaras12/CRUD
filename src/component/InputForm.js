import React from 'react';
import List from './List';
import { Input, Form, Button, Row, Col } from 'antd';

const { Search } = Input;

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
};

const buttonItemLayout = {
    wrapperCol: { span: 14, offset: 4 },
};

export default class InputForm extends React.Component {

    state = {
        member: [],
        input: "",
        id: "",
        nama: "",
        image: "",
        status: "tambah"
    }

    componentDidMount() {
        this.getArtist()
    }

    updateItem = async () => {
        const data = {
            nama: this.state.nama,
            image: this.state.image
        }

        const response = await fetch('http://10.1.17.192:3000/artist/' + this.state.id, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return await response.json();
    }

    addItem = async () => {
        const data = {
            nama: this.state.nama,
            image: this.state.image
        }
        const response = await fetch('http://10.1.17.192:3000/artist', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return await response.json();
    }


    addChange = (nama, value) => {
        this.setState({
            [nama]: value
        })
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

    // shouldComponentUpdate(nextProps,nextState){
    //     if(nextState.member !== this.state.member) {
    //         return true
    //     }
    //     return false;
    // }

    render() {
        let { input, member } = this.state
        return (
            <div>
                <Form layout="horizontal" > {/* onSubmit={this.addItem} */}
                    <Form.Item label="Nama" {...formItemLayout}>
                        <Input placeholder="Type here" onChange={event => this.addChange('nama', event.target.value)} value={this.state.nama} />
                    </Form.Item>
                    <Form.Item label="Image" {...formItemLayout}>
                        <Input placeholder="Type here" onChange={event => this.addChange('image', event.target.value)} value={this.state.image} />
                    </Form.Item>
                    <Form.Item {...buttonItemLayout}>
                        {/* <Button htmlType="submit" type="primary">Add Data</Button> */}
                        {
                            this.state.status == "tambah" ?
                                <Button htmlType="button" type="primary" onClick={this.addItem}>Add Data</Button>
                                :
                                <Button htmlType="button" type="primary" onClick={this.updateItem}>Update Data</Button>
                        }

                    </Form.Item>
                    <Row>
                        <Col span={12} offset={6}>
                            <Search placeholder="input search text" onChange={this.handleChange} onSearch={value => this.handleSubmit()} enterButton />
                        </Col>
                    </Row>
                </Form>

                {/* <input type="text" placeholder="Type Here" onChange={this.handleChange} value={input} /> */}
                {/* <button type="submit" onClick={this.handleSubmit}>OK</button><br /> */}
                {/* <form>
                    Name: <input type="text" onChange={event => this.addChange('nama', event.target.value)} value={this.state.nama} /><br />
                    Images: <input type="tex" onChange={event => this.addChange('image', event.target.value)} value={this.state.image} /><br />
                    <button
                        onClick={this.addItem}>
                        Add
                    </button>
                </form> */}
                <List daftar={member} value={(record) => {
                    this.setState({
                        id: record.id,
                        nama: record.nama,
                        image: record.image,
                        status: "edit"
                    })
                }} />
            </div>
        );
    }
}