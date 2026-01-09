'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMenu } from '../../hooks/useMenu';
import { saveMenuData } from '../../lib/menu-utils';
import { formatPrice, formatPriceRange } from '../../lib/menu-data';
import Image from 'next/image';

export default function AdminPage() {
  const router = useRouter();
  const { menuData, updateMenuData } = useMenu();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedSection, setSelectedSection] = useState('');
  const [bookings, setBookings] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [uploadedImageData, setUploadedImageData] = useState(null);
  const [expandedBookings, setExpandedBookings] = useState({});
  const [itemFormData, setItemFormData] = useState({
    name: '',
    price: '',
    description: '',
    badge: '',
    image: '/assets/images/menu-1.png',
    isSpecialDish: false
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = sessionStorage.getItem('adminLoggedIn');
      if (auth === 'true') {
        setIsAuthenticated(true);
      }

      // Load bookings
      const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      setBookings(storedBookings);

      // Load subscriptions
      const storedSubscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
      setSubscriptions(storedSubscriptions);

      // Scroll to top button
      const handleScroll = () => {
        setShowScrollTop(window.scrollY > 300);
      };
      window.addEventListener('scroll', handleScroll);

      // Listen for storage changes to update subscriptions in real-time
      const handleStorageChange = (e) => {
        if (e.key === 'subscriptions') {
          const storedSubscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
          setSubscriptions(storedSubscriptions);
        }
        if (e.key === 'bookings') {
          const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
          setBookings(storedBookings);
        }
      };
      window.addEventListener('storage', handleStorageChange);

      // Also listen for custom events (for same-tab updates)
      const handleCustomStorageChange = () => {
        const storedSubscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
        setSubscriptions(storedSubscriptions);
      };
      window.addEventListener('subscriptionAdded', handleCustomStorageChange);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('subscriptionAdded', handleCustomStorageChange);
      };
    }
  }, []);

  const showAlert = (message, type = 'success') => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      sessionStorage.setItem('adminLoggedIn', 'true');
      setIsAuthenticated(true);
      setPassword('');
      setLoginError(false);
    } else {
      setLoginError(true);
      setPassword('');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminLoggedIn');
    setIsAuthenticated(false);
    router.push('/');
  };

  const handleAddSection = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const sectionName = formData.get('sectionName');
    const sectionId = formData.get('sectionId').toLowerCase().replace(/\s+/g, '-');

    if (menuData.sections.find(s => s.id === sectionId)) {
      showAlert('Section ID already exists!', 'error');
      return;
    }

    const newSection = {
      id: sectionId,
      name: sectionName,
      items: []
    };

    const updatedData = {
      sections: [...menuData.sections, newSection]
    };

    updateMenuDataAndSync(updatedData);
    setShowSectionModal(false);
    showAlert('Section added successfully!');
    e.target.reset();
  };

  const openAddItemModal = (sectionId) => {
    setSelectedSection(sectionId);
    setEditingItem(null);
    setItemFormData({
      name: '',
      price: '',
      description: '',
      badge: '',
      image: '/assets/images/menu-1.png',
      isSpecialDish: false
    });
    setUploadedImageData(null);
    setShowItemModal(true);
  };

  const openEditItemModal = (sectionId, itemId) => {
    const section = menuData.sections.find(s => s.id === sectionId);
    if (!section) return;

    let item = null;
    if (section.categories) {
      for (let cat of section.categories) {
        item = cat.items.find(i => i.id === itemId);
        if (item) break;
      }
    } else if (section.items) {
      item = section.items.find(i => i.id === itemId);
    }

    if (!item) return;

    setSelectedSection(sectionId);
    setEditingItem(item);
    setItemFormData({
      name: item.name || '',
      price: item.price || '',
      description: item.description || '',
      badge: item.badge || '',
      image: item.image || '/assets/images/menu-1.png',
      isSpecialDish: item.isSpecialDish || false
    });
    setUploadedImageData(item.imageData || null);
    setShowItemModal(true);
  };

  const handleSaveItem = (e) => {
    e.preventDefault();
    const section = menuData.sections.find(s => s.id === selectedSection);
    if (!section) return;

    const itemData = {
      name: itemFormData.name,
      price: parseFloat(itemFormData.price),
      description: itemFormData.description,
      image: itemFormData.image,
      badge: itemFormData.badge || null,
      isSpecialDish: itemFormData.isSpecialDish,
      imageData: uploadedImageData || null
    };

    const updatedData = { ...menuData };
    const sectionIndex = menuData.sections.findIndex(s => s.id === selectedSection);

    if (editingItem) {
      // Edit existing item
      itemData.id = editingItem.id;

      if (section.categories) {
        for (let cat of section.categories) {
          const itemIndex = cat.items.findIndex(i => i.id === editingItem.id);
          if (itemIndex !== -1) {
            updatedData.sections[sectionIndex].categories.find(c => c.name === cat.name).items[itemIndex] = itemData;
            break;
          }
        }
      } else {
        const itemIndex = section.items.findIndex(i => i.id === editingItem.id);
        if (itemIndex !== -1) {
          updatedData.sections[sectionIndex].items[itemIndex] = itemData;
        }
      }
      showAlert('Item updated successfully!');
    } else {
      // Add new item
      itemData.id = `${selectedSection}-${Date.now()}`;

      if (section.categories && section.categories.length > 0) {
        updatedData.sections[sectionIndex].categories[0].items.push(itemData);
      } else {
        if (!updatedData.sections[sectionIndex].items) {
          updatedData.sections[sectionIndex].items = [];
        }
        updatedData.sections[sectionIndex].items.push(itemData);
      }
      showAlert('Item added successfully!');
    }

    updateMenuDataAndSync(updatedData);
    setShowItemModal(false);
    setUploadedImageData(null);
  };

  const handleDeleteItem = (sectionId, itemId) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    const updatedData = { ...menuData };
    const sectionIndex = updatedData.sections.findIndex(s => s.id === sectionId);
    const section = updatedData.sections[sectionIndex];

    if (section.categories) {
      section.categories.forEach(cat => {
        cat.items = cat.items.filter(i => i.id !== itemId);
      });
    } else if (section.items) {
      section.items = section.items.filter(i => i.id !== itemId);
    }

    updateMenuDataAndSync(updatedData);
    showAlert('Item deleted successfully!');
  };

  const handleDeleteSection = (sectionId) => {
    if (!confirm('Are you sure you want to delete this section? All items will be deleted too.')) return;

    const updatedData = {
      sections: menuData.sections.filter(s => s.id !== sectionId)
    };

    updateMenuDataAndSync(updatedData);
    showAlert('Section deleted successfully!');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showAlert('Image size must be less than 5MB', 'error');
        e.target.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImageData(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImageUpload = () => {
    setUploadedImageData(null);
    const fileInput = document.getElementById('item-image-upload');
    if (fileInput) fileInput.value = '';
  };

  const markBookingAsProcessed = (index) => {
    const updatedBookings = [...bookings];
    updatedBookings[index].processed = true;
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    showAlert('Booking marked as processed!');
  };

  const handleDeleteBooking = (index) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;
    const updatedBookings = bookings.filter((_, i) => i !== index);
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    showAlert('Booking deleted successfully!');
  };

  const refreshBookings = () => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(storedBookings);
    showAlert('Bookings refreshed!');
  };

  const refreshSubscriptions = () => {
    const storedSubscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
    setSubscriptions(storedSubscriptions);
    showAlert('Subscriptions refreshed!');
  };

  const handleDeleteSubscription = (subscriptionId) => {
    if (!confirm('Are you sure you want to delete this subscription?')) return;
    const updatedSubscriptions = subscriptions.filter((sub) => sub.id !== subscriptionId);
    setSubscriptions(updatedSubscriptions);
    localStorage.setItem('subscriptions', JSON.stringify(updatedSubscriptions));
    showAlert('Subscription deleted successfully!');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    return timeString.replace(':', ' : ');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get all items from a section (from categories or items)
  const getSectionItems = (section) => {
    let allItems = [];
    if (section.categories && section.categories.length > 0) {
      section.categories.forEach(cat => {
        allItems = allItems.concat(cat.items);
      });
    } else if (section.items) {
      allItems = section.items;
    }
    return allItems;
  };

  // Sync menu data to menu-data.js file
  const syncMenuDataToFile = async (menuDataToSync) => {
    try {
      const response = await fetch('/api/menu/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ menuData: menuDataToSync }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('Failed to sync menu data to file:', result.error);
        // Show error but don't block the UI
        showAlert(`Menu updated in memory, but file sync failed: ${result.error}`, 'error');
      } else {
        console.log('Menu data synced to file successfully');
      }
    } catch (error) {
      console.error('Error syncing menu data to file:', error);
      // Show error but don't block the UI - localStorage still works
      showAlert('Menu updated in localStorage, but file sync failed. Please check console.', 'error');
    }
  };

  // Wrapper function to update menu data both in localStorage and file
  const updateMenuDataAndSync = (newData) => {
    // Update localStorage first
    updateMenuData(newData);
    // Then sync to file (async, won't block)
    syncMenuDataToFile(newData);
  };

  if (!isAuthenticated) {
    return (
      <div className="login-container" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'var(--eerie-black-1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000
      }}>
        <div className="login-box" style={{
          background: 'var(--eerie-black-2)',
          padding: '50px 40px',
          borderRadius: '10px',
          border: '2px solid var(--gold-crayola)',
          maxWidth: '400px',
          width: '90%',
          textAlign: 'center'
        }}>
          <h2 style={{
            color: 'var(--gold-crayola)',
            fontFamily: 'var(--fontFamily-forum)',
            fontSize: 'var(--fontSize-headline-1)',
            marginBottom: '20px'
          }}>
            Admin Access
          </h2>
          <p style={{
            color: 'var(--quick-silver)',
            fontSize: 'var(--fontSize-body-4)',
            marginBottom: '30px'
          }}>
            Enter password to access admin panel
          </p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setLoginError(false);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleLogin(e);
              }}
              style={{
                width: '100%',
                padding: '15px',
                background: 'var(--eerie-black-1)',
                border: `1px solid ${loginError ? '#ff4444' : 'var(--white-alpha-10)'}`,
                borderRadius: '5px',
                color: 'var(--white)',
                fontSize: 'var(--fontSize-body-4)',
                fontFamily: 'var(--fontFamily-dm_sans)',
                marginBottom: '20px',
                outline: 'none'
              }}
              required
            />
            {loginError && (
              <div style={{
                color: '#ff4444',
                fontSize: 'var(--fontSize-label-1)',
                marginBottom: '15px'
              }}>
                Incorrect password. Please try again.
              </div>
            )}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                background: 'var(--gold-crayola)',
                color: 'var(--black)',
                border: 'none',
                borderRadius: '5px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: 'var(--fontSize-body-4)'
              }}
            >
              Login
            </button>
          </form>
          <p style={{
            color: 'var(--quick-silver)',
            fontSize: 'var(--fontSize-label-2)',
            marginTop: '20px'
          }}>
            Default password: <strong style={{ color: 'var(--gold-crayola)' }}>admin123</strong>
          </p>
        </div>
      </div>
    );
  }

  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = new Date(a.timestamp || a.createdAt || 0);
    const dateB = new Date(b.timestamp || b.createdAt || 0);
    return dateB - dateA;
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--eerie-black-1)',
      color: 'var(--white)',
      padding: '120px 20px 40px',
      fontFamily: 'var(--fontFamily-dm_sans)',
      fontSize: 'var(--fontSize-body-4)'
    }}>
      <div className="admin-container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div className="admin-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            color: 'var(--gold-crayola)',
            fontFamily: 'var(--fontFamily-forum)',
            fontSize: 'var(--fontSize-headline-1)',
            marginBottom: '10px'
          }}>
            Menu Management
          </h1>
          <p style={{ color: 'var(--quick-silver)', fontSize: 'var(--fontSize-body-4)' }}>
            Manage your restaurant menu sections and items
          </p>
        </div>

        <div className="admin-nav" style={{
          display: 'flex',
          gap: '20px',
          marginBottom: '30px',
          flexWrap: 'wrap'
        }}>
          <Link href="/" style={{
            padding: '10px 20px',
            background: 'var(--eerie-black-2)',
            border: '2px solid var(--gold-crayola)',
            color: 'var(--gold-crayola)',
            textDecoration: 'none',
            borderRadius: '5px',
            transition: 'var(--transition-1)'
          }}>
            Home
          </Link>
          <Link href="/menu" style={{
            padding: '10px 20px',
            background: 'var(--eerie-black-2)',
            border: '2px solid var(--gold-crayola)',
            color: 'var(--gold-crayola)',
            textDecoration: 'none',
            borderRadius: '5px',
            transition: 'var(--transition-1)'
          }}>
            View Menu
          </Link>
          <Link href="/book-table" style={{
            padding: '10px 20px',
            background: 'var(--eerie-black-2)',
            border: '2px solid var(--gold-crayola)',
            color: 'var(--gold-crayola)',
            textDecoration: 'none',
            borderRadius: '5px',
            transition: 'var(--transition-1)'
          }}>
            Book Table
          </Link>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              background: 'var(--eerie-black-2)',
              border: '2px solid var(--gold-crayola)',
              color: 'var(--gold-crayola)',
              textDecoration: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontFamily: 'var(--fontFamily-dm_sans)',
              fontSize: 'var(--fontSize-body-4)'
            }}
          >
            Refresh
          </button>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              background: 'var(--eerie-black-2)',
              border: '2px solid #ff4444',
              color: '#ff4444',
              textDecoration: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontFamily: 'var(--fontFamily-dm_sans)',
              fontSize: 'var(--fontSize-body-4)'
            }}
          >
            Logout
          </button>
        </div>

        {alert.show && (
          <div style={{
            padding: '15px',
            borderRadius: '5px',
            marginBottom: '20px',
            background: alert.type === 'success' ? 'rgba(68, 255, 68, 0.2)' : 'rgba(255, 68, 68, 0.2)',
            border: `1px solid ${alert.type === 'success' ? '#44ff44' : '#ff4444'}`,
            color: alert.type === 'success' ? '#44ff44' : '#ff4444'
          }}>
            {alert.message}
          </div>
        )}

        {/* Subscriptions Section */}
        <div className="subscriptions-section" style={{
          background: 'var(--eerie-black-2)',
          padding: '30px',
          borderRadius: '10px',
          marginBottom: '30px'
        }}>
          <div className="subscriptions-header" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            paddingBottom: '15px',
            borderBottom: '2px solid var(--gold-crayola)'
          }}>
            <h2 style={{
              color: 'var(--gold-crayola)',
              fontFamily: 'var(--fontFamily-forum)',
              fontSize: 'var(--fontSize-headline-2)'
            }}>
              Newsletter Subscriptions
            </h2>
            <button
              onClick={refreshSubscriptions}
              style={{
                padding: '10px 20px',
                border: '2px solid var(--gold-crayola)',
                background: 'transparent',
                color: 'var(--gold-crayola)',
                cursor: 'pointer',
                borderRadius: '5px',
                fontWeight: 'bold',
                fontSize: 'var(--fontSize-label-2)',
                fontFamily: 'var(--fontFamily-dm_sans)'
              }}
            >
              Refresh
            </button>
          </div>
          <div id="subscriptions-container">
            {subscriptions.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--quick-silver)' }}>
                No subscriptions found. Subscriptions will appear here when users subscribe to the newsletter.
              </div>
            ) : (
              [...subscriptions].sort((a, b) => {
                const dateA = new Date(a.timestamp || 0);
                const dateB = new Date(b.timestamp || 0);
                return dateB - dateA;
              }).map((subscription, index) => {
                const subscribedDate = subscription.timestamp ? formatDate(subscription.timestamp) : 'N/A';
                return (
                  <div
                    key={subscription.id || index}
                    style={{
                      background: 'var(--smoky-black-2)',
                      padding: '20px',
                      borderRadius: '8px',
                      border: '1px solid var(--white-alpha-10)',
                      marginBottom: '15px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '15px'
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{
                        color: 'var(--white)',
                        fontFamily: 'var(--fontFamily-forum)',
                        fontSize: 'var(--fontSize-title-3)',
                        marginBottom: '5px'
                      }}>
                        {subscription.email}
                      </div>
                      <div style={{
                        color: 'var(--quick-silver)',
                        fontSize: 'var(--fontSize-label-2)'
                      }}>
                        Subscribed: {subscribedDate}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteSubscription(subscription.id)}
                      style={{
                        padding: '10px 20px',
                        border: '2px solid #ff4444',
                        background: 'transparent',
                        color: '#ff4444',
                        cursor: 'pointer',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        fontSize: 'var(--fontSize-label-2)'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Bookings Section */}
        <div className="bookings-section" style={{
          background: 'var(--eerie-black-2)',
          padding: '30px',
          borderRadius: '10px',
          marginBottom: '30px'
        }}>
          <div className="bookings-header" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            paddingBottom: '15px',
            borderBottom: '2px solid var(--gold-crayola)'
          }}>
            <h2 style={{
              color: 'var(--gold-crayola)',
              fontFamily: 'var(--fontFamily-forum)',
              fontSize: 'var(--fontSize-headline-2)'
            }}>
              Booking Details
            </h2>
            <button
              onClick={refreshBookings}
              style={{
                padding: '10px 20px',
                border: '2px solid var(--gold-crayola)',
                background: 'transparent',
                color: 'var(--gold-crayola)',
                cursor: 'pointer',
                borderRadius: '5px',
                fontWeight: 'bold',
                fontSize: 'var(--fontSize-label-2)',
                fontFamily: 'var(--fontFamily-dm_sans)'
              }}
            >
              Refresh Bookings
            </button>
          </div>
          <div id="bookings-container">
            {sortedBookings.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--quick-silver)' }}>
                No bookings found. Bookings will appear here when customers make reservations.
              </div>
            ) : (
              sortedBookings.map((booking, index) => {
                const isProcessed = booking.processed || false;
                const bookingDate = booking.date ? formatDate(booking.date) : 'N/A';
                const bookingTime = booking.time ? formatTime(booking.time) : 'N/A';
                const submittedDate = booking.timestamp || booking.createdAt ? formatDate(booking.timestamp || booking.createdAt) : 'N/A';
                const isExpanded = expandedBookings[index] || false;
                const guests = booking.guests ? booking.guests.replace('-person', '') : 'N/A';

                return (
                  <div
                    key={index}
                    style={{
                      background: 'var(--smoky-black-2)',
                      padding: '25px',
                      borderRadius: '8px',
                      border: `1px solid ${isProcessed ? 'var(--gold-crayola)' : 'var(--white-alpha-10)'}`,
                      marginBottom: '20px',
                      opacity: isProcessed ? 0.6 : 1
                    }}
                  >
                    {/* Highlighted Info: Name, Date, Persons */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '15px',
                      flexWrap: 'wrap',
                      gap: '15px',
                      padding: '15px',
                      background: 'var(--eerie-black-1)',
                      borderRadius: '8px',
                      border: '2px solid var(--gold-crayola)'
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          color: 'var(--gold-crayola)',
                          fontFamily: 'var(--fontFamily-forum)',
                          fontSize: 'var(--fontSize-title-2)',
                          fontWeight: 'bold',
                          marginBottom: '10px'
                        }}>
                          {booking.name || 'N/A'}
                        </div>
                        <div style={{
                          display: 'flex',
                          gap: '20px',
                          flexWrap: 'wrap'
                        }}>
                          <div>
                            <div style={{
                              color: 'var(--quick-silver)',
                              fontSize: 'var(--fontSize-label-2)',
                              textTransform: 'uppercase',
                              marginBottom: '5px'
                            }}>
                              Date
                            </div>
                            <div style={{
                              color: 'var(--gold-crayola)',
                              fontSize: 'var(--fontSize-body-3)',
                              fontWeight: 'bold'
                            }}>
                              {bookingDate}
                            </div>
                          </div>
                          <div>
                            <div style={{
                              color: 'var(--quick-silver)',
                              fontSize: 'var(--fontSize-label-2)',
                              textTransform: 'uppercase',
                              marginBottom: '5px'
                            }}>
                              Persons
                            </div>
                            <div style={{
                              color: 'var(--gold-crayola)',
                              fontSize: 'var(--fontSize-body-3)',
                              fontWeight: 'bold'
                            }}>
                              {guests}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '5px 12px',
                          borderRadius: '4px',
                          fontSize: 'var(--fontSize-label-2)',
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          background: isProcessed ? 'rgba(68, 255, 68, 0.2)' : 'rgba(255, 200, 0, 0.2)',
                          color: isProcessed ? '#44ff44' : '#ffc800',
                          border: `1px solid ${isProcessed ? '#44ff44' : '#ffc800'}`
                        }}>
                          {isProcessed ? 'Processed' : 'Pending'}
                        </span>
                        {!isProcessed && (
                          <button
                            onClick={() => markBookingAsProcessed(index)}
                            style={{
                              padding: '10px 20px',
                              border: '2px solid #44ff44',
                              background: 'transparent',
                              color: '#44ff44',
                              cursor: 'pointer',
                              borderRadius: '5px',
                              fontWeight: 'bold',
                              fontSize: 'var(--fontSize-label-2)'
                            }}
                          >
                            Mark Processed
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteBooking(index)}
                          style={{
                            padding: '10px 20px',
                            border: '2px solid #ff4444',
                            background: 'transparent',
                            color: '#ff4444',
                            cursor: 'pointer',
                            borderRadius: '5px',
                            fontWeight: 'bold',
                            fontSize: 'var(--fontSize-label-2)'
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    
                    {/* Accordion for Additional Details */}
                    <div>
                      <button
                        onClick={() => setExpandedBookings({ ...expandedBookings, [index]: !isExpanded })}
                        style={{
                          width: '100%',
                          padding: '12px 20px',
                          background: 'var(--eerie-black-1)',
                          border: '1px solid var(--white-alpha-10)',
                          color: 'var(--gold-crayola)',
                          cursor: 'pointer',
                          borderRadius: '5px',
                          fontWeight: 'bold',
                          fontSize: 'var(--fontSize-label-1)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <span>View Details</span>
                        <span style={{ fontSize: '1.2rem' }}>{isExpanded ? '−' : '+'}</span>
                      </button>
                      {isExpanded && (
                        <div style={{
                          marginTop: '15px',
                          padding: '20px',
                          background: 'var(--eerie-black-1)',
                          borderRadius: '8px',
                          border: '1px solid var(--white-alpha-10)'
                        }}>
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '15px',
                            marginBottom: '15px'
                          }}>
                            <div>
                              <div style={{
                                color: 'var(--gold-crayola)',
                                fontSize: 'var(--fontSize-label-2)',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                marginBottom: '5px'
                              }}>
                                Phone
                              </div>
                              <div style={{ color: 'var(--white)', fontSize: 'var(--fontSize-body-4)' }}>
                                {booking.phone || 'N/A'}
                              </div>
                            </div>
                            <div>
                              <div style={{
                                color: 'var(--gold-crayola)',
                                fontSize: 'var(--fontSize-label-2)',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                marginBottom: '5px'
                              }}>
                                Email
                              </div>
                              <div style={{ color: 'var(--white)', fontSize: 'var(--fontSize-body-4)' }}>
                                {booking.email || 'N/A'}
                              </div>
                            </div>
                            <div>
                              <div style={{
                                color: 'var(--gold-crayola)',
                                fontSize: 'var(--fontSize-label-2)',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                marginBottom: '5px'
                              }}>
                                Time
                              </div>
                              <div style={{ color: 'var(--white)', fontSize: 'var(--fontSize-body-4)' }}>
                                {bookingTime}
                              </div>
                            </div>
                            <div>
                              <div style={{
                                color: 'var(--gold-crayola)',
                                fontSize: 'var(--fontSize-label-2)',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                marginBottom: '5px'
                              }}>
                                Submitted
                              </div>
                              <div style={{ color: 'var(--white)', fontSize: 'var(--fontSize-body-4)' }}>
                                {submittedDate}
                              </div>
                            </div>
                          </div>
                          {booking.message && (
                            <div style={{ marginTop: '15px' }}>
                              <div style={{
                                color: 'var(--gold-crayola)',
                                fontSize: 'var(--fontSize-label-2)',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                marginBottom: '5px'
                              }}>
                                Special Requests
                              </div>
                              <div style={{ color: 'var(--quick-silver)', fontStyle: 'italic' }}>
                                {booking.message}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Add Section Button */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <button
            onClick={() => setShowSectionModal(true)}
            style={{
              padding: '10px 20px',
              background: 'var(--gold-crayola)',
              color: 'var(--black)',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: 'var(--fontSize-label-2)'
            }}
          >
            Add New Section
          </button>
        </div>

        {/* Menu Sections */}
        {menuData.sections?.map((section) => {
          const allItems = getSectionItems(section);
          return (
            <div key={section.id} style={{
              background: 'var(--eerie-black-2)',
              padding: '30px',
              borderRadius: '10px',
              marginBottom: '30px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                paddingBottom: '15px',
                borderBottom: '2px solid var(--gold-crayola)'
              }}>
                <h2 style={{
                  color: 'var(--gold-crayola)',
                  fontFamily: 'var(--fontFamily-forum)',
                  fontSize: 'var(--fontSize-headline-2)'
                }}>
                  {section.name}
                </h2>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => openAddItemModal(section.id)}
                    style={{
                      padding: '10px 20px',
                      border: '2px solid #44ff44',
                      background: 'transparent',
                      color: '#44ff44',
                      cursor: 'pointer',
                      borderRadius: '5px',
                      fontWeight: 'bold',
                      fontSize: 'var(--fontSize-label-2)'
                    }}
                  >
                    Add
                  </button>
                  <button
                    onClick={() => handleDeleteSection(section.id)}
                    style={{
                      padding: '10px 20px',
                      border: '2px solid #ff4444',
                      background: 'transparent',
                      color: '#ff4444',
                      cursor: 'pointer',
                      borderRadius: '5px',
                      fontWeight: 'bold',
                      fontSize: 'var(--fontSize-label-2)'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div style={{ display: 'grid', gap: '20px' }}>
                {allItems.length === 0 ? (
                  <p style={{ color: 'var(--quick-silver)', textAlign: 'center', padding: '20px' }}>
                    No items in this section
                  </p>
                ) : (
                  allItems.map((item) => {
                    const imageSrc = item.imageData || item.image || '/assets/images/menu-1.png';
                    return (
                      <div
                        key={item.id}
                        style={{
                          background: 'var(--smoky-black-2)',
                          padding: '20px',
                          borderRadius: '8px',
                          border: item.isSpecialDish ? '2px solid var(--gold-crayola)' : '1px solid var(--white-alpha-10)'
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          gap: '15px',
                          marginBottom: '15px',
                          alignItems: 'flex-start'
                        }}>
                          <Image
                            src={imageSrc}
                            alt={item.name}
                            width={100}
                            height={100}
                            style={{
                              borderRadius: '5px',
                              border: '1px solid var(--white-alpha-10)',
                              objectFit: 'cover',
                              flexShrink: 0
                            }}
                            unoptimized
                          />
                          <div style={{ flex: 1 }}>
                            <h3 style={{
                              color: 'var(--white)',
                              fontFamily: 'var(--fontFamily-forum)',
                              fontSize: 'var(--fontSize-title-3)',
                              marginBottom: '10px'
                            }}>
                              {item.name}
                              {item.isSpecialDish && (
                                <span style={{
                                  background: 'var(--gold-crayola)',
                                  color: 'var(--black)',
                                  padding: '4px 10px',
                                  borderRadius: '4px',
                                  fontSize: '0.9rem',
                                  fontWeight: 'bold',
                                  marginLeft: '10px'
                                }}>
                                  ⭐ Special
                                </span>
                              )}
                            </h3>
                            <p style={{ color: 'var(--quick-silver)', marginBottom: '10px' }}>
                              {item.description || 'No description'}
                            </p>
                            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
                              <span style={{
                                color: 'var(--gold-crayola)',
                                fontSize: '1.8rem',
                                fontWeight: 'bold'
                              }}>
                                ₹{item.price || 0}
                              </span>
                              {item.badge && (
                                <span style={{
                                  background: 'var(--gold-crayola)',
                                  color: 'var(--black)',
                                  padding: '4px 10px',
                                  borderRadius: '4px',
                                  fontSize: '0.9rem'
                                }}>
                                  {item.badge}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div style={{
                          display: 'flex',
                          gap: '10px',
                          justifyContent: 'flex-end',
                          paddingTop: '15px',
                          borderTop: '1px solid var(--white-alpha-10)'
                        }}>
                          <button
                            onClick={() => openEditItemModal(section.id, item.id)}
                            style={{
                              padding: '10px 20px',
                              border: '2px solid var(--gold-crayola)',
                              background: 'transparent',
                              color: 'var(--gold-crayola)',
                              cursor: 'pointer',
                              borderRadius: '5px',
                              fontWeight: 'bold',
                              fontSize: 'var(--fontSize-label-2)'
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteItem(section.id, item.id)}
                            style={{
                              padding: '10px 20px',
                              border: '2px solid #ff4444',
                              background: 'transparent',
                              color: '#ff4444',
                              cursor: 'pointer',
                              borderRadius: '5px',
                              fontWeight: 'bold',
                              fontSize: 'var(--fontSize-label-2)'
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Section Modal */}
      {showSectionModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'var(--black-alpha-80)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => setShowSectionModal(false)}
        >
          <div
            style={{
              background: 'var(--eerie-black-2)',
              padding: '30px',
              borderRadius: '10px',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              paddingBottom: '15px',
              borderBottom: '2px solid var(--gold-crayola)'
            }}>
              <h2 style={{
                color: 'var(--gold-crayola)',
                fontFamily: 'var(--fontFamily-forum)',
                fontSize: 'var(--fontSize-headline-2)'
              }}>
                Add New Section
              </h2>
              <button
                onClick={() => setShowSectionModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--white)',
                  fontSize: '2rem',
                  cursor: 'pointer',
                  padding: 0,
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleAddSection}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  color: 'var(--gold-crayola)',
                  marginBottom: '8px',
                  fontWeight: 'bold',
                  fontSize: 'var(--fontSize-label-1)'
                }}>
                  Section Name
                </label>
                <input
                  type="text"
                  name="sectionName"
                  required
                  placeholder="e.g., Beverages Menu"
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'var(--eerie-black-1)',
                    border: '1px solid var(--white-alpha-10)',
                    color: 'var(--white)',
                    borderRadius: '5px',
                    fontSize: 'var(--fontSize-body-4)'
                  }}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  color: 'var(--gold-crayola)',
                  marginBottom: '8px',
                  fontWeight: 'bold',
                  fontSize: 'var(--fontSize-label-1)'
                }}>
                  Section ID (lowercase, no spaces)
                </label>
                <input
                  type="text"
                  name="sectionId"
                  required
                  placeholder="e.g., beverages"
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'var(--eerie-black-1)',
                    border: '1px solid var(--white-alpha-10)',
                    color: 'var(--white)',
                    borderRadius: '5px',
                    fontSize: 'var(--fontSize-body-4)'
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="submit"
                  style={{
                    padding: '10px 20px',
                    border: '2px solid #44ff44',
                    background: 'transparent',
                    color: '#44ff44',
                    cursor: 'pointer',
                    borderRadius: '5px',
                    fontWeight: 'bold',
                    fontSize: 'var(--fontSize-label-2)'
                  }}
                >
                  Add Section
                </button>
                <button
                  type="button"
                  onClick={() => setShowSectionModal(false)}
                  style={{
                    padding: '10px 20px',
                    border: '2px solid var(--gold-crayola)',
                    background: 'transparent',
                    color: 'var(--gold-crayola)',
                    cursor: 'pointer',
                    borderRadius: '5px',
                    fontWeight: 'bold',
                    fontSize: 'var(--fontSize-label-2)'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add/Edit Item Modal */}
      {showItemModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'var(--black-alpha-80)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => {
            setShowItemModal(false);
            setUploadedImageData(null);
          }}
        >
          <div
            style={{
              background: 'var(--eerie-black-2)',
              padding: '30px',
              borderRadius: '10px',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              paddingBottom: '15px',
              borderBottom: '2px solid var(--gold-crayola)'
            }}>
              <h2 style={{
                color: 'var(--gold-crayola)',
                fontFamily: 'var(--fontFamily-forum)',
                fontSize: 'var(--fontSize-headline-2)'
              }}>
                {editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
              </h2>
              <button
                onClick={() => {
                  setShowItemModal(false);
                  setUploadedImageData(null);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--white)',
                  fontSize: '2rem',
                  cursor: 'pointer',
                  padding: 0,
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSaveItem}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  color: 'var(--gold-crayola)',
                  marginBottom: '8px',
                  fontWeight: 'bold',
                  fontSize: 'var(--fontSize-label-1)'
                }}>
                  Item Name
                </label>
                <input
                  type="text"
                  required
                  value={itemFormData.name}
                  onChange={(e) => setItemFormData({ ...itemFormData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'var(--eerie-black-1)',
                    border: '1px solid var(--white-alpha-10)',
                    color: 'var(--white)',
                    borderRadius: '5px',
                    fontSize: 'var(--fontSize-body-4)'
                  }}
                />
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginBottom: '20px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    color: 'var(--gold-crayola)',
                    marginBottom: '8px',
                    fontWeight: 'bold',
                    fontSize: 'var(--fontSize-label-1)'
                  }}>
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    step="1"
                    required
                    value={itemFormData.price}
                    onChange={(e) => setItemFormData({ ...itemFormData, price: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'var(--eerie-black-1)',
                      border: '1px solid var(--white-alpha-10)',
                      color: 'var(--white)',
                      borderRadius: '5px',
                      fontSize: 'var(--fontSize-body-4)'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    color: 'var(--gold-crayola)',
                    marginBottom: '8px',
                    fontWeight: 'bold',
                    fontSize: 'var(--fontSize-label-1)'
                  }}>
                    Badge (optional)
                  </label>
                  <select
                    value={itemFormData.badge}
                    onChange={(e) => setItemFormData({ ...itemFormData, badge: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'var(--eerie-black-1)',
                      border: '1px solid var(--white-alpha-10)',
                      color: 'var(--white)',
                      borderRadius: '5px',
                      fontSize: 'var(--fontSize-body-4)'
                    }}
                  >
                    <option value="">None</option>
                    <option value="Popular">Popular</option>
                    <option value="New">New</option>
                    <option value="Seasonal">Seasonal</option>
                    <option value="Chef's Choice">Chef's Choice</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Spicy">Spicy</option>
                    <option value="Premium">Premium</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Signature">Signature</option>
                    <option value="Fresh">Fresh</option>
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  color: 'var(--gold-crayola)',
                  marginBottom: '8px',
                  fontWeight: 'bold',
                  fontSize: 'var(--fontSize-label-1)'
                }}>
                  Description
                </label>
                <textarea
                  required
                  value={itemFormData.description}
                  onChange={(e) => setItemFormData({ ...itemFormData, description: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'var(--eerie-black-1)',
                    border: '1px solid var(--white-alpha-10)',
                    color: 'var(--white)',
                    borderRadius: '5px',
                    fontSize: 'var(--fontSize-body-4)',
                    minHeight: '80px',
                    resize: 'vertical'
                  }}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  color: 'var(--gold-crayola)',
                  marginBottom: '8px',
                  fontWeight: 'bold',
                  fontSize: 'var(--fontSize-label-1)'
                }}>
                  Image
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontSize: 'var(--fontSize-label-2)',
                      color: 'var(--quick-silver)'
                    }}>
                      Upload Image (or select from default)
                    </label>
                    <input
                      type="file"
                      id="item-image-upload"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{
                        width: '100%',
                        padding: '10px',
                        background: 'var(--eerie-black-1)',
                        border: '1px solid var(--white-alpha-10)',
                        color: 'var(--white)',
                        borderRadius: '5px',
                        fontSize: 'var(--fontSize-body-4)'
                      }}
                    />
                    {uploadedImageData && (
                      <div style={{ marginTop: '10px' }}>
                        <Image
                          src={uploadedImageData}
                          alt="Preview"
                          width={200}
                          height={200}
                          style={{
                            maxWidth: '200px',
                            maxHeight: '200px',
                            borderRadius: '5px',
                            border: '2px solid var(--gold-crayola)'
                          }}
                          unoptimized
                        />
                        <button
                          type="button"
                          onClick={clearImageUpload}
                          style={{
                            marginTop: '10px',
                            padding: '8px 15px',
                            border: '2px solid #ff4444',
                            background: 'transparent',
                            color: '#ff4444',
                            cursor: 'pointer',
                            borderRadius: '5px',
                            fontWeight: 'bold',
                            fontSize: 'var(--fontSize-label-2)'
                          }}
                        >
                          Remove Image
                        </button>
                      </div>
                    )}
                  </div>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontSize: 'var(--fontSize-label-2)',
                      color: 'var(--quick-silver)'
                    }}>
                      Or Select Default Image
                    </label>
                    <select
                      value={itemFormData.image}
                      onChange={(e) => setItemFormData({ ...itemFormData, image: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: 'var(--eerie-black-1)',
                        border: '1px solid var(--white-alpha-10)',
                        color: 'var(--white)',
                        borderRadius: '5px',
                        fontSize: 'var(--fontSize-body-4)'
                      }}
                    >
                      <option value="/assets/images/menu-1.png">Menu Image 1</option>
                      <option value="/assets/images/menu-2.png">Menu Image 2</option>
                      <option value="/assets/images/menu-3.png">Menu Image 3</option>
                      <option value="/assets/images/menu-4.png">Menu Image 4</option>
                      <option value="/assets/images/menu-5.png">Menu Image 5</option>
                      <option value="/assets/images/menu-6.png">Menu Image 6</option>
                    </select>
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    checked={itemFormData.isSpecialDish}
                    onChange={(e) => setItemFormData({ ...itemFormData, isSpecialDish: e.target.checked })}
                    style={{
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer',
                      accentColor: 'var(--gold-crayola)'
                    }}
                  />
                  <span>Mark as Special Dish</span>
                </label>
                <p style={{
                  color: 'var(--quick-silver)',
                  fontSize: 'var(--fontSize-label-2)',
                  marginTop: '5px',
                  fontStyle: 'italic'
                }}>
                  Special dishes will be highlighted on the menu
                </p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="submit"
                  style={{
                    padding: '10px 20px',
                    border: '2px solid #44ff44',
                    background: 'transparent',
                    color: '#44ff44',
                    cursor: 'pointer',
                    borderRadius: '5px',
                    fontWeight: 'bold',
                    fontSize: 'var(--fontSize-label-2)'
                  }}
                >
                  Save Item
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowItemModal(false);
                    setUploadedImageData(null);
                  }}
                  style={{
                    padding: '10px 20px',
                    border: '2px solid var(--gold-crayola)',
                    background: 'transparent',
                    color: 'var(--gold-crayola)',
                    cursor: 'pointer',
                    borderRadius: '5px',
                    fontWeight: 'bold',
                    fontSize: 'var(--fontSize-label-2)'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '50px',
            height: '50px',
            background: 'var(--gold-crayola)',
            color: 'var(--black)',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            zIndex: 999,
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
          }}
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
}
