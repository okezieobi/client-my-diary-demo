/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import Hidden from '@material-ui/core/Hidden';
import { useHistory } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';
import { makeStyles } from '@material-ui/core/styles';

import Dashboard from '../layouts/Dashboard';
import HomeFab from '../layouts/Fab';
import DashboardBG from '../../images/Home_Dash.svg';
import authServices from '../../services/Auth';
import env from '../../utils/env';

const useStyles = makeStyles(() => ({
  backdrop: {
    backgroundImage: `url(${DashboardBG})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    width: '100%',
    height: '100vh',
    backgroundSize: 'cover',
  },
}));

export default function () {
  const [tableData, setData] = useState([]);
  const history = useHistory();
  const classes = useStyles();

  const auth = authServices.useAuth();

  const handleRowClick = (row = []) => {
    const clickedRow = JSON.stringify(row);
    localStorage.setItem('clickedRow', clickedRow);
    history.push('/home/entry');
  };

  const handleFabClick = () => {
    history.push('/home/entry/compose');
  };

  const columns = ['title', 'body', 'created on', 'updated on'];
  const options = {
    filterType: 'checkbox',
    onRowClick: (rowData) => handleRowClick(rowData),
  };

  const reqURL = env.backendAPI('entries');

  useEffect(() => {
    auth.getResource(reqURL)
      .then(({ data }) => {
        const rowData = data.entries.map(
          ({
            title, body, createdAt, updatedAt,
          }) => ([title, body, Date(createdAt), Date(updatedAt)]),
        ) || [];
        setData(rowData);
      }).catch((err) => { throw err; });
  }, [reqURL, history, auth]);

  return (
    <>
      <Dashboard homeSelect>
        <div className={classes.backdrop}>
          <MUIDataTable
            title="Entries"
            columns={columns}
            options={options}
            data={tableData}
          />
          <Hidden implementation="css" smUp>
            <HomeFab handleClick={handleFabClick} />
          </Hidden>
        </div>
      </Dashboard>
    </>
  );
}
