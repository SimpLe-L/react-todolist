import React, { Component } from 'react'
import Button from 'antd/es/button'
import 'antd/es/button/style/css'

class Items extends Component<any,any> {
    constructor(props:any) {
        super(props)
        this.deleteItem = this.deleteItem.bind(this)
        this.changeItem = this.changeItem.bind(this)
    }
    render() {
        return (
            <li key={this.props.index}><span>☆{this.props.content}</span>
                <Button className='btn' type="primary" onClick={this.deleteItem}>删除</Button>
                <Button className='btn' type="primary" onClick={this.changeItem}>修改</Button>
            </li>
        )
    }
    deleteItem() {
        const { handleDelete, index } = this.props;
        handleDelete(index)
    }
    changeItem() {
        const { handleRewrite, index } = this.props;
        handleRewrite(index)
    }
}

export default Items;