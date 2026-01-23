import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ShipraColors } from '../../constants/theme';

const menuItems = [
    {
        icon: <Feather name="settings" size={20} color={ShipraColors.primary} />,
        label: 'Settings',
        description: 'App preferences & profile',
    },
    {
        icon: <Feather name="bell" size={20} color={ShipraColors.primary} />,
        label: 'Notifications',
        description: 'Manage alerts & updates',
    },
    {
        icon: <Feather name="shield" size={20} color={ShipraColors.primary} />,
        label: 'Safety & Privacy',
        description: 'Security settings',
    },
    {
        icon: <Feather name="award" size={20} color={ShipraColors.primary} />,
        label: 'Rewards',
        description: 'Loyalty points & offers',
    },
];

export default function ProfileScreen({ onLogout }) {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* Profile Header */}
            <View style={styles.header}>
                <LinearGradient
                    colors={['rgba(0, 71, 171, 0.1)', 'transparent']}
                    style={StyleSheet.absoluteFill}
                />
                <View style={styles.avatarContainer}>
                    <LinearGradient
                        colors={[ShipraColors.primary, ShipraColors.accent]}
                        style={styles.avatarGradient}
                    />
                    <Text style={styles.avatarText}>KM</Text>
                </View>
                <Text style={styles.name}>Kuldeep Maurya</Text>
                <Text style={styles.email}>kuldeep.maurya@example.com</Text>

                {/* Stats Row */}
                <View style={styles.statsRow}>
                    {[
                        { icon: 'trending-up', label: 'Flights', value: '12' },
                        { icon: 'star', label: 'Rating', value: '4.8' },
                        { icon: 'award', label: 'Status', value: 'Gold' },
                    ].map((stat, index) => {
                        return (
                            <View key={index} style={styles.statCard}>
                                <Feather name={stat.icon} size={16} color={ShipraColors.primary} />
                                <Text style={styles.statLabel}>{stat.label}</Text>
                                <Text style={styles.statValue}>{stat.value}</Text>
                            </View>
                        );
                    })}
                </View>
            </View>

            {/* Menu Items */}
            <View style={styles.menu}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.menuItem} activeOpacity={0.7}>
                        <View style={styles.menuIconContainer}>
                            {item.icon}
                        </View>
                        <View style={styles.menuTextContainer}>
                            <Text style={styles.menuLabel}>{item.label}</Text>
                            <Text style={styles.menuDescription}>{item.description}</Text>
                        </View>
                        <Feather name="chevron-right" size={20} color={ShipraColors.muted} />
                    </TouchableOpacity>
                ))}
            </View>

            {/* Logout Button */}
            <TouchableOpacity
                style={styles.logoutButton}
                onPress={onLogout}
                activeOpacity={0.7}
            >
                <Feather name="log-out" size={20} color={ShipraColors.destructive} />
                <Text style={styles.logoutText}>Logout</Text>
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
        paddingTop: 80,
        alignItems: 'center',
        marginBottom: 24,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        overflow: 'hidden',
        elevation: 8,
        shadowColor: ShipraColors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    avatarGradient: {
        ...StyleSheet.absoluteFillObject,
    },
    avatarText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: ShipraColors.text,
    },
    email: {
        fontSize: 14,
        color: ShipraColors.muted,
        marginBottom: 24,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 12,
    },
    statCard: {
        flex: 1,
        padding: 12,
        backgroundColor: 'white',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(0, 71, 171, 0.1)',
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 10,
        color: ShipraColors.muted,
        marginVertical: 4,
    },
    statValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: ShipraColors.text,
    },
    menu: {
        paddingHorizontal: 20,
        gap: 12,
        marginBottom: 32,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.05)',
    },
    menuIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(0, 71, 171, 0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    menuTextContainer: {
        flex: 1,
    },
    menuLabel: {
        fontSize: 15,
        fontWeight: 'bold',
        color: ShipraColors.text,
    },
    menuDescription: {
        fontSize: 11,
        color: ShipraColors.muted,
    },
    logoutButton: {
        marginHorizontal: 20,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        backgroundColor: 'rgba(239, 68, 68, 0.05)',
        borderRadius: 30,
        borderWidth: 2,
        borderColor: 'rgba(239, 68, 68, 0.1)',
    },
    logoutText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: ShipraColors.destructive,
    },
});
