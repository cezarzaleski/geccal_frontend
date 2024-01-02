import { CreateBook } from './CreateBook';
import { renderWithProviders, screen, fireEvent, waitFor } from '../../utils/test-utils';

import { rest } from 'msw';
import { baseUrl } from '../api/apiSlice';
import { setupServer } from 'msw/node';
import authorsMock from '../../../mock-api/data/authors.json';
import publishersMock from '../../../mock-api/data/publishers.json';

const handlers = [
  rest.post(`${baseUrl}/books`, (req, res, ctx) => {
    return res(ctx.delay(150), ctx.status(201))
  }),
  rest.get(`${baseUrl}/authors`, (req, res, ctx) => {
    req.url.searchParams.append("page", "1");
    req.url.searchParams.append("perPage", "99999");
    req.url.searchParams.append("page", "true");
    return res(ctx.json(authorsMock), ctx.delay(150), ctx.status(200))
  }),
  rest.get(`${baseUrl}/publishers`, (req, res, ctx) => {
    req.url.searchParams.append("page", "1");
    req.url.searchParams.append("perPage", "99999");
    req.url.searchParams.append("page", "true");
    return res(ctx.json(publishersMock), ctx.delay(150), ctx.status(200))
  })
]

const server = setupServer(...handlers)


describe('CreateForm', () => {
  afterAll(()=> server.close())
  beforeAll(()=> server.listen())
  afterEach(()=> server.resetHandlers())

  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<CreateBook />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should handle submit', async () => {
    renderWithProviders(<CreateBook/>)
    const name = screen.getByTestId('name')
    const origin = screen.getByLabelText('Origem')
    const submit = screen.getByText('Salvar')
    const publisher = screen.getByLabelText('Editora');
    const year = screen.getByLabelText('Ano');
    const authors = screen.getByLabelText('Autores');

    fireEvent.change(name, {target: {value: 'test'}})
    fireEvent.change(publisher, {target: {value: 'Teste'}})

    fireEvent.focus(year);
    fireEvent.keyDown(year, {
      key: "ArrowDown",
      code: 40,
    });
    fireEvent.click(screen.getByText('2024'));

    fireEvent.focus(authors);
    fireEvent.keyDown(authors, {
      key: "ArrowDown",
      code: 40,
    });
    await waitFor(() => {
      expect(screen.getByText('Roberto')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Roberto'));

    fireEvent.focus(origin);
    fireEvent.keyDown(origin, {
      key: "ArrowDown",
      code: 40,
    });
    fireEvent.click(screen.getByText('Doação'));

    fireEvent.click(submit)

    await waitFor(() => {
      expect(screen.getByText('Livro cadastrado com sucesso')).toBeInTheDocument()
    })
  })
})
