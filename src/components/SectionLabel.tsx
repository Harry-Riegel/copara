/** Overline-Label über Sektionen. */
import { ReactNode } from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

import { colors } from '@/theme/tokens';
import { type } from '@/theme/type';

export function SectionLabel({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}) {
  return (
    <Text
      style={[
        type.overline,
        { letterSpacing: 0.66, color: colors.ink400, marginBottom: 10, marginLeft: 4 },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
