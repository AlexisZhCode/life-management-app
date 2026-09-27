import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

export type TabGlyphName = 'home' | 'tasks' | 'care' | 'habits' | 'mood' | 'treats';

type Props = {
  name: TabGlyphName;
  size?: number;
};

const INK = '#5C463C';

export function TabGlyph({ name, size = 28 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      {name === 'home' ? <HomeGlyph /> : null}
      {name === 'tasks' ? <TasksGlyph /> : null}
      {name === 'care' ? <CareGlyph /> : null}
      {name === 'habits' ? <HabitsGlyph /> : null}
      {name === 'mood' ? <MoodGlyph /> : null}
      {name === 'treats' ? <TreatsGlyph /> : null}
    </Svg>
  );
}

function HomeGlyph() {
  return (
    <>
      <Path d="M16 4.5 L28 14.5 H24.5 V26.5 H7.5 V14.5 H4 Z" fill="#F6C56B" />
      <Rect x={9} y={15} width={14} height={11.5} rx={2} fill="#FFF6E4" />
      <Rect x={13.2} y={19.2} width={5.6} height={7.3} rx={1.4} fill="#C9844A" />
      <Rect x={20.2} y={8.2} width={2.4} height={4.2} rx={0.6} fill="#E7A23A" />
    </>
  );
}

function TasksGlyph() {
  return (
    <>
      <Rect x={7} y={6} width={18} height={21} rx={4} fill="#F4E2C4" />
      <Rect x={11} y={3.5} width={10} height={4.5} rx={2} fill="#C9844A" />
      <Path
        d="M11.2 14.2 L12.4 15.5 L14.8 12.6"
        stroke="#3F7A52"
        strokeWidth={1.6}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M17 14.2 H22" stroke={INK} strokeWidth={1.6} strokeLinecap="round" opacity={0.45} />
      <Path d="M11 19 H21" stroke={INK} strokeWidth={1.6} strokeLinecap="round" opacity={0.35} />
      <Path d="M11 23 H18" stroke={INK} strokeWidth={1.6} strokeLinecap="round" opacity={0.35} />
    </>
  );
}

function CareGlyph() {
  return (
    <>
      <Path
        d="M16 26 C16 26 5 18.5 5 12.2 C5 8.6 7.8 6.2 10.8 6.2 C12.8 6.2 14.5 7.3 16 9.2 C17.5 7.3 19.2 6.2 21.2 6.2 C24.2 6.2 27 8.6 27 12.2 C27 18.5 16 26 16 26 Z"
        fill="#FF8B7A"
      />
      <Circle cx={11.2} cy={11.2} r={1.7} fill="#FFE4DE" />
    </>
  );
}

function HabitsGlyph() {
  return (
    <>
      <Path d="M10 18 H22 L20 27 H12 Z" fill="#E7A56A" />
      <Path d="M16 18 V10" stroke="#5C8A4A" strokeWidth={2} strokeLinecap="round" />
      <Path d="M16 14 C12 14 10 11 10.5 8 C14 8.5 16 12 16 14 Z" fill="#7EC86A" />
      <Path d="M16 12.5 C20 12 22.5 9 21.5 6.5 C18 7.2 16 10 16 12.5 Z" fill="#9ED9B0" />
    </>
  );
}

function MoodGlyph() {
  return (
    <>
      <Circle cx={16} cy={16} r={11} fill="#F7C948" />
      <Circle cx={12.2} cy={14.2} r={1.5} fill={INK} />
      <Circle cx={19.8} cy={14.2} r={1.5} fill={INK} />
      <Path
        d="M11.5 18.5 Q16 22.5 20.5 18.5"
        stroke={INK}
        strokeWidth={1.6}
        fill="none"
        strokeLinecap="round"
      />
    </>
  );
}

function TreatsGlyph() {
  return (
    <>
      <Rect x={6.5} y={12} width={19} height={14} rx={3} fill="#FFB4A2" />
      <Rect x={6.5} y={12} width={19} height={4.2} fill="#F07167" />
      <Rect x={14.2} y={12} width={3.6} height={14} fill="#F7C948" />
      <Path
        d="M13 12 C13 8.5 19 8.5 19 12"
        stroke="#F7C948"
        strokeWidth={2.2}
        fill="none"
        strokeLinecap="round"
      />
      <Circle cx={16} cy={9.2} r={1.6} fill="#F7C948" />
    </>
  );
}
