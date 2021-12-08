import { LoaderFunction } from 'remix'
import { authenticator } from '~/services/auth.server'

export let loader: LoaderFunction = async ({ request }) => {
  return await authenticator.authenticate('spotify', request)
}
