import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming
} from 'react-native-reanimated';
import { ShipraColors } from '../../constants/theme';

export default function RideStatusScreen({ onNext }) {
    const planeY = useSharedValue(0);
    const pulseScale = useSharedValue(1);

    useEffect(() => {
        planeY.value = withRepeat(
            withTiming(-20, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
            -1,
            true
        );
        pulseScale.value = withRepeat(
            withTiming(1.5, { duration: 1000 }),
            -1,
            true
        );
    }, []);

    const planeStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: planeY.value }],
    }));

    const pulseStyle = useAnimatedStyle(() => ({
        transform: [{ scale: pulseScale.value }],
        opacity: withTiming(0.5),
    }));

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Your Bird is Arriving</Text>
                <Text style={styles.subtitle}>Flight #42 assigned</Text>
            </View>

            {/* Live Tracker */}
            <View style={styles.trackerCard}>
                <LinearGradient
                    colors={['rgba(0, 71, 171, 0.05)', 'rgba(26, 54, 93, 0.1)', 'rgba(0, 71, 171, 0.05)']}
                    style={StyleSheet.absoluteFill}
                />
                <View style={styles.trackerContent}>
                    <Animated.View style={planeStyle}>
                        <MaterialCommunityIcons name="airplane" size={64} color={ShipraColors.primary} />
                    </Animated.View>
                    <Text style={styles.trackerText}>Live Tracking</Text>
                </View>
                <Animated.View style={[styles.etaDot, pulseStyle]} />
            </View>

            {/* Status Details */}
            <View style={styles.statusGrid}>
                <View style={styles.statusCard}>
                    <Text style={styles.statusLabel}>Distance from You</Text>
                    <Text style={styles.statusValue}>1.2 km</Text>
                </View>

                <View style={styles.statusCard}>
                    <Text style={styles.statusLabel}>Time to Arrive</Text>
                    <Text style={styles.statusValue}>4 minutes</Text>
                </View>

                <View style={[styles.statusCard, styles.successCard]}>
                    <View style={styles.liveIndicator}>
                        <View style={styles.liveDot} />
                        <Text style={styles.liveText}>Live • On Time</Text>
                    </View>
                </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.continueButton}
                    onPress={onNext}
                    activeOpacity={0.8}
                >
                    <Text style={styles.continueButtonText}>Continue to Flight</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.cancelButton}
                    activeOpacity={0.7}
                >
                    <Text style={styles.cancelButtonText}>Cancel Booking</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ShipraColors.background,
        padding: 24,
        paddingTop: 64,
    },
    header: {
        marginBottom: 32,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: ShipraColors.text,
    },
    subtitle: {
        fontSize: 16,
        color: ShipraColors.muted,
    },
    trackerCard: {
        height: 200,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: 'rgba(0, 71, 171, 0.1)',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    trackerContent: {
        alignItems: 'center',
        zIndex: 1,
    },
    trackerText: {
        fontSize: 14,
        color: ShipraColors.muted,
        marginTop: 8,
    },
    etaDot: {
        position: 'absolute',
        top: 20,
        right: 20,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: ShipraColors.success,
    },
    statusGrid: {
        gap: 12,
    },
    statusCard: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(0, 71, 171, 0.1)',
    },
    statusLabel: {
        fontSize: 12,
        color: ShipraColors.muted,
        marginBottom: 4,
    },
    statusValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: ShipraColors.text,
    },
    successCard: {
        backgroundColor: 'rgba(16, 185, 129, 0.05)',
        borderColor: 'rgba(16, 185, 129, 0.2)',
    },
    liveIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    liveDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: ShipraColors.success,
    },
    liveText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: ShipraColors.success,
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        gap: 12,
        marginBottom: 20,
    },
    continueButton: {
        height: 64,
        backgroundColor: ShipraColors.primary,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: ShipraColors.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    continueButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    cancelButton: {
        height: 56,
        borderWidth: 2,
        borderColor: ShipraColors.destructive,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: ShipraColors.destructive,
    },
});
