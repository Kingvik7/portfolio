import { css } from "styled-components";

export const glass = css`
  border: 1px solid transparent;
  background-color: #1a1a1a;
  background-image: linear-gradient(-45deg, #1a1a1a, #1a1a1a),
    linear-gradient(135deg, #2c2c2c, #0b0b0b 50%, #2c2c2c);
  background-origin: padding-box, border-box;
  background-clip: padding-box, border-box;
  box-shadow: inset 0px 0px 1px 1px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
`;
