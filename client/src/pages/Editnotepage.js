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
import { useParams } from "react-router-dom";
import { useAuth } from "../context/authentication";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
function Editnotepage() {
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  const [userdata, setUserdata] = useState(null);
  const [catData, setCatData] = useState([]);
  const [noteById, setNoteById] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const handlesubmit = (event) => {
    event.preventDefault();

    editNote({
      note,
      category,
      customerId: userdata.id,
    });
  };
  const getNoteById = async (noteId) => {
    try {
      const result = await axios.get(`http://localhost:4000/note/${noteId}`);
      setNote(result.data.data[0].note);
      setCategory(result.data.data[0].cat_id);
      setNoteById(result.data.data);
    } catch (error) {}
  };
  const editNote = async (data) => {
    try {
      const result = await axios.put(
        `http://localhost:4000/note/${params.noteId}`,
        data
      );
      if (result.data.success === true) {
        navigate("/");
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
    getNoteById(params.noteId);
  }, []);
  return (
    <>
      {noteById.map((note) => {
        return (
          <FormControl isRequired>
            <FormLabel>Please Take Note!!</FormLabel>
            <Textarea
              defaultValue={note.note}
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
              defaultValue={category}
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
            <Button backgroundColor="blue.300" type="submit">
              Delete
            </Button>
          </FormControl>
        );
      })}
    </>
  );
}
export default Editnotepage;
