import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import React, { Component } from 'react'

import ResolutionForm from './ResolutionForm'


const resolutionsQuery = gql`
  query Resolutions {
    resolutions {
      _id
      name
    }
  }
`

@graphql(resolutionsQuery)
class App extends Component {
  render() {
    const {loading, resolutions} = this.props.data
    if (loading) {
      return <div>Loading...</div>
    }
  
    return (
      <div>
        <ResolutionForm />
        <ul>
          {resolutions.map(resolution => (
            <li key={resolution._id}>{resolution.name}</li>
          ))}
        </ul>
      </div>
    )
  
  }
}

export default App

// const App = ({ data }) => {
//   if (data.loading) {
//     return <div>Loading...</div>
//   }

//   return (
//     <div>
//       <h1>{data.hi}</h1>
//       <ResolutionForm />
//       <ul>
//         {data.resolutions.map(resolution => (
//           <li key={resolution._id}>{resolution.name}</li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// const hiQuery = gql`
//   {
//     hi
//     resolutions {
//       _id
//       name
//     }
//   }
// `

// export default graphql(hiQuery)(App)
