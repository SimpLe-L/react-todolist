import React, { Component } from 'react'
import Items from './items'
import Button from 'antd/es/button'
import 'antd/es/button/style/css'
import Input from 'antd/es/input'
import 'antd/es/input/style/css'

class Todolist extends Component<any,any> {
    constructor(props:any) {
        super(props)
        this.state = {
            inputVal: '',
            list: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.addItem = this.addItem.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.changeItem = this.changeItem.bind(this)
    }
    componentDidMount() {
        let todolist:any = window.sessionStorage.getItem('todolist')
        if (todolist === null) {
            todolist = []
        } else {
            todolist = todolist.split(',')
        }
        this.setState({
            list: todolist
        })
    }
    render() {
        return (
            <div className='main'>

                <div className='child'>
                    <h2>My To-do list</h2>
                    <div className='add'>
                        <Input
                            style={{ width: '335px' }}
                            placeholder="what do u want to do"
                            value={this.state.inputVal}
                            onChange={this.handleChange}
                        />
                        <Button data-testid='btn' type="primary" onClick={this.addItem}>添加</Button>
                    </div>
                    <ul data-testid='myul'>
                        {this.showItems()}
                    </ul>
                </div>
            </div>
        )
    }

    showItems() {
        return this.state.list.map((item:any, index:any) => {
            return (
                <Items
                    key={index}
                    content={item}
                    index={index}
                    handleDelete={this.deleteItem}
                    handleRewrite={this.changeItem}
                />
            )
        })
    }

    handleChange(e:any) {
        const value = e.target.value
        this.setState(() => {
            return { inputVal: value }
        })
    }

    addItem() {
        this.setState((prevState:any) => ({
            list: [...prevState.list, prevState.inputVal],
            //list:[...this.state.list,this.state.inputVal]
            inputVal: ''
        }), () => {
            window.sessionStorage.setItem('todolist', this.state.list)
        })
    }

    deleteItem(index:any) {
        // let list = [...this.state.list]
        // list.splice(index, 1)
        this.setState((prevState:any) => {
            const list = [...prevState.list]
            list.splice(index, 1)
            return { list: list }
        }, () => {
            window.sessionStorage.setItem('todolist', this.state.list)
        })
    }
    changeItem(index:any) {

        this.setState((prevState:any) => {
            const list = [...prevState.list]
            let getVal = window.prompt('请输入新值');
            if (getVal !== null && getVal !== '') {
                list.splice(index, 1, getVal)
            } else {
                alert('不能为空')
            }
            return { list: list }
        }, () => {
            window.sessionStorage.setItem('todolist', this.state.list)
        })
    }
}

export default Todolist;