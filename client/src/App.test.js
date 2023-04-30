import { render } from '@testing-library/react';
import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import App from './App';

describe('App', () => {
  it('Renders App component', ()=> {
    const test = () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );
    };
  });
});