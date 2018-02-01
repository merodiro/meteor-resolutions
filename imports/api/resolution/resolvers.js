import Resolutions from './resolutions'

export default {
  Query: {
    resolutions() {
      return Resolutions.find({}).fetch()
    }
  },
  Mutation: {
    createResolution() {
      // const id = Resolutions.insert({
      //   name: ""
      // })
      console.log("hello")
    }
  }
}
