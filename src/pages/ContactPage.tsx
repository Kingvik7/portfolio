import { motion } from "framer-motion";
import styled from "styled-components";
import { pageTransition } from "@utils/animations";
import Hero from "@components/ContactPage/Hero";
import Bio from "@components/ContactPage/Bio";
import InfoGrid from "@components/ContactPage/InfoGrid";

function ContactPage() {
  return (
    <ContactPageWrapper
      initial={pageTransition?.initial}
      animate={pageTransition?.animate}
      exit={pageTransition?.exit}
    >
      <Content>
        <Hero />
        <Bio />
        <InfoGrid />
      </Content>
    </ContactPageWrapper>
  );
}

export default ContactPage;

const ContactPageWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: scroll;
  background-color: transparent;

  @media (max-width: 767px) {
    align-items: flex-start;
  }
`;

const Content = styled.div`
  width: 100%;
  max-width: 650px;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 5rem 2rem 6rem;

  @media (max-width: 767px) {
    padding-top: 2rem;
    gap: 2rem;
  }
`;
