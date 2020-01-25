const initImports = async (config) => {
  jest.resetModules()
  jest.mock('../config.json', () => ({
    __esModule: true,
    default: { baseURL: '/mock' }
  }), { virtual: true })
  const app = await import('../index')
  const axios = await import('axios')
  return { app, axios }
}

const assertConfigAdapter = (assertionCallback) => async (config) => {
  assertionCallback(config)
  return ({
    status: 200
  })
}

describe('default config', () => {
  it('set default config with json', async () => {
    const { axios } = await initImports()
    expect(axios.defaults.baseURL).toEqual('/mock')
  })
})

describe('api', () => {
  it('get', async () => {
    const { app } = await initImports()
    const assertion = config => {
      expect(config.baseURL).toEqual('/updated')
    }
    await app.get(
      '/default',
      {
        baseURL: '/updated',
        adapter: assertConfigAdapter(assertion)
      }
    )
  })
})
