/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import Hidden from '@material-ui/core/Hidden';
import { useHistory, Redirect } from 'react-router-dom';
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
  const [tableData, setData] = useState([]);
  const [fetchErr, setFetchErr] = useState('');
  const [isAuth, setAuth] = useState(true);
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
  const options = {
    filterType: 'checkbox',
    onRowClick: (rowData) => handleRowClick(rowData),
  };

  const reqURL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api/v1/entries' : 'https://diary-app-demo.herokuapp.com/api/v1/entries';

  useEffect(() => {
    fetch(reqURL, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      credentials: 'include',
    }).then((response) => response.json())
      .then(({ error, data }) => {
        if (error) {
          if (error.messages) {
            console.log(document.cookie.token);
            setFetchErr(error.messages[error.messages.length - 1].msg);
            // setAuth(false);
          } else if (error.message) {
            setFetchErr(error.message);
            setAuth(false);
          }
        } else {
          const rowData = data.entries.map(
            ({
              title, body, createdAt, updatedAt,
            }) => ([title, body, Date(createdAt), Date(updatedAt)]),
          ) || [];
          setData(rowData);
        }
      }).catch((err) => { throw err; });
  }, [reqURL, history]);

  if (isAuth) {
    return (
      <>
        <Dashboard fetchErr={fetchErr} homeSelect>
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
  return <Redirect to="/signin" />;
}
