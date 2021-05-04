import styled from "styled-components";

export const ProfileContainer = styled.div`
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // padding-top: -80px;
  align-items: center;
  background: #010606;

  @media screen and (max-width: 768px) {
    height: 1300px;
  }
  @media screen and (max-width: 480px) {
    height: 1500px;
  }
`;
