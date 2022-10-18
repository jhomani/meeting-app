import React from 'react';
import {Formik, Form, Field} from 'formik';

interface FormValues {
  nombre_receta: string;
  detalle_receta: string;
  precio: Number;
}

const eveindex = (): JSX.Element => {
  const initialValues: FormValues = {
    nombre_receta: '',
    detalle_receta: '',
    precio: 0,
  };

  const onSubmit = (values: FormValues) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
    }, 500);
  };

  return (
    <>
      <h2>Formulario recetas</h2>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form className="form">
          <label htmlFor="nombre_Receta" className="form__label">
            First Name
          </label>
          <Field
            name="nombre_recta"
            type="text"
            className="form__input"
            placeholder="Nombre de receta"
          />

          <label htmlFor="detalle" className="form__label">
            Last Name
          </label>
          <Field
            name="detalle"
            type="text"
            className="form__input"
            placeholder="Detalles"
          />
          <button type="submit" className="boton">
            Verificar
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default eveindex;
