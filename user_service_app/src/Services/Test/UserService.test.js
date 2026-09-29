jest.mock("../Utils/apiClient", () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  del: jest.fn(),
}));

import UserService from "../User";
import { get, post, put, del } from "../../Utils/apiClient";

describe("UserService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should get all users", async () => {
    const users = [
      {
        id: 1,
        name: "Gokul",
        email: "gokul@test.com",
      },
      {
        id: 2,
        name: "Arun",
        email: "arun@test.com",
      },
    ];

    get.mockResolvedValue(users);

    const result = await UserService.getUsers();

    expect(get).toHaveBeenCalledWith("/User");
    expect(result).toEqual(users);
  });

  test("should get user by id", async () => {
    const user = {
      id: 1,
      name: "Gokul",
      email: "gokul@test.com",
    };

    get.mockResolvedValue(user);

    const result = await UserService.getUserById(1);

    expect(get).toHaveBeenCalledWith("/User/1");
    expect(result).toEqual(user);
  });

  test("should create user", async () => {
    const user = {
      name: "Gokul",
      email: "gokul@test.com",
      age: 28,
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600001",
    };

    const createdUser = {
      id: 1,
      ...user,
    };

    post.mockResolvedValue(createdUser);

    const result = await UserService.createUser(user);

    expect(post).toHaveBeenCalledWith("/User", user);
    expect(result).toEqual(createdUser);
  });

  test("should update user", async () => {
    const user = {
      name: "Gokul Updated",
      email: "gokul@test.com",
      age: 29,
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600001",
    };

    const updatedUser = {
      id: 1,
      ...user,
    };

    put.mockResolvedValue(updatedUser);

    const result = await UserService.updateUser(1, user);

    expect(put).toHaveBeenCalledWith("/User/1", {
      id: 1,
      ...user,
    });

    expect(result).toEqual(updatedUser);
  });

  test("should delete user", async () => {
    del.mockResolvedValue({});

    const result = await UserService.deleteUser(1);

    expect(del).toHaveBeenCalledWith("/User/1");
    expect(result).toBe(true);
  });
});
