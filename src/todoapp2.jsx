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
          newItem.finishFlag = newItem.finishFlag !== true;
          newItem.finishTime =
            `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`;
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
          todoItem={this.state.todoItem}
          handleFinish={this.handleFinish}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

const TodoForm = (props) => (
  <form>
    <input type="text" value={props.value} onChange={props.onChange} />
    <button onClick={props.handleSave}>登録する</button>
  </form>
);
TodoForm.propTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func,
  handleSave: React.PropTypes.func,
};

const TodoItem = (props) => {
  const todoNodes = props.todoItem.map((item) => (
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
  const itemName = () => {
    if (props.item.finishFlag) {
      return (<del>{props.item.itemName}</del>);
    }
    return props.item.itemName;
  };
  const finishTime = (props.item.finishFlag === true) ? props.item.finishTime : '';
  return (
    <li>
      <label>
        <input type="checkbox" checked={props.item.finishFlag} onChange={handleFinish} />
        {itemName()}
        {finishTime}
      </label>
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
