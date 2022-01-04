import React, { useEffect, useState } from 'react'
import { Animated, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const Box = styled.View`
  background-color: tomato;
  height: 200px;
  width: 200px;
`
const AnimatedBox = Animated.createAnimatedComponent(Box)
export default function App() {
  const Y = new Animated.Value(0)
  const moveUp = () => {
    Animated.spring(Y, {
      toValue: -200,
      tension: 800,
      friction: 1,
      useNativeDriver: true,
    }).start()
  }

  Y.addListener(() => console.log(Y))

  return (
    <Container>
      <TouchableOpacity onPress={moveUp}>
        <AnimatedBox style={{ transform: [{ translateY: Y }] }} />
      </TouchableOpacity>
    </Container>
  )
}
