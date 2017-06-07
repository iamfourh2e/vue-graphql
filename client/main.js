import { Vue } from 'meteor/akryum:vue';
import { Meteor } from 'meteor/meteor';
import AppLayout from '/import/ui/AppLayout.vue';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
import VueApollo from 'vue-apollo';
Vue.use(VueApollo);

const networkInterface = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:3020/graphql',
    transportBatching: true
  }),
  connectToDevTools: true
})
const wsClient = new SubscriptionClient('ws://localhost:3020/subscriptions', {
  reconnect: true,
})
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient,
)
const apolloClient = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  ssrForceFetchDelay: 100,
  connectToDevTools: true,
})

const apolloProvider = new VueApollo({
  clients: {
    a: apolloClient,
  },
  defaultClient: apolloClient,
})
Meteor.startup(function () {
  new Vue({
    render: h => h(AppLayout),
    apolloProvider,
    components: {
      AppLayout
    }
  }).$mount('app')
})