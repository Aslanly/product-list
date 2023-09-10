import React, { useState, ChangeEvent, useEffect } from 'react';
import '../../App.css';
import { TList } from '../productList/productList';


interface HeaderProps {
    setList: React.Dispatch<React.SetStateAction<TList[]>>;
    list: TList[];
}

export const Header: React.FC<HeaderProps> = ({ setList, list }) => {

    const [value, setValue] = useState<string>('');

    useEffect(() => {
        const storedListValue = localStorage.getItem('productList');
        if (storedListValue) {
            setList(JSON.parse(storedListValue));
        }
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    };

    const AddProduct = () => {

        if (value.trim() !== '') {
            const newItem: TList = {
                index: 1,
                id: list.length + 1,
                text: value,
                crossed: false,
            }

            setList(prevList => [newItem, ...prevList]);
            const updatedList = [newItem, ...list];
            setList(updatedList);
            setValue('');
            localStorage.setItem('productList', JSON.stringify(updatedList));
        }
    };


    return (
        <header className="App-header">
            <input placeholder='Название продукта' value={value} onChange={handleChange}></input>
            <button className='addProductButton' onClick={AddProduct}>Добавить</button>
        </header>
    )
} 