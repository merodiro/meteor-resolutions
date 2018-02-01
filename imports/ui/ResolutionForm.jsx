import React, { PureComponent } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

@graphql()
export default class ResolutionForm extends PureComponent {
  render() {
    return (
      <div>
        <input type="text" />
      </div>
    )
  }
}
