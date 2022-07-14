import { useMemo } from "react"
import styled from "styled-components"
import { getRandomColor, getTextColor } from "../../utils/color"

/** Currency formatter that does not display the currency sign */
const formatCurrency = (value) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  })
}

const Item = ({ item }) => {
  const backgroundColor = useMemo(() => {
    return getRandomColor()
  }, [])
  const color = useMemo(() => {
    return getTextColor(backgroundColor)
  }, [backgroundColor])
  return (
  <ItemWrapper>
    <span className="item__image" style={{ backgroundColor, color }}>
      {item.name[0]}
    </span>
    <div className="item__content">
      <h3>{item.name}</h3>
      <div>{item.description}</div>
    </div>
    <span className="item__value">
      {item.type === "Credit" ? '+' : '-'}{formatCurrency(item.amount).replace("$", "")}$
    </span>
  </ItemWrapper>
)}

const ItemWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: nowrap;
  position: relative;
  cursor: pointer;

  &::before {
    --offset: -0.5rem;
    position: absolute;
    top: var(--offset);
    bottom: var(--offset);
    left: var(--offset);
    right: var(--offset);
    content: "";
    z-index: -1;
    border-radius: 0.75rem;
    transition: background-color 100ms ease-in-out;
  }

  &:hover::before {
    background-color: ${(props) => props.theme.colors.hover};
  }

  .item__image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #ccc;
    display: grid;
    place-items: center;
    flex-shrink: 0;
  }

  .item__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;

    h3 {
      font-size: 1.2rem;
      font-weight: normal;
      margin-block: 0;
    }

    div {
      --lh: 1.4rem;
      --max-lines: 3;
      margin-block: 0;
      max-width: 100%;
      line-height: var(--lh);
      max-height: calc(var(--lh) * var(--max-lines));
      overflow: hidden;
      padding-right: 1rem;
      color: ${(props) => props.theme.colors.placeholder};
    }
  }

  .item__value {
    font-size: 1.2rem;
    font-weight: bold;
  }
`

export default Item;