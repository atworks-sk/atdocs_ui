import React from 'react';
import './TreeMenu.css';
import TreeMenu from 'react-simple-tree-menu';

const JsonTreeMenu = ({jsonArray}) => {
    let num = 0;
    const keyArrayUsingOpen = [];

    const genKey = () => {
        num += 1;
        // const key = `key_${Date.now()}_${num}`;
        const key = `key_${num}`;
        return key;
    };

    const addKeyArrayUsingOpen = (parentKey, key) => {
        if (!parentKey) {
            keyArrayUsingOpen.push(key);
        } else {
            keyArrayUsingOpen.push(`${parentKey}/${key}`);
        }
        return key;
    };

    const convertData = (parentKey, data) => {
        const dataType = typeof data;
        if (!(dataType === 'object' && !Array.isArray(data))) {
            return {
                key: addKeyArrayUsingOpen(parentKey, genKey()),
                label: `Invalid data position (${dataType})`
            };
        }

        const keyArray = Object.keys(data);
        const arr = [];
        for (let i = 0; i < keyArray.length; i += 1) {
            const key = keyArray[i];
            const value = data[key];
            const valueType = typeof value;

            const treeNodeKey = addKeyArrayUsingOpen(parentKey, genKey());

            // json object가 아닌경우
            if (typeof value !== 'object') {
                arr.push({
                    key: treeNodeKey,
                    label: `${key} (${valueType})`,
                    nodes: []
                });
            }

            // json object인 경우
            else if (typeof value === 'object' && !Array.isArray(value)) {
                arr.push({
                    key: treeNodeKey,
                    label: `${key}`,
                    nodes: convertData(treeNodeKey, value)
                });
            }

            // json Array인 경우 + not empty
            else if (
                typeof value === 'object' &&
                Array.isArray(value) &&
                value.length > 0
            ) {
                arr.push({
                    key: treeNodeKey,
                    label: `${key} (List)`,
                    nodes: convertData(treeNodeKey, value[0])
                });
            }

            // json Array인 경우 + empty
            else if (
                typeof value === 'object' &&
                Array.isArray(value) &&
                value.length === 0
            ) {
                arr.push({
                    key: treeNodeKey,
                    label: `${key} (Empty List)`,
                    nodes: []
                });
            }
        }

        return arr;
    };

    const getData = () => {
        const arr = [];
        for (let i = 0; i < jsonArray.length; i += 1) {
            arr.push(convertData(null, jsonArray[i])[0]);
        }
        return arr;
    };

    return (
        <>
            <TreeMenu
                data={getData()}
                resetOpenNodesOnDataUpdate={false}
                initialOpenNodes={keyArrayUsingOpen}
                hasSearch={false}
            />
        </>
    );
};

export default JsonTreeMenu;
