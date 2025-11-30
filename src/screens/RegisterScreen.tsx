import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  Image
} from "react-native";
import { loginWithEmail, registerWithEmail } from "@/services/auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!email || !password) return setError("Fill fields");
    try {
      await registerWithEmail(email, password);
      const { user, token } = await loginWithEmail(email, password);
      await AsyncStorage.setItem("userEmail", user.email || email);
      navigation.replace("Home");
    } catch (err: any) {
      setError(err.message || "Register failed");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/image2.png')} style={styles.logo} />
      <Text style={styles.subtitle}>Use proper information to continue</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" style={styles.input} value={password} secureTextEntry onChangeText={setPassword} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    flex: 1, 
    justifyContent: "center" 
  },

  title: { 
    fontSize: 24, 
    marginBottom: 20, 
    textAlign: "center" 
  },

  input: { 
    borderWidth: 1, 
    padding: 12, 
    borderRadius: 8, 
    marginTop: 10 
  },

  button: { 
    backgroundColor: "#003D82", 
    padding: 14, 
    borderRadius: 8, 
    marginTop: 16, 
    alignItems: "center" 
  },

  buttonText: { 
    color: "#fff", 
    fontWeight: "600" 
  },

  subtitle: {
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 30,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
  },
  error: { color: "red", marginTop: 8 },
});
