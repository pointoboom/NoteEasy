import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Textarea,
  Button,
  Select,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAuth } from "../context/authentication";
import { useNavigate } from "react-router-dom";
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
      await axios.post(`http://localhost:4000/note/`, data);
    } catch (error) {}
  };
  const getCategory = async () => {
    try {
      const result = await axios.get("http://localhost:4000/note/category");
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
      console.log(userdata);
    }
    getCategory();
  }, []);
  return (
    <>
      <FormControl>
        <FormLabel>Please Take Note!!</FormLabel>
        <Textarea
          placeholder="Here is a sample placeholder"
          onChange={(event) => {
            setNote(event.target.value);
          }}
        />

        <Select
          placeholder="Select option"
          onChange={(event) => {
            setCategory(event.target.value);
          }}
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
      </FormControl>
    </>
  );
}
export default NoteEasy;
