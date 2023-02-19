import {
  FormControl,
  FormLabel,
  Textarea,
  Button,
  Select,
  Flex,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAuth } from "../context/authentication";

import jwtDecode from "jwt-decode";
import axios from "axios";
function NoteEasy() {
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  const [userdata, setUserdata] = useState(null);
  const [catData, setCatData] = useState([]);

  const { logout } = useAuth();
  const handlesubmit = (event) => {
    event.preventDefault();
    createNote({
      note,
      category,
      customerId: userdata.id,
    });
  };
  const createNote = async (data) => {
    try {
      const result = await axios.post(`http://localhost:4000/note/`, data);
      if (result.data.success === true) {
        window.location.reload(false);
      }
    } catch (error) {}
  };
  const getCategory = async () => {
    try {
      const result = await axios.get("http://localhost:4000/category");
      if (result.data.data) {
        setCatData(result.data.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      const userdata = jwtDecode(token);
      setUserdata(userdata);
    }
    getCategory();
  }, []);
  return (
    <>
      <FormControl
        isRequired
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt="20px"
        py="10px"
      >
        <FormLabel fontSize="30px" fontWeight="bold">
          Please Take Note!!
        </FormLabel>
        <Textarea
          placeholder="Here is a sample placeholder"
          onChange={(event) => {
            setNote(event.target.value);
          }}
          width="500px"
          mt="20px"
        />

        <Select
          mt="20px"
          placeholder="Select option"
          onChange={(event) => {
            setCategory(event.target.value);
          }}
          width="500px"
        >
          {catData.map((data) => {
            return (
              <>
                <option value={data.cat_id} key={data.id}>
                  {data.name}
                </option>
              </>
            );
          })}
        </Select>
        <Flex mt="20px">
          <Button
            mr="30px"
            backgroundColor="blue.300"
            type="submit"
            onClick={(e) => {
              handlesubmit(e);
            }}
          >
            Submit
          </Button>
          <Button
            backgroundColor="blue.300"
            type="submit"
            onClick={(e) => {
              logout();
            }}
          >
            Logout
          </Button>
        </Flex>
      </FormControl>
    </>
  );
}
export default NoteEasy;
