import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      todoItem: [],
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  handleInput(e) {
    e.preventDefault();
    const newValue = e.target.value;
    this.setState(() => ({ inputValue: newValue }));
  }
  handleSave(e) {
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
        <TodoForm
          value={this.state.inputValue}
          handleInput={this.handleInput}
          handleSave={this.handleSave}
        />
        <TodoItem todoItem={this.state.todoItem} />
      </div>
    );
  }
}

const TodoForm = (props) => (
  <form>
    <input type="text" value={props.value} onChange={props.handleInput} />
    <button onClick={props.handleSave}>登録する</button>
  </form>
);
TodoForm.propTypes = {
  value: React.PropTypes.string,
  handleInput: React.PropTypes.func,
  handleSave: React.PropTypes.func,
};

const TodoItem = (props) => {
  const todoNodes = props.todoItem.map((item, i) => <li key={i}>{item}</li>);
  return (
    <ul>
      <ReactCSSTransitionGroup
        transitionName="fade"
        transitionAppear
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
      {todoNodes}
      </ReactCSSTransitionGroup>
    </ul>
  );
};
TodoItem.propTypes = {
  todoItem: React.PropTypes.array,
};

ReactDOM.render(
  <TodoApp />,
  document.querySelector('.content')
);
