import React from 'react';

import Dashboard from '../templates/Dashboard';
import Form from '../templates/Form';

export default function Compose() {
  const rowData = JSON.parse(localStorage.getItem('clickedRow'));
  return (
    <Dashboard homeSelect>
      <Form title={rowData ? rowData[0] : ''} body={rowData ? rowData[1] : ''} />
    </Dashboard>
  );
}
