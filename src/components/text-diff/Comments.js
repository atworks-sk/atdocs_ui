/* eslint-disable prettier/prettier */
// import {useCallback, useReducer} from 'react';
// import {omit} from 'lodash';

// const reduceComments = (comments, {type, payload}) => {
//     switch (type) {
//     case 'ADD':
//         return {
//             ...comments,
//             [payload.change]: payload.content
//         };
//     case 'REMOVE':
//         return omit(comments, payload);
//     default:
//         return comments;
//     }
// };

// export const useComments = () => {
//     const [comments, dispatch] = useReducer(reduceComments, {});
//     const add = useCallback(
//         (change, content) => dispatch({type: 'ADD', change, content}),
//         []
//     );
//     const remove = useCallback(
//         (change) => dispatch({type: 'REMOVE', payload: change}),
//         []
//     );
//     return [comments, add, remove];
// };
