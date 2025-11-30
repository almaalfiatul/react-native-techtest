export interface Employee {
  id: number;
  name: string;
  username: string;
  email: string;
  position: string;
  experience: number;
  rating: string;
  salary: number;
  avatar: string;
  status: "Permanent" | "Contract";
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}
