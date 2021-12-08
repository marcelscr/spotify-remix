export interface User {
  id: string
  email: string
  name?: string
  image?: string
}

export async function login(
  id: string,
  email: string,
  name?: string,
  image?: string
): Promise<User> {
  return { id, email, name, image }
}
