import { Text } from 'react-native'
import { DARK_GREY_COLOR } from '../../../styles/colors'
import { MEDIUM_FONT } from '../../../styles/fonts'

export const TextComponent = ({ text, size, color, bold }) => {
  return (
    <Text style={{
      fontSize: size ? size : 18,
      fontFamily: bold ? bold : MEDIUM_FONT,
      color: color ? color : DARK_GREY_COLOR,
    }}>
      {text ? text : "Не указано"}
    </Text>
  )
}