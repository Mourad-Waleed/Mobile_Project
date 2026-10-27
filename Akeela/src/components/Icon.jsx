import { View } from 'react-native';
import { colors } from '../theme/theme';

export default function Icon({ name, size = 20, color = colors.text, strokeWidth = 2 }) {
  const box = { width: size, height: size, alignItems: 'center', justifyContent: 'center' };

  let shape = null;

  if (name === 'chevron-left' || name === 'chevron-right') {
    const side = size * 0.5;
    const isLeft = name === 'chevron-left';
    shape = (
      <View
        style={{
          width: side,
          height: side,
          borderLeftWidth: isLeft ? strokeWidth : 0,
          borderBottomWidth: isLeft ? strokeWidth : 0,
          borderRightWidth: isLeft ? 0 : strokeWidth,
          borderTopWidth: isLeft ? 0 : strokeWidth,
          borderColor: color,
          transform: [
            { rotate: '45deg' },
            { translateX: isLeft ? side * 0.12 : -side * 0.12 },
            { translateY: isLeft ? -side * 0.12 : side * 0.12 },
          ],
        }}
      />
    );
  } else if (name === 'close') {
    const bar = {
      position: 'absolute',
      width: size * 0.8,
      height: strokeWidth,
      borderRadius: strokeWidth,
      backgroundColor: color,
    };
    shape = (
      <View style={box}>
        <View style={[bar, { transform: [{ rotate: '45deg' }] }]} />
        <View style={[bar, { transform: [{ rotate: '-45deg' }] }]} />
      </View>
    );
  } else if (name === 'check') {
    shape = (
      <View
        style={{
          width: size * 0.36,
          height: size * 0.66,
          borderRightWidth: strokeWidth,
          borderBottomWidth: strokeWidth,
          borderColor: color,
          transform: [{ rotate: '45deg' }, { translateY: -size * 0.06 }],
        }}
      />
    );
  } else if (name === 'minus') {
    shape = (
      <View
        style={{
          width: size * 0.7,
          height: strokeWidth,
          borderRadius: strokeWidth,
          backgroundColor: color,
        }}
      />
    );
  }

  return <View style={box}>{shape}</View>;
}
