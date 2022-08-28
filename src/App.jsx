import React from 'react';
import Card from './components/Card';
import { useForm } from 'react-hook-form';
import './App.css';

const App = () => {
  const [items, setItems] = React.useState([]);
  const { register, handleSubmit } = useForm();
  const onSubmit = React.useCallback(
    (data) => {
      const { item } = data;
      const sortedItems = items.sort((curr, prev) => prev.id - curr.id);
      const sameValue = items.find(
        (selectedItem) =>
          selectedItem.name.trim().toLowerCase() === item.name.trim().toLowerCase()
      );
      let newItem = {
        id: sortedItems[0] ? sortedItems[0].id++ : 1,
        ...item,
        amount: +item.amount,
      };
      if (sameValue) {
        const filteredValues = items.filter(
          (filteredItem) => filteredItem.id !== sameValue.id
        );
        newItem = {
          ...newItem,
          id: sameValue.id,
          amount: +sameValue.amount + +newItem.amount,
        };
        setItems([...filteredValues, newItem]);
      } else {
        setItems((currentItems) => [...currentItems, newItem]);
      }
    },
    [items]
  );

  const onRemoveItem = React.useCallback(
    (id) => {
      const filteredItems = items.filter(
        (filteredItem) => filteredItem.id !== id
      );
      setItems(filteredItems);
    },
    [items]
  );

  return (
    <div className="app">
      <div className="app__header">
        <h1>Tienda Juanita</h1>
      </div>
      <div className="app__body">
        <div className="app__body__header">
          <h2>Lista de compra</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="form__controller">
            <label htmlFor="name">Nombre del producto</label>
            <input
              type="text"
              id="name"
              autoComplete='off'
              placeholder="Nombre del producto"
              {...register('item.name', {
                required: true,
              })}
            />
          </div>
          <div className="form__controller">
            <label htmlFor="amount">Cantidad de producto</label>
            <input
              type="number"
              id="amount"
              {...register('item.amount', {
                required: true,
              })}
              placeholder="Cantidad de producto"
            />
          </div>
          <div className="form__controller button">
            <input type="submit" value="Agregar" />
          </div>
        </form>
        <div className="card-container">
          {items.map((item) => (
            <Card
              key={item.id}
              item={item}
              onClick={() => onRemoveItem(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
