import { PublisherCreate } from './CreatePublisher';
import { renderWithProviders, screen, fireEvent, waitFor } from '../../utils/test-utils';
import { rest } from 'msw';
import { baseUrl } from '../api/apiSlice';
import { setupServer } from 'msw/node';

const handlers = [
  rest.post(`${baseUrl}/publishers`, (req, res, ctx) => {
    return res(ctx.delay(150), ctx.status(201))
  })
]

const server = setupServer(...handlers)


describe('CreatePublisher', () => {
  afterAll(()=> server.close())
  beforeAll(()=> server.listen())
  afterEach(()=> server.resetHandlers())

  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<PublisherCreate />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should handle submit', async () => {
    renderWithProviders(<PublisherCreate/>)
    const name = screen.getByTestId('name')
    const submit = screen.getByText('Salvar')
    fireEvent.change(name, {target: {value: 'test'}})

    fireEvent.click(submit)

    await waitFor(() => {
      expect(screen.getByText('Editora criada com sucesso')).toBeInTheDocument()
    })
  })
})
