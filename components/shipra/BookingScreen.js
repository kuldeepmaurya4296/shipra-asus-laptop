import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ShipraColors } from '../../constants/theme';
import { api, endpoints } from '../../services/api';

import { useEffect } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';

import { Alert, FlatList, Modal, TextInput } from 'react-native';

export default function BookingScreen({ user, onNext }) {
    const [locations, setLocations] = useState([]);
    const [fromLoc, setFromLoc] = useState(null);
    const [toLoc, setToLoc] = useState(null);
    const [loading, setLoading] = useState(false);

    // Search Modal State
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectingFor, setSelectingFor] = useState('from'); // 'from' or 'to'

    useEffect(() => {
        loadLocations();
    }, []);

    const loadLocations = async () => {
        const data = await api.get(endpoints.locations);
        if (data && data.length > 0) {
            setLocations(data);
            // Default: Bhopal -> Delhi if available, else first two
            const bhopal = data.find(l => l.name.includes('Bhopal'));
            const delhi = data.find(l => l.name.includes('Delhi'));

            if (bhopal && delhi) {
                setFromLoc(bhopal);
                setToLoc(delhi);
            } else if (data.length >= 2) {
                setFromLoc(data[0]);
                setToLoc(data[1]);
            }
        }
    };

    const handleSwap = () => {
        const temp = fromLoc;
        setFromLoc(toLoc);
        setToLoc(temp);
    };

    const openSearch = (type) => {
        setSelectingFor(type);
        setSearchQuery('');
        setModalVisible(true);
    };

    const selectLocation = (loc) => {
        if (!loc.available) {
            Alert.alert('Unavailable', 'This route is currently not operational.');
            return;
        }
        if (selectingFor === 'from') setFromLoc(loc);
        else setToLoc(loc);
        setModalVisible(false);
    };

    const handleBooking = async () => {
        if (!user) return Alert.alert('Login Required', 'Please login to book a flight.');
        setLoading(true);

        try {
            const res = await api.post(endpoints.createBooking, {
                userId: user.id || user._id,
                fromId: fromLoc.id,
                toId: toLoc.id,
                cost: 3000, // Dynamic pricing can be added
                distance: 12.5
            });

            setLoading(false);

            if (res?.success) {
                if (res.orderId) {
                    // Simulating Razorpay Payment
                    Alert.alert(
                        'Payment Required',
                        `Razorpay Order Created: ${res.orderId}\n\nProceed to Pay ₹${res.booking.cost}?`,
                        [
                            { text: 'Cancel', style: 'cancel' },
                            {
                                text: 'Pay Now (Simulate)',
                                onPress: () => {
                                    Alert.alert('Success', 'Payment Successful! Booking Confirmed.');
                                    onNext(); // Move to next screen
                                }
                            }
                        ]
                    );
                } else {
                    onNext();
                }
            } else {
                Alert.alert('Booking Failed', res?.message || 'Unknown error');
            }
        } catch (error) {
            setLoading(false);
            Alert.alert('Error', 'Network request failed');
        }
    };

    if (!fromLoc || !toLoc) return <View style={styles.container}><Text style={{ padding: 20 }}>Loading Locations...</Text></View>;

    // Filter locations for search
    const filteredLocations = locations.filter(l =>
        l.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Book Your Flight</Text>
                <Text style={styles.subtitle}>Select your route</Text>
            </View>

            {/* Map View */}
            <View style={styles.mapContainer}>
                <MapView
                    style={StyleSheet.absoluteFill}
                    initialRegion={{
                        latitude: (fromLoc.lat + toLoc.lat) / 2,
                        longitude: (fromLoc.lng + toLoc.lng) / 2,
                        latitudeDelta: 5.0, // Zoom out for inter-city
                        longitudeDelta: 5.0,
                    }}
                >
                    <Marker coordinate={{ latitude: fromLoc.lat, longitude: fromLoc.lng }} title={fromLoc.name} pinColor="green" />
                    <Marker coordinate={{ latitude: toLoc.lat, longitude: toLoc.lng }} title={toLoc.name} pinColor="red" />
                    <Polyline
                        coordinates={[
                            { latitude: fromLoc.lat, longitude: fromLoc.lng },
                            { latitude: toLoc.lat, longitude: toLoc.lng }
                        ]}
                        strokeColor={ShipraColors.primary}
                        strokeWidth={3}
                        lineDashPattern={[5, 5]}
                    />
                </MapView>
            </View>

            {/* Location Inputs (Now Clickable for Search) */}
            <View style={styles.locations}>
                <TouchableOpacity style={styles.locationInput} onPress={() => openSearch('from')}>
                    <Text style={styles.inputLabel}>From</Text>
                    <Text style={styles.inputValue}>{fromLoc.name}</Text>
                </TouchableOpacity>

                <View style={styles.swapContainer}>
                    <TouchableOpacity style={styles.swapButton} onPress={handleSwap}>
                        <MaterialCommunityIcons name="swap-vertical" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.locationInput} onPress={() => openSearch('to')}>
                    <Text style={styles.inputLabel}>To</Text>
                    <Text style={styles.inputValue}>{toLoc.name}</Text>
                </TouchableOpacity>
            </View>

            {/* Availability Check */}
            {!toLoc.available && (
                <View style={styles.warningBox}>
                    <Text style={styles.warningText}>⚠️ Route unavailable due to weather/maintenance.</Text>
                </View>
            )}

            {/* Price Summary */}
            <View style={styles.priceCard}>
                <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>Flight Cost</Text>
                    <Text style={styles.priceValue}>₹3,000</Text>
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
                style={[styles.confirmButton, !toLoc.available && { backgroundColor: '#ccc' }]}
                onPress={handleBooking}
                disabled={loading || !toLoc.available}
            >
                <Text style={styles.confirmButtonText}>
                    {loading ? 'Processing...' : 'Proceed to Payment'}
                </Text>
            </TouchableOpacity>

            {/* Search Modal */}
            <Modal visible={modalVisible} animationType="slide" presentationStyle="pageSheet">
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Select {selectingFor === 'from' ? 'Origin' : 'Destination'}</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Feather name="x" size={24} color="black" />
                        </TouchableOpacity>
                    </View>

                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search city..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoFocus
                    />

                    <FlatList
                        data={filteredLocations}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[styles.locationItem, !item.available && { opacity: 0.5 }]}
                                onPress={() => selectLocation(item)}
                            >
                                <View>
                                    <Text style={styles.locationName}>{item.name}</Text>
                                    <Text style={styles.locationDesc}>{item.description}</Text>
                                </View>
                                {!item.available && <Text style={{ color: 'red', fontSize: 12 }}>Unavailable</Text>}
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: ShipraColors.background },
    contentContainer: { padding: 24, paddingTop: 64 },
    header: { marginBottom: 24 },
    title: { fontSize: 28, fontWeight: 'bold', color: ShipraColors.text },
    subtitle: { fontSize: 16, color: ShipraColors.muted },
    mapContainer: { height: 200, borderRadius: 20, overflow: 'hidden', marginBottom: 24, borderWidth: 1, borderColor: '#ddd' },
    locations: { gap: 12, marginBottom: 24 },
    locationInput: { padding: 16, backgroundColor: 'white', borderRadius: 20, borderWidth: 1, borderColor: '#eee' },
    inputLabel: { fontSize: 12, color: ShipraColors.muted, marginBottom: 4 },
    inputValue: { fontSize: 18, fontWeight: '600', color: ShipraColors.text },
    swapContainer: { alignItems: 'center', zIndex: 1, marginVertical: -20 },
    swapButton: { width: 44, height: 44, backgroundColor: ShipraColors.accent, borderRadius: 22, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: ShipraColors.background },
    warningBox: { backgroundColor: '#FFF4F4', padding: 12, borderRadius: 12, marginBottom: 20, borderColor: '#FECACA', borderWidth: 1 },
    warningText: { color: '#DC2626', fontSize: 14 },
    priceCard: { padding: 20, backgroundColor: '#f9fafb', borderRadius: 24, borderWidth: 1, borderColor: '#eee', marginBottom: 32 },
    priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    priceLabel: { fontSize: 14, color: ShipraColors.muted },
    priceValue: { fontSize: 16, fontWeight: '600', color: ShipraColors.text },
    priceSeparator: { height: 1, backgroundColor: '#eee', marginVertical: 12 },
    totalLabel: { fontSize: 18, fontWeight: 'bold', color: ShipraColors.text },
    totalContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    totalValue: { fontSize: 24, fontWeight: 'bold', color: ShipraColors.accent },
    confirmButton: { height: 64, backgroundColor: ShipraColors.primary, borderRadius: 32, alignItems: 'center', justifyContent: 'center', elevation: 5 },
    confirmButtonText: { fontSize: 18, fontWeight: 'bold', color: 'white' },

    // Modal Styles
    modalContainer: { flex: 1, padding: 24, paddingTop: 60, backgroundColor: '#fff' },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    modalTitle: { fontSize: 24, fontWeight: 'bold' },
    searchInput: { height: 50, backgroundColor: '#f0f0f0', borderRadius: 12, paddingHorizontal: 16, fontSize: 16, marginBottom: 20 },
    locationItem: { paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#eee', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    locationName: { fontSize: 18, fontWeight: '500', marginBottom: 4 },
    locationDesc: { fontSize: 14, color: '#666' }
});


