import React from 'react';
import PropTypes from 'prop-types';

const AuthInputWrapper = ({ label, placeholder, form_key, id, register, type }) => {
  return (
    <div className='flex flex-col space-y-2'>
      <label htmlFor={id}>{label}</label>
      <input
        type={type ? type : "text"}
        placeholder={placeholder}
        id={id}
        {...register(`${form_key}`, { required: "" })}
        className='auth-input'
      />
    </div>
  );
};

AuthInputWrapper.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  form_key: PropTypes.string,
  id: PropTypes.string,
  register: PropTypes.any,
  type:PropTypes.string
};

export default AuthInputWrapper;
