import React, { useState } from "react";
import { Container, Button, Card, Row, Col, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Clock, People, CalendarCheck, Lightbulb } from "react-bootstrap-icons";
import AppNavbar from "../components/Navbar";
import FormModal from "../components/FormModal"; 
import CreateFunSessionModal from "../components/CreateFunSessionModal"; 
import "../styles/FunSession.css"; 

// Data dummy
const SESSIONS = [
    {
        id: 1,
        title: "Mind Stretch",
        description: "Take a short break to clear your mind and boost your creativity.",
        time: "Today, 3:00 PM",
        duration: "40 min",
        participants: 30,
        host: "Admin",
        type: "upcoming",
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
    // ... (kode SessionDetailSidebar tidak berubah) ...
    if (!session || session.type !== 'past') return null;

    return (
        <Col className="ps-4">
            <div className="border border-primary rounded-3 p-3 h-5 mb-4">
                <p className="text-dark small mb-4" style={{ whiteSpace: 'pre-wrap' }}>
                    {session.detailText}
                </p>
            </div>

            <div className="border border-primary rounded-3 p-3 h-10">
                <h6 className="fw-semibold mb-2 border-bottom pb-1">Fun Session Recap</h6>
                <p className="text-dark small mb-4" style={{ whiteSpace: 'pre-wrap' }}>{session.recap}</p>
                <h6 className="fw-semibold mb-2 border-bottom pb-1">Feedback</h6>
                <p className="text-dark small mb-4" style={{ whiteSpace: 'pre-wrap' }}>{session.feedback}</p>
            </div>
        </Col>
    );
};



// --- Komponen Card Sesi ---
const SessionCard = ({ session, onViewDetails, isSelected }) => {
    // ... (kode SessionCard tidak berubah) ...
    const buttonText = session.type === "upcoming" ? "Start Session" : (isSelected ? "Hide Details" : "View Details");

    const handleButtonClick = () => {
        if (session.type === "past") {
            onViewDetails(session.id);
        }
    };

    return (
        <Card className={`shadow-sm fun-card border-0`}>
            <Card.Body className="p-4">
                <Row>
                    <Col xs="auto" className="pe-0">
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
                        as={session.type === "upcoming" ? Link : 'button'}
                        to={session.type === "upcoming" ? "/funsession/hrd-dashboard" : undefined}
                        size="sm"
                        className="fun-start-btn fw-semibold"
                        variant={session.type === "upcoming" ? "warning" : "outline-primary"}
                    >
                        {buttonText}
                    </Button>

                </div>
                
            </Card.Body>
        </Card>
    );
};

export default function FunSession() {
    const [filter, setFilter] = useState("upcoming");
    const [sessions, setSessions] = useState(SESSIONS); // State untuk menyimpan daftar sesi
    const [showCreateModal, setShowCreateModal] = useState(false);

    const [selectedPastSessionId, setSelectedPastSessionId] = useState(null); 

    const handleCloseCreateModal = () => setShowCreateModal(false);
    const handleShowCreateModal = () => setShowCreateModal(true);

    const handleViewDetails = (sessionId) => {
        if (selectedPastSessionId === sessionId) {
            setSelectedPastSessionId(null); 
        } else {
            setSelectedPastSessionId(sessionId);
        }
    };

    const handleSaveNewSession = (newSession) => {
        // ... Logika penyesuaian format tanggal
        const dateObj = new Date(newSession.dateTimeLocal.split('T')[0]); // Ambil hanya tanggal
        const dateFormatted = dateObj.toLocaleDateString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
        });
        
        const isToday = (dateString) => {
            const today = new Date();
            const sessionDate = new Date(dateString);
            return today.toDateString() === sessionDate.toDateString();
        }
        
        // Objek sesi yang akan ditambahkan ke daftar
        const sessionToAdd = {
            ...newSession,
            // Perhatikan: Kita menggunakan date and time dari dateTimeLocal, bukan dari newSession.date
            time: `${isToday(newSession.dateTimeLocal) ? 'Today' : dateFormatted}, ${newSession.dateTimeLocal.split('T')[1]}`, 
            duration: `${newSession.duration} min`,
            
            // Properti default:
            type: "upcoming", 
            host: "Admin", 
            participants: 0,
            recap: "N/A", 
            feedback: "N/A", 
            detailText: "Deskripsi sesi baru akan muncul di sini.", 
            
            // ID unik:
            id: Math.max(...sessions.map(s => s.id)) + 1 
        };
        
        // 🔥 BARIS PENTING YANG HILANG: PERBARUI STATE!
        setSessions(prevSessions => [sessionToAdd, ...prevSessions]);
        
        // PENTING: Karena CreateFunSessionModal sudah mengatur Toast dan menutup dirinya sendiri
        // setelah memanggil handleSave, kita tidak perlu melakukan setShowCreateModal(false) di sini.
    };

    const filteredSessions = sessions.filter(
        (session) => session.type === filter
    );

    const selectedSession = sessions.find(s => s.id === selectedPastSessionId);

    const shouldShowSidebar = selectedPastSessionId !== null && filter === 'past';
    const listColWidth = shouldShowSidebar ? 8 : 12;

    const showCreateNew = filter === "upcoming"; 

    return (
        <>
            <AppNavbar isLoggedIn={true} activePage="Fun Session" />

            <Container fluid className="mt-4 px-4 pb-5 fun-session-container">
                {/* HEADER */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h1 className="fw-bold fs-3 mb-1">Fun Session</h1>
                        <p className="text-muted mb-0">
                            Engage with your team through games and discussions
                        </p>
                    </div>

                    {showCreateNew && (
                        <Button
                            variant="primary"
                            onClick={handleShowCreateModal}
                            className="fun-create-btn px-4"
                        >
                            Create New
                        </Button>
                    )}
                </div>

                {/* TAB FILTER */}
                <div className="fun-toggle-container mb-4">
                    <div className={`fun-toggle-slider ${filter}`}></div> 
                    
                    <div 
                        className={`fun-tab-item ${filter === "upcoming" ? "active" : ""}`}
                        onClick={() => {setFilter("upcoming"); setSelectedPastSessionId(null);}}
                    >
                        Upcoming
                    </div>
                    <div 
                        className={`fun-tab-item ${filter === "past" ? "active" : ""}`}
                        onClick={() => {setFilter("past"); setSelectedPastSessionId(null);}}
                    >
                        Past Session
                    </div>
                </div>

                {/* LIST SESI */}
                <Row className="fun-content-row">
                    <Col md={listColWidth} className="fun-card-wrapper">
                        {filteredSessions.length > 0 ? (
                            filteredSessions.map((session) => (
                                <div key={session.id} className="mb-4">
                                    <SessionCard
                                        session={session}
                                        onViewDetails={handleViewDetails}
                                        isSelected={session.id === selectedPastSessionId}
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="text-muted mt-5 text-center">
                                No {filter} sessions found.
                            </p>
                        )}
                    </Col>

                    {/* Kolom Sidebar Detail (4 kolom) */}
                    {shouldShowSidebar && (
                        <SessionDetailSidebar session={selectedSession} />
                    )}
                </Row>

            </Container>
            <CreateFunSessionModal
                show={showCreateModal}
                handleClose={handleCloseCreateModal}
                handleSave={handleSaveNewSession}
            />
        </>
    );
}