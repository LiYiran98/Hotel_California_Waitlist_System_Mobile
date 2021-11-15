import React, { Component } from 'react'
import { Button, View, Text, TextInput, StyleSheet, Alert, SafeAreaView, ScrollView, StatusBar } from 'react-native'
import ApolloClient from 'apollo-boost';
import { ApolloProvider, graphql, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import RNRestart from 'react-native-restart';

styles = StyleSheet.create({
  welcome: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
      marginTop:20,
      fontWeight: "bold"
  },
  tableCont: {
      fontSize: 18,
      flexDirection:"row", 
      justifyContent: 'space-around',
    margin: 10,
      marginRight:20
  },
    tableHead: {
      fontSize: 18,
      flexDirection:"row", 
      justifyContent: 'space-around',
      marginRight:20,
        marginLeft:10
  },
    container: {
        marginTop: 50
    },
    head: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: "bold"
    },
    serialno: {
        width: 60,
        textAlign: 'center'
    },
    name: {
        width: 50,
        textAlign: 'center'
    },
    phone: {
        width: 65,
        textAlign: 'center'
    },
    time: {
        width: 175,
        textAlign: 'center'
    },
    serialno_head: {
        width: 60,
        textAlign: 'center',
        fontWeight: "bold"
    },
    name_head: {
        width: 50,
        textAlign: 'center',
        fontWeight: "bold"
    },
    phone_head: {
        width: 65,
        textAlign: 'center',
        fontWeight: "bold"
    },
    time_head: {
        width: 175,
        textAlign: 'center',
        fontWeight: "bold"
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
                    <Text style={styles.serialno}>{issue.SerialNo}</Text>
                    <Text style={styles.name}>{issue.Name}</Text>
                    <Text style={styles.phone}>{issue.Phone}</Text>
                    <Text style={styles.time}>{issue.Timestamp}</Text>
                </View>;
        })}
      </View>
    );
  }

  return <Text style={styles.welcome}>The wait list is currently empty.</Text>;
});

export default class App extends Component {
  refresh() {
      RNRestart.Restart()
  }
    
  render() {
    return (
      <ApolloProvider client={client}>
        <ScrollView style={styles.container}>
            <Text style={styles.head}>Hotel California Waitlist System</Text>
            <Text style={styles.welcome}>Current Waitlist:</Text>
            <View style={styles.tableHead}>
                <Text style={styles.serialno_head}>SerialNo</Text>
                <Text style={styles.name_head}>Name</Text>
                <Text style={styles.phone_head}>Phone</Text>
                <Text style={styles.time_head}>Timestamp</Text>
            </View>
            <IssueComponent />
            <Button style={styles.welcome} title="Refresh" onPress={this.refresh} />
        </ScrollView>
      </ApolloProvider>
    );
  }
}