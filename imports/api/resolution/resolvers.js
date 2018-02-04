import Resolutions from './resolutions'

export default {
  Query: {
    resolutions(obj, args, { userId }) {
      console.log(userId)
      return Resolutions.find({ userId }).fetch()
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
