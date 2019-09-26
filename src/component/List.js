import React from 'react';
import { Table, Button, Icon, Modal } from 'antd';

export default class InputForm extends React.Component {

    showConfirm = id => {
        const { confirm } = Modal;
        confirm({
            title: 'Do you want to delete these items?',
            content: 'When clicked the OK button, this dialog will be closed after 1 second',
            onOk() {
                this.deleteItem(id)
            },
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
        let { daftar, value } = this.props
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
                            <Button type="primary" icon="edit" onClick={() => value(record)}>Update</Button>
                            <Button type="danger" icon="delete" onClick={() => this.showConfirm(record.id)} >Delete</Button>
                        </div>
                    )
                }
            }
        ];
        return (
            <div>
                <Table columns={columns} dataSource={daftar} size="middle" />
                {/* <ul>
                    {daftar.map((exo, i) => {
                        return(
                            <li key={i}>
                                <img src={exo.image} alt=""/>
                                {exo.nama}
                            </li>
                        )
                    }

                    )}
                </ul> */}
            </div>
        );
    }
}