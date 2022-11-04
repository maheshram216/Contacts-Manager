const getUser = () => {
  return localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : { email: "No User" };
};

// console.log(getUser());
const initialState = {
  user: getUser(),
  contact: [],
  filter: [],
  mark: {},
  isChecked: false,
};

export default initialState;
