import axios from 'axios'
import _ from 'lodash'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const scheme = _.includes(
  ['localhost', '127.0.0.1', '0.0.0.0'],
  window.location.hostname
)
  ? 'http'
  : 'https'

export const getAuthenticationToken = (code) => async (dispatch) => {
  axios
    .get(`${scheme}://${window.location.hostname}:9000/authenticate/${code}`)
    .catch((error) => {
      console.error(error)
      cookies.remove('github')
      cookies.remove('username')
      window.location.href = '/'
    })
    .then((res) => {
      if (!!res.data.error) {
        console.error(res.data.error)
        cookies.remove('github')
        cookies.remove('username')
        window.location.href = '/'
      }

      const token = res.data.access_token
      axios
        .get('https://api.github.com/user', {
          headers: {
            Authorization: `token ${token}`,
          },
        })
        .then((res) => {
          cookies.set('github', token)
          cookies.set('username', res.data.login)
          window.location.href = '/'
        })
        .catch((error) => {
          console.error(error)
          cookies.remove('github')
          cookies.remove('username')
        })
    })
}

export const setView = (index) => ({
  type: 'VIEWS.SET_VIEW',
  data: index,
})
