import {Button} from '@components/index';
import React, {useState} from 'react';
import {DessertService} from '@src/services';

const initalValues = {
  name: '',
  detail: '',
  price: '',
};

const DessertFormContainer = () => {
  const [state, setState] = useState<Any>(initalValues);

  const handleClick = async () => {
    const service = new DessertService();

    try {
      await service.createDessert({
        name: state.name,
        detail: state.detail,
        price: Number(state.price),
      });

      setState({name: '', detail: '', price: ''});
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event: Any) => {
    console.log(event);

    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <div className="dessert_jcarlos_form">
        <h4>Add New Dessert</h4>
        <div className="form">
          <div className="input-group">
            <label>Nombre:</label>
            <input
              type="text"
              placeholder="flan"
              name="name"
              value={state.name}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label>Detalle:</label>
            <textarea
              placeholder="Un buen flan"
              name="detail"
              value={state.detail}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label>Precio:</label>
            <input
              type="number"
              placeholder="0.00"
              name="price"
              value={state.price}
              onChange={handleChange}
            />
          </div>
          <Button
            className="custom_align"
            type="primary"
            content="Open Modal"
            onPress={handleClick}
          />
        </div>
      </div>
    </>
  );
};

export default DessertFormContainer;
