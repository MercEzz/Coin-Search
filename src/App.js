import { useEffect, useState } from "react";
import axios from "axios";
import {
  Flex,
  Heading,
  Input,
  Text,
  Image,
  Spinner,
  Table,
  Thead,
  Tbody,
  Td,
  Tr,
  Th,
} from "@chakra-ui/react";

const App = () => {
  const [coinData, setCoinData] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const filterCoins = coinData.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (e) => setSearch(e.target.value);

  const getData = () => {
    setIsLoading(true);
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);
        setCoinData(response.data);
      });
  };

  return (
    <Flex
      align="center"
      // justifyContent="center"
      // bgGradient="linear(to-br,  #00bf8f, #001510)"
      bg="gray.800"
      flexDir="column"
      color="white"
    >
      <Heading mt="5rem" p="2">
        Crypto Search
      </Heading>
      <Input
        w="50%"
        size="sm"
        variant="flushed"
        color="whiteAlpha.700"
        placeholder="Type coin name"
        onChange={handleSearch}
      />
      <Flex
        color="white"
        align="center"
        justify="center"
        bg="rgba(191, 190, 187, 0.3)"
        m="4"
        flexDir="column"
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color="white">Icon</Th>
              <Th color="white">Coin Name</Th>
              <Th color="white">Coin Symbol</Th>
              <Th color="white">Coin Price</Th>
              <Th color="white">market_capital</Th>
              <Th color="white">Price Change</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading && <Spinner />}
            {filterCoins.map((coins) => {
              return (
                <Tr>
                  <Td>
                    <Image
                      height="40px"
                      width="40px"
                      mr="10px"
                      src={coins.image}
                    />
                  </Td>
                  <Td>
                    <Heading size="md">{coins.name}</Heading>
                  </Td>
                  <Td>
                    <Text>{coins.symbol}</Text>
                  </Td>
                  <Td>
                    <Text>${coins.current_price.toFixed(2)}</Text>
                  </Td>
                  {coins.price_change_percentage_24h < 0 ? (
                    <Td>
                      <Text color="red">
                        {coins.price_change_percentage_24h.toFixed(2)}%
                      </Text>
                    </Td>
                  ) : (
                    <Td>
                      <Text color="green">
                        {coins.price_change_percentage_24h.toFixed(2)}%
                      </Text>
                    </Td>
                  )}
                  <Td>
                    <Text>${coins.market_cap.toLocaleString()}</Text>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Flex>
    </Flex>
  );
};

export default App;
