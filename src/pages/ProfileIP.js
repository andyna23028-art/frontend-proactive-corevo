import React, { useState, useEffect, useRef } from "react";
import AppNavbar from '../components/Navbar';
import { useNavigate } from "react-router-dom"; // ✅ IMPORT useNavigate
import '../styles/ProfileIP.css'; 

// Import SVG icons for personal info
import PhoneIcon from '../icons/phone.svg';
import GmailIcon from '../icons/gmail.svg';

import KalenderIcon from '../icons/kalender.svg';
import LocationIcon from '../icons/location.svg';

// Import kalender icon for all meta icons
import kalenderIcon from '../icons/kalender.svg';
import lokasiIcon from '../icons/location.svg';
import departemenIcon from '../icons/people.svg';

// Data Awal untuk Profil
const initialProfileData = {
    name: "Mina Muadi",
    position: "Human Resource Staff",
    department: "Human Resource",
    location: "Surabaya",
    joinedDate: "10/02/2023",
    bio: "Passionate human resource development with 5+ years of experience in building environment. Love collaborating with teams and mentoring junior HR staff.",
    employeeId: "EMP-2024-0156",
    email: "minamuadi@admin.com",
    phone: "081456789110",
    dob: "20/05/1990",
    manager: "Anna Horan",
    dateJoinedWork: "10/02/2024",
};

// --- COMPONENTS ---
// Component Pembantu (Menggunakan ClassName)
const ProfileInfoItem = ({ label, icon, value, name, isEditing, onChange }) => (
    <div className="info-item">
        <div className="info-label">
            {icon && <span style={{ marginRight: "5px" }}>{icon}</span>}
            <span>{label}</span>
        </div>

        {isEditing && name ? (
            <input
                type="text"
                name={name}
                value={value || ""}
                onChange={onChange}
                className="info-input"
            />
        ) : (
            <p className="info-value">{value}</p>
        )}
    </div>
);

// Component Notifikasi (Menggunakan ClassName)
const NotificationBox = ({ message, type }) => {
    if (!message) return null;

    const className = `notification-base notification-${type}`;

    return (
        <div className={className}>
            <span className="notification-icon">
                {type === "success" ? "✔" : "✘"}
            </span>
            <div>
                <p className="notification-message">{message}</p>
                {type === "success" && (
                    <p className="notification-sub-message-success">
                        Your changes has been saved
                    </p>
                )}
            </div>
        </div>
    );
};

// Component Konfirmasi Logout
const ConfirmationModal = ({ show, onConfirm, onCancel, modalRef }) => {
    if (!show) return null;

    return (
        <div className="confirmation-modal" ref={modalRef}>
            <div className="modal-header">Are you sure?</div>
            <div className="modal-body">
                Do you really want to log out from your account?
            </div>
            <div className="modal-actions">
                <button 
                    className="btn-base btn-secondary" 
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button 
                    className="btn-base btn-danger" 
                    onClick={onConfirm}
                >
                    Log Out
                </button>
            </div>
        </div>
    );
};


