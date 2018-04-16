import React, { Component } from 'react';
import axios from 'axios';
import PrinterList from './PrinterList';
import PrinterForm from './PrinterForm';
// import style from './style';

class PrinterBox extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
        this.loadPrintersFromServer = this.loadPrintersFromServer.bind(this);
        this.handlePrinterSubmit = this.handlePrinterSubmit.bind(this);
        this.handlePrinterDelete = this.handlePrinterDelete.bind(this);
        this.handlePrinterUpdate = this.handlePrinterUpdate.bind(this);
        this.pollInterval = null;
    }
    loadPrintersFromServer() {
        axios.get(this.props.url)
            .then(res => {
                this.setState({ data: res.data });
            })
    }
    handlePrinterSubmit(printer) {
        let printers = this.state.data;
        printer.id = Date.now();
        let newPrinters = printers.concat([printer]);
        this.setState({ data: newPrinters });
        axios.post(this.props.url, printer)
            .catch(err => {
                console.error(err);
                this.setState({ data: printers });
            });
    }
    handlePrinterDelete(id) {
        axios.delete(`${this.props.url}/${id}`)
            .then(res => {
                console.log('Printer deleted');
            })
            .catch(err => {
                console.error(err);
            });
    }
    handlePrinterUpdate(id, printer) {
        //sends the printer id and new author/text to our api
        axios.put(`${this.props.url}/${id}`, printer)
            .catch(err => {
                console.log(err);
            })
    }
    componentDidMount() {
        this.loadPrintersFromServer();
        if (!this.pollInterval) {
            this.pollInterval = setInterval(this.loadPrintersFromServer, this.props.pollInterval)
        }
    }
    //when incorporating into another project
    //(with react-router for instance),
    //this will prevent error messages every 2 seconds
    //once the PrinterBox is unmounted
    componentWillUnmount() {
        this.pollInterval && clearInterval(this.pollInterval);
        this.pollInterval = null;
    }
    render() {
        return (
            <div>
                <h2>Printers:</h2>
                <PrinterList
                    onPrinterDelete={this.handlePrinterDelete}
                    onPrinterUpdate={this.handlePrinterUpdate}
                    data={this.state.data} />
                <PrinterForm onPrinterSubmit={this.handlePrinterSubmit} />
            </div>
        )
    }
}

export default PrinterBox;
