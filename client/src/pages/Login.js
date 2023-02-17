import { FormControl, FormLabel, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "../context/authentication";
import { useNavigate } from "react-router-dom";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    login({
      username,
      password,
    });
  };
  return (
    <>
      <FormControl>
        <FormLabel>Login</FormLabel>
        <Input
          type="text"
          placeholder="Here is a sample placeholder"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <Input
          placeholder="Select option"
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <Button
          backgroundColor="blue.300"
          type="submit"
          onClick={(e) => {
            handleSubmit(e);
          }}
          mr="30px"
        >
          Submit
        </Button>
        <Button
          backgroundColor="blue.300"
          type="submit"
          onClick={(e) => {
            navigate("/register");
          }}
        >
          Register
        </Button>
      </FormControl>
    </>
  );
}
export default Login;
