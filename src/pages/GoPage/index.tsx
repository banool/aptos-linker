import { ArrowForwardIcon, CopyIcon } from "@chakra-ui/icons";
import {
  Box,
  ComponentWithAs,
  Container,
  HStack,
  Icon,
  IconProps,
  Image,
  Text,
  VStack,
  useClipboard,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Link, useSearchParams } from "react-router-dom";
import { wallets } from "../../constants";

const WalletList = ({ linkUrl }: { linkUrl: string }) => {
  const { onCopy } = useClipboard(linkUrl);
  const toast = useToast();

  const copyToClipboard = () => {
    onCopy();
    toast({
      title: "Copied URL to clipboard.",
      status: "info",
      duration: 1500,
      isClosable: true,
    });
  };

  return (
    <Container>
      <VStack spacing={4} mt={4}>
        {wallets.map((wallet) => (
          <WalletCard
            key={wallet.name}
            name={wallet.name}
            icon={wallet.iconUrl}
            action={wallet.buildUrl(linkUrl)} // Define the action if needed
            detected={wallet.detected}
          />
        ))}
        <WalletCard
          key={"browser"}
          name={"Open in Browser"}
          icon={ArrowForwardIcon}
          action={linkUrl}
          detected={true}
        />
        <WalletCard
          key={"copy"}
          name={"Copy URL"}
          icon={CopyIcon}
          action={copyToClipboard}
          detected={true}
        />
      </VStack>
    </Container>
  );
};

type WalletCardProps = {
  key: string;
  name: string;
  /** Either a URL for an image or an Icon. */
  icon: string | ComponentWithAs<"svg", IconProps>;
  /** Either the link URL or an onClick to use. */
  action: (() => void) | string;
  detected: boolean;
};

const WalletCard: React.FC<WalletCardProps> = ({
  key,
  name,
  icon,
  action,
  detected,
}) => {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const highlightColor = useColorModeValue("gray.200", "gray.700");

  let iconComponent;
  if (typeof icon === "string") {
    iconComponent = <Image src={icon} p={1} boxSize="64px" />;
  } else {
    iconComponent = <Icon as={icon} p={1} boxSize="64px" />;
  }

  let inner = (
    <Box p={4}>
      <HStack spacing={4}>
        {iconComponent}
        <Text fontSize="xl" flex="1">
          {name}
        </Text>
      </HStack>
    </Box>
  );

  let onClick = undefined;
  if (typeof action === "string") {
    inner = <Link to={action}>{inner}</Link>;
  } else {
    onClick = action;
  }

  return (
    <Box
      key={key}
      w="80%"
      bg={detected ? highlightColor : bgColor}
      borderRadius="xl"
      alignItems="center"
      onClick={onClick}
      cursor="pointer"
    >
      {inner}
    </Box>
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
        <Text paddingBottom={5}>
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
        Long hold and select <b>Open in "Wallet"</b> if the button takes you to the store.
        </Text>
      </Box>
    </>
  );
};
