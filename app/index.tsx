import { Redirect } from 'expo-router';

// Phase A: go straight to preview hub so all screens are accessible.
// Phase B: will check AsyncStorage for onboarding completion.
export default function Index() {
  return <Redirect href="/preview" />;
}
