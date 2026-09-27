import React from 'react';
import Svg, { Circle, Ellipse, G, Path, Rect } from 'react-native-svg';

const SKIN = '#F4C2AE';
const HAIR = '#6A4036';
const INK = '#4A3428';
const BLUSH = '#F0A198';
const CREAM = '#FFF6F0';

export type BloomIconName =
  | 'home'
  | 'tasks'
  | 'care'
  | 'habits'
  | 'mood'
  | 'treats'
  | 'bloom'
  | 'coin'
  | 'streak'
  | 'rest'
  | 'nourish'
  | 'mood-low'
  | 'mood-meh'
  | 'mood-ok'
  | 'mood-good'
  | 'mood-great'
  | 'rest-rough'
  | 'rest-okay'
  | 'rest-fine'
  | 'rest-good'
  | 'rest-dreamy'
  | 'meal-sunrise'
  | 'meal-midday'
  | 'meal-evening'
  | 'meal-bite'
  | 'habit-stretch'
  | 'habit-sip'
  | 'habit-read'
  | 'habit-run'
  | 'habit-yoga'
  | 'habit-sleep'
  | 'habit-tidy'
  | 'habit-music'
  | 'reward-tea'
  | 'reward-walk'
  | 'reward-movie'
  | 'reward-dessert'
  | 'reward-bath'
  | 'reward-plant'
  | 'empty-clear'
  | 'empty-done'
  | 'empty-habits'
  | 'empty-treats'
  | 'celebrate'
  | 'glass-full'
  | 'glass-empty';

type Expression = 'low' | 'meh' | 'calm' | 'warm' | 'bright' | 'asleep';

const LEGACY_EMOJI: Record<string, BloomIconName> = {
  '🏠': 'home',
  '✅': 'tasks',
  '🫧': 'care',
  '🌱': 'habit-stretch',
  '💛': 'mood-good',
  '🎁': 'treats',
  '🌸': 'bloom',
  '🌼': 'bloom',
  '🍵': 'reward-tea',
  '🌤️': 'reward-walk',
  '🎬': 'reward-movie',
  '🧁': 'reward-dessert',
  '🛁': 'reward-bath',
  '🪴': 'reward-plant',
  '🧘': 'habit-yoga',
  '📖': 'habit-read',
  '💧': 'habit-sip',
  '🏃': 'habit-run',
  '🛏️': 'habit-sleep',
  '🧹': 'habit-tidy',
  '🎵': 'habit-music',
  '😢': 'mood-low',
  '😕': 'mood-meh',
  '😐': 'mood-ok',
  '🙂': 'mood-good',
  '😄': 'mood-great',
  '😫': 'rest-rough',
  '😴': 'rest-dreamy',
  '🌅': 'meal-sunrise',
  '🌞': 'meal-midday',
  '🌙': 'rest',
  '🍽️': 'nourish',
  '🍃': 'empty-clear',
  '🎉': 'empty-done',
  '✨': 'celebrate',
  '⭐': 'coin',
  '🔥': 'streak',
  '🍪': 'meal-bite',
};

const ICONS = new Set<string>([
  'home',
  'tasks',
  'care',
  'habits',
  'mood',
  'treats',
  'bloom',
  'coin',
  'streak',
  'rest',
  'nourish',
  'mood-low',
  'mood-meh',
  'mood-ok',
  'mood-good',
  'mood-great',
  'rest-rough',
  'rest-okay',
  'rest-fine',
  'rest-good',
  'rest-dreamy',
  'meal-sunrise',
  'meal-midday',
  'meal-evening',
  'meal-bite',
  'habit-stretch',
  'habit-sip',
  'habit-read',
  'habit-run',
  'habit-yoga',
  'habit-sleep',
  'habit-tidy',
  'habit-music',
  'reward-tea',
  'reward-walk',
  'reward-movie',
  'reward-dessert',
  'reward-bath',
  'reward-plant',
  'empty-clear',
  'empty-done',
  'empty-habits',
  'empty-treats',
  'celebrate',
  'glass-full',
  'glass-empty',
]);

export function resolveIcon(value: string): BloomIconName {
  if (ICONS.has(value)) return value as BloomIconName;
  return LEGACY_EMOJI[value] ?? 'bloom';
}

