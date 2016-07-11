import React from 'react';
import ReactDOM from 'react-dom';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItem: ['aaa', 'bbb'],
    };
  }
  render() {
    return (
      <div>
        <TodoForm />
        <TodoItem item={this.state.todoItem} />
      </div>
    );
  }
}

const TodoForm = () => {
  return (
    <form>
      <input type="text" />
      <button>送信する</button>
    </form>
  );
};

const TodoItem = (props) => {
  const todoNodes = props.item.map((item, i) => <li key={i}>{item}</li>);
  return (
    <ul>
      {todoNodes}
    </ul>
  );
};

ReactDOM.render(
  <TodoApp />,
  document.querySelector('.content')
);
