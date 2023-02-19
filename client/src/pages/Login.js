import {
  FormControl,
  FormLabel,
  Button,
  Input,
  Flex,
  Text,
} from "@chakra-ui/react";
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
      <Flex
        h="100vh"
        direction="column"
        justifyContent="center"
        alignItems="center"
        backgroundColor="green.200"
      >
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          mt="30px"
        >
          <Text fontSize="30px" fontWeight="bold">
            Login
          </Text>
        </Flex>
        <FormControl
          display="flex"
          flexDirection="column"
          alignItems="center"
          mt="20px"
          py="10px"
        >
          <Flex>
            <FormLabel pt="10px" mr="9px">
              Username
            </FormLabel>
            <Input
              type="text"
              placeholder="username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              w="500px"
            />
          </Flex>
          <Flex>
            <FormLabel pt="10px" mr="12px">
              Password
            </FormLabel>
            <Input
              placeholder="Select option"
              type="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              w="500px"
            />
          </Flex>
          <Flex mt="20px">
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
          </Flex>
        </FormControl>
      </Flex>
    </>
  );
}
export default Login;
