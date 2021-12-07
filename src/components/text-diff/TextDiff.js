import React, {useState, useMemo, useEffect} from 'react';
import {Form, Row, Col} from 'react-bootstrap';
import {diffLines, formatLines} from 'unidiff';
import {parseDiff, Diff, Hunk, Decoration} from 'react-diff-view';
import {useInput} from './Hooks';

import 'react-diff-view/style/index.css';
import './Styles.module.css';

import tokenize from './Tokenize';

const EMPTY_HUNKS = [];

function TextDiff({textATitle, textA, textBTitle, textB}) {
    const oldText = useInput(textA);
    const newText = useInput(textB);
    const [{type, hunks}, setDiff] = useState('');

    const settingDiffText = (oldTextValue, newTextValue) => {
        const diffText = formatLines(diffLines(oldTextValue, newTextValue), {
            context: 3
        });
        const [diff] = parseDiff(diffText, {nearbySequences: 'zip'});
        setDiff(diff);
    };

    useEffect(() => {
        settingDiffText(textA, textB);
    }, [textA, textB]);

    useEffect(() => {
        settingDiffText(oldText.value, newText.value);
    }, [oldText.value, newText.value]);

    const tokens = useMemo(() => tokenize(hunks), [hunks]);

    const getBody = () => {
        if (hunks && hunks.length > 0) {
            return (
                <>
                    <Row>
                        <Col xs="6">
                            <Form.Group controlId="historyExcuteForm.input">
                                <Form.Label>
                                    <strong>{textATitle}</strong>
                                </Form.Label>
                            </Form.Group>
                        </Col>
                        <Col xs="6">
                            <Form.Group controlId="historyExcuteForm.input">
                                <Form.Label>
                                    <strong>{textBTitle}</strong>
                                </Form.Label>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            xs="12"
                            style={{height: '450px', overflowY: 'auto'}}
                        >
                            <Diff
                                viewType="split"
                                diffType={type}
                                hunks={hunks || EMPTY_HUNKS}
                                tokens={tokens}
                            >
                                {(hunkList) =>
                                    hunkList.map((hunk) => [
                                        <Decoration
                                            key={`deco-${hunk.content}`}
                                        >
                                            <div className="hunk-header">
                                                {hunk.content}
                                            </div>
                                        </Decoration>,
                                        <Hunk key={hunk.content} hunk={hunk} />
                                    ])
                                }
                            </Diff>
                        </Col>
                    </Row>
                </>
            );
        }

        return (
            <Row>
                <Col xs="6">
                    <Form.Group controlId="historyExcuteForm.input">
                        <Form.Label>
                            <strong>{textATitle}</strong>
                        </Form.Label>
                        <Form.Control
                            disabled
                            style={{height: '450px', overflowY: 'auto'}}
                            as="textarea"
                            rows={10}
                            placeholder=""
                            // onChange={() => oldText.onChange()}
                            {...oldText}
                        />
                    </Form.Group>
                </Col>
                <Col xs="6">
                    <Form.Group controlId="historyExcuteForm.input">
                        <Form.Label>
                            <strong>{textBTitle}</strong>
                        </Form.Label>
                        <Form.Control
                            disabled
                            style={{height: '450px', overflowY: 'auto'}}
                            as="textarea"
                            rows={10}
                            placeholder=""
                            // onChange={() => newText.onChange()}
                            {...newText}
                        />
                    </Form.Group>
                </Col>
            </Row>
        );
    };

    return <>{getBody()}</>;
}

export default TextDiff;
