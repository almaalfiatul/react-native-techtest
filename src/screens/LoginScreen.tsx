import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  Image,
  useColorScheme,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { validateEmail, validatePassword } from "@/utils/validators";
import { loginWithEmail, loginWithGoogleCredential } from "@/services/auth.service";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const colorScheme = useColorScheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "795457693256-djovcb5out0gd5ce30qljnoekgg7qmil.apps.googleusercontent.com",
    redirectUri: "https://auth.expo.io/@alma.alfiatul/react-native-techtest",
    scopes: ["profile", "email"],
  });

  const handleGoogleLogin = async (idToken: string) => {
    setLoading(true);
    try {
      const { user, token } = await loginWithGoogleCredential(idToken);
      await AsyncStorage.setItem("userEmail", user.email || "");
      navigation.replace("Home", { email: user.email || "" });
    } catch (err) {
      setError("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (response?.type === "success") {
      const idToken = response.authentication?.idToken;
      if (!idToken) {
        setError("Google token missing");
        return;
      }
      handleGoogleLogin(idToken);
    }
  }, [response]);

  const handleEmailLogin = async () => {
    if (!validateEmail(email)) return setError("Invalid email");
    if (!validatePassword(password)) return setError("Password min 6 char");

    setEmailLoading(true);
    setError(null);

    try {
      const { user } = await loginWithEmail(email, password);
      await AsyncStorage.setItem("userEmail", user.email || email);
      navigation.replace("Home", { email: user.email || "" });
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setEmailLoading(false);
    }
  };


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.container, { backgroundColor: colorScheme === "dark" ? "#121212" : "#F7F9FC" }]}>
          <Image source={require('../assets/image1.png')} style={styles.logo} />

          <Text style={[styles.subtitle, { color: colorScheme === "dark" ? "#E5E7EB" : "#6B7280" }]}>
            Enter valid username & password to continue
          </Text>

          <View style={[styles.inputContainer, { 
            backgroundColor: colorScheme === "dark" ? "#1E1E1E" : "#fff", 
            borderColor: colorScheme === "dark" ? "#333" : "#E5E7EB"
          }]}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={colorScheme === "dark" ? "#888" : "#999"}
              style={[styles.input, { color: colorScheme === "dark" ? "#fff" : "#000" }]}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={[styles.inputContainer, { 
            backgroundColor: colorScheme === "dark" ? "#1E1E1E" : "#fff", 
            borderColor: colorScheme === "dark" ? "#333" : "#E5E7EB"
          }]}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={colorScheme === "dark" ? "#888" : "#999"}
              style={[styles.input, { color: colorScheme === "dark" ? "#fff" : "#000" }]}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {error && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={handleEmailLogin}
            disabled={emailLoading}
          >
            {emailLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginText}>Login</Text>
            )}
          </TouchableOpacity>

          <Text style={[styles.or, { color: colorScheme === "dark" ? "#E5E7EB" : "#6B7280" }]}>OR</Text>

          <TouchableOpacity
            style={[styles.googleBtn, { 
              backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
              borderColor: colorScheme === "dark" ? "#555" : "#E5E7EB"
            }]}
            onPress={() => promptAsync()}
            disabled={!request || loading}
          >
            {loading ? (
              <ActivityIndicator
                color={colorScheme === "dark" ? "#E5E7EB" : "#003D82"}
              />
            ) : (
              <Text style={[styles.googleText, { color: colorScheme === "dark" ? "#E5E7EB" : "#000" }]}>Login with Google</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={[styles.footerText, { color: colorScheme === "dark" ? "#E5E7EB" : "#6B7280" }]}>
              Don't have an account?{" "}
              <Text style={styles.signUp}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 12,
    borderWidth: 1,
  },
  input: {
    height: 44,
  },
  error: {
    color: "red",
    marginTop: 4,
    textAlign: "center",
  },
  loginBtn: {
    backgroundColor: "#003D82",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  loginText: { color: "#fff", fontWeight: "600" },
  or: {
    textAlign: "center",
    marginVertical: 14,
  },
  googleBtn: {
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  googleText: {
    fontWeight: "600",
  },
  footerText: {
    textAlign: "center",
    marginTop: 20,
  },
  signUp: { color: "#003D82", fontWeight: "600" },
});
