// Screen components for the women's safety app

// Home Screen Component
function HomeScreen(props) {
  var navigateTo = props.navigateTo;
  var cardStyle = props.cardStyle;
  
  return React.createElement(
    'div', {},
    // Welcome section
    React.createElement('div', { style: { textAlign: 'center', marginBottom: '30px' } },
      React.createElement('h2', { style: { color: '#d81b60' } }, 'Welcome to HerSafe'),
      React.createElement('p', {}, 'Your personal safety companion')
    ),
    
    // Feature cards
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' } },
      // SOS Card
      React.createElement('div', { style: { ...cardStyle, cursor: 'pointer' }, onClick: function() { navigateTo('sos'); } },
        React.createElement('h3', { style: { color: '#d81b60' } }, 'SOS Emergency'),
        React.createElement('p', {}, 'Quickly activate emergency mode to alert your contacts'),
        React.createElement('div', { style: { textAlign: 'center', fontSize: '40px' } }, '🆘')
      ),
      
      // Location Card
      React.createElement('div', { style: { ...cardStyle, cursor: 'pointer' }, onClick: function() { navigateTo('location'); } },
        React.createElement('h3', { style: { color: '#d81b60' } }, 'Location Tracking'),
        React.createElement('p', {}, 'Share your location with trusted contacts'),
        React.createElement('div', { style: { textAlign: 'center', fontSize: '40px' } }, '📍')
      ),
      
      // Contacts Card
      React.createElement('div', { style: { ...cardStyle, cursor: 'pointer' }, onClick: function() { navigateTo('contacts'); } },
        React.createElement('h3', { style: { color: '#d81b60' } }, 'Emergency Contacts'),
        React.createElement('p', {}, 'Manage your emergency contacts'),
        React.createElement('div', { style: { textAlign: 'center', fontSize: '40px' } }, '👥')
      ),
      
      // Safety Tips Card
      React.createElement('div', { style: { ...cardStyle, cursor: 'pointer' }, onClick: function() { navigateTo('tips'); } },
        React.createElement('h3', { style: { color: '#d81b60' } }, 'Safety Tips'),
        React.createElement('p', {}, 'Learn important safety tips and advice'),
        React.createElement('div', { style: { textAlign: 'center', fontSize: '40px' } }, '📋')
      )
    )
  );
}

// SOS Screen Component
function SOSScreen(props) {
  var navigateTo = props.navigateTo;
  var activateSOS = props.activateSOS;
  var sosActive = props.sosActive;
  var buttonStyle = props.buttonStyle;
  
  return React.createElement(
    'div', {},
    React.createElement('h2', { style: { color: '#d81b60', textAlign: 'center' } }, 'Emergency SOS'),
    React.createElement('p', { style: { textAlign: 'center', marginBottom: '30px' } }, 
      'Press the SOS button in case of emergency. This will alert your emergency contacts with your current location.'),
    
    // SOS Button
    React.createElement('button', { 
      style: { ...buttonStyle, width: '150px', height: '150px', fontSize: '28px' }, 
      onClick: activateSOS 
    }, sosActive ? 'STOP SOS' : 'SOS'),
    
    // Status
    React.createElement('div', { 
      style: { 
        textAlign: 'center', 
        marginTop: '20px', 
        padding: '10px', 
        backgroundColor: sosActive ? '#ffebee' : '#f5f5f5',
        borderRadius: '4px',
        color: sosActive ? '#c62828' : '#333'
      } 
    }, sosActive ? 'SOS MODE ACTIVE - Emergency contacts would be notified' : 'SOS Mode Inactive'),
    
    // Back button
    React.createElement('button', { 
      style: { 
        backgroundColor: '#7b1fa2', 
        color: 'white', 
        border: 'none', 
        borderRadius: '4px', 
        padding: '10px 20px', 
        fontSize: '16px', 
        cursor: 'pointer', 
        margin: '30px auto 0', 
        display: 'block' 
      }, 
      onClick: function() { navigateTo('home'); } 
    }, 'Back to Home')
  );
}

// Location Screen Component
function LocationScreen(props) {
  var navigateTo = props.navigateTo;
  var location = props.location;
  var getCurrentLocation = props.getCurrentLocation;
  var locationButtonStyle = props.locationButtonStyle;
  var cardStyle = props.cardStyle;
  
  return React.createElement(
    'div', {},
    React.createElement('h2', { style: { color: '#d81b60', textAlign: 'center' } }, 'Location Tracking'),
    React.createElement('p', { style: { textAlign: 'center', marginBottom: '20px' } }, 
      'Your current location can be shared with emergency contacts.'),
    
    // Location display
    React.createElement('div', { style: { ...cardStyle, marginBottom: '20px', textAlign: 'center' } },
      location ? 
        React.createElement('div', {},
          React.createElement('p', {}, 'Latitude: ' + location.latitude),
          React.createElement('p', {}, 'Longitude: ' + location.longitude),
          React.createElement('p', { style: { fontSize: '40px' } }, '📍')
        ) : 
        React.createElement('p', {}, 'Location not available yet. Click the button below to update.')
    ),
    
    // Update location button
    React.createElement('button', { style: locationButtonStyle, onClick: getCurrentLocation }, 'Update My Location'),
    
    // Share location button (mock)
    React.createElement('button', { 
      style: { 
        backgroundColor: '#4caf50', 
        color: 'white', 
        border: 'none', 
        borderRadius: '4px', 
        padding: '10px 20px', 
        fontSize: '16px', 
        cursor: 'pointer', 
        margin: '10px 0', 
        width: '100%' 
      }, 
      onClick: function() { alert('Location would be shared with your emergency contacts'); } 
    }, 'Share Location with Contacts'),
    
    // Back button
    React.createElement('button', { 
      style: { 
        backgroundColor: '#7b1fa2', 
        color: 'white', 
        border: 'none', 
        borderRadius: '4px', 
        padding: '10px 20px', 
        fontSize: '16px', 
        cursor: 'pointer', 
        margin: '30px auto 0', 
        display: 'block' 
      }, 
      onClick: function() { navigateTo('home'); } 
    }, 'Back to Home')
  );
}

