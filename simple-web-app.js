// A women's safety React web app without Expo dependencies
var React = require('react');
var ReactDOM = require('react-dom');
var Screens = require('./screens');

// Women's Safety App component
function SafetyApp() {
  // State for current screen
  var [currentScreen, setCurrentScreen] = React.useState('home');
  
  // State for SOS mode
  var [sosActive, setSosActive] = React.useState(false);
  
  // State for current location
  var [location, setLocation] = React.useState(null);
  
  // State for emergency contacts
  var [contacts, setContacts] = React.useState([
    { id: 1, name: 'Emergency Contact 1', phone: '123-456-7890' },
    { id: 2, name: 'Emergency Contact 2', phone: '098-765-4321' }
  ]);
  
  
  // Function to get current location
  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          alert('Location updated: ' + position.coords.latitude + ', ' + position.coords.longitude);
        },
        function(error) {
          alert('Error getting location: ' + error.message);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
  
  // Function to activate SOS mode
  function activateSOS() {
    setSosActive(!sosActive);
    if (!sosActive) {
      alert('SOS Mode Activated! Emergency contacts would be notified in a real app.');
      // In a real app, this would send messages to emergency contacts
    } else {
      alert('SOS Mode Deactivated');
    }
  }
  
  // Function to add a new contact
  function addContact() {
    var name = prompt('Enter contact name:');
    var phone = prompt('Enter contact phone number:');
    if (name && phone) {
      setContacts([...contacts, { id: contacts.length + 1, name: name, phone: phone }]);
    }
  }
  
  // Styles
  var appStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f8f0f7'
  };
  
  var headerStyle = {
    backgroundColor: '#d81b60',
    color: 'white',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };
  
  var contentStyle = {
    padding: '20px',
    flex: 1,
    overflowY: 'auto'
  };
  
  var buttonStyle = {
    backgroundColor: sosActive ? '#ff5252' : '#d81b60',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '120px',
    height: '120px',
    fontSize: '24px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    margin: '20px auto',
    display: 'block'
  };
  
  var locationButtonStyle = {
    backgroundColor: '#7b1fa2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    margin: '10px 0',
    width: '100%'
  };
  
  var cardStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };
  
  var addButtonStyle = {
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    margin: '10px 0',
    width: '100%'
  };
  
  var footerStyle = {
    backgroundColor: '#d81b60',
    color: 'white',
    padding: '10px',
    textAlign: 'center'
  };

  // Render the app
  return React.createElement(
    'div',
    { style: appStyle },
    // Header
    React.createElement('header', { style: headerStyle },
      React.createElement('h1', {}, 'HerSafe - Women\'s Safety App')
    ),
    // Main content with screen routing
    React.createElement('main', { style: contentStyle },
      currentScreen === 'home' ? 
        React.createElement(Screens.HomeScreen, { 
          navigateTo: navigateTo, 
          cardStyle: cardStyle 
        }) :
      currentScreen === 'sos' ? 
        React.createElement(Screens.SOSScreen, { 
          navigateTo: navigateTo, 
          activateSOS: activateSOS, 
          sosActive: sosActive, 
          buttonStyle: buttonStyle 
        }) :
      currentScreen === 'location' ? 
        React.createElement(Screens.LocationScreen, { 
          navigateTo: navigateTo, 
          location: location, 
          getCurrentLocation: getCurrentLocation, 
          locationButtonStyle: locationButtonStyle, 
          cardStyle: cardStyle 
        }) :
      currentScreen === 'contacts' ? 
        React.createElement(Screens.ContactsScreen, { 
          navigateTo: navigateTo, 
          contacts: contacts, 
          setContacts: setContacts, 
          addContact: addContact, 
          addButtonStyle: addButtonStyle 
        }) :
      currentScreen === 'tips' ? 
        React.createElement(Screens.TipsScreen, { 
          navigateTo: navigateTo 
        }) : 
        React.createElement(Screens.HomeScreen, { 
          navigateTo: navigateTo, 
          cardStyle: cardStyle 
        })
    ),
    // Footer
    React.createElement('footer', { style: footerStyle },
      React.createElement('p', {}, '\u00a9 2025 HerSafe - Women\'s Safety App')
    )
  );
}

// Mount the app
function startApp() {
  var appContainer = document.getElementById('root');
  if (appContainer) {
    ReactDOM.render(React.createElement(SafetyApp), appContainer);
  }
}

// Start when DOM is ready
if (document.readyState === 'complete') {
  startApp();
} else {
  document.addEventListener('DOMContentLoaded', startApp);
}
