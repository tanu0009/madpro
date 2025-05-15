import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

// Mock the ExpoFontLoader for web
if (typeof window !== 'undefined' && !window.ExpoFontLoader) {
  window.ExpoFontLoader = {
    loadAsync: function() { return Promise.resolve(); }
  };
}

// Women's Safety App component for web
function App() {
  // State for current screen
  const [currentScreen, setCurrentScreen] = useState('home');
  
  // State for SOS activation
  const [sosActive, setSosActive] = useState(false);
  
  // State for location
  const [location, setLocation] = useState(null);
  
  // State for emergency contacts
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Emergency Services', phone: '911' },
    { id: 2, name: 'Mom', phone: '555-123-4567' }
  ]);

  // Function to get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          alert(`Location updated: ${position.coords.latitude}, ${position.coords.longitude}`);
        },
        (error) => {
          alert(`Error getting location: ${error.message}`);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  // Function to activate SOS mode
  const activateSOS = () => {
    setSosActive(!sosActive);
    if (!sosActive) {
      alert('SOS activated! Emergency contacts would be notified.');
      // In a real app, this would send messages to emergency contacts
    } else {
      alert('SOS deactivated.');
    }
  };

  // Function to add a new contact
  const addContact = () => {
    const name = prompt('Enter contact name:');
    const phone = prompt('Enter contact phone number:');
    if (name && phone) {
      setContacts([...contacts, { id: Date.now(), name, phone }]);
    }
  };

  // Render Home Screen
  const renderHomeScreen = () => (
    <View style={styles.screenContainer}>
      <View style={styles.welcomeSection}>
        <Text style={styles.title}>Welcome to HerSafe</Text>
        <Text style={styles.subtitle}>Your personal safety companion</Text>
      </View>
      
      <View style={styles.cardGrid}>
        <TouchableOpacity style={styles.card} onPress={() => setCurrentScreen('sos')}>
          <Text style={styles.cardTitle}>SOS Emergency</Text>
          <Text style={styles.cardText}>Quickly activate emergency mode</Text>
          <Text style={styles.cardIcon}>🆘</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.card} onPress={() => setCurrentScreen('location')}>
          <Text style={styles.cardTitle}>Location Tracking</Text>
          <Text style={styles.cardText}>Share your location with contacts</Text>
          <Text style={styles.cardIcon}>📍</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.card} onPress={() => setCurrentScreen('contacts')}>
          <Text style={styles.cardTitle}>Emergency Contacts</Text>
          <Text style={styles.cardText}>Manage your emergency contacts</Text>
          <Text style={styles.cardIcon}>👥</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.card} onPress={() => setCurrentScreen('tips')}>
          <Text style={styles.cardTitle}>Safety Tips</Text>
          <Text style={styles.cardText}>Learn important safety tips</Text>
          <Text style={styles.cardIcon}>📋</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Render SOS Screen
  const renderSOSScreen = () => (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Emergency SOS</Text>
      <Text style={styles.screenDescription}>
        Press the SOS button in case of emergency. This will alert your emergency contacts.
      </Text>
      
      <TouchableOpacity 
        style={[styles.sosButton, sosActive && styles.sosButtonActive]} 
        onPress={activateSOS}
      >
        <Text style={styles.sosButtonText}>{sosActive ? 'STOP SOS' : 'SOS'}</Text>
      </TouchableOpacity>
      
      <View style={[styles.statusBox, sosActive && styles.statusBoxActive]}>
        <Text style={[styles.statusText, sosActive && styles.statusTextActive]}>
          {sosActive ? 'SOS MODE ACTIVE - Emergency contacts would be notified' : 'SOS Mode Inactive'}
        </Text>
      </View>
      
      <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen('home')}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );

  // Render Location Screen
  const renderLocationScreen = () => (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Location Tracking</Text>
      <Text style={styles.screenDescription}>
        Your current location can be shared with emergency contacts.
      </Text>
      
      <View style={styles.locationBox}>
        {location ? (
          <View>
            <Text style={styles.locationText}>Latitude: {location.latitude}</Text>
            <Text style={styles.locationText}>Longitude: {location.longitude}</Text>
            <Text style={styles.locationIcon}>📍</Text>
          </View>
        ) : (
          <Text style={styles.locationText}>Location not available yet. Click the button below to update.</Text>
        )}
      </View>
      
      <TouchableOpacity style={styles.actionButton} onPress={getCurrentLocation}>
        <Text style={styles.actionButtonText}>Update My Location</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.actionButton, styles.shareButton]} 
        onPress={() => alert('Location would be shared with your emergency contacts')}
      >
        <Text style={styles.actionButtonText}>Share Location with Contacts</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen('home')}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );

  // Render Contacts Screen
  const renderContactsScreen = () => (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Emergency Contacts</Text>
      <Text style={styles.screenDescription}>
        These contacts will be notified in case of emergency.
      </Text>
      
      <ScrollView style={styles.contactsList}>
        {contacts.length > 0 ? (
          contacts.map(contact => (
            <View key={contact.id} style={styles.contactItem}>
              <View>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactPhone}>{contact.phone}</Text>
              </View>
              <TouchableOpacity 
                style={styles.removeButton} 
                onPress={() => setContacts(contacts.filter(c => c.id !== contact.id))}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.emptyListText}>No emergency contacts added yet.</Text>
        )}
      </ScrollView>
      
      <TouchableOpacity style={styles.actionButton} onPress={addContact}>
        <Text style={styles.actionButtonText}>Add New Contact</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen('home')}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );

  // Render Tips Screen
  const renderTipsScreen = () => {
    const tips = [
      { id: 1, title: 'Share Your Location', content: 'Always share your location with trusted contacts when traveling alone, especially at night.' },
      { id: 2, title: 'Stay Alert', content: 'Be aware of your surroundings. Avoid using headphones or being distracted by your phone in isolated areas.' },
      { id: 3, title: 'Emergency Numbers', content: 'Keep emergency numbers on speed dial, including local police and trusted contacts.' },
      { id: 4, title: 'Well-Lit Areas', content: 'Stay in well-lit, populated areas when walking at night. Avoid shortcuts through dark, isolated paths.' },
      { id: 5, title: 'Trust Your Instincts', content: 'If something feels wrong, trust your gut feeling and remove yourself from the situation.' },
      { id: 6, title: 'Public Transportation', content: 'When using public transportation, sit near the driver or in a car with other passengers.' },
      { id: 7, title: 'Rideshare Safety', content: 'Always verify the driver and car details before getting into a rideshare vehicle.' },
      { id: 8, title: 'Self-Defense', content: 'Consider learning basic self-defense techniques and carrying legal personal safety devices.' }
    ];
    
    return (
      <View style={styles.screenContainer}>
        <Text style={styles.screenTitle}>Safety Tips</Text>
        <Text style={styles.screenDescription}>
          Important safety tips and advice to help you stay safe.
        </Text>
        
        <ScrollView style={styles.tipsList}>
          {tips.map(tip => (
            <View key={tip.id} style={styles.tipItem}>
              <Text style={styles.tipTitle}>{tip.title}</Text>
              <Text style={styles.tipContent}>{tip.content}</Text>
            </View>
          ))}
        </ScrollView>
        
        <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen('home')}>
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Render the current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home': return renderHomeScreen();
      case 'sos': return renderSOSScreen();
      case 'location': return renderLocationScreen();
      case 'contacts': return renderContactsScreen();
      case 'tips': return renderTipsScreen();
      default: return renderHomeScreen();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>HerSafe - Women's Safety App</Text>
      </View>
      {renderScreen()}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 HerSafe - Women's Safety App</Text>
      </View>
    </View>
  );
}

