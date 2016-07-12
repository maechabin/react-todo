import React from 'react';
import ReactDOM from 'react-dom';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      todoItem: [],
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  onChange(e) {
    e.preventDefault();
    const newValue = e.target.value;
    this.setState(() => ({ inputValue: newValue }));
  }
  onClick(e) {
    e.preventDefault();
    const currentItem = this.state.todoItem;
    const newItem = currentItem.concat([this.state.inputValue]);
    this.setState(() => ({
      inputValue: '',
      todoItem: newItem,
    }));
  }
  render() {
    return (
      <div>
        <TodoForm value={this.state.inputValue} onChange={this.onChange} onClick={this.onClick} />
        <TodoItem item={this.state.todoItem} />
      </div>
    );
  }
}

const TodoForm = (props) => {
  return (
    <form>
      <input type="text" value={props.value} onChange={props.onChange} />
      <button onClick={props.onClick}>送信する</button>
    </form>
  );
};
TodoForm.propTypes = {
  value: React.PropTypes.string,
  onChange: React.PropTypes.func,
  onClick: React.PropTypes.func,
};

const TodoItem = (props) => {
  const todoNodes = props.item.map((item, i) => <li key={i}>{item}</li>);
  return (
    <ul>
      {todoNodes}
    </ul>
  );
};
TodoItem.propTypes = {
  item: React.PropTypes.array,
};

ReactDOM.render(
  <TodoApp />,
  document.querySelector('.content')
);