function Face({ mood }: { mood: Expression }) {
  const open = mood === 'low' || mood === 'meh' || mood === 'calm' || mood === 'warm';
  return (
    <G>
      <Ellipse cx="23" cy="32" rx="3.4" ry="1.8" fill={BLUSH} />
      <Ellipse cx="41" cy="32" rx="3.4" ry="1.8" fill={BLUSH} />
      {mood === 'low' ? (
        <Path
          d="M20 22c2.4 2.2 5 2.2 7.2 0M37 22c2.4 2.2 5 2.2 7.2 0"
          stroke={INK}
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
      ) : null}
      {mood === 'bright' ? (
        <Path
          d="M20 27c2.2-3 5-3 7.2 0M37 27c2.2-3 5-3 7.2 0"
          stroke={INK}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      ) : null}
      {mood === 'asleep' ? (
        <Path
          d="M20 27c2.2 2.6 5 2.6 7.2 0M37 27c2.2 2.6 5 2.6 7.2 0"
          stroke={INK}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      ) : null}
      {open ? (
        <>
          <Ellipse cx="24" cy="27" rx="1.7" ry={mood === 'low' ? 1.1 : 2} fill={INK} />
          <Ellipse
            cx="40"
            cy="27"
            rx="1.7"
            ry={mood === 'meh' ? 1.2 : mood === 'low' ? 1.1 : 2}
            fill={INK}
          />
          {mood !== 'low' ? (
            <>
              <Circle cx="24.6" cy="26.3" r="0.55" fill={CREAM} />
              <Circle cx="40.6" cy="26.3" r="0.55" fill={CREAM} />
            </>
          ) : null}
        </>
      ) : null}
      <Path
        d="M31.2 30.4c.6 1.6 1.2 1.6 1.7 0"
        stroke="#E3A890"
        strokeWidth="1.3"
        fill="none"
        strokeLinecap="round"
      />
      {mood === 'bright' ? (
        <Path d="M22 33c3.2 7 16 7 20 0" fill="#E58B80" />
      ) : (
        <Path
          d={
            mood === 'low'
              ? 'M23 38c3-3.2 15-3.2 18 0'
              : mood === 'meh'
                ? 'M24 36h16'
                : mood === 'warm'
                  ? 'M23 34c3 4.2 15 4.2 18 0'
                  : 'M25 35c2.2 2.4 10 2.4 14 0'
          }
          stroke={INK}
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
      )}
    </G>
  );
}

function Head({
  mood,
  bun = false,
}: {
  mood: Expression;
  bun?: boolean;
}) {
  return (
    <G>
      <Circle cx="18" cy="28" r="3" fill={SKIN} />
      <Circle cx="46" cy="28" r="3" fill={SKIN} />
      <Circle cx="32" cy="26" r="15" fill={SKIN} />
      <Path
        d="M17 27C17 12 23 6 32 6c10 0 16 7 15 22-2-8-7-13-15-13s-13 5-15 13z"
        fill={HAIR}
      />
      <Path
        d="M20 20c4-5 8 1 12-2 5-3 10 1 13 5-5-4-9 0-13-1-5-1-8 2-12-2z"
        fill={HAIR}
      />
      {bun ? <Circle cx="46" cy="14" r="5" fill={HAIR} /> : null}
      <Face mood={mood} />
    </G>
  );
}

function Shoulders({ color }: { color: string }) {
  return (
    <Path
      d="M6 64c2-16 12-22 26-22s24 6 26 22H6z"
      fill={color}
    />
  );
}

function Neck() {
  return <Path d="M27 38h10v7a5 5 0 0 1-10 0v-7z" fill={SKIN} />;
}

function Bust({
  shirt,
  mood,
  bun = false,
  behind,
  front,
}: {
  shirt: string;
  mood: Expression;
  bun?: boolean;
  behind?: React.ReactNode;
  front?: React.ReactNode;
}) {
  return (
    <G>
      {behind}
      <Neck />
      <Shoulders color={shirt} />
      <Head mood={mood} bun={bun} />
      {front}
    </G>
  );
}

function Mug() {
  return (
    <G>
      <Path
        d="M24 44h14a5 5 0 0 1 0 10H24a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4z"
        fill={CREAM}
      />
      <Path
        d="M38 47h2.5a3 3 0 0 1 0 6H38"
        stroke="#E7C3B8"
        strokeWidth="1.4"
        fill="none"
      />
      <Path
        d="M28 42c1-3 1-3 0-6M33 42c1-3 1-3 0-6"
        stroke="#E7C3B8"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
    </G>
  );
}

