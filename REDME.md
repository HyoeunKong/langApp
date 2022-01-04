# Animated

### React Native animation 샤용시 주의할 것

1. animation의 state는 절대 React의 state에 두지 않는다. value가 필요하다면, Animated API에서 주어질 것이다.
2. Animated.Value 값은 절대 직접 수정하지 않는다.
3. 아무거나 animate 할 수 없다. 우선 component를 Animated component로 바꿔야 한다.

### createdAnimatedComponent() 함수를 사용하면, 어떤 것이든 Animated components로 만들 수 있다.

ex) styled-components 와 createdAnimatedComponent 함수를 함께 사용할 때

```
const Box = styled.TouchableOpacity`
  background-color: tomato;
  height: 200px;
  width: 200px;
`

const AnimatedBox = Animated.createAnimatedComponent(Box)
```

### Configuring animations

Animated.decay() - 초기 속도로 시작해서 점점 느려지고 멈춘다.
Animated.spring() - 물리모델 제공
Animated.timing() - 대부분의 경우 사용

userNativeDriver: true 모은 animation이 native에서 실행 (각각의 프레임마다 bridge를 이용하지 않음)
