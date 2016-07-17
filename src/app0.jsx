import React from 'react';
import ReactDOM from 'react-dom';

class HelleWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: props.data,
      world: 'world',
      checked: false,
    };
    this.onchange = this.onchange.bind(this);
  }
  componentWillMount() {
    this.setState({
      world: 'react',
    });
  }
  onchange(e) {
    const check = (this.state.checked) ? false : true;
    this.setState({
      checked: check,
    });
  }
  render() {
    return (
      <div>
        <div>{this.state.hello} {this.state.world}</div>
        <Input check={this.state.checked} onchange={this.onchange} />
      </div>
    );
  }
}

const Input = (props) => (
  <input type="checkbox" checked={props.check} onChange={props.onchange} />
);

ReactDOM.render(
  <HelleWorld data="hello" />,
  document.querySelector('.content')
);