function Gift() {
  return (
    <G>
      <Rect x="22" y="46" width="20" height="14" rx="2" fill="#C9B6E4" />
      <Path d="M32 46v14M22 53h20" stroke={CREAM} strokeWidth="2" />
      <Path
        d="M32 46c-3-4-8-3-6 0M32 46c3-4 8-3 6 0"
        stroke="#9B86C4"
        strokeWidth="1.6"
        fill="none"
      />
    </G>
  );
}

function Flower({ x, y }: { x: number; y: number }) {
  return (
    <G>
      <Circle cx={x} cy={y - 2.4} r="2" fill="#FFB4A2" />
      <Circle cx={x - 2.4} cy={y} r="2" fill="#FF8B7A" />
      <Circle cx={x + 2.4} cy={y} r="2" fill="#FF8B7A" />
      <Circle cx={x} cy={y + 2.2} r="2" fill="#FFB4A2" />
      <Circle cx={x} cy={y} r="1.3" fill="#F7C948" />
    </G>
  );
}

function Wave() {
  return (
    <G>
      <Path
        d="M48 46c8-6 12-16 6-24"
        stroke={SKIN}
        strokeWidth="4.5"
        fill="none"
        strokeLinecap="round"
      />
      <Circle cx="52" cy="20" r="3" fill={SKIN} />
    </G>
  );
}

function StretchArms() {
  return (
    <G>
      <Path
        d="M20 44C14 32 12 20 18 14"
        stroke={SKIN}
        strokeWidth="4.5"
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d="M44 44c6-12 8-24 2-30"
        stroke={SKIN}
        strokeWidth="4.5"
        fill="none"
        strokeLinecap="round"
      />
      <Circle cx="17" cy="13" r="3" fill={SKIN} />
      <Circle cx="47" cy="13" r="3" fill={SKIN} />
    </G>
  );
}

function Sprout() {
  return (
    <G>
      <Path d="M18 58v-8" stroke="#6BCB8A" strokeWidth="1.6" strokeLinecap="round" />
      <Ellipse cx="15" cy="50" rx="3" ry="2" fill="#9ED9B0" />
      <Ellipse cx="21" cy="50" rx="3" ry="2" fill="#6BCB8A" />
    </G>
  );
}

function Book() {
  return (
    <G>
      <Path d="M16 46h14v14H16z" fill={CREAM} />
      <Path d="M30 46h14v14H30z" fill="#FFD5CD" />
      <Path d="M30 46v14" stroke="#E7C3B8" strokeWidth="1.2" />
    </G>
  );
}

function GlassProp() {
  return (
    <G>
      <Path
        d="M36 42h10l-1.5 12a4 4 0 0 1-7 0L36 42z"
        fill="#D4F0EE"
        stroke="#7EC8C4"
        strokeWidth="1.3"
      />
    </G>
  );
}

function Plate() {
  return (
    <G>
      <Ellipse cx="32" cy="54" rx="13" ry="5" fill={CREAM} />
      <Ellipse cx="32" cy="53" rx="8" ry="3" fill="#FFD5CD" />
    </G>
  );
}

function Cookie() {
  return (
    <G>
      <Circle cx="40" cy="50" r="6" fill="#E2B07A" />
      <Circle cx="38" cy="48" r="1" fill={HAIR} />
      <Circle cx="42" cy="51" r="1" fill={HAIR} />
    </G>
  );
}

function Sun({ x, y, r = 5 }: { x: number; y: number; r?: number }) {
  return <Circle cx={x} cy={y} r={r} fill="#F7C948" />;
}

function Moon() {
  return <Path d="M48 8a7 7 0 1 0 0 14 5.5 5.5 0 1 1 0-14z" fill="#C9B6E4" />;
}

function Pot() {
  return (
    <G>
      <Path d="M24 50h16l-2 11H26z" fill="#E2B07A" />
      <Path
        d="M32 50c0-8-7-6-6-12M32 48c2-8 8-6 8-12"
        stroke="#6BCB8A"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <Ellipse cx="26" cy="38" rx="3.2" ry="2" fill="#9ED9B0" />
      <Ellipse cx="40" cy="36" rx="3.2" ry="2" fill="#9ED9B0" />
    </G>
  );
}

