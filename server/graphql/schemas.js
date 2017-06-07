import { makeExecutableSchema } from 'graphql-tools';
import { Post } from '../../import/collections/post'
import resolvers from './resolvers';
const typeDefs = [
    `   type Comment {
            text: String
            post: Post
        }
        type Post {
            _id: String
            title: String
            comments: [Comment]
        }
        type Query {
            posts: [Post]
        }
        type Mutation {
            addPost(title: String!): Post
        }
        type Subscription{
            postAdded: [Post]
        }
        schema {
            query: Query
            mutation: Mutation
            subscription: Subscription
        }
        
    `
]
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

export default schema;