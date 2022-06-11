import { Text } from 'react-native'
import { MEDIUM_FONT } from '../../../styles/fonts'

export const TextComponent = ({ text, size, color, bold }) => {
  return (
    <Text style={{ fontSize: size ? size : 18, fontFamily: bold ? bold : MEDIUM_FONT }}>{text}</Text>
  )
}