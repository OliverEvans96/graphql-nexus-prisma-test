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
      args: {
        familyFirst: schema.booleanArg(),
      },
      async resolve(_parent, _args, ctx) {
        const names = [_parent.givenName, _parent.familyName]
        const orderedNames = _args.familyFirst ? names.reverse() : names
        const result = orderedNames.join(' ')
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
        return ctx.db.user.findMany({
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
