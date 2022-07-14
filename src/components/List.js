export const List = ({
  data,
  keyExtractor,
  aliasName = 'item',
  component: Component,
  ...props
}) => {
  return <>
    {data && data.map((item, index) => (
      <Component key={keyExtractor?.() || index} {...{[aliasName]: item, ...props}}/>
    ))}
  </>;
}