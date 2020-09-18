import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import { useHistory } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';
import { makeStyles } from '@material-ui/core/styles';

import Dashboard from '../layouts/Dashboard';
import HomeFab from '../layouts/Fab';
import DashboardBG from '../../images/Home_Dash.svg';

const useStyles = makeStyles(() => ({
  backdrop: {
    backgroundImage: `url(${DashboardBG})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
  },
}));

export default function () {
  const history = useHistory();
  const classes = useStyles();

  const handleRowClick = (row = []) => {
    const clickedRow = JSON.stringify(row);
    localStorage.setItem('clickedRow', clickedRow);
    history.push('/home/entry');
  };

  const handleFabClick = () => {
    history.push('/home/entry/compose');
  };

  const columns = ['title', 'body', 'created on', 'updated on'];
  const data = [
    ['test title 1', 'test body 1', 'created on 1', 'updated on 1'],
    ['test title 2', 'test body 2', 'created on 2', 'updated on 2'],
    ['test title 3', 'test body 3', 'created on 3', 'updated on 3'],
    ['test title 4', 'test body 4', 'created on 4', 'updated on 4'],
  ];
  const options = {
    filterType: 'checkbox',
    onRowClick: (rowData) => handleRowClick(rowData),
  };

  return (
    <>
      <Dashboard homeSelect>
        <div className={classes.backdrop}>
          <MUIDataTable
            title="Entries"
            columns={columns}
            options={options}
            data={data}
          />
          <Hidden implementation="css" smUp>
            <HomeFab handleClick={handleFabClick} />
          </Hidden>
        </div>
      </Dashboard>
    </>
  );
}
