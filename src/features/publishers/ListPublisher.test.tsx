import { renderWithProviders, screen, fireEvent, waitFor } from '../../utils/test-utils';
import { PublisherList } from './ListPublisher';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { baseUrl } from '../api/apiSlice';
import { publishersResponse, publishersResponse2 } from './mocks/index';

export const handlers = [
  rest.get(`${baseUrl}/publishers`, (req, res, ctx) => {
    if (req.url.searchParams.get('page') === '2') {
      return res(ctx.json(publishersResponse2), ctx.delay(150))
    }
    return res(ctx.json(publishersResponse), ctx.delay(150))
  }),
  rest.delete(`${baseUrl}/publishers/8e6a5149-79f9-4af0-a247-54ad16be58dd`, (req, res, ctx) => {
    return res(ctx.delay(150), ctx.status(204))
  })
]

const server = setupServer(...handlers)

describe('ListPublisher', () => {
  afterAll(() => server.close())
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())

  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<PublisherList />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render loading state', () => {
    renderWithProviders(<PublisherList />)
    const loading = screen.getByRole('progressbar')
    expect(loading).toBeInTheDocument()
  });

  it('should render success state', async () => {
    renderWithProviders(<PublisherList />)
    await waitFor(() => {
      const name = screen.getByText(publishersResponse.items[0].name)
      expect(name).toBeInTheDocument()
    })
  });

  it('should render error state', async () => {
    server.use(
      rest.get(`${baseUrl}/publishers`, (_, res, ctx) => {
        return res(ctx.status(500))
      })
    )
    renderWithProviders(<PublisherList />)
    await waitFor(() => {
      const name = screen.getByText('Erro ao carregar as editoras')
      expect(name).toBeInTheDocument()
    })
  });

  it('should handle on PageChange', async () => {
    renderWithProviders(<PublisherList />)
    await waitFor(() => {
      const name = screen.getByText('integrado terceiro editado')
      expect(name).toBeInTheDocument()
    })

    const nextButton = screen.getByTestId('KeyboardArrowRightIcon');
    fireEvent.click(nextButton)
    await waitFor(() => {
      const name = screen.getByText('FEB')
      expect(name).toBeInTheDocument()
    })
  })
  it('should handle filter change', async () => {
    renderWithProviders(<PublisherList />)

    await waitFor(() => {
      const name = screen.getByText('integrado terceiro editado')
      expect(name).toBeInTheDocument()
    })

    const inputSearch = screen.getByPlaceholderText('Search…')
    fireEvent.change(inputSearch, {
      target: { value: 'teste'}
    })

    await waitFor(() => {
      const loading = screen.getByRole('progressbar')
      expect(loading).toBeInTheDocument()
    })

  })

  it('should handle delete publisher success', async () => {
    renderWithProviders(<PublisherList />)

    await waitFor(() => {
      const name = screen.getByText('integrado terceiro editado')
      // eslint-disable-next-line testing-library/no-debugging-utils
      // screen.debug(undefined, Infinity);
      expect(name).toBeInTheDocument()
    })

    const nextButton = screen.getAllByTestId('delete-button')[0];
    fireEvent.click(nextButton)
    await waitFor(() => {
      const name = screen.getByText('Editora removida com sucesso!')
      expect(name).toBeInTheDocument()
    })
  })

  it('should handle delete publisher error', async () => {
    server.use(
      rest.delete(
        `${baseUrl}/publishers/8e6a5149-79f9-4af0-a247-54ad16be58dd`,
        (_, res, ctx) => {
          return res(ctx.delay(150), ctx.status(500))
        }
      )
    )

    renderWithProviders(<PublisherList />)

    await waitFor(() => {
      const name = screen.getByText('integrado terceiro editado')
      expect(name).toBeInTheDocument()
    })

    const nextButton = screen.getAllByTestId('delete-button')[0];
    fireEvent.click(nextButton)
    await waitFor(() => {
      const name = screen.getByText('Editora não removida')
      expect(name).toBeInTheDocument()
    })
  })
})
