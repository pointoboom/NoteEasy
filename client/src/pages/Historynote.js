import {
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";
function Historynote() {
  const [data, setData] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const getData = async () => {
    const result = await axios.get(
      `http://localhost:4000/note/history/${params.noteId}`
    );
    console.log(result.data.data);
    const data = result.data.data.map((data) => {
      const updated_at = moment(data.updated_at).format("DD MMM YYYY HH:mm:ss");

      data = { ...data, updated_at };
      return data;
    });
    setData(data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        mt="50px"
      >
        <Text fontSize="30px" fontWeight="bold">
          History Note
        </Text>
      </Flex>
      {data.map((note) => {
        return (
          <Flex
            direction="column"
            backgroundColor="green.100"
            p="20px"
            borderRadius="5px"
            mt="20px"
            mx="20px"
          >
            <Flex>
              <Text fontWeight="bold" mr="5px">
                Note:{" "}
              </Text>
              <Text>{note.history_note}</Text>
            </Flex>
            <Flex>
              <Text fontWeight="bold" mr="5px">
                Category:{" "}
              </Text>
              <Text>{note.name}</Text>
            </Flex>
            <Flex>
              <Text fontWeight="bold" mr="5px">
                User:{" "}
              </Text>
              <Text>{note.username}</Text>
            </Flex>
            <Flex>
              <Text fontWeight="bold" mr="5px">
                Action:{" "}
              </Text>
              <Text>{note.action}</Text>
            </Flex>
            <Flex>
              <Text fontWeight="bold" mr="5px">
                Timestamp:
              </Text>
              <Text>{note.updated_at}</Text>
            </Flex>
          </Flex>
        );
      })}
      <Button mt="20px" ml="20px" onClick={() => navigate(`/`)}>
        Back
      </Button>
    </>
  );
}

export default Historynote;
