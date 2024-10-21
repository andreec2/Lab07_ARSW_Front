import React from 'react';

const BlueprintForm = ({ author, handleInputChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Author:
        <input type="text" value={author} onChange={handleInputChange} required />
      </label>
      <button type="submit">Get blueprint</button>
    </form>
  );
};

export default BlueprintForm;
