import { Container, Flex, Spacer, Text } from "@chakra-ui/react";
import "./nav.scss";

export const Nav = () => {
  return (
    <nav>
      <Container maxW="1200px">
        <Flex align="center" justify="space-between" p={4}>
          <a href="https://www.battlefieldequipment.ca/" target="_blank">
            <img
              src="https://www.battlefieldequipment.ca/img/battlefield-logo-160.png"
              alt="battlefield equipment rentals logo"
            />
          </a>

          {/* Spacer to push the next element to the far right */}
          <Spacer />

          {/* Text on the far right */}
          <Text>
            <a href="https://www.battlefieldequipment.ca/" target="_blank">
              Back to main website
            </a>
          </Text>
        </Flex>
      </Container>
    </nav>
  );
};
