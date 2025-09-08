type Props = {
  name: string
}

export const Hello = ({name}: Props) => {
  return <h1>Hello, {name}!</h1>
}

export default Hello
