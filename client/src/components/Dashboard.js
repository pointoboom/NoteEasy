import {
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
function Dashboard() {
  const [noteData, setNoteData] = useState([]);
  const navigate = useNavigate();
  const getData = async () => {
    const result = await axios.get(`http://localhost:4000/note/`);
    const data = result.data.data.map((data) => {
      const created_at = moment(data.created_at).format("DD MMM YYYY HH:mm");

      data = { ...data, created_at };
      return data;
    });
    setNoteData(data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Flex direction="row" mt="30px">
        <Flex w="100%" bg="#F6F7FC" justifyContent="center">
          <Flex direction="column" bg="#F6F7FC" w="full">
            <Flex align="center" justify="center" display="flex">
              <TableContainer w="full" mt="50px">
                <Table variant="simple" size="md" align="center">
                  <Thead bg="#CCCCCC" color="gray.800" mt="50px">
                    <Tr>
                      <Th>Note No.</Th>
                      <Th>Note</Th>
                      <Th>Created By</Th>
                      <Th>Category</Th>
                      <Th>Created Time</Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  {noteData.map((data) => {
                    return (
                      <Tbody
                        bg="white"
                        key={data.note_id}
                        // onClick={() => {
                        //   router.push({
                        //     pathname: "/editorder",
                        //     query: { keyword: data.order_id },
                        //   });
                        // }}
                      >
                        <Tr>
                          <Td>{data.note_id}</Td>
                          <Td>{data.note}</Td>
                          <Td>{data.username}</Td>
                          <Td>{data.name}</Td>
                          <Td>{data.created_at}</Td>
                          <Td>
                            <Button
                              backgroundColor="blue.300"
                              type="submit"
                              onClick={() =>
                                navigate(`/note/edit/${data.note_id}`)
                              }
                            >
                              Edit
                            </Button>{" "}
                            <Button
                              backgroundColor="blue.300"
                              type="submit"
                              onClick={() =>
                                navigate(`/note/history/${data.note_id}`)
                              }
                            >
                              History
                            </Button>
                          </Td>
                          {/* <Td>
                            <Text
                              backgroundColor="green.100"
                              borderRadius="5px"
                              padding="5px"
                            >
                              {data.status}
                            </Text>
                          </Td> */}
                        </Tr>
                      </Tbody>
                    );
                  })}

                  <Tbody bg="white"></Tbody>
                </Table>
              </TableContainer>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
export default Dashboard;
