import styled from "styled-components";

const Filter = ({ name, checked, onChange }) => (
  <FilterItem checked={checked} onClick={() => onChange(!checked)}>
    {name}
  </FilterItem>
);

const FilterItem = styled.span`
  padding: .4rem 1rem;
  border: thin solid ${(props) => props.theme.colors[props.checked ? "success": "input"]};
  font-size: ${(props) => props.theme.font.normal}px;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.checked ? props.theme.colors.success + "10" : "transparent"};
  border-radius: 1rem;
  transition: border 0.3s ease-in-out;
  cursor: pointer;
  text-transform: lowercase;
`

export default Filter;