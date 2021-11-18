import React from 'react';
import {Outlet} from 'react-router-dom';

const CameraLayout = () => {
  return (
    <div>
      <Outlet/>
    </div>
  );
};

export default CameraLayout;
