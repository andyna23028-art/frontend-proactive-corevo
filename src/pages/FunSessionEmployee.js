// src/pages/FunSessionEmployee.js
import React, { useState } from "react";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; 
import { Clock, People, CalendarCheck, CheckCircleFill } from "react-bootstrap-icons"; // Tambahkan CheckCircleFill untuk ikon toast
import AppNavbar from "../components/Navbar";
// HAPUS BARIS INI: import NotificationToast from "../components/NotificationToast"; 
import "../styles/FunSession.css"; 

// Data dummy
const SESSIONS = [
    {
    id: 1,
    title: "Mind Stretch",
    description:
        "Take a short break to clear your mind and boost your creativity.",
    time: "Today, 3:00 PM",
    duration: "40 min",
    participants: 30,
    host: "Admin",
    type: "upcoming",
    // Detail tambahan untuk upcoming (walaupun tidak ditampilkan di sidebar)
    detailText: "Mind Stretch adalah sesi singkat untuk menjernihkan pikiran, meningkatkan kreativitas, dan memulihkan fokus mental Anda.",
    recap: "N/A", feedback: "N/A",
},
{
    id: 2,
    title: "Echo Room",
    description: "A safe space to express your thoughts and everything else.",
    time: "Yesterday, 3:05 PM",
    duration: "40 min",
    participants: 30,
    host: "Admin",
    type: "past",
    // Detail Past Session
    detailText: "Echo Room adalah ruang aman untuk berbagi pikiran. Sesi ini berfokus pada empati tim dan peningkatan komunikasi.",
    recap: "Sebelum sesi, sebagian besar merasa lelah. Setelah bermain 'Guess the Word', mood bergeser—85% melaporkan merasa lebih berenergi.",
    feedback: "“Ini persis yang saya butuhkan untuk mengisi ulang mood!” - Sarah. “Suka bagaimana semua orang terlibat.” - Ben.",
},
{
    id: 3,
    title: "Reflect & Grow",
    description: "Review the week and set goals for the next one.",
    time: "Last week, 10:00 AM",
    duration: "60 min",
    participants: 25,
    host: "Team Lead",
    type: "past",
    detailText: "Review the week and set goals for the next one. Fokus pada refleksi dan penetapan tujuan tim.",
    recap: "Sesi fokus pada pencapaian. 92% peserta termotivasi dan 75% menetapkan tujuan konkret untuk minggu depan.",
    feedback: "“Cara yang produktif untuk mengakhiri minggu.” - David, HR.",
},

];

// --- Komponen Sidebar Detail Sesi ---
const SessionDetailSidebar = ({ session }) => {
    // Pastikan session ada dan ini adalah sesi 'past'
    if (!session || session.type !== 'past') return null;

    return (
        <Col className="ps-4">
            
            {/* Tambahkan div pembungkus untuk border biru dan rounded corner */}
            <div className="border border-primary rounded-3 p-3 h-5 mb-4">
            {/* CARD 1: SUMMARY & RECAP */}       
                    <p className="text-dark small mb-4" style={{ whiteSpace: 'pre-wrap' }}>
                        {session.detailText}
                    </p>
            </div>

            <div className="border border-primary rounded-3 p-3 h-10">
            {/* CARD 2: FEEDBACK & PARTICIPANTS */}
            <h6 className="fw-semibold mb-2 border-bottom pb-1">Fun Session Recap</h6>
            <p className="text-dark small mb-4" style={{ whiteSpace: 'pre-wrap' }}>{session.recap}</p>
            <h6 className="fw-semibold mb-2 border-bottom pb-1">Feedback</h6>
            <p className="text-dark small mb-4" style={{ whiteSpace: 'pre-wrap' }}>{session.feedback}</p>
            </div>
        </Col>
    );
};


// --- Komponen Toast Notifikasi (Dideklarasikan di sini) ---
// Gunakan komponen ini untuk notifikasi "Joined Fun Session" (seperti image_f964c0.png)
const NotificationToast = ({ show, message }) => {
    if (!show) return null;

    return (
        <div 
            className="notification-toast"
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                backgroundColor: '#d1fae5', // Green-100 (Warna latar hijau muda)
                color: '#059669', // Green-600 (Warna teks hijau tua)
                padding: '15px 25px', // Padding lebih besar
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
            }}
        >
            <CheckCircleFill size={24} style={{ color: '#059669' }} /> {/* Ikon Centang Hijau */}
            <div>
                <p className="fw-semibold mb-0" style={{ color: '#059669' }}>{message}</p>
                <p className="small mb-0 text-muted" style={{ fontSize: '0.75rem' }}>See you there!</p>
            </div>
        </div>
    );
};
// --- END Komponen Toast Notifikasi ---

