import React from 'react'
import { Grid, Dropdown, Image } from 'semantic-ui-react'

import VIEWS from '../../views'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const options = [
  { key: 'dummy', text: '', icon: null, value: 1 },
  { key: 'sign-out', text: 'Logout', icon: 'sign out', value: 2 },
]

const handleMenu = (e, { value }) => {
  if (value === 2) {
    // Logout
    cookies.remove('github')
    cookies.remove('username')
    window.location.href = '/'
  }
}

const trigger = (
  <span
    style={{
      fontWeight: 'bold',
      background:
        'linear-gradient(to right,#FF4403 25%,#8601FF 50%,#0254FF 75%,#06C223 100%) 0 0',
      webkitBackgroundClip: 'text',
      color: 'transparent',
    }}
  >
    <Image src="payid.png" avatar />
    {`${cookies.get('username')}$${window.location.hostname}`}
  </span>
)

const Menu = (props) =>
  props.views.index !== VIEWS.APP_LOGIN && (
    <Grid>
      <Grid.Column textAlign="right">
        <Dropdown
          trigger={trigger}
          options={options}
          pointing="top left"
          icon={null}
          onChange={handleMenu}
        />
      </Grid.Column>
    </Grid>
  )

export default Menu
