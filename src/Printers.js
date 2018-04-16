import React, { Component } from 'react';
import axios from 'axios';
import PrinterList from './PrinterList';
import PrinterForm from './PrinterForm';
// import style from './style';

class Printers extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadPrintersFromServer = this.loadPrintersFromServer.bind(this);
    this.handlePrinterSubmit = this.handlePrinterSubmit.bind(this);
  }
  loadPrintersFromServer() {
    axios.get(this.props.url)
      .then(res => {
        this.setState({ data: res.data });
      })
  }
  handlePrinterSubmit(printer) {
    let printers = this.state.data;
    printer.cssId = printers.cssId;
    let newPrinters = printers.concat([printer]);
    this.setState({ data: newPrinters });
    axios.post(this.props.url, printer)
      .catch(err => {
        console.error(err);
        this.setState({ data: printers });
      });
  }
  componentDidMount() {
    this.loadPrintersFromServer();
    setInterval(this.loadPrintersFromServer, this.props.pollInterval);
  }
  render() {
    return (
      <div id=''>
        <h2>Printers:</h2>
      <PrinterList data={ this.state.data }/>
      <PrinterForm onPrinterSubmit={ this.handlePrinterSubmit }/>
      </div>
    )
  }
}

export default Printers;

