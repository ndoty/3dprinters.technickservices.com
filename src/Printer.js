import React, { Component } from 'react';
// import style from './style';
import marked from 'marked';

class Printer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toBeUpdated: false,
      cssId: '',
      printerName: '',
      url: '',
      apiKey: ''
    };
    //binding all our functions to this class
    this.deletePrinter = this.deletePrinter.bind(this);
    this.updatePrinter = this.updatePrinter.bind(this);    
    this.handleCssIdChange = this.handleCssIdChange.bind(this);
    this.handlePrinterNameChange = this.handlePrinterNameChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleApiKeyChange = this.handleApiKeyChange.bind(this);
    this.handlePrinterUpdate = this.handlePrinterUpdate.bind(this);
  }
  updatePrinter(e) {
    e.preventDefault();
    //brings up the update field when we click on the update link.
    this.setState({ toBeUpdated: !this.state.toBeUpdated });
  }
  handlePrinterUpdate(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    let cssId = (this.state.cssId) ? this.state.cssId : null;
    let printerName = (this.state.printerName) ? this.state.printerName : null;
    let url = (this.state.url) ? this.state.url : null;
    let apiKey = (this.state.apiKey) ? this.state.apiKey : null;

    let printer = {
      cssId: cssId,
      printerName: printerName,
      url: url,
      apiKey: apiKey
    };

    this.props.onPrinterUpdate(id, printer);
    this.setState({
      toBeUpdated: !this.state.toBeUpdated,
      cssId: '',
      printerName: '',
      url: '',
      apiKey: ''
    })
  }
  deletePrinter(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onPrinterDelete(id);
    console.log('oops deleted');
  }
  handleCssIdChange(e) {
    this.setState({ cssId: e.target.value });
  }
  handlePrinterNameChange(e) {
    this.setState({ printerName: e.target.value });
  }
  handleUrlChange(e) {
    this.setState({ url: e.target.value });
  }
  handleApiKeyChange(e) {
    this.setState({ apiKey: e.target.value });
  }
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }
  render() {
    return (
      <div id={ this.props.cssId }>
        <h3>{this.props.printerName}</h3>
        <span dangerouslySetInnerHTML={ this.rawMarkup() } />
        <a href='#' onClick={ this.updatePrinter }>update</a>
        <a href='#' onClick={ this.deletePrinter }>delete</a>
        { (this.state.toBeUpdated)
          ? (<form onSubmit={ this.handlePrinterUpdate }>
              <input
                type='text'
                placeholder='Update ID...'
                value={ this.state.cssId }
                onChange={ this.handleCssIdChange } />
              <input
                type='text'
                placeholder='Update Name...'
                value={ this.state.printerName }
                onChange={ this.handlePrinterNameChange } />
              <input
                type='text'
                placeholder='Update Urlt...'
                value={this.state.url}
                onChange={this.handleUrlChange} />
              <input
                type='text'
                placeholder='Update API Key...'
                value={this.state.apiKey}
                onChange={this.handleApiKeyChange} />
              <input
                type='submit'
                value='Update' />
            </form>)
          : null}
      </div>
    )
  }
}

export default Printer;
