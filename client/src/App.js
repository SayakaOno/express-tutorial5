import React from 'react';
import './app.css';

class App extends React.Component {
  state = {
    cow: '',
    text: ''
  };

  componentDidMount() {
    this.fetchCow();
  }

  fetchCow = async () => {
    const response = await fetch('/api/cow');
    const initialCow = await response.json();
    const cow = initialCow.moo;
    this.setState({ cow });
  };

  customCow = async e => {
    e.preventDefault();
    const text = this.state.text;
    const response = await fetch(`/api/cow/${text}`);
    const custom = await response.json();
    const cow = custom.moo;
    this.setState({ cow, text: '' });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.text);
  };

  render() {
    return (
      <div className='App'>
        <h3>Text Cow. Moo</h3>
        <code>{this.state.cow}</code>
        <form onSubmit={this.customCow}>
          <label>Custom Cow Text:</label>
          <input
            type='text'
            name='text'
            value={this.state.text}
            onChange={this.handleChange}
          />
          <button type='submit'>Show me a talking cow!</button>
        </form>
      </div>
    );
  }
}

export default App;
