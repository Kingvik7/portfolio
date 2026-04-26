import styled from "styled-components";

type Props = {
  text: string;
};

export default function Tag({ text }: Props) {
  return <TagWrapper>{text}</TagWrapper>;
}

const TagWrapper = styled.div`
  padding: 5px 10px;
  border-radius: 2rem;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  background-image:
    linear-gradient(-45deg, #000000, #1a1a1a),
    linear-gradient(135deg, #2c2c2c, #0b0b0b 50%, #2c2c2c);
  background-origin: padding-box, border-box;
  background-clip: padding-box, border-box;
  box-shadow: inset 0px 0px 1px 1px rgba(0, 0, 0, 0.25);
`;
