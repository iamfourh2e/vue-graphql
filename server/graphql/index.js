import graphqlHTTP from 'express-graphql';
import restify from 'restify';
const PORT = 3020;
let server = restify.createServer();
import schema from './schemas';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { subscriptionManager } from './subscriptions';
server.use(restify.CORS())
server.post('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: false
}))
server.get('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

server.listen(PORT, () => {
    console.log('Graphql listen on port ' + PORT)
});

new SubscriptionServer({
    subscriptionManager
}, {
        path: '/subscriptions',
        server
    })