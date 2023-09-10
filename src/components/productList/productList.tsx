import { useState } from 'react';
import '../../App.css';
import CloseIcon from './ClosedSvg';

export type TList = {
    index: number,
    id: number,
    text: string,
    crossed: boolean
}

interface ListProps {
    list: TList[],
    setList: React.Dispatch<React.SetStateAction<TList[]>>,
}

export const List: React.FC<ListProps> = ({ list, setList }) => {
    const [crossed, setCrossed] = useState(false);

    const DeleteProduct = (id: number) => {
        const filteredList = list.filter(item => item.id !== id);
        setList(filteredList);
        localStorage.setItem('productList', JSON.stringify(filteredList));
    }

    const CrossedItem = (id: number, event: React.MouseEvent<HTMLElement>) => {

        setCrossed(!crossed);
        const itemIndex = list.findIndex(item => item.id === id);

        if (itemIndex !== -1) {
            const updateList = [...list];
            const removeItem = updateList.splice(itemIndex, 1)[0];
            updateList.push(removeItem)
            removeItem.crossed = true;
            setList(updateList)
            localStorage.setItem('productList', JSON.stringify(updateList));
        }

    }

    return (
        <main>
            <ul>
                {list.length === 0 ? (
                    <p>Сейчас список пуст<br />
                        Введите название продукта<br />
                        и нажмите "Добавить"
                    </p>
                ) : (
                    list.map((item, index) => (
                        <li key={index}
                            onClick={e => CrossedItem(item.id, e)}
                            className={item.crossed ? 'crossed' : ''}>
                            <div className='Buttons'>
                                <button className="Button-delete"
                                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                                        DeleteProduct(item.id)
                                        event.stopPropagation();
                                    }}>
                                    <div>
                                        <CloseIcon/>
                                    </div>
                                </button>
                            </div>
                            <div className={`ProductName ${item.crossed ? 'crossed' : ''}`}>
                                <p>
                                    {item.text}
                                </p>
                            </div>
                        </li>
                    ))
                )

                }
            </ul>
        </main>
    )
}