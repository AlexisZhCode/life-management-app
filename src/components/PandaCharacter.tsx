import React, { useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import Svg, { Circle, Ellipse, G, Path, Rect } from 'react-native-svg';

const FUR = '#FFFDFB';
const INK = '#3A3634';
const CHEEK = '#F4B4C2';
const CASE = '#7EC8C4';
const HANDLE = '#8B5E3C';

type Props = {
  size?: number;
  hold?: 'kit' | 'bamboo';
};

export function PandaCharacter({ size = 120, hold = 'kit' }: Props) {
  const [bob] = useState(() => new Animated.Value(0));
  const [wave] = useState(() => new Animated.Value(0));
  const [armAngle, setArmAngle] = useState(8);

  useEffect(() => {
    const bobLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(bob, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(bob, {
          toValue: 0,
          duration: 1200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );
    const waveLoop = Animated.loop(
      Animated.sequence([
        Animated.delay(800),
        Animated.timing(wave, {
          toValue: 1,
          duration: 220,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }),
        Animated.timing(wave, {
          toValue: 0.2,
          duration: 160,
          useNativeDriver: false,
        }),
        Animated.timing(wave, {
          toValue: 1,
          duration: 160,
          useNativeDriver: false,
        }),
        Animated.timing(wave, {
          toValue: 0,
          duration: 280,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: false,
        }),
        Animated.delay(1500),
      ]),
    );
    bobLoop.start();
    waveLoop.start();
    const armListener = wave.addListener(({ value }) => {
      setArmAngle(8 + (-62 - 8) * value);
    });
    return () => {
      bobLoop.stop();
      waveLoop.stop();
      wave.removeListener(armListener);
    };
  }, [bob, wave]);

  const translateY = bob.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -4],
  });

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 140 140" style={StyleSheet.absoluteFill}>
        <Ellipse
          cx={78}
          cy={128}
          rx={36}
          ry={6}
          fill={hold === 'bamboo' ? '#1C8F7A' : '#E7D3C6'}
          opacity={0.45}
        />
      </Svg>
      <Animated.View style={{ width: size, height: size, transform: [{ translateY }] }}>
        <Svg width={size} height={size} viewBox="0 0 140 140">
          {hold === 'bamboo' ? <BambooShoot /> : <KitCase />}

          <Circle cx={52} cy={40} r={13} fill={INK} />
          <Circle cx={104} cy={38} r={13} fill={INK} />
          <Ellipse cx={78} cy={108} rx={34} ry={20} fill={FUR} />
          <Ellipse cx={50} cy={106} rx={9} ry={11} fill={FUR} />
          <Circle cx={78} cy={66} r={30} fill={FUR} />
          <Ellipse cx={65} cy={66} rx={10} ry={12} fill={INK} />
          <Ellipse cx={91} cy={66} rx={10} ry={12} fill={INK} />
          <Circle cx={65} cy={67} r={3.3} fill="#FFFFFF" />
          <Circle cx={91} cy={67} r={3.3} fill="#FFFFFF" />
          <Circle cx={66.2} cy={67.4} r={1.6} fill="#1E1A18" />
          <Circle cx={92.2} cy={67.4} r={1.6} fill="#1E1A18" />
          <Circle cx={52} cy={78} r={4.5} fill={CHEEK} />
          <Circle cx={104} cy={78} r={4.5} fill={CHEEK} />
          <Ellipse cx={78} cy={78} rx={4.2} ry={3.1} fill={INK} />
          <Path
            d="M71 84 Q78 90 85 84"
            stroke={INK}
            strokeWidth={1.8}
            fill="none"
            strokeLinecap="round"
          />

          <G transform={`rotate(${armAngle} 104 92)`}>
            <Ellipse cx={108} cy={104} rx={8} ry={12} fill={FUR} />
            <Circle cx={110} cy={116} r={10} fill={FUR} />
            <Circle cx={106} cy={118} r={1.5} fill={INK} opacity={0.28} />
            <Circle cx={110} cy={120} r={1.5} fill={INK} opacity={0.28} />
            <Circle cx={114} cy={118} r={1.5} fill={INK} opacity={0.28} />
          </G>
        </Svg>
      </Animated.View>
    </View>
  );
}

function KitCase() {
  return (
    <>
      <Rect x={8} y={88} width={32} height={28} rx={7} fill={CASE} />
      <Rect
        x={14}
        y={80}
        width={18}
        height={12}
        rx={6}
        fill="none"
        stroke={HANDLE}
        strokeWidth={3}
      />
      <Rect x={20} y={98} width={7} height={8} rx={2} fill="#F4FFFC" />
    </>
  );
}

function BambooShoot() {
  return (
    <>
      <Path d="M24 120 V74" stroke="#6AAA45" strokeWidth={8} strokeLinecap="round" />
      <Path d="M18 98 H30" stroke="#D5EE9A" strokeWidth={3} strokeLinecap="round" />
      <Path d="M18 86 H30" stroke="#D5EE9A" strokeWidth={3} strokeLinecap="round" />
      <Path d="M22 78 C8 66 6 52 16 46 C10 62 16 74 22 78 Z" fill="#7ED36A" />
      <Path d="M26 72 C40 60 44 46 34 42 C40 56 34 70 26 72 Z" fill="#9ED9B0" />
    </>
  );
}
