import { Container } from "@chakra-ui/react";
import "./footer.scss";

export const Footer = () => {
  return (
    <>
      <footer>
        <Container maxW="1200px">
          <p>
            Operating Hours: Monday to Friday 8:00am – 5:00pm | © 2024
            Battlefield Equipment Rentals. All Rights Reserved.
          </p>
          <a
            href="//www.toromont.com/copyright.asp"
            target="_blank"
            rel="noopener noreferrer"
            className="policy-links"
          >
            Copyright Information &amp; Legal Notice
          </a>
          <a
            href="//www.toromont.com/policy.asp"
            target="_blank"
            rel="noopener noreferrer"
            className="data-fr policy-links"
            data-fr="Politique de confidentialité"
          >
            Website Privacy Statement
          </a>
          <a
            href="https://www.toromont.com/accessibility/"
            target="_blank"
            rel="noopener noreferrer"
            className="policy-links"
          >
            Accessibility
          </a>
        </Container>
      </footer>
    </>
  );
};