// --- MAIN COMPONENT ---
const ProfileIP = () => {
    // 🌟 INIT useNavigate
    const navigate = useNavigate(); 
    
    const [activeTab, setActiveTab] = useState("personal");
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState(initialProfileData);
    const [tempProfileData, setTempProfileData] = useState({});
    const [notification, setNotification] = useState(null);
    
    const [showLogoutModal, setShowLogoutModal] = useState(false); 
    const logoutButtonRef = useRef(null);
    const modalRef = useRef(null);

    useEffect(() => {
        if (isEditing) setTempProfileData(profileData);
    }, [isEditing, profileData]);

    // Handle klik di luar modal untuk menutupnya
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showLogoutModal && 
                logoutButtonRef.current && 
                !logoutButtonRef.current.contains(event.target) && 
                modalRef.current && 
                !modalRef.current.contains(event.target)) {
                
                setShowLogoutModal(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showLogoutModal]); 

    const handleEditClick = () => {
        setIsEditing(true);
        setShowLogoutModal(false); 
        setNotification(null);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setNotification({ message: "Changes discarded", type: "error" });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleSaveClick = () => {
        setProfileData(tempProfileData);
        setIsEditing(false);
        setNotification({ message: "Profile Updated Successfully!", type: "success" });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTempProfileData((prev) => ({ ...prev, [name]: value }));
    };
    
    // Logika Toggle Modal Logout
    const handleLogout = () => {
        setShowLogoutModal(prev => !prev);
    };

    // 🌟 LOGIKA UTAMA LOGOUT DAN REDIRECT
    const confirmLogout = () => {
        setShowLogoutModal(false);
        
        // Logika Log Out di sini (misalnya, menghapus token sesi)
        console.log("User logged out."); 
        
        // 🔥 PERBAIKAN: Menggunakan '/' yang merupakan path untuk <LandingPage /> di App.js
        navigate('/'); 
    };

    const displayData = isEditing ? tempProfileData : profileData;

    return (
        <div className="page-container">
            <AppNavbar isLoggedIn={true} activePage="Profile" />
            <div className="wrapper profile-wrapper-custom">
                {/* Header */}
                <section className="header header-custom">
                    <h1 className="h1 profile-title-custom">My Profile</h1>
                    <p className="p-header profile-desc-custom">Manage your personal information and preferences</p>
                </section>

                {/* Profile Card */}
                <section className="profile-card profile-card-custom">
                    <div className="profile-left profile-left-custom">
                        <div className="avatar-large avatar-large-custom">
                            <img
                                src={require("../images/woman.png")}
                                alt={displayData.name}
                                className="avatar-img avatar-img-custom"
                            />
                            {isEditing && <div className="upload-icon">📸</div>}
                        </div>
                        <div
                            className="emp-badge"
                            style={{ backgroundColor: "#EBF4FF", color: "#424242" }}
                            >
                            {displayData.employeeId}
                            </div>
                    </div>
                    <div className="profile-main profile-main-custom">
                        <div className="profile-headline profile-headline-custom">
                            <h2 className="profile-name profile-name-custom">{displayData.name}</h2>
                            <p className="profile-position profile-position-custom">{displayData.position}</p>
                        </div>
                        <div className="profile-meta profile-meta-custom">
                            <div className="profile-meta-item profile-meta-item-custom">
                                {displayData.department && <span className="icon-meta"><img src={departemenIcon} alt="icon" style={{width: 18, height: 18, verticalAlign: 'middle'}} /></span>} {displayData.department}
                            </div>
                            <div className="profile-meta-item profile-meta-item-custom">
                                {displayData.location && <span className="icon-meta"><img src={lokasiIcon} alt="icon" style={{width: 18, height: 18, verticalAlign: 'middle'}} /></span>} {displayData.location}
                            </div>
                            <div className="profile-meta-item profile-meta-item-custom">
                                {displayData.joinedDate && <span className="icon-meta"><img src={kalenderIcon} alt="icon" style={{width: 18, height: 18, verticalAlign: 'middle'}} /></span>} Joined {displayData.joinedDate}
                            </div>
                        </div>
                        <p className="profile-bio profile-bio-custom">{displayData.bio}</p>
                    </div>
                    {/* Profile Actions */}
                    <div className="profile-actions profile-actions-custom">
                        {isEditing ? (
                            <>
                                <button className="btn-base btn-secondary" onClick={handleCancelClick}>
                                    Cancel
                                </button>
                                <button className="btn-base btn-primary" onClick={handleSaveClick}>
                                    Save Changes
                                </button>
                            </>
                        ) : (
                            <>
                                <button className="btn-base btn-primary btn-edit-custom" onClick={handleEditClick}>
                                    Edit Profile
                                </button>
                                <div style={{ position: 'relative' }}>
                                    <button className="btn-base btn-secondary btn-logout-custom" onClick={handleLogout} ref={logoutButtonRef}>
                                        Log Out
                                    </button>
                                    <ConfirmationModal 
                                        show={showLogoutModal} 
                                        onConfirm={confirmLogout} 
                                        onCancel={() => setShowLogoutModal(false)}
                                        modalRef={modalRef} 
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </section>

                {/* Custom Toggle Tabs */}
                <section className="profile-toggle-tabs profile-toggle-tabs-custom">
                    <div className="toggle-pill-bg toggle-pill-bg-custom">
                        <button
                            className={`toggle-btn toggle-btn-custom ${activeTab === "personal" ? "toggle-btn-active toggle-btn-active-custom" : ""}`}
                            onClick={() => setActiveTab("personal")}
                        >
                            Personal Info
                        </button>
                        <button
                            className={`toggle-btn toggle-btn-custom ${activeTab === "work" ? "toggle-btn-active toggle-btn-active-custom" : ""}`}
                            onClick={() => setActiveTab("work")}
                        >
                            Work Details
                        </button>
                    </div>
                </section>

                {/* Konten Tab */}
                {activeTab === "personal" && (
                    <section className="info-card info-card-custom" style={{ border: '1px solid #2196f3', borderRadius: '20px', padding: '32px', maxWidth: 900, marginLeft: 0, marginRight: 'auto' }}>
                        <h3 className="info-title info-title-custom" style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 18, textAlign: 'left' }}>Personal Information</h3>
                        <div className="personal-info-grid" style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '20px 0',
                            justifyItems: 'start',
                            textAlign: 'left',
                            marginLeft: 0,
                        }}>
                            {/* Email */}
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                <img src={GmailIcon} alt="Email" style={{ width: 22, height: 22, marginTop: 2 }} />
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: 2 }}>Email Address</div>
                                    <div style={{ color: '#757575', fontSize: '0.97rem' }}>{displayData.email}</div>
                                </div>
                            </div>
                            {/* Phone */}
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                <img src={PhoneIcon} alt="Phone" style={{ width: 22, height: 22, marginTop: 2 }} />
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: 2 }}>Phone Number</div>
                                    <div style={{ color: '#757575', fontSize: '0.97rem' }}>{displayData.phone}</div>
                                </div>
                            </div>
                            {/* Date of Birth */}
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                <img src={KalenderIcon} alt="Date of Birth" style={{ width: 22, height: 22, marginTop: 2 }} />
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: 2 }}>Date of Birth</div>
                                    <div style={{ color: '#757575', fontSize: '0.97rem' }}>{displayData.dob}</div>
                                </div>
                            </div>
                            {/* Location */}
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                <img src={LocationIcon} alt="Location" style={{ width: 22, height: 22, marginTop: 2 }} />
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: 2 }}>Location</div>
                                    <div style={{ color: '#757575', fontSize: '0.97rem' }}>{displayData.location}</div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {activeTab === "work" && (
                    <section className="info-card info-card-custom">
                        <h3 className="info-title info-title-custom">Work Details</h3>
                        <div className="info-grid info-grid-custom">
                            <ProfileInfoItem label="Job Title" value={displayData.position} name="position" isEditing={isEditing} onChange={handleInputChange} />
                            <ProfileInfoItem label="Department" value={displayData.department} name="department" isEditing={isEditing} onChange={handleInputChange} />
                            <ProfileInfoItem label="Manager" value={displayData.manager} name="manager" isEditing={isEditing} onChange={handleInputChange} />
                            <ProfileInfoItem label="Date Joined" value={displayData.dateJoinedWork} name="dateJoinedWork" isEditing={isEditing} onChange={handleInputChange} />
                        </div>
                    </section>
                )}
            </div>
            <NotificationBox message={notification?.message} type={notification?.type} />
        </div>
    );
};

export default ProfileIP;