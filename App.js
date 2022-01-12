import React, { useEffect, useState, useRef } from 'react'
import { Animated, PanResponder } from 'react-native'
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
  const POSITION = useRef(
    new Animated.ValueXY({
      x: 0,
      y: 0,
    }),
  ).current

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true, //view에서 touch를 감지할 지 결정할 수 있도록 함
      onPanResponderGrant: () => {
        console.log('started')
        POSITION.setOffset({
          x: POSITION.x._value,
          y: POSITION.y._value,
        })
      }, // 터치 시작
      onPanResponderMove: (_, { dx, dy }) => {
        POSITION.setValue({
          x: dx,
          y: dy,
        })
        console.log('move')
      },
      onPanResponderRelease: () => {
        console.log('finished')
        POSITION.flattenOffset()
      }, //터치 끝
    }),
  ).current
  console.log(...POSITION.getTranslateTransform())

  const borderRadius = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  })

  const rotation = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ['-360deg', '360deg'],
  })

  const bgColor = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ['rgb(255,99,71)', 'rgb(71,166,255)'],
  })
  return (
    <Container>
      <AnimatedBox
        {...panResponder.panHandlers}
        style={{
          borderRadius,
          backgroundColor: bgColor,
          transform: POSITION.getTranslateTransform(),
        }}
      />
    </Container>
  )
}
