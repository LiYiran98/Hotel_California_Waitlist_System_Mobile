import React, { Component } from 'react'
import { Button, View, Text, TextInput, StyleSheet, Alert, SafeAreaView, ScrollView, StatusBar } from 'react-native'
import ApolloClient from 'apollo-boost';
import { ApolloProvider, graphql, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

styles = StyleSheet.create({
  welcome: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
      marginTop:20
  },
  tableCont: {
      fontSize: 18,
      flexDirection:"row", 
      justifyContent: 'space-around',
    margin: 10
  },
    container: {
        marginTop: 50
    },
    head: {
        fontSize: 20,
        textAlign: 'center'
    }
})

const client = new ApolloClient({ uri: 'http://192.168.193.128:3000/graphql' });

const dogQuery = gql`
  query {
  issueList {
    SerialNo
    Name
    Phone
    Timestamp
  }
}
`;

const IssueComponent = graphql(dogQuery)(props => {
  const { issueList } = props.data;
  if (issueList) {
    return (
      <View>
        {issueList.map(issue => {
          return <View style={styles.tableCont} key={issue.SerialNo}>
                    <Text style={styles.eachItem}>{issue.SerialNo}</Text>
                    <Text style={styles.eachItem}>{issue.Name}</Text>
                    <Text style={styles.eachItem}>{issue.Phone}</Text>
                    <Text style={styles.eachItem}>{issue.Timestamp}</Text>
                </View>;
        })}
      </View>
    );
  }

  return <Text style={styles.welcome}>The wait list is currently empty.</Text>;
});

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ScrollView style={styles.container}>
            <Text style={styles.head}>Hotel California Waitlist System</Text>
            <Text style={styles.welcome}>Current Waitlist:</Text>
            <IssueComponent />
        </ScrollView>
      </ApolloProvider>
    );
  }
}