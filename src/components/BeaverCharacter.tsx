import React, { useEffect, useState } from 'react';
import { Animated, Easing } from 'react-native';
import Svg, { Circle, Ellipse, G, Path, Rect } from 'react-native-svg';

const FUR = '#C9844A';
const EAR = '#E7B48C';
const BELLY = '#F6D7B4';
const INK = '#4A2C22';
const TAIL = '#8A5A34';

export const BEAVER_SCARVES = [
  { id: 'red', color: '#E25B4A', label: 'Red scarf' },
  { id: 'gold', color: '#F0B429', label: 'Yellow scarf' },
  { id: 'green', color: '#3E9A5B', label: 'Green scarf' },
  { id: 'blue', color: '#3C7FBF', label: 'Blue scarf' },
] as const;

export type BeaverScarf = (typeof BEAVER_SCARVES)[number]['id'];

type Props = {
  size?: number;
  scarf?: BeaverScarf;
};

export function BeaverCharacter({ size = 150, scarf = 'red' }: Props) {
  const scarfColor = BEAVER_SCARVES.find((item) => item.id === scarf)?.color ?? BEAVER_SCARVES[0].color;
  const [bob] = useState(() => new Animated.Value(0));
  const [wave] = useState(() => new Animated.Value(0));
  const [armAngle, setArmAngle] = useState(12);

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
        Animated.delay(900),
        Animated.timing(wave, {
          toValue: 1,
          duration: 220,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }),
        Animated.timing(wave, { toValue: 0.25, duration: 160, useNativeDriver: false }),
        Animated.timing(wave, { toValue: 1, duration: 160, useNativeDriver: false }),
        Animated.timing(wave, {
          toValue: 0,
          duration: 280,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: false,
        }),
        Animated.delay(1400),
      ]),
    );
    bobLoop.start();
    waveLoop.start();
    const armListener = wave.addListener(({ value }) => {
      setArmAngle(12 + (-58 - 12) * value);
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
    <Animated.View style={{ width: size, height: size, transform: [{ translateY }] }}>
      <Svg width={size} height={size} viewBox="0 0 160 160">
        <Ellipse cx={112} cy={122} rx={28} ry={16} fill={TAIL} transform="rotate(-18 112 122)" />
        <Path
          d="M96 116 H128 M98 122 H130 M100 128 H126"
          stroke="#A87448"
          strokeWidth={1.4}
          strokeLinecap="round"
        />

        <Ellipse cx={74} cy={112} rx={36} ry={28} fill={FUR} />
        <Ellipse cx={74} cy={118} rx={20} ry={16} fill={BELLY} />
        <Ellipse cx={52} cy={126} rx={10} ry={6} fill={FUR} />
        <Ellipse cx={96} cy={126} rx={10} ry={6} fill={FUR} />

        <Ellipse cx={46} cy={108} rx={9} ry={12} fill={FUR} />
        <Circle cx={42} cy={118} r={8} fill={FUR} />

        <Circle cx={50} cy={52} r={10} fill={FUR} />
        <Circle cx={98} cy={52} r={10} fill={FUR} />
        <Circle cx={50} cy={53} r={5.5} fill={EAR} />
        <Circle cx={98} cy={53} r={5.5} fill={EAR} />
        <Circle cx={74} cy={72} r={32} fill={FUR} />
        <Ellipse cx={74} cy={84} rx={16} ry={12} fill={BELLY} />

        <Path
          d="M44 96 Q74 82 108 98 L122 122 L108 112 L104 128 L92 108 Z"
          fill={scarfColor}
        />
        <Ellipse cx={76} cy={100} rx={30} ry={9} fill={scarfColor} />

        <Ellipse cx={62} cy={70} rx={5} ry={6} fill={INK} />
        <Ellipse cx={86} cy={70} rx={5} ry={6} fill={INK} />
        <Circle cx={64} cy={68} r={1.7} fill="#FFFFFF" />
        <Circle cx={88} cy={68} r={1.7} fill="#FFFFFF" />
        <Ellipse cx={74} cy={82} rx={3.4} ry={2.4} fill={INK} />
        <Rect x={70} y={86} width={3.4} height={5.5} rx={1} fill="#FFFFFF" />
        <Rect x={74.6} y={86} width={3.4} height={5.5} rx={1} fill="#FFFFFF" />

        <G transform={`rotate(${armAngle} 104 98)`}>
          <Ellipse cx={108} cy={108} rx={8} ry={13} fill={FUR} />
          <Circle cx={110} cy={120} r={9} fill={FUR} />
          <Rect x={114} y={78} width={4} height={42} rx={2} fill="#8B5E3C" transform="rotate(18 116 100)" />
        </G>
      </Svg>
    </Animated.View>
  );
}
