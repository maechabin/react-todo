import React from 'react';
import ReactDOM from 'react-dom';

class HelleWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: props.data,
      world: 'world',
    };
  }
  componentWillMount() {
    this.setState({
      world: 'react',
    });
  }
  render() {
    return (
      <div>{this.state.hello} {this.state.world}</div>
    );
  }
}

ReactDOM.render(
  <HelleWorld data="hello" />,
  document.querySelector('.content')
);
