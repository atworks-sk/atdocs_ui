import React from 'react';
import styles from './Spinner.module.css';

const Spinner = ({isLoading, disabled}) => {
    if (!isLoading || disabled) {
        return <></>;
    }

    return <div className={styles.loading}>{styles.loading}Loading&#8230;</div>;
};

export default Spinner;
