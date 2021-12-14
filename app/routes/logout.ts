import { LoaderFunction, redirect } from 'remix'
import { destroySession, getSession } from '~/services/session.server'

export const loader: LoaderFunction = async ({ request }) => {
  return redirect('/', {
    headers: {
      'Set-Cookie': await destroySession(await getSession(request))
    }
  })
}
