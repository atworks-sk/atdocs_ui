/* eslint-disable no-unused-vars */
import React from 'react';
import {Card, Button} from 'react-bootstrap';

// card componet
// title -> header 제목
// body -> body 에 들어가 내용
// sample
const AppCard = ({title = '제목 넣어주세요.', body}) => {
    const onClickButton = (e) => {
        let iObj = null;
        if (e.target.getAttribute('type') === 'button') {
            // eslint-disable-next-line prefer-destructuring
            iObj = e.target.children[0];
        } else {
            iObj = e.target;
        }

        if (iObj.classList.contains('fa-minus')) {
            iObj.classList.remove('fa-minus');
            iObj.classList.add('fa-plus');
            iObj.parentElement.parentElement.parentElement.children[1].classList.add(
                'hidden'
            );
        } else {
            iObj.classList.remove('fa-plus');
            iObj.classList.add('fa-minus');
            iObj.parentElement.parentElement.parentElement.children[1].classList.remove(
                'hidden'
            );
        }
    };
    return (
        <Card style={{borderTop: '3px solid #008000'}}>
            <Card.Header>
                {title}
                <button
                    style={{float: 'right'}}
                    type="button"
                    className="btn btn-tool"
                    onClick={onClickButton}
                >
                    <i className="fas fa-minus" />
                </button>
            </Card.Header>
            <Card.Body>{body}</Card.Body>
        </Card>
    );
};

export default AppCard;
