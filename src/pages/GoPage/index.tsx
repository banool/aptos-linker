import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, useSearchParams } from "react-router-dom";

type Wallet = {
  name: string;
  iconUrl: string;
  /** For now we just always set this to true. Later on we can try do detection. */
  detected: boolean;
  buildUrl: (url: string) => string;
};

const wallets: Wallet[] = [
  {
    name: "Petra",
    iconUrl:
      "https://raw.githubusercontent.com/hippospace/aptos-wallet-adapter/main/logos/petra.png",
    detected: true,
    buildUrl: (url: string) =>
      `https://petra.app/explore?link=${encodeURI(url)}`,
  },
];

const WalletList = ({ linkUrl }: { linkUrl: string }) => {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const highlightColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Container>
      <VStack spacing={4} mt={4}>
        {wallets.map((wallet) => (
          <Box
            w="80%"
            bg={wallet.detected ? highlightColor : bgColor}
            borderRadius="xl"
            alignItems="center"
          >
            <Link key={wallet.name} to={wallet.buildUrl(linkUrl)}>
              <Box p={4}>
                <HStack spacing={4}>
                  <Image src={wallet.iconUrl} boxSize="64px" />
                  <Text fontSize="xl" flex="1">
                    {wallet.name}
                  </Text>
                </HStack>
              </Box>
            </Link>
          </Box>
        ))}
        <Box
          w="80%"
          bg={true ? highlightColor : bgColor}
          borderRadius="xl"
          alignItems="center"
        >
          <Link key={"direct"} to={linkUrl}>
            <Box p={4}>
              <HStack spacing={4}>
                <Icon as={ArrowForwardIcon} boxSize="64px" />
                <Text fontSize="xl" flex="1">
                  Open in Browser
                </Text>
              </HStack>
            </Box>
          </Link>
        </Box>
      </VStack>
    </Container>
  );
};

export const GoPage = () => {
  const [searchParams] = useSearchParams();
  const linkUrl = searchParams.get("link");

  if (!linkUrl) {
    return (
      <Container>
        <Text>
          Please provide a link to a wallet. For example, try{" "}
          <code>
            {window.location.href}?link=https://stake.amnis.finance/mint
          </code>
          .
        </Text>
      </Container>
    );
  }

  return (
    <>
      <Box
        textAlign="center"
        paddingTop={0}
        paddingBottom={5}
        paddingLeft={10}
        paddingRight={10}
      >
        <Text paddingBottom={1}>
          These buttons will open the following URL in your preferred wallet
        </Text>
        <Text>
          <code>{decodeURI(linkUrl)}</code>
        </Text>
      </Box>
      <WalletList linkUrl={linkUrl} />
      <Box
        textAlign="center"
        paddingTop={10}
        paddingLeft={10}
        paddingRight={10}
      >
        <Text>
          {
            'Button taking you to the App Store instead of the app? Long hold and select Open in "Wallet".'
          }
        </Text>
      </Box>
    </>
  );
};
