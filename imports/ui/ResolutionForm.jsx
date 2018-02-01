import React, { PureComponent } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const createResolution = gql`
mutation createResolution($name: String!) {
  createResolution (name: $name) {
    _id
  }
}
`
@graphql(createResolution, {
  name: 'createResolution'
})
class ResolutionForm extends PureComponent {
  submitForm = () => {
    this.props.createResolution({
      variables: {
        name: this.name.value
      }
    }).then(({data}) => {
      this.props.refetch()
    }).catch(error => {
      console.error(error)
    })
    this.name.value = ''
  }

  render() {
    return (
      <div>
        <input type="text" ref={inp => (this.name = inp)} />
        <button onClick={this.submitForm}>Submit</button>
      </div>
    )
  }
}
export default ResolutionForm
