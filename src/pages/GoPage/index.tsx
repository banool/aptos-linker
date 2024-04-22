import { CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  HStack,
  Image,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, useSearchParams } from "react-router-dom";

type Wallet = {
  id: string;
  name: string;
  iconUrl: string;
  /** For now we just always set this to true. Later on we can try do detection. */
  detected: boolean;
  buildUrl: (url: string) => string;
};

const wallets: Wallet[] = [
  {
    id: "1",
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
            p={4}
            bg={wallet.detected ? highlightColor : bgColor}
            borderRadius="xl"
            alignItems="center"
          >
            <Link key={wallet.id} to={wallet.buildUrl(linkUrl)}>
              <HStack key={wallet.id} spacing={4}>
                <Image src={wallet.iconUrl} boxSize="64px" />
                <Text fontSize="xl" flex="1">
                  {wallet.name}
                </Text>
              </HStack>
            </Link>
          </Box>
        ))}
      </VStack>
    </Container>
  );

  // {wallet.detected && <CheckIcon color="green.500" />}
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
      <WalletList linkUrl={linkUrl} />
      <Box paddingTop={10} paddingLeft={15} paddingRight={15}>
        <Text textAlign="center">
          {
            'Link taking you to the App Store instead of the app? Long hold and select "Open in <Wallet>".'
          }
        </Text>
      </Box>
    </>
  );
};
