import { View, Text } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../../shared/components/ScreenWrapper'
import { SafeAreaView } from 'react-native-safe-area-context'

const Notifications = () => {
  return (
    <ScreenWrapper className="flex justify-center items-center min-h-screen">
      <SafeAreaView>
    <View>
      <Text>Notifications</Text>
    </View>
    </SafeAreaView>
    </ScreenWrapper>
  )
}

export default Notifications