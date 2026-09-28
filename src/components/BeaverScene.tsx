import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';
import { BeaverCharacter, BEAVER_SCARVES, type BeaverScarf } from './BeaverCharacter';

type Props = {
  width: number;
  scarf: BeaverScarf;
  onScarf: (scarf: BeaverScarf) => void;
};

export function BeaverScene({ width, scarf, onScarf }: Props) {
  const height = Math.round(width * 0.72);

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height} viewBox="0 0 360 260">
        <Rect width={360} height={260} fill="#D7EEF8" />
        <Circle cx={292} cy={46} r={22} fill="#FFE7A3" />
        <Ellipse cx={180} cy={214} rx={220} ry={72} fill="#F0D7B0" />
        <Path d="M0 188 C80 170 140 210 210 190 C270 174 320 198 360 186 V260 H0 Z" fill="#7EC8C8" />
        <Ellipse cx={86} cy={206} rx={46} ry={12} fill="#C9844A" />
        <Ellipse cx={86} cy={202} rx={46} ry={10} fill="#E0A56A" />
        <Ellipse cx={250} cy={198} rx={18} ry={8} fill="#D7B48A" />
      </Svg>
      <View style={styles.beaver}>
        <BeaverCharacter size={Math.min(176, Math.round(width * 0.46))} scarf={scarf} />
      </View>
      <View style={styles.scarves}>
        {BEAVER_SCARVES.map((item) => {
          const selected = item.id === scarf;
          return (
            <Pressable
              key={item.id}
              onPress={() => onScarf(item.id)}
              accessibilityRole="button"
              accessibilityLabel={item.label}
              style={[styles.scarfBtn, selected && styles.scarfSelected]}
            >
              <View style={[styles.scarfDot, { backgroundColor: item.color }]} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  beaver: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 16,
    alignItems: 'center',
  },
  scarves: {
    position: 'absolute',
    left: 12,
    bottom: 36,
    gap: 8,
  },
  scarfBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.72)',
  },
  scarfSelected: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  scarfDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
});
