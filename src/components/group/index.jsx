import styled from "styled-components";
import { List } from "../List"
import Item from "./Item";

const Group = ({ items }) => (
  <GroupWrapper>
    <p>{items.date}</p>
    <ListWrapper>
      <List data={items.data} component={Item} />
    </ListWrapper>
  </GroupWrapper>
)


const GroupWrapper = styled.div`
  width: 100%;
`

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`


export default Group;