import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import { ShipraColors } from '../../constants/theme';

const { width } = Dimensions.get('window');

export default function SplashScreen({ onNext }) {
    const opacity = useSharedValue(0);
    const scale = useSharedValue(0.8);
    const translateY = useSharedValue(20);
    const rotate = useSharedValue(0);
    const logoScale = useSharedValue(1);
    const dot1Scale = useSharedValue(1);
    const dot2Scale = useSharedValue(1);
    const dot3Scale = useSharedValue(1);

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 800 });
        scale.value = withSpring(1, { damping: 15, stiffness: 100 });
        translateY.value = withSpring(0, { damping: 15, stiffness: 100 });

        rotate.value = withRepeat(
            withTiming(360, { duration: 8000, easing: Easing.linear }),
            -1,
            false
        );

        logoScale.value = withRepeat(
            withTiming(1.1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
            -1,
            true
        );

        const animateDot = (sv, delay) => {
            sv.value = withDelay(
                delay,
                withRepeat(
                    withTiming(1.3, { duration: 750 }),
                    -1,
                    true
                )
            );
        };

        animateDot(dot1Scale, 0);
        animateDot(dot2Scale, 200);
        animateDot(dot3Scale, 400);
    }, []);

    const containerStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [
            { scale: scale.value },
            { translateY: translateY.value }
        ],
    }));

    const logoContainerStyle = useAnimatedStyle(() => ({
        transform: [
            { rotate: `${rotate.value}deg` }
        ],
    }));

    const logoInnerStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: logoScale.value }
        ],
    }));

    const dot1Style = useAnimatedStyle(() => ({ transform: [{ scale: dot1Scale.value }] }));
    const dot2Style = useAnimatedStyle(() => ({ transform: [{ scale: dot2Scale.value }] }));
    const dot3Style = useAnimatedStyle(() => ({ transform: [{ scale: dot3Scale.value }] }));

    return (
        <LinearGradient
            colors={[ShipraColors.primary, '#1E40AF', '#111827']}
            style={styles.container}
        >
            <Animated.View style={[styles.content, containerStyle]}>
                {/* Logo */}
                <Animated.View style={[styles.logoOuter, logoContainerStyle]}>
                    <Animated.View style={[styles.logoInner, logoInnerStyle]}>
                        <MaterialCommunityIcons name="airplane" color="white" size={48} />
                    </Animated.View>
                </Animated.View>

                {/* App Name */}
                <Text style={styles.title}>Shipra</Text>

                {/* Tagline */}
                <Text style={styles.tagline}>Future of Air Mobility</Text>

                {/* Animated dots */}
                <View style={styles.dotsContainer}>
                    <Animated.View style={[styles.dot, dot1Style]} />
                    <Animated.View style={[styles.dot, dot2Style]} />
                    <Animated.View style={[styles.dot, dot3Style]} />
                </View>

                {/* CTA Button */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={onNext}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </Animated.View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    logoOuter: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        marginBottom: 48,
    },
    logoInner: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 56,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
        textAlign: 'center',
    },
    tagline: {
        fontSize: 20,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        marginBottom: 64,
        fontWeight: '300',
        letterSpacing: 1,
    },
    dotsContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 80,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: ShipraColors.accent,
    },
    button: {
        width: '100%',
        height: 64,
        backgroundColor: ShipraColors.accent,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: ShipraColors.accent,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 10,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
});
