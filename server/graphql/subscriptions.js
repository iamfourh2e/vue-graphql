import { PubSub, SubscriptionManager } from 'graphql-subscriptions';
import schema from './schemas';
import Post from '../../import/collections/post'
const pubsub = new PubSub();
const subscriptionManager = new SubscriptionManager({
  schema,
  pubsub,
  setupFunctions: {
    postAdded: (options, args) => ({
      postAdded: Post.find({}).fetch()
    }),
  },
});

export { subscriptionManager, pubsub };