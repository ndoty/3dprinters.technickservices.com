import React, { Component } from 'react';
// import style from './style';

class PrinterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {cssId: '', printerName: '', url: '', apiKey: ''}
    this.handleCssIdChange = this.handleCssIdChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleApiKeyChange = this.handleApiKeyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleCssIdChange(e) {
    this.setState({ cssId: e.target.value });
    console.log('cssId:    ' + e.target.value);
  }
  handleNameChange(e) {
    this.setState({ printerName: e.target.value });
    console.log('printerName:    ' + e.target.value);
  }
  handleUrlChange(e) {
    this.setState({ url: e.target.value });
    console.log('url:    ' + e.target.value);
  }
  handleApiKeyChange(e) {
    this.setState({ apiKey: e.target.value });
    console.log('apiKey:    ' + e.target.value);
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(`Data cssId: ${this.state.cssId} name: ${this.state.name} url: ${this.state.url} apiKey: ${this.state.apiKey}`)
    }
  render(){
    return(
      <form onSubmit={ this.handleSubmit }>
        <input
          type='text'
          placeholder='CSS/Printer ID'
          value={ this.state.cssId }
          onChange={ this.handleCssIdChange } />
        <input
          type='text'
          placeholder='Name of Printer'
          value={this.state.printerName}
          onChange={this.handleNameChange} />
        <input
          type='text'
          placeholder='OctoPrint Url for Printer'
          value={this.state.url}
          onChange={this.handleUrlChange} />
        <input
          type='text'
          placeholder='OctoPrint API Key for Printer'
          value={this.state.apiKey}
          onChange={this.handleApiKeyChange} />
        <input
          type='submit'
          value='Add Printer' />
      </form>
    )
  }
}
export default PrinterForm;