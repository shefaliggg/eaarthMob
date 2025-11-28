import { View, Text } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../../shared/components/ScreenWrapper'
import { SafeAreaView } from 'react-native-safe-area-context'

const Reminders = () => {
  return (
    <ScreenWrapper className="flex items-center justify-center min-h-screen">
      <SafeAreaView>
    <View>
      <Text>Reminders</Text>
    </View>
    </SafeAreaView>
    </ScreenWrapper>
  )
}

export default Reminders