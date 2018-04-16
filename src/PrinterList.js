import React, { Component } from 'react';
import Printer from './Printer';
// import style from './style';

class PrinterList extends Component {
  render() {
    let printerNodes = this.props.data.map(printer => {
      return (
        <Printer
          printerName={printer.printerName}
          uniqueID={printer['_id']}
          onPrinterDelete={this.props.onPrinterDelete}
          onPrinterUpdate={this.props.onPrinterUpdate}
          key={printer.id}>
          {printer.cssId}
          {printer.url}
          {printer.apiKey}
        </Printer>
      )
    })
    return (
      <div>
        {printerNodes}
        {printerNodes.cssId}
        {printerNodes.printerName}
        {printerNodes.url}
        {printerNodes.apiKey}
      </div>
    )
  }
}

export default PrinterList;
