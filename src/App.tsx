import { Box, ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import MyRoutes from "./MyRoutes";

// Note: BrowserRouter doesn't work with GH pages.
export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  </ChakraProvider>
);

export const AppInner = () => {
  return (
    <Box>
      <MyRoutes />
    </Box>
  );
};
