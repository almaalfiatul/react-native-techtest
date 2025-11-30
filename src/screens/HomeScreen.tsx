import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Image,
  TouchableOpacity,
  TextInput,
  Pressable
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import EmployeeCard from "@/components/EmployeeCard";
import { Employee } from "@/types/Employee";

const PAGE_SIZE = 5;

type RootStackParamList = {
  Home: undefined;
  EmployeeDetail: { employee: Employee };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const HomeScreen = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {
  const [pressedButtonId, setPressedButtonId] = useState<number | null>(null);
  const [users, setUsers] = useState<Employee[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<Employee[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  const fetchUsers = async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);

      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();

      const formatted: Employee[] = data.map((u: any) => ({
      ...u,
      position: "Software Engineer",
      experience: Math.floor(Math.random() * 10) + 1,
      rating: (4 + Math.random()).toFixed(1),
      salary: Math.floor(Math.random() * 3000000) + 3000000,
      avatar: `https://i.pravatar.cc/150?img=${u.id}`,
      status: Math.random() > 0.5 ? "Permanent" : "Contract",

      address: {
        street: u.address?.street ?? "",
        suite: u.address?.suite ?? "",
        city: u.address?.city ?? "",
        zipcode: u.address?.zipcode ?? "",
      }
    }));


      setUsers(formatted);
      setFilteredUsers(formatted);
      setPage(1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const formatRupiah = (value: number) =>
    "Rp " + value.toLocaleString("id-ID");

  useEffect(() => {
    const filter = users.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filter);
    setPage(1);
  }, [search]);

  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const visibleData = filteredUsers.slice(start, end);

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUsers(true);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#003D82" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search employee..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={visibleData}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <EmployeeCard employee={item} />

            <View style={styles.infoBox}>
              <View>
                <Text style={styles.label}>Status</Text>
                <Text style={styles.value}>{item.status}</Text>
              </View>

              <View>
                <Text style={styles.label}>Salary</Text>
                <View style={styles.salaryBadge}>
                  <Text style={styles.salaryBadgeText}>
                    {formatRupiah(item.salary)}/month
                  </Text>
                </View>
              </View>
            </View>

            <Pressable
              onPress={() => navigation.navigate("EmployeeDetail", { employee: item })}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.btnText}>View Details</Text>
            </Pressable>
          </View>
        )}

      />

      <View style={{ paddingBottom: 10 }}>
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            disabled={page === 1}
            onPress={() => setPage(page - 1)}
            style={[styles.pageButton, page === 1 && styles.disabled]}
          >
            <Text style={styles.pageText}>Prev</Text>
          </TouchableOpacity>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <TouchableOpacity
              key={num}
              onPress={() => setPage(num)}
              style={[
                styles.pageNumber,
                page === num && styles.activePage,
              ]}
            >
              <Text
                style={[
                  styles.pageText,
                  page === num && styles.activePageText,
                ]}
              >
                {num}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            disabled={page === totalPages}
            onPress={() => setPage(page + 1)}
            style={[styles.pageButton, page === totalPages && styles.disabled]}
          >
            <Text style={styles.pageText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f4f4f7" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 14,
    marginTop: 10,
  },

  search: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#A5C4E8",
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },

  row: { flexDirection: "row", alignItems: "center" },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 50,
  },

  name: { fontSize: 16, fontWeight: "700" },

  position: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },

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

  buttonPressed: {
    backgroundColor: "#264490",
  },

  infoBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },

  label: {
    fontSize: 13,
    color: "#777",
  },

  value: {
    fontSize: 15,
    fontWeight: "700",
    marginTop: 4,
  },

  salaryBadge: {
    backgroundColor: "#DFFBE8",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: 4,
  },

  salaryBadgeText: {
    color: "#0C5132",
    fontSize: 14,
    fontWeight: "700",
  },

  button: {
    backgroundColor: "#003D82",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 18,
    alignItems: "center",
  },


  btnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
    paddingVertical: 16,
    flexWrap: "wrap",
  },

  pageButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 4,
    backgroundColor: "#ddd",
    borderRadius: 8,
  },

  pageNumber: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 4,
    backgroundColor: "#eee",
    borderRadius: 8,
  },

  activePage: {
    backgroundColor: "#003D82",
  },

  activePageText: {
    color: "#fff",
    fontWeight: "700",
  },

  pageText: {
    fontSize: 14,
    fontWeight: "600",
  },

  disabled: {
    backgroundColor: "#ccc",
  },
});
