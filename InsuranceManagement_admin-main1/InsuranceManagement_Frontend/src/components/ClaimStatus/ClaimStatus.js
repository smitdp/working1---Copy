import React, { useState, useEffect } from 'react';
import PendingIcon from '@mui/icons-material/Pending';
import ReviewsIcon from '@mui/icons-material/Reviews';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import RunningWithErrorsOutlinedIcon from '@mui/icons-material/RunningWithErrorsOutlined';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import styles from './ClaimStatus.module.scss';

const ClaimStatus = (props) => {
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    setStatuses([
      { id: 1, status: 'Pending', icon: <PendingIcon /> },
      { id: 2, status: 'Under Review', icon: <ReviewsIcon /> },
      props.currentStatus === 4 ? { id: 4, status: 'Denied', icon: <DoDisturbOnIcon /> } : {  id: 3, status: 'Approved', icon: <CheckBoxIcon /> },
    //   { id: 4, status: 'Denied', icon: <DoDisturbOnIcon /> },
      { id: 5, status: 'Processing', icon: <RunningWithErrorsOutlinedIcon /> },
      { id: 6, status: 'Done', icon: <DoneOutlineOutlinedIcon /> },
      { id: 7, status: 'Closed', icon: <CloseOutlinedIcon /> }
    ]);
  }, []);

  const getStatusColor = (status, currentIndex) => {
    const approvedStatusIndex = statuses.findIndex(item => item.id === props.currentStatus);

    if (currentIndex <= approvedStatusIndex) {
      return {
        color: 'green',
        backgroundColor: 'lightgreen'
      };
    } else {
      return {
        color: 'black',
        backgroundColor: '#F5F5F5'
      };
    }
  };

  return (
    <div className={styles.track}>
      <div className={styles['steps-container']}>
        {statuses.map((status, index) => (
          <React.Fragment key={index}>
            <div className={styles.step} style={getStatusColor(status.status, index)}>
              <span className={styles['step-icon']}>{status.icon}</span>
            </div>
            {/* {index < statuses.length - 1 && <div className={`${styles.connector} ${styles[`connector-line-${index + 1}`]}`}></div>} */}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ClaimStatus;
