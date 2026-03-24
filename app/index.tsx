import { Redirect } from 'expo-router';
import { useAppStore } from '../store/appStore';

export default function Index() {
  const hasCompletedOnboarding = useAppStore(s => s.hasCompletedOnboarding);
  return <Redirect href={hasCompletedOnboarding ? '/(tabs)' : '/onboarding/welcome'} />;
}
