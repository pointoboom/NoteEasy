import { FormControl, FormLabel, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "../context/authentication";
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username,
      password,
    };
    register(data);
  };
  return (
    <>
      <FormControl>
        <FormLabel>Register</FormLabel>
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
        >
          Submit
        </Button>
      </FormControl>
    </>
  );
}

export default Register;
