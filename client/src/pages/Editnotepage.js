import {
  FormControl,
  FormLabel,
  Textarea,
  Button,
  Select,
  Flex,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
  const deleteNote = async () => {
    const result = await axios.delete(
      `http://localhost:4000/note/${params.noteId}`,
      { data: { customerId: userdata.id } }
    );
    if (result.data.success === true) {
      navigate("/");
    }
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
  console.log(userdata);
  return (
    <>
      {noteById.map((note) => {
        return (
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
              defaultValue={note.note}
              placeholder="Here is a sample placeholder"
              onChange={(event) => {
                setNote(event.target.value);
              }}
              width="500px"
              mt="20px"
            />

            <Select
              placeholder="Select option"
              onChange={(event) => {
                setCategory(event.target.value);
              }}
              defaultValue={category}
              width="500px"
              mt="20px"
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
                onClick={() => {
                  deleteNote();
                }}
              >
                Delete
              </Button>
            </Flex>
          </FormControl>
        );
      })}
    </>
  );
}
export default Editnotepage;
