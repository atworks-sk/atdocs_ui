import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {FaQuestionCircle} from 'react-icons/fa';
import Button from '../button/Button';
import styles from './Help.module.css';

const Help = ({text}) => {
    return (
        <OverlayTrigger
            delay={{show: 50, hide: 100}}
            overlay={
                <Tooltip id="tooltip-disabled" styleName="tooltip">
                    <div
                        style={{
                            // backgroundColor: 'rgba(100, 100, 100, 0.85)',
                            padding: '2px 4px',
                            color: 'white',
                            borderRadius: 3,
                            textAlign: 'left'
                        }}
                    >
                        {text}
                    </div>
                </Tooltip>
            }
        >
            <span className="d-inline-block">
                <Button
                    className={styles.centerButton}
                    theme="link"
                    disabled
                    style={{pointerEvents: 'none'}}
                >
                    <FaQuestionCircle />
                </Button>
            </span>
        </OverlayTrigger>
    );
};

export default Help;
