import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, FormLabel, FormInput, FormBtn } from './ContactForm.styled';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export default function ContactForm({ onSubmit }) {
  const [formData, setFormData] = useState({ ...INITIAL_STATE });

  // Обробник для всіх інпутів, інпути розрізняються за атрибутом name
  // Відповідає за оновлення стану
  const handleInputChange = evt => {
    // console.log(evt.currentTarget.name);
    // console.log(evt.currentTarget.value);
    const { name, value } = evt.currentTarget;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  // Викликається під час відправлення форми
  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(formData);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ ...INITIAL_STATE });
  };

  const { name, number } = formData;

  return (
    <Form onSubmit={handleSubmit}>
      <FormLabel>
        Name
        <FormInput
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleInputChange}
        />
      </FormLabel>

      <FormLabel>
        Number
        <FormInput
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleInputChange}
        />
      </FormLabel>

      <FormBtn type="submit">Add contact</FormBtn>
    </Form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
