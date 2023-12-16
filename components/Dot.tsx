import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React from 'react';
import { OnboardingData } from '../data/data';
import Animated, { SharedValue, interpolateColor, useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated';

type Props = {
  index: number;
  x: SharedValue<number>;
};

const Dot = ({ index, x }: Props) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [10, 30, 10],
      Extrapolate.CLAMP
    );

    const opacityAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0.5, 1, 0.5],
      Extrapolate.CLAMP
    );

    return {
      width: widthAnimation,
      opacity: opacityAnimation
    };
  });

  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      ['#109a78', '#1e2169', '#f15937']
    );

    return {
      backgroundColor: backgroundColor
    };
  });

  return (
    <Animated.View style={[styles.dots, animatedColor, animatedDotStyle]} />
  );
};

export default Dot;

const styles = StyleSheet.create({
  dots: {
    width: 10,
    height: 10,
    backgroundColor: 'black',
    marginHorizontal: 5,
    borderRadius: 5,
  }
});