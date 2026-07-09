import { FocusTodo } from '@/screens/FocusTodo';
import { TodoScreen } from '@/screens/TodoScreen';
import { useAppState } from '@/state/app-state';

export default function TodoRoute() {
  const { focus } = useAppState();
  return focus ? <FocusTodo /> : <TodoScreen />;
}
