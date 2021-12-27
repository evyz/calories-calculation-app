module.exports = (component) => {
    return `import { View, Text } from "react-native";
    
export default ${component}Component = () => {
    return (
        <View>
            <Text>${component}Component</Text>
        </View>
    )
}`
}