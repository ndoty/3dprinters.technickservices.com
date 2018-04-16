import React from 'react';
import ReactDOM from 'react-dom';
import PrinterBox from './PrinterBox';

ReactDOM.render(
  <PrinterBox
    url='http://localhost:3001/api/printers'
    pollInterval={20000} />,
  document.getElementById('root')
);
