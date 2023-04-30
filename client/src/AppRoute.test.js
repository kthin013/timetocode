import { render } from '@testing-library/react';
import React, {useState} from 'react';
import AppRoute from './AppRoute';
import { BrowserRouter } from "react-router-dom";
import UserContext from './UserContext';

describe('AppRoute', () => {
  it('Renders AppRoute component', ()=> {
    const test = () => {
      const [user, setUser] = useState({
        userId: '',
        name: '',
      });
      render(
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <AppRoute />
        </BrowserRouter>
      </UserContext.Provider>);
    };
  });
});