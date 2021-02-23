import { useState, useEffect } from 'react';

export default (key, initialValue = '[]') => {
    console.log(key, initialValue);
    const [value, setValue] = useState(() => {
        console.log('Is return ls item', key);
        return JSON.parse(localStorage.getItem(key) || initialValue);
    });

    useEffect(() => {
        console.log('Is set ls item', key, value);
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue]
}