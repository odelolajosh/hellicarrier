import styled from "styled-components";

export const Spinner = styled.span`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid transparent;
  border-top: 2px solid ${(props) => props.theme.colors.success};
  animation: spin 500ms linear infinite;
  @keyframes spin {
    from: {
      transform: rotate(0)
    }
    to {
      transform: rotate(360deg)
    }
  }
`;