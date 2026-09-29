import { get, post, put, del } from "../Utils/apiClient";
const UserService = {
  getUsers: async () => {
    return await get("/User");
  },
  getUserById: async (id) => {
    return await get(`/User/${id}`);
  },
  createUser: async (user) => {
    return await post("/User", user);
  },
  updateUser: async (id, user) => {
    return await put(`/User/${id}`, {
      id,
      ...user,
    });
  },
  deleteUser: async (id) => {
    await del(`/User/${id}`);
    return true;
  },
};
export default UserService;
