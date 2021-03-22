import React from 'react';
import { render } from '@testing-library/react';
import { shallow, mount, configure } from 'enzyme';
import Inicio from './components/Inicio/Inicio.js';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


describe('<Inicio /> Mounted', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Inicio />);
  });
  it('deberia renderizar un "h1"', () => {
    expect(wrapper.find('h1')).toHaveLength(1);
  });
  it('El link debe contener un texto que diga "Start"', () => {
      const { container } = render(<Inicio />)
      const element = container.querySelectorAll('a')[0]
      expect(element.innerHTML).toBe('Start');
  });

});
