import { PublisherCreate } from './CreatePublisher';
import { renderWithProviders } from '../../utils/test-utils';


describe('CreatePublisher', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<PublisherCreate />)

    expect(asFragment()).toMatchSnapshot()
  })
})
