import styled from "styled-components";
import { contactData } from "@data/contactData";

function InfoGrid() {
  return (
    <Grid>
      <Card>
        <CardHeader>
          <CardTitle>Work</CardTitle>
          <CardLine />
        </CardHeader>
        <CardContent>
          {contactData.work.map((job, i) => (
            <Entry key={i}>
              <EntryTop>
                <EntryRole>{job.role}</EntryRole>
                <EntryDate>{job.period}</EntryDate>
              </EntryTop>
              <EntryCompany>{job.company}</EntryCompany>
              <EntryLocation>{job.location}</EntryLocation>
            </Entry>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
          <CardLine />
        </CardHeader>
        <CardContent>
          {contactData.education.map((edu, i) => (
            <Entry key={i}>
              <EntryTop>
                <EntryRole>{edu.institution}</EntryRole>
                <EntryDate>{edu.period}</EntryDate>
              </EntryTop>
              <EntryCompany>{edu.degree}</EntryCompany>
              <EntryLocation>{edu.location}</EntryLocation>
            </Entry>
          ))}
        </CardContent>
      </Card>
    </Grid>
  );
}

export default InfoGrid;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const CardTitle = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
`;

const CardLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.06);
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Entry = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const EntryTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const EntryDate = styled.div`
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.2);
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
`;

const EntryRole = styled.div`
  font-size: 0.85rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
`;

const EntryCompany = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
`;

const EntryLocation = styled.div`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.2);
`;
