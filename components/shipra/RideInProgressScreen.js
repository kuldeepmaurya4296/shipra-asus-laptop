import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming
} from 'react-native-reanimated';
import { ShipraColors } from '../../constants/theme';

export default function RideInProgressScreen({ onNext }) {
    const [showSOS, setShowSOS] = useState(false);
    const planeX = useSharedValue(0);
    const planeY = useSharedValue(0);
    const sosScale = useSharedValue(1);

    useEffect(() => {
        planeX.value = withRepeat(
            withTiming(20, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
            -1,
            true
        );
        planeY.value = withRepeat(
            withTiming(-10, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
            -1,
            true
        );
        sosScale.value = withRepeat(
            withTiming(1.2, { duration: 1000 }),
            -1,
            true
        );
    }, []);

    const planeStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: planeX.value },
            { translateY: planeY.value }
        ],
    }));

    const sosPulseStyle = useAnimatedStyle(() => ({
        transform: [{ scale: sosScale.value }],
        opacity: withTiming(showSOS ? 1 : 0),
    }));

    if (showSOS) {
        return (
            <View style={[styles.container, { backgroundColor: ShipraColors.destructive }]}>
                <Animated.View style={[styles.sosOverlay, sosPulseStyle]} />
                <View style={styles.sosContent}>
                    <View style={styles.sosIconContainer}>
                        <Feather name="alert-triangle" size={48} color={ShipraColors.destructive} />
                    </View>
                    <Text style={styles.sosTitle}>SOS Alert Sent</Text>
                    <Text style={styles.sosSubtitle}>Emergency services are on their way</Text>
                    <TouchableOpacity
                        style={styles.sosBackButton}
                        onPress={() => setShowSOS(false)}
                    >
                        <Text style={styles.sosBackButtonText}>Back to Flight</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Flight in Progress</Text>
                <Text style={styles.subtitle}>Bird #42 • Altitude: 250m</Text>
            </View>

            {/* Live Route */}
            <View style={styles.routeCard}>
                <LinearGradient
                    colors={['rgba(0, 71, 171, 0.05)', 'rgba(26, 54, 93, 0.1)', 'rgba(0, 71, 171, 0.05)']}
                    style={StyleSheet.absoluteFill}
                />
                <Animated.View style={planeStyle}>
                    <MaterialCommunityIcons name="airplane" size={48} color={ShipraColors.primary} />
                </Animated.View>
                <Text style={styles.routeLabel}>Live Route</Text>
            </View>

            {/* Flight Stats */}
            <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                    <Text style={styles.statLabel}>Time Remaining</Text>
                    <Text style={styles.statValue}>8 min</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statLabel}>Speed</Text>
                    <Text style={styles.statValue}>95 km/h</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statLabel}>Distance</Text>
                    <Text style={styles.statValue}>6.2 km</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statLabel}>Altitude</Text>
                    <Text style={styles.statValue}>250 m</Text>
                </View>
            </View>

            {/* Status Indicator */}
            <View style={styles.statusBanner}>
                <View style={styles.statusDot} />
                <View>
                    <Text style={styles.statusTitle}>Flight Status: Safe</Text>
                    <Text style={styles.statusSubtitle}>All systems operational</Text>
                </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.completeButton}
                    onPress={onNext}
                    activeOpacity={0.8}
                >
                    <Text style={styles.completeButtonText}>Complete Flight</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.sosButton}
                    onPress={() => setShowSOS(true)}
                    activeOpacity={0.7}
                >
                    <Text style={styles.sosButtonText}>🚨 SOS / Emergency</Text>
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
        marginBottom: 24,
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
    routeCard: {
        height: 160,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: 'rgba(0, 71, 171, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        overflow: 'hidden',
    },
    routeLabel: {
        fontSize: 12,
        color: ShipraColors.muted,
        position: 'absolute',
        bottom: 12,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 24,
    },
    statCard: {
        width: (Dimensions.get('window').width - 60) / 2,
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(0, 71, 171, 0.1)',
    },
    statLabel: {
        fontSize: 12,
        color: ShipraColors.muted,
        marginBottom: 4,
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: ShipraColors.text,
    },
    statusBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 16,
        backgroundColor: 'rgba(16, 185, 129, 0.05)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(16, 185, 129, 0.2)',
        marginBottom: 24,
    },
    statusDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: ShipraColors.success,
    },
    statusTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: ShipraColors.text,
    },
    statusSubtitle: {
        fontSize: 12,
        color: ShipraColors.muted,
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        gap: 12,
        marginBottom: 20,
    },
    completeButton: {
        height: 64,
        backgroundColor: ShipraColors.primary,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: ShipraColors.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 8,
    },
    completeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    sosButton: {
        height: 56,
        borderWidth: 2,
        borderColor: ShipraColors.destructive,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sosButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: ShipraColors.destructive,
    },
    sosOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    sosContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    sosIconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    sosTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
    },
    sosSubtitle: {
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        paddingHorizontal: 40,
        marginBottom: 48,
    },
    sosBackButton: {
        paddingHorizontal: 32,
        paddingVertical: 16,
        backgroundColor: 'white',
        borderRadius: 30,
    },
    sosBackButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: ShipraColors.destructive,
    }
});
