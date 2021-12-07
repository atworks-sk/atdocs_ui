import {useState} from 'react';

// eslint-disable-next-line import/prefer-default-export
export const useInput = (initialValue) => {
    const [value, onChange] = useState(initialValue);

    return {
        value,
        onChange(e) {
            onChange(e.target.value);
        }
    };
};
