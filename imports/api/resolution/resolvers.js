import Resolutions from './resolutions'

export default {
  Query: {
    resolutions(obj, args, { userId }) {
      return Resolutions.find({ userId }).fetch()
    }
  },
  Mutation: {
    createResolution(obj, { name }, { userId }) {
      const id = Resolutions.insert({
        name,
        userId
      })
      return Resolutions.findOne(id)
    }
  }
}
