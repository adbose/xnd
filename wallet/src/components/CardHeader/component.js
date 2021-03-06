import React from 'react'
import { Header, Divider } from 'semantic-ui-react'

const CardHeader = (props) => (
  <>
    {props.previous !== undefined && (
      <Header as="span" style={{ color: 'white' }} floated="left">
        <h4 onClick={() => props.setView(props.previous)}>&lt;</h4>
      </Header>
    )}
    <Header as="span" style={{ color: 'white' }} textAlign="center">
      <h4>{props.text}</h4>
    </Header>

    <Divider />
  </>
)

export default CardHeader
