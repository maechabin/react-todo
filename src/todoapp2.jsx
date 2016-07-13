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
      itemName: this.state.inputValue,
      saveTime: new Date().getTime(),
      finishTime: NaN,
      finishFlag: false,
    });
    this.setState(() => ({
      inputValue: '',
      todoItem: newItem,
      id: this.state.id + 1,
    }));
  }
  handleFinish(e) {
    const currentItem = this.state.todoItem;
    console.log(currentItem);
  }
  handleDelete(e) {
    e.preventDefault();
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
  value: React.PropTypes.string,
  onChange: React.PropTypes.func,
  handleSave: React.PropTypes.func,
};

const TodoItem = (props) => {
  const handleFinish = (e) => {
    e.preventDefault();
    console.log(props.item);
    props.handleFinish(props);
  }
  const todoNodes = props.item.map((item) => (
    <li key={item.id}>
      {item.itemName}
      <button onClick={handleFinish}>完了</button>
      <button onClick={props.handleDelete}>削除</button>
    </li>
  ));
  return (
    <ul>
      {todoNodes}
    </ul>
  );
};
TodoItem.propTypes = {
  item: React.PropTypes.array,
  handleFinish: React.PropTypes.func,
  handleDelete: React.PropTypes.func,
};

ReactDOM.render(
  <TodoApp />,
  document.querySelector('.content')
);
