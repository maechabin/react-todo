import React from 'react';
import ReactDOM from 'react-dom';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      todoItem: [],
      id: 0,
    };
    this.onChange = this.onChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  onChange(e) {
    e.preventDefault();
    const newValue = e.target.value;
    this.setState(() => ({ inputValue: newValue }));
  }
  handleSave(e) {
    e.preventDefault();
    const currentItem = this.state.todoItem;
    const newItem = currentItem.concat({
      id: this.state.id,
      itemName: this.state.inputValue.trim(),
      saveTime: new Date().getTime(),
      finishTime: NaN,
      finishFlag: false,
    });
    if (!this.state.inputValue) {
      return;
    }
    this.setState(() => ({
      inputValue: '',
      todoItem: newItem,
      id: this.state.id + 1,
    }));
  }
  handleFinish(id) {
    this.setState((currentState) => ({
      todoItem: currentState.todoItem.map((item) => {
        const newItem = item;
        if (id === item.id) {
          newItem.finishFlag = true;
        }
        return newItem;
      }),
    }));
  }
  handleDelete(id) {
    const currentItem = this.state.todoItem;
    const newItem = currentItem.filter((item) => (id !== item.id));
    this.setState(() => ({
      todoItem: newItem,
    }));
  }
  render() {
    return (
      <div>
        <TodoForm
          value={this.state.inputValue}
          onChange={this.onChange}
          handleSave={this.handleSave}
        />
        <TodoItem
          item={this.state.todoItem}
          handleFinish={this.handleFinish}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

const TodoForm = (props) => {
  return (
    <form>
      <input type="text" value={props.value} onChange={props.onChange} />
      <button onClick={props.handleSave}>登録する</button>
    </form>
  );
};
TodoForm.propTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func,
  handleSave: React.PropTypes.func,
};

const TodoItem = (props) => {
  const todoNodes = props.item.map((item) => (
    <Item {...props} item={item} key={item.id} />
  ));
  return (
    <ul>{todoNodes}</ul>
  );
};
TodoItem.propTypes = {
  item: React.PropTypes.array,
};

const Item = (props) => {
  const handleFinish = (e) => {
    e.preventDefault();
    props.handleFinish(props.item.id);
  };
  const handleDelete = (e) => {
    e.preventDefault();
    props.handleDelete(props.item.id);
  };
  return (
    <li>
      {props.item.itemName}
      <button onClick={handleFinish}>完了</button>
      <button onClick={handleDelete}>削除</button>
    </li>
  );
};
Item.propTypes = {
  item: React.PropTypes.object,
  handleFinish: React.PropTypes.func,
  handleDelete: React.PropTypes.func,
};

ReactDOM.render(
  <TodoApp />,
  document.querySelector('.content')
);
