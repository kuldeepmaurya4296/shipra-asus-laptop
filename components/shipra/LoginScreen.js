import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ShipraColors } from '../../constants/theme';
import { api, endpoints } from '../../services/api';

export default function LoginScreen({ onNext }) {
    const handleLogin = async () => {
        // Simulate login call
        const response = await api.post(endpoints.login, { phone: '9999999999' });
        if (response && response.success) {
            onNext();
        } else {
            Alert.alert('Login', 'Connecting to server failed. Ensure backend is running.', [
                { text: 'Continue Demo Mode', onPress: onNext }
            ]);
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[ShipraColors.background, ShipraColors.background, '#EFF6FF']}
                style={StyleSheet.absoluteFill}
            />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Welcome to Shipra</Text>
                <Text style={styles.subtitle}>Book your flight in seconds</Text>
            </View>

            {/* Content */}
            <View style={styles.content}>
                {/* Illustration placeholder */}
                <View style={styles.illustration}>
                    <LinearGradient
                        colors={['rgba(0, 71, 171, 0.1)', 'rgba(255, 165, 0, 0.1)']}
                        style={styles.illustrationGradient}
                    />
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons name="airplane" color={ShipraColors.primary} size={64} />
                    </View>
                </View>

                {/* Login Options */}
                <View style={styles.options}>
                    <TouchableOpacity
                        style={styles.googleButton}
                        onPress={handleLogin}
                        activeOpacity={0.7}
                    >
                        <Feather name="chrome" color={ShipraColors.text} size={24} />
                        <Text style={styles.googleButtonText}>Continue with Google</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.otpButton}
                        onPress={handleLogin}
                        activeOpacity={0.7}
                    >
                        <Feather name="message-circle" color={ShipraColors.primary} size={24} />
                        <Text style={styles.otpButtonText}>WhatsApp OTP Login</Text>
                    </TouchableOpacity>
                </View>

                {/* Terms */}
                <Text style={styles.terms}>
                    By continuing, you agree to our{' '}
                    <Text style={styles.link}>Terms</Text> and{' '}
                    <Text style={styles.link}>Privacy</Text>
                </Text>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Premium air travel experience</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'space-between',
    },
    header: {
        marginTop: 64,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: ShipraColors.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        color: ShipraColors.muted,
    },
    content: {
        gap: 32,
    },
    illustration: {
        height: 180,
        borderRadius: 24,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0, 71, 171, 0.1)',
    },
    illustrationGradient: {
        ...StyleSheet.absoluteFillObject,
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4,
    },
    options: {
        gap: 16,
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        height: 60,
        backgroundColor: 'white',
        borderRadius: 30,
        borderWidth: 2,
        borderColor: 'rgba(0, 71, 171, 0.1)',
    },
    googleButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: ShipraColors.text,
    },
    otpButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        height: 60,
        backgroundColor: 'rgba(0, 71, 171, 0.05)',
        borderRadius: 30,
        borderWidth: 2,
        borderColor: ShipraColors.primary,
    },
    otpButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: ShipraColors.primary,
    },
    terms: {
        textAlign: 'center',
        fontSize: 13,
        color: ShipraColors.muted,
        lineHeight: 20,
    },
    link: {
        color: ShipraColors.primary,
        fontWeight: '500',
    },
    footer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    footerText: {
        fontSize: 14,
        color: ShipraColors.muted,
    },
});
