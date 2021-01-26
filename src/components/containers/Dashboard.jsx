/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import Hidden from '@material-ui/core/Hidden';
import { useHistory } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';
import { makeStyles } from '@material-ui/core/styles';

import Dashboard from '../templates/Dashboard';
import HomeFab from '../templates/Fab';
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
    const entryId = JSON.stringify(row[0]);
    localStorage.setItem('entryId', entryId);
    history.push('/entry');
  };

  const handleFabClick = () => {
    history.push('/compose');
  };

  const columns = [
    {
      name: 'id',
      label: 'Id',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'title',
      label: 'Title',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'body',
      label: 'Body',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'createdOn',
      label: 'Created On',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'updatedAt',
      label: 'Updated At',
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

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
            title, body, createdOn, updatedAt, id,
          }) => ([id, title, body, Date(createdOn), Date(updatedAt)]),
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
