import React from 'react';
import { Input, Form, Button } from 'antd';


const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
}

const buttonItemLayout = {
    wrapperCol: { span: 14, offset: 4 },
};

export default class AddMember extends React.Component {

    state = {
        member: [],
        input: "",
        id: "",
        nama: "",
        image: "",
        status: "tambah"
    }

    componentDidMount() {
        if(this.props.history.location.state) {
            this.setState({
                id: this.props.history.location.state.data.id,
                nama: this.props.history.location.state.data.nama,
                image: this.props.history.location.state.data.image,
                status: this.props.history.location.state.status
            })
        }
    }

    addChange = (nama, value) => {
        this.setState({
            [nama]: value
        })
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

    render() {
        return (
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
            </Form>

        );
    }
}
