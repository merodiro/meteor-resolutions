import Resolutions from './resolutions'

export default {
  Query: {
    resolutions() {
      return Resolutions.find({}).fetch()
    }
  },
  Mutation: {
    createResolution(obj, { name }, context) {
      const id = Resolutions.insert({
        name: name
      })
      return Resolutions.findOne(id)
    }
  }
}
