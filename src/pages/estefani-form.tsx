import React, { memo} from 'react';

const IndexPage = () => {

  return <div className='estefani_form'>
 <h1>The backdrop-filter</h1>
  <label>
    nombre
    <input type="text" />

  </label>

  <div className="background">
    <div className="transbox">
      <p>backdrop-filter: blur(5px)</p>
    </div>
  </div>
  </div>;
};

export default IndexPage;