const SessionCard = ({ session, onJoin, onViewDetails }) => {
    const buttonText = session.type === "upcoming" ? "Join Session" : "View Details";
    const buttonVariant = session.type === "upcoming" ? "warning" : "outline-primary";
    
    // Tentukan apakah tombol "View Details" harus "Hide Details" (jika ID sesi ini sedang dipilih)
    const isSelected = session.type === "past" && session.id === onViewDetails.selectedId;
    const finalButtonText = isSelected ? "Hide Details" : buttonText;
    const finalButtonVariant = isSelected ? "outline-secondary" : buttonVariant;

    const handleButtonClick = () => {
        if (session.type === "upcoming") {
            // Ketika Join Session diklik, panggil onJoin
            onJoin(session.title);
        } else if (onViewDetails && onViewDetails.handler) {
            // Ketika View Details/Hide Details diklik, panggil onViewDetails
            onViewDetails.handler(session.id);
        }
    };
    
    // Tambahkan class 'selected-card' untuk highlight sesi yang detailnya terbuka
    const cardClass = isSelected ? "shadow-lg border-primary border-2" : "shadow-sm border-0";

    return (
        <Card className={`shadow-sm fun-card border-0`}>
            <Card.Body className="p-4">
                <Row>
                    <Col xs="auto" className="pe-3">
                        <div className="fun-card-icon-circle">
                            <CalendarCheck size={24} /> 
                        </div>
                    </Col>
                    <Col>
                        <h6 className="fw-semibold mb-1">{session.title}</h6>
                        <p className="text-muted small mb-3">
                           {session.description}
                        </p>
                        <div className="text-muted small">
                            <div className="d-flex align-items-center mb-1"> 
                                <CalendarCheck size={14} className="me-1" />
                                {session.time}
                            </div>
                            <div className="d-flex align-items-center mb-1">
                                <Clock size={14} className="me-1" />
                                {session.duration}
                            </div>
                            <div className="d-flex align-items-center">
                                <People size={14} className="me-1" />
                                {session.participants} participants
                            </div>
                        </div>
                    </Col>
                </Row>
                <hr className="my-3" />
                <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted small">Hosted by {session.host}</span>

                    <Button
                        onClick={handleButtonClick}
                        size="sm"
                        className="fun-start-btn fw-semibold" 
                        variant={finalButtonVariant}
                    >
                        {finalButtonText}
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default function FunSessionEmployee() {
    const [filter, setFilter] = useState("upcoming");
    const [sessions, setSessions] = useState(SESSIONS);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const navigate = useNavigate();

    const [showCreateModal, setShowCreateModal] = useState(false);
    // ✅ State baru untuk melacak ID sesi yang dipilih
      const [selectedPastSessionId, setSelectedPastSessionId] = useState(null); 
    
      // Handler untuk Sidebar (bekerja sebagai toggle)
    const handleViewDetails = (sessionId) => {
        // Toggle: Jika ID yang sama diklik, tutup sidebar
        if (selectedPastSessionId === sessionId) {
            setSelectedPastSessionId(null); 
        } else {
            setSelectedPastSessionId(sessionId);
        }
    };

    const handleJoinSession = (sessionTitle) => {
        // 1. Tampilkan notifikasi "Joined Fun Session [Nama Sesi]"
        setToastMessage(`Joined Fun Session: ${sessionTitle}`);
        setShowToast(true);

        // 2. Sembunyikan notifikasi setelah 3 detik
        setTimeout(() => {
            setShowToast(false);
        }, 3000);

        // 3. Arahkan ke halaman FunSessionWelcome setelah 0.5 detik (memberi waktu lihat toast)
        setTimeout(() => {
            navigate("/funsession/welcome"); 
        }, 500); 
    };

    const filteredSessions = sessions.filter(
        (session) => session.type === filter
    );

    // Cari sesi yang detailnya sedang dibuka
    const selectedSession = sessions.find(s => s.id === selectedPastSessionId);

    // Menentukan lebar kolom daftar sesi: 12 (penuh) atau 8 (ketika sidebar terbuka)
    // Sidebar hanya muncul jika filter 'past' dan ada ID yang dipilih
    const shouldShowSidebar = selectedPastSessionId !== null && filter === 'past';
    const listColWidth = shouldShowSidebar ? 8 : 12;

    return (
        <>
            <AppNavbar isLoggedIn={true} activePage="Fun Session" />

            <Container fluid className="mt-4 px-4 pb-5 fun-session-container">
                {/* HEADER - Tanpa tombol Create New */}
                <div className="d-flex justify-content-start align-items-center mb-4"> 
                    <div>
                        <h1 className="fw-bold fs-3 mb-1">Fun Session</h1>
                        <p className="text-muted mb-0">
                            Engage with your team through games and discussions
                        </p>
                    </div>
                </div>

                {/* TAB FILTER */}
                <div className="fun-toggle-container mb-4">
                    <div className={`fun-toggle-slider ${filter}`}></div> 
                    <div 
                        className={`fun-tab-item ${filter === "upcoming" ? "active" : ""}`}
                        onClick={() => {
                            setFilter("upcoming")
                            setSelectedPastSessionId(null);
                        }}
                    >
                        Upcoming
                    </div>
                    <div 
                        className={`fun-tab-item ${filter === "past" ? "active" : ""}`}
                        onClick={() => {
                            setFilter("past")
                            setSelectedPastSessionId(null); // Reset sidebar saat ganti tab
                        }}
                    >
                        Past Session
                    </div>
                </div>

                {/* LIST SESI */}
                <Row>
    {/* Kolom Daftar Sesi */}
    <Col lg={listColWidth}>
        <div className="fun-card-wrapper">
            {filteredSessions.length > 0 ? (
                filteredSessions.map((session) => (
                    <div key={session.id} className="mb-4">
                        <SessionCard 
                            session={session} 
                            onJoin={handleJoinSession} 
                            onViewDetails={{
                                selectedId: selectedPastSessionId,
                                handler: handleViewDetails
                            }} 
                        />
                    </div>
                ))
            ) : (
                <p className="text-muted mt-5 text-center">
                    No {filter} sessions found.
                </p>
            )}
        </div>
    </Col>

    {/* Kolom Sidebar */}
    {shouldShowSidebar && (
        <SessionDetailSidebar session={selectedSession} />
    )}
</Row>

            </Container>

            {/* Notifikasi Toast - Pastikan ini menggunakan Message yang sudah diatur */}
            <NotificationToast 
                show={showToast} 
                message={toastMessage} 
            />
        </>
    );
}