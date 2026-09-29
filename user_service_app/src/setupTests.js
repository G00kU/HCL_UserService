import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListControl from "./Components/User/ListControl";

test("renders users", () => {
  const users = [
    {
      id: 1,
      name: "Gokul",
      email: "gokul@test.com",
      age: 28,
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600001",
    },
  ];

  render(
    <ListControl
      users={users}
      onEdit={jest.fn()}
      onDelete={jest.fn()}
      onAdd={jest.fn()}
    />,
  );

  expect(screen.getByText("Gokul")).toBeInTheDocument();
  expect(screen.getByText("gokul@test.com")).toBeInTheDocument();
});
