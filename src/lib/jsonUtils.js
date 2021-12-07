export const validJsonString = (jsonString) => {
    if (!jsonString) {
        return true;
    }
    try {
        JSON.parse(jsonString);
        return true;
    } catch (e) {
        return false;
    }
};

// export const jsonParse = (strJson) => {
//     try {
//         return JSON.parse(strJson);
//     } catch (e) {
//         return null;
//     }
// };

/*
{
    "key":"1234"
}
*/
export const jsonStrFormatPretty = (data) => {
    if (data === null) {
        return '';
    }
    if (typeof data === 'string') {
        try {
            return JSON.stringify(JSON.parse(data), undefined, 4);
        } catch (e) {
            return data;
        }
    } else {
        try {
            return JSON.stringify(data, undefined, 4);
        } catch (e) {
            return '';
        }
    }
};

/*
{"key":"1234"}
*/
export const jsonStrFormatNotPretty = (data) => {
    if (typeof data === 'string') {
        try {
            return JSON.stringify(JSON.parse(data, undefined, 4));
        } catch (e) {
            return data;
        }
    } else {
        try {
            return JSON.stringify(data);
        } catch (e) {
            return '';
        }
    }
};

export const convertCollListToJson = (layoutList) => {
    const resultList = {};
    layoutList.forEach((layout) => {
        if (layout.type === 'list') {
            const temp = convertCollListToJson(layout.colList);
            resultList[layout.pyhsicalName] = [temp];
        } else if (layout.type === 'object') {
            const temp = convertCollListToJson(layout.colList);
            resultList[layout.pyhsicalName] = temp;
        } else if (!layout.testData) {
            resultList[layout.pyhsicalName] = '';
        } else {
            resultList[layout.pyhsicalName] = layout.testData;
        }
    });
    return resultList;
};
