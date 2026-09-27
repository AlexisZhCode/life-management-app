import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';
import { PandaCharacter } from './PandaCharacter';

type Props = {
  width: number;
};

export function BambooGrove({ width }: Props) {
  const height = Math.round(width * 0.72);

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height} viewBox="0 0 360 260">
        <Rect width={360} height={260} fill="#C5E9F6" />
        <Circle cx={300} cy={42} r={22} fill="#FFE7A3" />
        <Ellipse cx={180} cy={210} rx={210} ry={78} fill="#7DCEB4" />
        <Ellipse cx={180} cy={232} rx={220} ry={70} fill="#2FAE96" />
        <Stalk x={18} top={18} />
        <Stalk x={42} top={46} />
        <Stalk x={292} top={28} />
        <Stalk x={318} top={8} />
        <Stalk x={250} top={54} short />
        <Ellipse cx={70} cy={214} rx={16} ry={6} fill="#249680" />
        <Ellipse cx={250} cy={220} rx={12} ry={5} fill="#249680" />
      </Svg>
      <View style={styles.panda}>
        <PandaCharacter size={Math.min(168, Math.round(width * 0.42))} hold="bamboo" />
      </View>
    </View>
  );
}

function Stalk({ x, top, short }: { x: number; top: number; short?: boolean }) {
  const height = short ? 150 : 210;
  return (
    <>
      <Rect x={x} y={top} width={12} height={height} rx={6} fill="#6AAA45" />
      <Rect x={x - 1} y={top + 34} width={14} height={4} rx={2} fill="#D5EE9A" />
      <Rect x={x - 1} y={top + 72} width={14} height={4} rx={2} fill="#D5EE9A" />
      <Rect x={x - 1} y={top + 110} width={14} height={4} rx={2} fill="#D5EE9A" />
      <Path
        d={`M${x + 6} ${top + 28} C ${x - 22} ${top + 8} ${x - 6} ${top - 8} ${x + 4} ${top + 16}`}
        fill="#5C9A3C"
      />
      <Path
        d={`M${x + 8} ${top + 48} C ${x + 34} ${top + 28} ${x + 28} ${top + 12} ${x + 8} ${top + 36}`}
        fill="#8ED56A"
      />
    </>
  );
}

const styles = StyleSheet.create({
  panda: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 18,
    alignItems: 'center',
  },
});
