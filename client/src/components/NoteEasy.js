import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Textarea,
  Button,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
function NoteEasy() {
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  const handlesubmit = (event) => {
    // event.preventDefault();
    console.log(note);
    console.log(category);
    console.log();
  };
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
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        <Button
          backgroundColor="blue.300"
          type="submit"
          onClick={(e) => {
            handlesubmit(e);
          }}
        >
          Submit
        </Button>
      </FormControl>
    </>
  );
}
export default NoteEasy;
