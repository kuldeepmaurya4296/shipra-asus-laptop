import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Dimensions, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming
} from 'react-native-reanimated';
import { ShipraColors } from '../../constants/theme';
import { api, endpoints } from '../../services/api';

const { width } = Dimensions.get('window');

export default function HomeScreen({ onNext }) {
    const [birds, setBirds] = useState([]);
    const [loading, setLoading] = useState(true);

    const mapScale = useSharedValue(1);
    const mapOpacity = useSharedValue(0.3);
    const planeRotate = useSharedValue(0);

    const fetchData = async () => {
        setLoading(true);
        // In a real app, you'd get the user's location coordinates first
        const availableBirds = await api.get(endpoints.birds);
        if (availableBirds) {
            setBirds(availableBirds);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();

        mapScale.value = withRepeat(
            withTiming(1.2, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
            -1,
            true
        );
        mapOpacity.value = withRepeat(
            withTiming(0.6, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
            -1,
            true
        );
        planeRotate.value = withRepeat(
            withTiming(360, { duration: 8000, easing: Easing.linear }),
            -1,
            false
        );
    }, []);

    const mapCircleStyle = useAnimatedStyle(() => ({
        transform: [{ scale: mapScale.value }],
        opacity: mapOpacity.value,
    }));

    const planeStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${planeRotate.value}deg` }],
    }));

    const nearestBird = birds.length > 0 ? birds[0] : null;

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            refreshControl={
                <RefreshControl refreshing={loading} onRefresh={fetchData} colors={[ShipraColors.primary]} />
            }
        >
            {/* Header */}
            <LinearGradient
                colors={['rgba(0, 71, 171, 0.1)', 'transparent']}
                style={styles.header}
            >
                <Text style={styles.greeting}>Hey, Traveler!</Text>
                <View style={styles.locationContainer}>
                    <Feather name="map-pin" size={14} color={ShipraColors.primary} />
                    <Text style={styles.locationText}>Current Location: Downtown Airport</Text>
                </View>
            </LinearGradient>

            {/* Map Placeholder */}
            <TouchableOpacity activeOpacity={0.9} style={styles.mapCard}>
                <LinearGradient
                    colors={['rgba(0, 71, 171, 0.05)', 'rgba(26, 54, 93, 0.1)', 'rgba(0, 71, 171, 0.05)']}
                    style={StyleSheet.absoluteFill}
                />

                <Animated.View style={[styles.mapCircle, mapCircleStyle]} />
                <Animated.View style={[styles.mapCircleOuter, { transform: [{ scale: 1.4 }] }]} />

                <View style={styles.mapContent}>
                    <Text style={styles.mapEmoji}>🗺️</Text>
                    <Text style={styles.mapSubtext}>Live Location Map</Text>
                </View>

                <View style={styles.pulseContainer}>
                    <View style={styles.pulseCircle} />
                </View>
            </TouchableOpacity>

            {/* Availability Card */}
            {loading ? (
                <View style={[styles.availCard, { alignItems: 'center', justifyContent: 'center', height: 100 }]}>
                    <Text style={{ color: ShipraColors.muted }}>Finding birds...</Text>
                </View>
            ) : nearestBird ? (
                <TouchableOpacity style={styles.availCard} activeOpacity={0.8}>
                    <View style={styles.availHeader}>
                        <Text style={styles.availTitle}>Nearest Bird Available</Text>
                        <View style={styles.readyBadge}>
                            <Text style={styles.readyText}>{nearestBird.status}</Text>
                        </View>
                    </View>

                    <View style={styles.availBody}>
                        <Animated.View style={[styles.planeIconContainer, planeStyle]}>
                            <MaterialCommunityIcons name="airplane" size={24} color={ShipraColors.primary} />
                        </Animated.View>
                        <View style={styles.availInfo}>
                            <Text style={styles.availName}>{nearestBird.model} ({nearestBird.id})</Text>
                            <Text style={styles.availDetail}>{nearestBird.battery}% Battery • 4 min</Text>
                        </View>
                        <Feather name="zap" size={18} color={ShipraColors.accent} />
                    </View>
                </TouchableOpacity>
            ) : (
                <View style={[styles.availCard, { alignItems: 'center', justifyContent: 'center', height: 100 }]}>
                    <Text style={{ color: ShipraColors.destructive }}>No flights available nearby.</Text>
                </View>
            )}

            {/* CTA Button */}
            <TouchableOpacity
                style={styles.bookButton}
                onPress={onNext}
                activeOpacity={0.8}
            >
                <Text style={styles.bookButtonText}>Book a Flight</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ShipraColors.background,
    },
    contentContainer: {
        paddingBottom: 40,
    },
    header: {
        padding: 24,
        paddingTop: 64,
    },
    greeting: {
        fontSize: 28,
        fontWeight: 'bold',
        color: ShipraColors.text,
        marginBottom: 4,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    locationText: {
        fontSize: 14,
        color: ShipraColors.muted,
    },
    mapCard: {
        height: 300,
        margin: 20,
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'rgba(0, 71, 171, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapCircle: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: 'rgba(0, 71, 171, 0.1)',
    },
    mapCircleOuter: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'rgba(0, 71, 171, 0.05)',
    },
    mapContent: {
        alignItems: 'center',
        zIndex: 10,
    },
    mapEmoji: {
        fontSize: 48,
        marginBottom: 8,
    },
    mapSubtext: {
        fontSize: 14,
        color: ShipraColors.muted,
    },
    pulseContainer: {
        position: 'absolute',
        bottom: 24,
        left: 24,
    },
    pulseCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: ShipraColors.primary,
    },
    availCard: {
        margin: 20,
        marginTop: 0,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(0, 71, 171, 0.05)',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    availHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    availTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: ShipraColors.text,
    },
    readyBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderRadius: 12,
    },
    readyText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: ShipraColors.success,
    },
    availBody: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    planeIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(0, 71, 171, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    availInfo: {
        flex: 1,
    },
    availName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: ShipraColors.text,
    },
    availDetail: {
        fontSize: 12,
        color: ShipraColors.muted,
    },
    bookButton: {
        margin: 20,
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
    bookButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});
