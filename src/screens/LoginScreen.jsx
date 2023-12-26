import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <SafeAreaView style={styles.container}>

            <View>
                <Image source={{ uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png" }}
                    style={{ width: 150, height: 100, marginTop: 10 }}
                />
            </View>
            <KeyboardAvoidingView>
                <View style={{ alignItems: "center" }}>
                    <Text style={styles.txt}>Login In your account</Text>
                </View>
                <View style={{ marginTop: 70 }}>
                    <View style={styles.inputfield}>
                        <MaterialIcons name="email" size={24} color="grey" style={styles.icon} />
                        <TextInput placeholder='Enter your email' style={styles.input} value={email} onChangeText={(text) => setEmail(text)} />
                    </View>
                </View>
                <View style={{ marginTop: 8 }}>
                    <View style={styles.inputfield}>
                        <AntDesign name="lock" size={24} color="grey" style={styles.icon} />
                        <TextInput placeholder='Enter your password' style={styles.input} secureTextEntry
                            value={password} onChangeText={(text) => setPassword(text)}
                        />
                    </View>

                </View>

                <View style={styles.bottomtxt}>
                    <Text>Keep in Logged in</Text>
                    <Text style={styles.forgetxt}>Forget Password</Text>
                </View>

                <View style={styles.btncontainer} />
                <Pressable style={styles.btn}>
                    <Text style={styles.btntxt}>Login</Text>
                </Pressable>
                <Pressable style={{ marginTop: 15 }} onPress={() => navigation.navigate("Register")}>
                    <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
                        Don't have an account? <Text style={{ color: "#007FFF" }}>Sign Up</Text>
                    </Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    txt: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#041E42',
        marginTop: -5,
    },
    inputfield: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        backgroundColor: '#D0D0D0',
        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 30,
    },
    input: {
        color: "gray",
        marginVertical: 10,
        width: 300,
    },
    icon: {
        marginLeft: 8,
    },
    bottomtxt: {
        marginTop: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    forgetxt:
    {
        color: "#007FFF",
        fontWeight: "500",
    },
    btncontainer: {
        marginTop: 50,
        padding: 15,

    },
    btn: {
        width: 300,
        height: 50,
        backgroundColor: "#FEBE10",
        borderRadius: 6,
        marginLeft: "auto",
        marginRight: "auto",

    },
    btntxt: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
        marginTop: 10,
    }
})