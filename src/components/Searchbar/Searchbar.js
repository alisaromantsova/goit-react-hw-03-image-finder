import { Formik, Form, Field } from 'formik';
import css from './Searchbar.module.css';

const initialValues = {
  search: '',
};

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values);

    resetForm();
  };
  return (
    <header className={css.Searchbar}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={css.SearchForm}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}></span>
          </button>

          <Field
            name="search"
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Formik>
    </header>
  );
};