function Cake() {
  return (
    <G>
      <Path d="M22 50h20l-2 11H24z" fill="#FFB4A2" />
      <Path d="M22 50h20v3H22z" fill={CREAM} />
      <Circle cx="32" cy="47" r="2" fill="#F7C948" />
    </G>
  );
}

function Screen() {
  return (
    <G>
      <Rect x="16" y="46" width="32" height="14" rx="2" fill={INK} />
      <Rect x="19" y="49" width="26" height="8" rx="1" fill="#7EC8C4" />
    </G>
  );
}

function Cloth() {
  return <Path d="M20 46h22l-2 13H22z" fill="#D4F0EE" />;
}

function Card() {
  return (
    <G>
      <Rect x="18" y="44" width="22" height="16" rx="3" fill={CREAM} />
      <Path
        d="M22 52l2.2 2.2L29 48"
        stroke="#6BCB8A"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <Path d="M32 50h5M32 54h4" stroke="#E7C3B8" strokeWidth="1.3" strokeLinecap="round" />
    </G>
  );
}

function Portrait({
  mood,
  mark,
}: {
  mood: Expression;
  mark?: React.ReactNode;
}) {
  return (
    <G>
      {mark}
      <G transform="translate(32 34) scale(1.28) translate(-32 -28)">
        <Head mood={mood} />
      </G>
    </G>
  );
}

function Glass({ full }: { full: boolean }) {
  return (
    <G>
      <Path
        d="M20 14h24l-4 30a8 8 0 0 1-16 0L20 14z"
        fill={full ? '#D4F0EE' : 'none'}
        stroke="#7EC8C4"
        strokeWidth="2.4"
      />
      {full ? (
        <Path d="M23 24h18l-2.4 16a6 6 0 0 1-13 0L23 24z" fill="#7EC8C4" />
      ) : null}
    </G>
  );
}

