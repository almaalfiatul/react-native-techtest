import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Employee } from "@/types/Employee";

interface EmployeeCardProps {
  employee: Employee;
}

export default function EmployeeCard({ employee }: EmployeeCardProps) {
  return (
    <View style={styles.row}>
      <Image source={{ uri: employee.avatar }} style={styles.avatar} />

      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.name}>{employee.name}</Text>
        <Text style={styles.position}>
          {employee.position} • {employee.experience} yrs exp
        </Text>
      </View>

      <View style={styles.ratingTag}>
        <Text style={styles.ratingText}>{employee.rating}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 55, height: 55, borderRadius: 50 },
  name: { fontSize: 16, fontWeight: "700" },
  position: { fontSize: 13, color: "#666", marginTop: 2 },
  ratingTag: {
    backgroundColor: "#E6F0FA",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
  },

  ratingText: {
    color: "#003D82",
    fontWeight: "700",
  },
});
