import styled from "styled-components";
import { contactData } from "@data/contactData";

function Bio() {
  return (
    <BioWrapper>
      {contactData.bio.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </BioWrapper>
  );
}

export default Bio;

const BioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.75;
  max-width: 100%;

  p {
    margin: 0;
  }
`;
