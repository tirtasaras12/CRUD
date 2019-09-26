import React from 'react';

export default class Form extends React.Component {
    addItem = (member, i) => {
        this.props.addMember(member, i);
    }

    render() {
        return (
            <form>
                Nama: <input type="text" /><br />
                Image: <input type="text" /><br />
                {/* <button onClick={this.addItem(member, i)}
                    key={i}>ADD
                </button> */}
            </form>
        );
    }
}