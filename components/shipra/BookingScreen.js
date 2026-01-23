import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ShipraColors } from '../../constants/theme';

export default function BookingScreen({ onNext }) {
    const [swapped, setSwapped] = useState(false);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Book Your Flight</Text>
                <Text style={styles.subtitle}>Select your route</Text>
            </View>

            {/* Location Inputs */}
            <View style={styles.locations}>
                <TouchableOpacity style={styles.locationInput} activeOpacity={0.8}>
                    <Text style={styles.inputLabel}>From</Text>
                    <Text style={styles.inputValue}>Downtown Airport</Text>
                </TouchableOpacity>

                <View style={styles.swapContainer}>
                    <TouchableOpacity
                        style={styles.swapButton}
                        onPress={() => setSwapped(!swapped)}
                        activeOpacity={0.7}
                    >
                        <MaterialCommunityIcons name="swap-vertical" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.locationInput} activeOpacity={0.8}>
                    <Text style={styles.inputLabel}>To</Text>
                    <Text style={styles.inputValue}>
                        {swapped ? 'Downtown Airport' : 'City Center Terminal'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Details Card */}
            <View style={styles.detailsCard}>
                <View style={styles.detailRow}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Distance</Text>
                        <Text style={styles.detailValue}>12.5 km</Text>
                    </View>
                    <View style={styles.detailDivider} />
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Est. Time</Text>
                        <Text style={styles.detailValue}>15 mins</Text>
                    </View>
                </View>
                <View style={styles.detailSeparator} />
                <View style={styles.detailItemFull}>
                    <Text style={styles.detailLabel}>Service Fee</Text>
                    <Text style={styles.detailValue}>₹150</Text>
                </View>
            </View>

            {/* Price Summary */}
            <View style={styles.priceCard}>
                <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>Subtotal</Text>
                    <Text style={styles.priceValue}>₹2,850</Text>
                </View>
                <View style={styles.priceSeparator} />
                <View style={styles.priceRow}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <View style={styles.totalContainer}>
                        <Feather name="zap" size={20} color={ShipraColors.accent} />
                        <Text style={styles.totalValue}>₹3,000</Text>
                    </View>
                </View>
            </View>

            {/* CTA Button */}
            <TouchableOpacity
                style={styles.confirmButton}
                onPress={onNext}
                activeOpacity={0.8}
            >
                <Text style={styles.confirmButtonText}>Confirm Booking</Text>
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
    locations: {
        gap: 12,
        marginBottom: 32,
    },
    locationInput: {
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(0, 71, 171, 0.1)',
    },
    inputLabel: {
        fontSize: 12,
        color: ShipraColors.muted,
        marginBottom: 4,
    },
    inputValue: {
        fontSize: 18,
        fontWeight: '600',
        color: ShipraColors.text,
    },
    swapContainer: {
        alignItems: 'center',
        zIndex: 1,
        marginVertical: -20,
    },
    swapButton: {
        width: 44,
        height: 44,
        backgroundColor: ShipraColors.accent,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 4,
        borderColor: ShipraColors.background,
    },
    detailsCard: {
        padding: 20,
        backgroundColor: 'rgba(0, 71, 171, 0.03)',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(0, 71, 171, 0.08)',
        marginBottom: 24,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailItem: {
        flex: 1,
    },
    detailItemFull: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailDivider: {
        width: 1,
        height: 30,
        backgroundColor: 'rgba(0, 71, 171, 0.1)',
        marginHorizontal: 16,
    },
    detailLabel: {
        fontSize: 13,
        color: ShipraColors.muted,
    },
    detailValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: ShipraColors.text,
    },
    detailSeparator: {
        height: 1,
        backgroundColor: 'rgba(0, 71, 171, 0.05)',
        marginVertical: 12,
    },
    priceCard: {
        padding: 20,
        backgroundColor: 'rgba(0, 71, 171, 0.05)',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(0, 71, 171, 0.1)',
        marginBottom: 32,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceLabel: {
        fontSize: 14,
        color: ShipraColors.muted,
    },
    priceValue: {
        fontSize: 16,
        fontWeight: '600',
        color: ShipraColors.text,
    },
    priceSeparator: {
        height: 1,
        backgroundColor: 'rgba(0, 71, 171, 0.1)',
        marginVertical: 12,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: ShipraColors.text,
    },
    totalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    totalValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: ShipraColors.accent,
    },
    confirmButton: {
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
    confirmButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});
