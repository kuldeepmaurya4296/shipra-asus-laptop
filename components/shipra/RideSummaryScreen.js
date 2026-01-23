import { Feather } from '@expo/vector-icons';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import { ShipraColors } from '../../constants/theme';

export default function RideSummaryScreen({ onNext }) {
    const checkScale = useSharedValue(0);
    const checkOpacity = useSharedValue(0);

    useEffect(() => {
        checkScale.value = withDelay(300, withSpring(1, { damping: 12 }));
        checkOpacity.value = withDelay(300, withTiming(1, { duration: 500 }));
    }, []);

    const checkStyle = useAnimatedStyle(() => ({
        transform: [{ scale: checkScale.value }],
        opacity: checkOpacity.value,
    }));

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* Header */}
            <View style={styles.header}>
                <Animated.View style={[styles.checkContainer, checkStyle]}>
                    <Feather name="check-circle" size={48} color={ShipraColors.success} />
                </Animated.View>
                <Text style={styles.title}>Flight Completed!</Text>
                <Text style={styles.subtitle}>Thank you for flying with Shipra</Text>
            </View>

            {/* Route Summary */}
            <View style={styles.routeCard}>
                <View style={styles.routeItem}>
                    <Text style={styles.routeLabel}>From</Text>
                    <Text style={styles.routeName}>Downtown Airport</Text>
                </View>
                <Feather name="arrow-right" size={20} color={ShipraColors.accent} />
                <View style={[styles.routeItem, { alignItems: 'flex-end' }]}>
                    <Text style={styles.routeLabel}>To</Text>
                    <Text style={styles.routeName}>City Center</Text>
                </View>
            </View>

            {/* Trip Details */}
            <View style={styles.detailsGrid}>
                <View style={styles.detailCard}>
                    <Text style={styles.detailLabel}>Distance Traveled</Text>
                    <Text style={styles.detailValue}>12.5 km</Text>
                </View>
                <View style={styles.detailCard}>
                    <Text style={styles.detailLabel}>Flight Duration</Text>
                    <Text style={styles.detailValue}>15 mins</Text>
                </View>
                <View style={styles.detailCard}>
                    <Text style={styles.detailLabel}>Avg. Speed</Text>
                    <Text style={styles.detailValue}>92 km/h</Text>
                </View>
            </View>

            {/* Cost Breakdown */}
            <View style={styles.costCard}>
                <Text style={styles.costTitle}>Cost Breakdown</Text>
                <View style={styles.costRow}>
                    <Text style={styles.costLabel}>Base Fare</Text>
                    <Text style={styles.costValue}>₹2,850</Text>
                </View>
                <View style={styles.separator} />
                <View style={styles.costRow}>
                    <Text style={styles.costLabel}>Service Fee</Text>
                    <Text style={styles.costValue}>₹150</Text>
                </View>
                <View style={[styles.separator, { backgroundColor: ShipraColors.primary, opacity: 0.1 }]} />
                <View style={styles.costRow}>
                    <Text style={styles.totalLabel}>Total Paid</Text>
                    <Text style={styles.totalValue}>₹3,000</Text>
                </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.receiptButton} activeOpacity={0.7}>
                    <Feather name="download" size={20} color={ShipraColors.primary} />
                    <Text style={styles.receiptButtonText}>Download Receipt</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.bookAgainButton}
                    onPress={onNext}
                    activeOpacity={0.8}
                >
                    <Text style={styles.bookAgainButtonText}>Book Another Flight</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ShipraColors.background,
    },
    contentContainer: {
        padding: 24,
        paddingTop: 80,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    checkContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: ShipraColors.text,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: ShipraColors.muted,
        textAlign: 'center',
        marginTop: 8,
    },
    routeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(0, 71, 171, 0.1)',
        marginBottom: 24,
    },
    routeItem: {
        flex: 1,
    },
    routeLabel: {
        fontSize: 12,
        color: ShipraColors.muted,
        marginBottom: 4,
    },
    routeName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: ShipraColors.text,
    },
    detailsGrid: {
        gap: 12,
        marginBottom: 24,
    },
    detailCard: {
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(0, 71, 171, 0.05)',
    },
    detailLabel: {
        fontSize: 12,
        color: ShipraColors.muted,
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: ShipraColors.text,
    },
    costCard: {
        padding: 20,
        backgroundColor: 'rgba(0, 71, 171, 0.03)',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(0, 71, 171, 0.08)',
        marginBottom: 40,
    },
    costTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: ShipraColors.text,
        marginBottom: 16,
    },
    costRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    costLabel: {
        fontSize: 14,
        color: ShipraColors.muted,
    },
    costValue: {
        fontSize: 15,
        fontWeight: '600',
        color: ShipraColors.text,
    },
    separator: {
        height: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        marginVertical: 12,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: ShipraColors.text,
    },
    totalValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: ShipraColors.accent,
    },
    footer: {
        gap: 12,
    },
    receiptButton: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        borderWidth: 2,
        borderColor: ShipraColors.primary,
        borderRadius: 28,
    },
    receiptButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: ShipraColors.primary,
    },
    bookAgainButton: {
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
    bookAgainButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});
