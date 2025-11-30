import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { RouteProp } from "@react-navigation/native";

type RootStackParamList = {
  Home: undefined;
  EmployeeDetail: { employee: any };
};
type EmployeeDetailRouteProp = RouteProp<RootStackParamList, "EmployeeDetail">;

export default function EmployeeDetailScreen({
  route,
}: {
  route: EmployeeDetailRouteProp;
}) {
  const { employee } = route.params;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F4F7FB" }}>
      <View style={styles.header}>
        <Image source={{ uri: employee.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{employee.name}</Text>
        <Text style={styles.position}>{employee.position}</Text>

        <View style={styles.statsRow}>
          <View style={styles.statsBox}>
            <Text style={styles.statsValue}>{employee.experience} yrs</Text>
            <Text style={styles.statsLabel}>Experience</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={styles.statsValue}>{employee.rating}</Text>
            <Text style={styles.statsLabel}>Rating</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={styles.statsValue}>
              {employee.status === "Permanent" ? "✔" : "⏳"}
            </Text>
            <Text style={styles.statsLabel}>Status</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Employee Details</Text>

        <View style={styles.detailCard}>
          <View style={styles.detailRow}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>📧</Text>
            </View>
            <Text style={styles.detailLabel}>Email</Text>
            <Text style={styles.detailValue}>{employee.email}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>📱</Text>
            </View>
            <Text style={styles.detailLabel}>Phone</Text>
            <Text style={styles.detailValue}>{employee.phone}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>💰</Text>
            </View>
            <Text style={styles.detailLabel}>Salary</Text>

            <View style={styles.salaryBadge}>
              <Text style={styles.salaryBadgeText}>
                Rp {employee.salary.toLocaleString()}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>🧷</Text>
            </View>
            <Text style={styles.detailLabel}>Employment</Text>
            <Text style={styles.detailValue}>{employee.status}</Text>
          </View>
        </View>
      </View>


      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#003D82",
    paddingTop: 50,
    paddingBottom: 35,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "white",
    marginBottom: 15,
  },
  name: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
  },
  position: {
    color: "#D4E6FF",
    marginTop: 5,
    marginBottom: 20,
    fontSize: 14,
  },

  statsRow: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
  },
  statsBox: {
    alignItems: "center",
  },
  statsValue: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  statsLabel: {
    color: "#D4E6FF",
    fontSize: 12,
    marginTop: 4,
  },

  sectionContainer: {
    marginTop: 25,
    paddingHorizontal: 20,
    marginBottom: 25,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  viewAll: {
    color: "#5985C4",
    fontSize: 13,
  },

  detailItem: {
    marginBottom: 12,
  },

  detailCard: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 2,
  },

  salaryBadge: {
    backgroundColor: "#DFFBE8",
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  salaryBadgeText: {
    color: "#0C5132",
    fontSize: 14,
    fontWeight: "700",
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },

  iconCircle: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: "#F1F4F9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  iconText: {
    fontSize: 16,
  },

  divider: {
    height: 1,
    backgroundColor: "#EFEFEF",
    marginVertical: 8,
  },

  detailLabel: {
    flex: 1,
    fontSize: 15,
    color: "#666",
    marginLeft: 5,
  },

  detailValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
  },

});
