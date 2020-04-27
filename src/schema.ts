// import { nexusPrismaPlugin } from 'nexus-prisma'
import { schema } from 'nexus'

schema.objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.givenName()
    t.model.familyName()
    t.model.email()
    t.model.roles()

    t.string('fullName', {
      async resolve(_parent, _args, ctx) {
        const result = `${_parent.givenName} ${_parent.familyName}`
        return result
      },
    })
  },
})

schema.objectType({
  name: 'Query',
  definition(t) {
    t.crud.users()

    t.list.field('getHighUsers', {
      type: 'User',
      resolve: (_, args, ctx) => {
        return ctx.prisma.user.findMany({
          where: { id: { gte: 2 } },
        })
      },
    })
  },
})

schema.objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.createOneUser({ alias: 'signupUser' })
  },
})
