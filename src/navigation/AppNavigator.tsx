import HomeScreen from "@/screens/HomeScreen";
import LoginScreen from "@/screens/LoginScreen";
import RegisterScreen from "@/screens/RegisterScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Login: undefined;
  Home: { email: string };
  Register: undefined;
};

type AppNavigatorProps = {
  initialToken: string | null;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator({ initialToken }: AppNavigatorProps) {
  return (
    <Stack.Navigator initialRouteName={initialToken ? "Home" : "Login"}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ email: 'user@example.com' }}
      />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
