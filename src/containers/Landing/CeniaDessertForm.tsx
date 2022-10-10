import {Button} from '@components/index';
import React, {useEffect, useState} from 'react';
import {DessertService} from '@src/services';

const availableForMural: {key: any; label: any;}[] = [];

const initalValues = {
  name: '',
  detail: '',
  price: ''
}

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

      setState({
        name: '',
        detail: '',
        price: ''
      });
    } catch(error) {
      console.log(error);
    }
  }

  const handleChange = (event: Any) => {
    console.log(event);

    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  }

  return <>
    <div className="dessert_cenia_form">
        <h4 className="tagger-title g-my-5">
          añadir postre
        </h4>
        <div className='form'>
          <label>
            Nombre:&nbsp;&nbsp;
            <input
              type="text"
              placeholder='flan'
              name='name'
              value={state.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Detalle:&nbsp;&nbsp;
            <input
              type="text"
              placeholder='Un buen flan'
              name='detail'
              value={state.detail}
              onChange={handleChange}
            />
          </label>
          <label>
            Precio:&nbsp;&nbsp;
            <input
              type="text"
              placeholder='2.00'
              name='price'
              value={state.price}
              onChange={handleChange}
            />
          </label>

          <Button
            className='custom_align'
            type="primary"
            content="Open Modal"
            onPress={handleClick}
          />
        </div>
    </div>
  </>;
};

export default DessertFormContainer;
