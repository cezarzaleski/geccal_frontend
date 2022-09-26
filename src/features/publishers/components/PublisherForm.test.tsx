import { render } from '@testing-library/react';
import { PublisherForm } from './PublisherForm';
import { BrowserRouter } from 'react-router-dom';

const Props = {
  publisher: {
    id: '1',
    name: 'Teste',
    active: true,
    deletedAt: null,
    createdAt: '2022-09-26T00:00:00.000000Z',
    updatedAt: '2022-09-26T00:00:00.000000Z'
  },
  isDisabled: false,
  isLoading: false,
  handleSubmit: jest.fn(),
  handleChange: jest.fn(),
  handleToggle: jest.fn()
}

describe('PublisherForm',  () => {
  it('should render publisher form correctly', () => {
    const { asFragment } = render(<PublisherForm {...Props} />, {
      wrapper: BrowserRouter
    })

    expect(asFragment()).toMatchSnapshot()
  })
  it('should render publisher form with loading state', () => {
    const { asFragment } = render(<PublisherForm {...Props} isLoading={true} />, {
      wrapper: BrowserRouter
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render publisher form with disable state', () => {
    const { asFragment } = render(<PublisherForm {...Props} isDisabled={false} isLoading={true} />, {
      wrapper: BrowserRouter
    })

    expect(asFragment()).toMatchSnapshot()
  })
});
