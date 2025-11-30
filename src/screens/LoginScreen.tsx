import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { validateEmail, validatePassword } from "@/utils/validators";
import { loginWithEmail, loginWithGoogleCredential } from "@/services/auth.service";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { auth } from "../firebase.config";

WebBrowser.maybeCompleteAuthSession();

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "795457693256-djovcb5out0gd5ce30qljnoekgg7qmil.apps.googleusercontent.com",
    redirectUri: "https://auth.expo.io/@alma.alfiatul/react-native-techtest",
  });

  const handleGoogleLogin = async (idToken: string) => {
    setLoading(true);
    try {
      const { user, token } = await loginWithGoogleCredential(idToken);
      console.log("Logged in user:", user);
      console.log("Token:", token);
      navigation.replace("Home");
    } catch (err) {
      setError("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Google Response:", response);
    if (response?.type === "success") {
      const idToken = response.authentication?.idToken;
      if (!idToken) {
        setError("Google token missing");
        return;
      }
      handleGoogleLogin(idToken);

      (async () => {
        setLoading(true);
        try {
          await loginWithGoogleCredential(idToken);
          navigation.replace("Home");
        } catch (err) {
          setError("Google sign-in failed");
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [response]);

  const handleEmailLogin = async () => {
    if (!validateEmail(email)) return setError("Invalid email");
    if (!validatePassword(password)) return setError("Password min 6 char");

    setLoading(true);
    try {
      await loginWithEmail(email, password);
      navigation.replace("Home");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleEmailLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#4285F4" }]}
        onPress={() => promptAsync()}
        disabled={!request || loading}
      >
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "center" },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, padding: 12, borderRadius: 8, marginTop: 10 },
  button: { backgroundColor: "#111", padding: 14, borderRadius: 8, marginTop: 16, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "600" },
  error: { color: "red", marginTop: 8 },
});
