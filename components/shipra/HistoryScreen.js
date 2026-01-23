import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ShipraColors } from '../../constants/theme';
import { api, endpoints } from '../../services/api';

export default function HistoryScreen() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchHistory = async () => {
        setLoading(true);
        const data = await api.get(endpoints.history);
        if (data) {
            setBookings(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            refreshControl={
                <RefreshControl refreshing={loading} onRefresh={fetchHistory} colors={[ShipraColors.primary]} />
            }
        >
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Booking History</Text>
                <Text style={styles.subtitle}>View all your past flights</Text>
            </View>

            {/* Bookings List */}
            <View style={styles.list}>
                {bookings.length > 0 ? (
                    bookings.map((booking) => (
                        <TouchableOpacity key={booking.id} style={styles.card} activeOpacity={0.8}>
                            <View style={styles.cardHeader}>
                                <View style={styles.iconContainer}>
                                    <Feather name="zap" size={20} color={ShipraColors.primary} />
                                </View>
                                <View style={styles.cardTitleContainer}>
                                    <Text style={styles.routeText}>{booking.route}</Text>
                                    <Text style={styles.dateText}>{booking.date}</Text>
                                </View>
                                <View style={styles.statusBadge}>
                                    <Text style={styles.statusText}>{booking.status}</Text>
                                </View>
                            </View>

                            <View style={styles.detailsRow}>
                                {/* Mocking duration/distance if missing from simple API for now */}
                                <View style={styles.detailItem}>
                                    <Feather name="clock" size={14} color={ShipraColors.primary} />
                                    <Text style={styles.detailText}>{booking.duration || '12 min'}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Feather name="map-pin" size={14} color={ShipraColors.primary} />
                                    <Text style={styles.detailText}>{booking.distance || '8.5 km'}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Feather name="dollar-sign" size={14} color={ShipraColors.accent} />
                                    <Text style={[styles.detailText, { color: ShipraColors.accent, fontWeight: 'bold' }]}>
                                        {booking.cost}
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity style={styles.receiptButton}>
                                <Feather name="download" size={14} color={ShipraColors.primary} />
                                <Text style={styles.receiptText}>Download Receipt</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={{ textAlign: 'center', color: ShipraColors.muted, marginTop: 20 }}>
                        {loading ? 'Loading...' : 'No past bookings found.'}
                    </Text>
                )}
            </View>

            {/* Summary Card */}
            <View style={styles.summaryCard}>
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Total Flights</Text>
                    <Text style={styles.summaryValue}>{bookings.length}</Text>
                </View>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Total Spent</Text>
                    <Text style={[styles.summaryValue, { color: ShipraColors.accent }]}>
                        {/* Simple sum logic for demo */}
                        ₹{bookings.reduce((sum, b) => sum + parseInt(b.cost.replace(/[^0-9]/g, '') || 0), 0).toLocaleString()}
                    </Text>
                </View>
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
        padding: 20,
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
    list: {
        gap: 16,
        marginBottom: 24,
    },
    card: {
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
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 71, 171, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardTitleContainer: {
        flex: 1,
    },
    routeText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: ShipraColors.text,
    },
    dateText: {
        fontSize: 12,
        color: ShipraColors.muted,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderRadius: 12,
    },
    statusText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: ShipraColors.success,
        textTransform: 'capitalize',
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    detailText: {
        fontSize: 12,
        color: ShipraColors.muted,
    },
    receiptButton: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        borderWidth: 1,
        borderColor: 'rgba(0, 71, 171, 0.2)',
        borderRadius: 12,
    },
    receiptText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: ShipraColors.primary,
    },
    summaryCard: {
        flexDirection: 'row',
        padding: 20,
        backgroundColor: 'rgba(0, 71, 171, 0.03)',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(0, 71, 171, 0.08)',
        alignItems: 'center',
    },
    summaryItem: {
        flex: 1,
    },
    summaryLabel: {
        fontSize: 12,
        color: ShipraColors.muted,
        marginBottom: 4,
    },
    summaryValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: ShipraColors.primary,
    },
    summaryDivider: {
        width: 1,
        height: 40,
        backgroundColor: 'rgba(0, 71, 171, 0.1)',
        marginHorizontal: 20,
    },
});
