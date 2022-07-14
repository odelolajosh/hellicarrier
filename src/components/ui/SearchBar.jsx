import styled from "styled-components";
import { SearchIcon } from "../../assets/icon";

const SearchBar = (props) => {
  return (
    <SearchBarWrapper>
      <span>
        <SearchIcon />
      </span>
      <input type="text" placeholder="Search by name, description or amount" {...props} />
    </SearchBarWrapper>
  )
}

const SPAN_WIDTH = "50px";

const SearchBarWrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${SPAN_WIDTH};
  height: 45px;

  & > input {
    width: 100%;
    height: 100%;
    padding: 13px 32px;
    padding-left: ${SPAN_WIDTH};
    border-radius: 4px;
    border: 0.5px solid ${(props) => props.theme.colors.input};
    font-size: ${(props) => props.theme.font.normal}px;
    outline: none;
    transition: border 0.3s ease-in-out;

    &::placeholder {
      color: ${(props) => props.theme.colors.placeholder};
    }

    &:focus {
      border: 0.5px solid ${(props) => props.theme.colors.text};

      & + span > svg {
        stroke: ${(props) => props.theme.colors.text};
      }
    }
  }

  & > span {
    position: absolute;
    top: 0;
    left: 0;
    width: ${SPAN_WIDTH};
    height: 100%;
    display: grid;
    place-items: center;
  }
`

export default SearchBar;