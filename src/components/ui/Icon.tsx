/**
 * Copara Icon — Lucide-Wrapper (lucide-react-native). Outline, 2px Stroke,
 * runde Kappen, tintet über `color`. Icons begleiten immer ein Label —
 * sie tragen nie allein Bedeutung.
 */
import {
  ArrowLeftRight,
  Bell,
  Calendar,
  ChartColumn,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Clock,
  Copy,
  Crown,
  Eye,
  FileText,
  HeartHandshake,
  Info,
  ListChecks,
  LogOut,
  MapPin,
  Pencil,
  Plus,
  RotateCcw,
  Send,
  Shield,
  Sun,
  Timer,
  UserPlus,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react-native';
import { StyleProp, ViewStyle } from 'react-native';

import { colors } from '@/theme/tokens';

const ICONS = {
  'alert-circle': CircleAlert,
  'arrow-left-right': ArrowLeftRight,
  bell: Bell,
  calendar: Calendar,
  'chart-column': ChartColumn,
  check: Check,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  clock: Clock,
  copy: Copy,
  crown: Crown,
  eye: Eye,
  'file-text': FileText,
  'heart-handshake': HeartHandshake,
  info: Info,
  'list-checks': ListChecks,
  'log-out': LogOut,
  'map-pin': MapPin,
  pencil: Pencil,
  plus: Plus,
  'rotate-ccw': RotateCcw,
  send: Send,
  shield: Shield,
  sun: Sun,
  timer: Timer,
  'user-plus': UserPlus,
  users: Users,
  x: X,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

export function Icon({
  name,
  size = 24,
  color = colors.ink900,
  strokeWidth = 2,
  style,
}: {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const Glyph = ICONS[name];
  return <Glyph size={size} color={color} strokeWidth={strokeWidth} style={style} />;
}
