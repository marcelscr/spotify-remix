import { omit } from 'lodash'
import type { User, PrivateUser } from '~/types'

export function toPublicUser(user: PrivateUser): User {
  return omit(user, 'credentials')
}

export async function login(
  credentials: { accessToken: string },
  id: string,
  email: string,
  name?: string,
  image?: string
): Promise<PrivateUser> {
  return { credentials, id, email, name, image }
}