const SCENES: Record<BloomIconName, () => React.ReactNode> = {
  home: () => (
    <Bust shirt="#FF8B7A" mood="warm" behind={<Wave />} front={null} />
  ),
  tasks: () => <Bust shirt="#7EC8C4" mood="calm" front={<Card />} />,
  care: () => <Bust shirt="#C9B6E4" mood="warm" front={<Mug />} />,
  habits: () => (
    <Bust shirt="#9ED9B0" mood="bright" behind={<StretchArms />} front={<Sprout />} />
  ),
  mood: () => <Portrait mood="warm" />,
  treats: () => <Bust shirt="#F7C948" mood="bright" front={<Gift />} />,
  bloom: () => (
    <Bust
      shirt="#FF8B7A"
      mood="warm"
      behind={<Wave />}
      front={<Flower x={50} y={16} />}
    />
  ),
  coin: () => (
    <G>
      <Circle cx="32" cy="32" r="28" fill="#F7C948" />
      <Circle cx="32" cy="32" r="24" fill="#FFE7A3" />
      <G transform="translate(32 36) scale(0.78) translate(-32 -26)">
        <Head mood="warm" />
      </G>
    </G>
  ),
  streak: () => (
    <Bust shirt="#FFB4A2" mood="bright" behind={<Sun x={50} y={12} r={6} />} />
  ),
  rest: () => <Bust shirt="#C9B6E4" mood="asleep" behind={<Moon />} />,
  nourish: () => <Bust shirt="#FFB4A2" mood="warm" front={<Plate />} />,
  'mood-low': () => <Portrait mood="low" />,
  'mood-meh': () => <Portrait mood="meh" />,
  'mood-ok': () => <Portrait mood="calm" />,
  'mood-good': () => <Portrait mood="warm" />,
  'mood-great': () => <Portrait mood="bright" />,
  'rest-rough': () => <Portrait mood="low" mark={<Moon />} />,
  'rest-okay': () => <Portrait mood="meh" mark={<Moon />} />,
  'rest-fine': () => <Portrait mood="calm" mark={<Moon />} />,
  'rest-good': () => <Portrait mood="warm" mark={<Moon />} />,
  'rest-dreamy': () => (
    <G>
      <Ellipse cx="32" cy="56" rx="22" ry="8" fill="#EDE4F7" />
      <Head mood="asleep" />
      <Moon />
    </G>
  ),
  'meal-sunrise': () => (
    <Bust shirt="#FFB4A2" mood="warm" behind={<Sun x={50} y={12} />} front={<Plate />} />
  ),
  'meal-midday': () => (
    <Bust shirt="#F7C948" mood="warm" behind={<Sun x={50} y={12} r={4} />} front={<Plate />} />
  ),
  'meal-evening': () => <Bust shirt="#C9B6E4" mood="calm" behind={<Moon />} front={<Plate />} />,
  'meal-bite': () => <Bust shirt="#FF8B7A" mood="bright" front={<Cookie />} />,
  'habit-stretch': () => (
    <Bust shirt="#9ED9B0" mood="bright" behind={<StretchArms />} />
  ),
  'habit-sip': () => <Bust shirt="#7EC8C4" mood="warm" front={<GlassProp />} />,
  'habit-read': () => <Bust shirt="#C9B6E4" mood="calm" front={<Book />} />,
  'habit-run': () => (
    <Bust
      shirt="#7EC8C4"
      mood="bright"
      behind={
        <G>
          <Path
            d="M6 28h8M5 34h8"
            stroke="#F0E0D6"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <Path
            d="M46 46c10-2 14-12 10-20"
            stroke={SKIN}
            strokeWidth="4.5"
            fill="none"
            strokeLinecap="round"
          />
          <Circle cx="54" cy="24" r="3" fill={SKIN} />
        </G>
      }
    />
  ),
  'habit-yoga': () => (
    <Bust
      shirt="#9ED9B0"
      mood="calm"
      front={
        <G>
          <Circle cx="24" cy="50" r="3.2" fill={SKIN} />
          <Circle cx="40" cy="50" r="3.2" fill={SKIN} />
        </G>
      }
    />
  ),
  'habit-sleep': () => (
    <G>
      <Ellipse cx="32" cy="58" rx="24" ry="8" fill="#EDE4F7" />
      <Head mood="asleep" />
    </G>
  ),
  'habit-tidy': () => <Bust shirt="#D4F0EE" mood="calm" front={<Cloth />} />,
  'habit-music': () => (
    <Bust
      shirt="#FFB4A2"
      mood="warm"
      front={
        <G>
          <Path
            d="M18 24c0-10 28-10 28 0"
            stroke={INK}
            strokeWidth="2"
            fill="none"
          />
          <Rect x="14" y="22" width="6" height="9" rx="2" fill={INK} />
          <Rect x="44" y="22" width="6" height="9" rx="2" fill={INK} />
        </G>
      }
    />
  ),
  'reward-tea': () => <Bust shirt="#FFB4A2" mood="warm" front={<Mug />} />,
  'reward-walk': () => (
    <Bust shirt="#7EC8C4" mood="bright" behind={<Sun x={50} y={12} />} />
  ),
  'reward-movie': () => <Bust shirt="#C9B6E4" mood="warm" front={<Screen />} />,
  'reward-dessert': () => <Bust shirt="#FF8B7A" mood="bright" front={<Cake />} />,
  'reward-bath': () => (
    <G>
      <Ellipse cx="32" cy="58" rx="26" ry="11" fill="#D4F0EE" />
      <Ellipse cx="32" cy="56" rx="22" ry="7" fill="#7EC8C4" />
      <Head mood="calm" bun />
      <Circle cx="14" cy="42" r="3" fill={CREAM} opacity={0.9} />
      <Circle cx="50" cy="38" r="2.2" fill={CREAM} opacity={0.95} />
      <Circle cx="12" cy="34" r="1.6" fill={CREAM} opacity={0.8} />
    </G>
  ),
  'reward-plant': () => <Bust shirt="#9ED9B0" mood="warm" front={<Pot />} />,
  'empty-clear': () => <Bust shirt="#9ED9B0" mood="calm" />,
  'empty-done': () => (
    <Bust shirt="#FFB4A2" mood="bright" behind={<StretchArms />} />
  ),
  'empty-habits': () => <Bust shirt="#9ED9B0" mood="warm" front={<Pot />} />,
  'empty-treats': () => <Bust shirt="#F7C948" mood="warm" />,
  celebrate: () => <Bust shirt="#FF8B7A" mood="bright" behind={<StretchArms />} />,
  'glass-full': () => <Glass full />,
  'glass-empty': () => <Glass full={false} />,
};

type Props = {
  name: string;
  size?: number;
};

export function BloomIcon({ name, size = 48 }: Props) {
  const icon = resolveIcon(name);
  const Scene = SCENES[icon];
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      <Scene />
    </Svg>
  );
}
