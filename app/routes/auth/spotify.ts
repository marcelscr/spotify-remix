import { ActionFunction } from 'remix'
import { authenticator } from '~/services/auth.server'

export const action: ActionFunction = async ({ request }) => {
  return await authenticator.authenticate('spotify', request, {
    successRedirect: '/',
    failureRedirect: '/login'
  })
}
