import { LoaderFunction } from 'remix'
import { authenticator } from '~/services/auth.server'

export const loader: LoaderFunction = async ({ request }) => {
  return await authenticator.authenticate('spotify', request)
}
