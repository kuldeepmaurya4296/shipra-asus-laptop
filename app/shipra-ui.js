import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BookingScreen from '../components/shipra/BookingScreen';
import HistoryScreen from '../components/shipra/HistoryScreen';
import HomeScreen from '../components/shipra/HomeScreen';
import LoginScreen from '../components/shipra/LoginScreen';
import ProfileScreen from '../components/shipra/ProfileScreen';
import RideInProgressScreen from '../components/shipra/RideInProgressScreen';
import RideStatusScreen from '../components/shipra/RideStatusScreen';
import RideSummaryScreen from '../components/shipra/RideSummaryScreen';
import SplashScreen from '../components/shipra/SplashScreen';
import { ShipraColors } from '../constants/theme';

export default function ShipraUI() {
    const [currentScreen, setCurrentScreen] = useState('splash');

    const renderScreen = () => {
        switch (currentScreen) {
            case 'splash':
                return <SplashScreen onNext={() => setCurrentScreen('login')} />;
            case 'login':
                return <LoginScreen onNext={() => setCurrentScreen('home')} />;
            case 'home':
                return <HomeScreen onNext={() => setCurrentScreen('booking')} />;
            case 'booking':
                return <BookingScreen onNext={() => setCurrentScreen('ride-status')} />;
            case 'ride-status':
                return <RideStatusScreen onNext={() => setCurrentScreen('ride-progress')} />;
            case 'ride-progress':
                return <RideInProgressScreen onNext={() => setCurrentScreen('summary')} />;
            case 'summary':
                return <RideSummaryScreen onNext={() => setCurrentScreen('home')} />;
            case 'history':
                return <HistoryScreen />;
            case 'profile':
                return <ProfileScreen onLogout={() => setCurrentScreen('login')} />;
            default:
                return <SplashScreen onNext={() => setCurrentScreen('login')} />;
        }
    };

    const showNavbar = ['home', 'history', 'profile'].includes(currentScreen);

    return (
        <View style={styles.container}>
            <View style={styles.screenContainer}>{renderScreen()}</View>

            {showNavbar && (
                <View style={styles.navbar}>
                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={() => setCurrentScreen('home')}
                    >
                        <Feather name="home" size={24} color={currentScreen === 'home' ? ShipraColors.primary : ShipraColors.muted} />
                        <Text style={[styles.navText, currentScreen === 'home' && styles.navTextActive]}>Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={() => setCurrentScreen('history')}
                    >
                        <Feather name="history" size={24} color={currentScreen === 'history' ? ShipraColors.primary : ShipraColors.muted} />
                        <Text style={[styles.navText, currentScreen === 'history' && styles.navTextActive]}>History</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={() => setCurrentScreen('profile')}
                    >
                        <Feather name="user" size={24} color={currentScreen === 'profile' ? ShipraColors.primary : ShipraColors.muted} />
                        <Text style={[styles.navText, currentScreen === 'profile' && styles.navTextActive]}>Profile</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ShipraColors.background,
    },
    screenContainer: {
        flex: 1,
    },
    navbar: {
        flexDirection: 'row',
        height: 80,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.05)',
        paddingBottom: 20,
        paddingTop: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    navText: {
        fontSize: 10,
        color: ShipraColors.muted,
        fontWeight: '500',
    },
    navTextActive: {
        color: ShipraColors.primary,
        fontWeight: 'bold',
    },
});
