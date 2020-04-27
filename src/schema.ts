import { nexusPrismaPlugin } from 'nexus-prisma'
import { makeSchema, objectType } from '@nexus/schema'

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.givenName()
    t.model.familyName()
    t.model.email()
    t.model.roles()
  },
})

const Query = objectType({
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

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.createOneUser({ alias: 'signupUser' })
  },
})

export const schema = makeSchema({
  types: [Query, Mutation, User],
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
})
