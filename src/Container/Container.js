import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-rigth: auto;
  margin-left: auto;
  color: green;
  border: 3px solid ${(props) => props.theme.borderColor};
`;
