import React, { PureComponent } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const createResolution = gql`
mutation createResolution {
  createResolution {
    _id
  }
}
`
@graphql(createResolution, {
  name: 'createResolution'
})
class ResolutionForm extends PureComponent {
  submitForm = () => {
    this.props.createResolution()
    this.name.value = ''
  }

  render() {
    return (
      <div>
        <input type="text" ref={(inp) => (this.name = inp)} />
        <button onClick={this.submitForm}>Submit</button>
      </div>
    )
  }
}
export default ResolutionForm