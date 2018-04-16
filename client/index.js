import React from 'react';
import ReactDOM from 'react-dom';

class AddPrinter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      newPrinter: ''
    }

    this.updateNewPrinter = this.updateNewPrinter.bind(this)
    this.handleAddNew = this.handleAddNew.bind(this)
  }
  updateNewPrinter(e) {
    this.setState({
      newPrinter: e.target.value
    })
  }
  handleAddNew() {
    this.props.addNew(this.state.newPrinter)
    this.setState({
      newPrinter: ''
    })
  }
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.newPrinter}
          onChange={this.updateNewPrinter}
        />
        <button onClick={this.handleAddNew}> Add Printer </button>
      </div>
    )
  }
}

class ShowPrinters extends React.Component {
  render() {
    return (
      <div>
        <h3> Printers </h3>
        <ul>
          {this.props.names.map((Printer) => {
            return <li> {Printer} </li>
          })}
        </ul>
      </div>
    )
  }
}

class PrintersContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: 'TechNick Services 3D Printing!',
      Printers: [
        'mk2',
        'mk22',
        'mk23',
        'mk24',
      ],
    }

    this.addPrinter = this.addPrinter.bind(this)
  }
  addPrinter(Printer) {
    this.setState((state) => ({
      Printers: state.Printers.concat([Printer])
    }))
  }
  render() {
    return (
      <div>
        <h3>{this.state.name} </h3>
        <AddPrinter addNew={this.addPrinter} />
        <ShowPrinters names={this.state.Printers} />
      </div>
    )
  }
}

ReactDOM.render(<PrintersContainer />, document.getElementById('root'));
