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

  POSITION.addListener(({ x, y }) => {
    console.log({ x, y })
  })

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true, //view에서 touch를 감지할 지 결정할 수 있도록 함
      onPanResponderGrant: () => {
        console.log('started')
        POSITION.setOffset({
          x: POSITION.x._value,
          y: POSITION.y._value,
        })
        //0이 아니라, 이전 위치에서 시작하라
        //거기서 손가락이 이동한 거리를 더하라
      }, // 터치 시작
      onPanResponderMove: (_, { dx, dy, moveX, moveY, x0, y0 }) => {
        POSITION.setValue({
          x: dx,
          y: dy,
        })
        console.log('move')
        // console.log({ dx, dy, moveX, moveY, x0, y0 })
      },
      onPanResponderRelease: () => {
        console.log('finished')
        POSITION.flattenOffset()
        // offset을 가져다가 0으로 만들면서 해당 offset을 POSITION 에 넘겨준다.
        // offet에 있던 값은 현재 포지션으로 넘겨줌
      }, //터치 끝
    }),
  ).current

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
