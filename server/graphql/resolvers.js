import { Post } from '../../import/collections/post'
import { Comment } from '../../import/collections/comment'

import { pubsub } from './subscriptions';

const resolvers = {
    Query: {
        posts(root, args, context) {
            return Post.find({}).fetch();
        }
    },
    Mutation: {
        addPost: async (root, { title }, context) => {
            let id = Post.insert({ title });
            let post = Post.findOne({ _id: id })
            pubsub.publish('postAdded', post)
            return post;
        }
    },
    Post: {
        comments(post) {
            return Comment.find({ postId: post._id }).fetch()
        }
    },
    Subscription: {
        postAdded(post) {
            console.log(post)
            return post;
        }
    }

}
export default resolvers;