// Contacts Screen Component
function ContactsScreen(props) {
  var navigateTo = props.navigateTo;
  var contacts = props.contacts;
  var setContacts = props.setContacts;
  var addContact = props.addContact;
  var addButtonStyle = props.addButtonStyle;
  
  return React.createElement(
    'div', {},
    React.createElement('h2', { style: { color: '#d81b60', textAlign: 'center' } }, 'Emergency Contacts'),
    React.createElement('p', { style: { textAlign: 'center', marginBottom: '20px' } }, 
      'These contacts will be notified in case of emergency.'),
    
    // Contacts list
    contacts.length > 0 ? 
      React.createElement('div', { style: { marginBottom: '20px' } },
        contacts.map(function(contact) {
          return React.createElement('div', { 
            key: contact.id, 
            style: { 
              marginBottom: '10px', 
              padding: '15px', 
              border: '1px solid #ddd', 
              borderRadius: '4px',
              backgroundColor: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            } 
          },
            React.createElement('div', {},
              React.createElement('div', { style: { fontWeight: 'bold' } }, contact.name),
              React.createElement('div', {}, contact.phone)
            ),
            React.createElement('button', {
              style: {
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '5px 10px',
                cursor: 'pointer'
              },
              onClick: function() {
                setContacts(contacts.filter(function(c) { return c.id !== contact.id; }));
              }
            }, 'Remove')
          );
        })
      ) : 
      React.createElement('p', { style: { textAlign: 'center', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' } }, 
        'No emergency contacts added yet.'),
    
    // Add contact button
    React.createElement('button', { style: addButtonStyle, onClick: addContact }, 'Add New Contact'),
    
    // Back button
    React.createElement('button', { 
      style: { 
        backgroundColor: '#7b1fa2', 
        color: 'white', 
        border: 'none', 
        borderRadius: '4px', 
        padding: '10px 20px', 
        fontSize: '16px', 
        cursor: 'pointer', 
        margin: '30px auto 0', 
        display: 'block' 
      }, 
      onClick: function() { navigateTo('home'); } 
    }, 'Back to Home')
  );
}

// Safety Tips Screen Component
function TipsScreen(props) {
  var navigateTo = props.navigateTo;
  
  var tips = [
    { id: 1, title: 'Share Your Location', content: 'Always share your location with trusted contacts when traveling alone, especially at night.' },
    { id: 2, title: 'Stay Alert', content: 'Be aware of your surroundings. Avoid using headphones or being distracted by your phone in isolated areas.' },
    { id: 3, title: 'Emergency Numbers', content: 'Keep emergency numbers on speed dial, including local police and trusted contacts.' },
    { id: 4, title: 'Well-Lit Areas', content: 'Stay in well-lit, populated areas when walking at night. Avoid shortcuts through dark, isolated paths.' },
    { id: 5, title: 'Trust Your Instincts', content: 'If something feels wrong, trust your gut feeling and remove yourself from the situation.' },
    { id: 6, title: 'Public Transportation', content: 'When using public transportation, sit near the driver or in a car with other passengers.' },
    { id: 7, title: 'Rideshare Safety', content: 'Always verify the driver and car details before getting into a rideshare vehicle.' },
    { id: 8, title: 'Self-Defense', content: 'Consider learning basic self-defense techniques and carrying legal personal safety devices.' }
  ];
  
  return React.createElement(
    'div', {},
    React.createElement('h2', { style: { color: '#d81b60', textAlign: 'center' } }, 'Safety Tips'),
    React.createElement('p', { style: { textAlign: 'center', marginBottom: '20px' } }, 
      'Important safety tips and advice to help you stay safe.'),
    
    // Tips list
    React.createElement('div', { style: { marginBottom: '20px' } },
      tips.map(function(tip) {
        return React.createElement('div', { 
          key: tip.id, 
          style: { 
            marginBottom: '15px', 
            padding: '15px', 
            backgroundColor: 'white',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          } 
        },
          React.createElement('h3', { style: { color: '#d81b60', marginTop: 0 } }, tip.title),
          React.createElement('p', { style: { margin: 0 } }, tip.content)
        );
      })
    ),
    
    // Back button
    React.createElement('button', { 
      style: { 
        backgroundColor: '#7b1fa2', 
        color: 'white', 
        border: 'none', 
        borderRadius: '4px', 
        padding: '10px 20px', 
        fontSize: '16px', 
        cursor: 'pointer', 
        margin: '30px auto 0', 
        display: 'block' 
      }, 
      onClick: function() { navigateTo('home'); } 
    }, 'Back to Home')
  );
}

// Export all screens
module.exports = {
  HomeScreen: HomeScreen,
  SOSScreen: SOSScreen,
  LocationScreen: LocationScreen,
  ContactsScreen: ContactsScreen,
  TipsScreen: TipsScreen
};
