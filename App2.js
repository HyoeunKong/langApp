import React, { useRef, useState } from 'react'
import { Animated, PanResponder, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import styled from 'styled-components'
import icons from './icons'
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #00a8ff;
`
const Card = styled(Animated.createAnimatedComponent(View))`
  background-color: white;
  width: 300px;
  height: 300px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  position: absolute;
`
const Btn = styled.TouchableOpacity`
  margin: 0px 10px;
`

const BtnContainer = styled.View`
  flex-direction: row;
  flex: 1;
`

const CardContainer = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
`

export default function App2() {
  //value
  const scale = useRef(new Animated.Value(1)).current
  const position = useRef(new Animated.Value(0)).current

  //animation
  const rotation = position.interpolate({
    inputRange: [-250, 250],
    outputRange: ['-15deg', '15deg'],
    extrapolate: 'extend', //inputRange를 벗어났을때 어떻게 처리할 지에 대한 옵션
  })

  const secondScale = position.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0.7, 1],
    extrapolate: 'clamp',
  })

  const onPressIn = Animated.spring(scale, {
    toValue: 0.95,
    useNativeDriver: true,
  })

  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  })

  const goCenter = Animated.spring(position, {
    toValue: 0,

    useNativeDriver: true,
  })
  const goLeft = Animated.spring(position, {
    toValue: -500,
    tension: 5,
    useNativeDriver: true,
    restDisplacementThreshold: 100,
    restSpeedThreshold: 100,
  })

  const goRight = Animated.spring(position, {
    toValue: 500,
    tension: 5,
    useNativeDriver: true,
    restDisplacementThreshold: 100,
    restSpeedThreshold: 100,
  })
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => onPressIn.start(),
      onPanResponderMove: (_, { dx }) => {
        position.setValue(dx)
      },
      onPanResponderRelease: (_, { dx }) => {
        if (dx < -150) {
          goLeft.start(onDismiss)
        } else if (dx > 150) {
          goRight.start(onDismiss)
        } else {
          Animated.parallel([onPressOut, goCenter]).start()
        }
      },
    }),
  ).current
  //state
  const [index, setIndex] = useState(0)
  const onDismiss = () => {
    position.setValue(0)
    scale.setValue(1)
    setIndex((prev) => prev + 1)
  }

  const closePress = () => {
    goLeft.start(onDismiss)
  }

  const checkPress = () => {
    goRight.start(onDismiss)
  }

  return (
    <Container>
      <CardContainer>
        <Card style={{ transform: [{ scale: secondScale }] }}>
          <Ionicons name={icons[index + 1]} color="#192a56" size={98} />
        </Card>
        <Card
          {...panResponder.panHandlers}
          style={{
            transform: [
              { scale },
              { translateX: position },
              { rotateZ: rotation },
            ],
          }}
        >
          <Ionicons name={icons[index]} color="#192a56" size={98} />
        </Card>
      </CardContainer>

      <BtnContainer>
        <Btn onPress={closePress}>
          <Ionicons name="close-circle" color="white" size={58}></Ionicons>
        </Btn>
        <Btn onPress={checkPress}>
          <Ionicons name="checkmark-circle" color="white" size={58}></Ionicons>
        </Btn>
      </BtnContainer>
    </Container>
  )
}
