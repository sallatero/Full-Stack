const blogs = [
  {
    likes: 1,
    title: 'Cakes for all',
    author: 'Cake gueen',
    url: 'https://www.cookinglight.com/cooking-101/techniques/cake-baking',
    user: {
      username: 'sallatero',
      name: 'Salla Tero',
      id: '5ca606fce1a86e34cd0cbe79'
    },
    id: '5ca6183e487e4737a2836335'
  },
  {
    likes: 10,
    title: 'Cakes for Salla',
    author: 'Cake King',
    url: 'https://www.cookinglight.com/cooking-101/techniques/cake-baking',
    user: {
      username: 'sallatero',
      name: 'Salla Tero',
      id: '5ca606fce1a86e34cd0cbe79'
    },
    id: '5ca61ebf28cb1c3877dc72ca'
  },
  {
    likes: 106,
    title: 'Annin uunissa',
    author: 'Anni',
    url: 'https://www.anninuunissa.fi/',
    user: {
      username: 'sallatero',
      name: 'Salla Tero',
      id: '5ca606fce1a86e34cd0cbe79'
    },
    id: '5ca717212756a03e9f33efb3'
  }
]

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken }