export interface User {
  id: string
  name: string
  avatar?: string
}

let provider: (() => User) | null = null

export function setUserProvider(fn: () => User): void {
  provider = fn
}

export function getCurrentUser(): User {
  if (provider) {
    return provider()
  }
  return { id: 'anonymous', name: 'Anonymous' }
}