// Define styles using StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    height: '100%',
    width: '100%',
  },
  header: {
    backgroundColor: '#d81b60',
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#7b1fa2',
    padding: 10,
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: 14,
  },
  screenContainer: {
    flex: 1,
    padding: 20,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d81b60',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d81b60',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  cardIcon: {
    fontSize: 30,
    textAlign: 'center',
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#d81b60',
    textAlign: 'center',
  },
  screenDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  sosButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#f44336',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  sosButtonActive: {
    backgroundColor: '#b71c1c',
  },
  sosButtonText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  statusBox: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    alignSelf: 'center',
    marginBottom: 20,
    width: '100%',
  },
  statusBoxActive: {
    backgroundColor: '#ffebee',
  },
  statusText: {
    textAlign: 'center',
    color: '#333',
  },
  statusTextActive: {
    color: '#c62828',
    fontWeight: 'bold',
  },
  locationBox: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  locationText: {
    fontSize: 16,
    marginBottom: 5,
  },
  locationIcon: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 10,
  },
  shareButton: {
    backgroundColor: '#2196f3',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#7b1fa2',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactsList: {
    marginBottom: 20,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 4,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactPhone: {
    fontSize: 14,
    color: '#666',
  },
  removeButton: {
    backgroundColor: '#f44336',
    padding: 8,
    borderRadius: 4,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 12,
  },
  emptyListText: {
    textAlign: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
  },
  tipsList: {
    marginBottom: 20,
  },
  tipItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d81b60',
    marginBottom: 5,
  },
  tipContent: {
    fontSize: 14,
    color: '#333',
  },
});

// Export the component
export default App;
