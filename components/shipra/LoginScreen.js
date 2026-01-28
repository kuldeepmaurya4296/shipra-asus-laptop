import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ShipraColors } from '../../constants/theme';
import { api } from '../../services/api';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ onLogin }) { // Renamed onNext to onLogin to match prop
    const onNext = onLogin; // Alias for backward compatibility if inside code uses onNext
    const [view, setView] = useState('default'); // default, phone, otp
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);

    // Google Auth Request
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "335043356153-lco9888k3135mabo720ao4s61ln545vh.apps.googleusercontent.com",
        webClientId: "335043356153-lg7nsilj82qrptn2oqg5nu0sgib8q42u.apps.googleusercontent.com",
        // iosClientId: "...", // Add if needed
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            verifyGoogleToken(authentication.accessToken);
        }
    }, [response]);

    const verifyGoogleToken = async (token) => {
        setLoading(true);
        try {
            const res = await api.post('/auth/google', { token });
            setLoading(false);
            if (res && res.success) {
                onNext({ user: res.user, token: res.token });
            } else {
                Alert.alert('Login Failed', res?.message || 'Google Auth Error');
            }
        } catch (e) {
            setLoading(false);
            Alert.alert('Error', 'Network error during Google Login');
        }
    };

    const handleGoogleLogin = async () => {
        await promptAsync();
    };

    const handleSendOtp = async () => {
        if (phone.length < 10) return Alert.alert('Error', 'Please enter a valid phone number');

        setLoading(true);
        try {
            const res = await api.post('/auth/whatsapp/send', { phone });
            setLoading(false);
            if (res && res.success) {
                setView('otp');
            } else {
                Alert.alert('Error', res?.message || 'Failed to send OTP');
            }
        } catch (e) {
            setLoading(false);
            Alert.alert('Error', 'Network error');
        }
    };

    const handleVerifyOtp = async () => {
        if (otp.length < 4) return Alert.alert('Error', 'Please enter the code');

        setLoading(true);
        try {
            const res = await api.post('/auth/whatsapp/verify', { phone, code: otp });
            setLoading(false);
            if (res && res.success) {
                // Pass full user object to parent
                onNext({ user: res.user, token: res.token });
            } else {
                Alert.alert('Failed', res?.message || 'Invalid Code');
            }
        } catch (e) {
            setLoading(false);
            Alert.alert('Error', 'Network error');
        }
    };

    const renderContent = () => {
        if (view === 'phone') {
            return (
                <View style={styles.formContainer}>
                    <Text style={styles.formTitle}>Enter WhatsApp Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="+91 99999 99999"
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={setPhone}
                        placeholderTextColor="#999"
                    />
                    <TouchableOpacity style={styles.primaryButton} onPress={handleSendOtp} disabled={loading}>
                        {loading ? <ActivityIndicator color="white" /> : <Text style={styles.primaryButtonText}>Send Code</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setView('default')} style={styles.backLink}>
                        <Text style={styles.backLinkText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        if (view === 'otp') {
            return (
                <View style={styles.formContainer}>
                    <Text style={styles.formTitle}>Verify OTP</Text>
                    <Text style={styles.formSubtitle}>Sent to {phone}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="123456"
                        keyboardType="number-pad"
                        value={otp}
                        onChangeText={setOtp}
                        placeholderTextColor="#999"
                        maxLength={6}
                    />
                    <TouchableOpacity style={styles.primaryButton} onPress={handleVerifyOtp} disabled={loading}>
                        {loading ? <ActivityIndicator color="white" /> : <Text style={styles.primaryButtonText}>Verify & Login</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setView('phone')} style={styles.backLink}>
                        <Text style={styles.backLinkText}>Change Number</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return (
            <View style={styles.options}>
                <TouchableOpacity
                    style={styles.googleButton}
                    onPress={handleGoogleLogin}
                    activeOpacity={0.7}
                >
                    <Feather name="chrome" color={ShipraColors.text} size={24} />
                    <Text style={styles.googleButtonText}>Continue with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.otpButton}
                    onPress={() => setView('phone')}
                    activeOpacity={0.7}
                >
                    <MaterialCommunityIcons name="whatsapp" color="white" size={24} />
                    <Text style={styles.otpButtonText}>WhatsApp OTP Login</Text>
                </TouchableOpacity>
            </View>
        );
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
                {view === 'default' && (
                    <View style={styles.illustration}>
                        <LinearGradient
                            colors={['rgba(0, 71, 171, 0.1)', 'rgba(255, 165, 0, 0.1)']}
                            style={styles.illustrationGradient}
                        />
                        <View style={styles.iconContainer}>
                            <MaterialCommunityIcons name="airplane" color={ShipraColors.primary} size={64} />
                        </View>
                    </View>
                )}

                {renderContent()}

                {/* Terms */}
                {view === 'default' && (
                    <Text style={styles.terms}>
                        By continuing, you agree to our{' '}
                        <Text style={styles.link}>Terms</Text> and{' '}
                        <Text style={styles.link}>Privacy</Text>
                    </Text>
                )}
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
    formContainer: {
        gap: 16,
    },
    formTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: ShipraColors.text,
    },
    formSubtitle: {
        fontSize: 14,
        color: ShipraColors.muted,
        marginBottom: 8,
    },
    input: {
        height: 60,
        backgroundColor: 'white',
        borderRadius: 16,
        paddingHorizontal: 20,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        color: ShipraColors.text,
    },
    primaryButton: {
        height: 60,
        backgroundColor: '#25D366', // WhatsApp Green
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    backLink: {
        alignItems: 'center',
        padding: 10,
    },
    backLinkText: {
        color: ShipraColors.muted,
        fontSize: 14,
    },
});
