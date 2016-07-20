import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Checkbox from 'material-ui/Checkbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      todoItem: [],
      id: 0,
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  getCurrentDate() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();
    return `${currentYear}年${currentMonth}月${currentDay}日`;
  }
  handleInput(e) {
    const newValue = e.target.value;
    this.setState(() => ({ inputValue: newValue }));
  }
  handleSave(e) {
    e.preventDefault();
    const currentItem = this.state.todoItem;
    const newItem = currentItem.concat({
      id: this.state.id,
      itemName: this.state.inputValue.trim(),
      saveTime: this.getCurrentDate(),
      finishTime: null,
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
          if (newItem.finishFlag) {
            newItem.finishTime = this.getCurrentDate();
          } else {
            newItem.finishTime = null;
          }
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
      <MuiThemeProvider>
        <div>
          <TodoForm
            value={this.state.inputValue}
            handleInput={this.handleInput}
            handleSave={this.handleSave}
          />
          <TodoItem
            todoItem={this.state.todoItem}
            handleFinish={this.handleFinish}
            handleDelete={this.handleDelete}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

const TodoForm = (props) => (
  <form>
    <TextField type="text" hintText="ToDo" value={props.value} onChange={props.handleInput} />
    <RaisedButton label="登録する" onClick={props.handleSave} primary />
  </form>
);
TodoForm.propTypes = {
  value: React.PropTypes.string.isRequired,
  handleInput: React.PropTypes.func,
  handleSave: React.PropTypes.func,
};

const TodoItem = (props) => {
  const todoNodes = props.todoItem.map((item) => (
    <Item {...props} item={item} key={item.id} />
  ));
  const style = {
    width: 'calc(100% / 5)',
    textAlign: 'left',
  };
  return (
    <table style={{ width: '100%' }}>
      <ReactCSSTransitionGroup
        component="tbody"
        transitionName="fade"
        transitionAppear={false}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        <tr>
          <th style={style}>Done</th>
          <th style={style}>ToDo</th>
          <th style={style}>登録日</th>
          <th style={style}>完了日</th>
          <th style={style}>削除</th>
        </tr>
        {todoNodes}
      </ReactCSSTransitionGroup>
    </table>
  );
};
TodoItem.propTypes = {
  todoItem: React.PropTypes.array,
};

const Item = (props) => {
  const handleFinish = () => {
    props.handleFinish(props.item.id);
  };
  const handleDelete = (e) => {
    e.preventDefault();
    props.handleDelete(props.item.id);
  };
  const itemName = () => {
    if (props.item.finishFlag) {
      return (<del style={{ color: '#ccc' }}>{props.item.itemName}</del>);
    }
    return props.item.itemName;
  };
  const saveTime = props.item.saveTime;
  const finishTime = (props.item.finishFlag === true) ? props.item.finishTime : '-';
  const checked = (props.item.finishFlag);
  return (
    <tr>
      <td>
        <Checkbox checked={checked} onCheck={handleFinish} />
      </td>
      <td>
        {itemName()}
      </td>
      <td>
        <p><span style={{ color: '#e57373' }}>{saveTime}</span></p>
      </td>
      <td>
        <span style={{ color: '#7986CB' }}>{finishTime}</span>
      </td>
      <td>
        <RaisedButton label="削除する" secondary onClick={handleDelete} />
      </td>
    </tr>
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
