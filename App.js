import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native'
import * as Contacts from 'expo-contacts'
import Constants from 'expo-constants'
import React, { useState, useEffect } from 'react'

export default function App () {
  const [data, setData] = useState([])
  const [contacts, onChangeText] = useState('')

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync()
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails]
        })
        if (data.length > 0) {
          const contact = data
          setData(contact)
        }
      }
    })()
  }, [])

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 24
          }}
        >
          Contacts Name
        </Text>
      </View>
      <TextInput
        style={{
          height: 40,
          margin: 20,
          borderWidth: 1,
          padding: 10
        }}
        onChangeText={onChangeText}
        value={contacts}
        placeholder='Search'
      />
      <ScrollView style={{ margin: 5 }}>
        {data.length > 0 &&
          data
            .filter((kk) => kk.name.toLowerCase().includes(contacts.toLowerCase()))
            .map((item, index) => {
              return (
                <View
                  style={{
                    marginVertical: 3,
                    alignItems: 'center'
                  }}
                  key={index}
                >
                  <Text>{item.name}</Text>
                </View>
              )
            })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 10
  }
})
