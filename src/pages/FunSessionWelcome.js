// src/pages/FunSessionWelcome.js --> employee
import React, { useState, useRef } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import AppNavbar from "../components/Navbar";
import { CheckCircleFill } from "react-bootstrap-icons";
import "../styles/FunSession.css"; 

// --- 1. IMPORT SEMUA GAMBAR EMOSI DI SINI ---
// Pastikan nama file di sini sesuai dengan nama file Anda di folder src/images/
import energeticImage from "../images/energetic.png"; 
import happyImage from "../images/happy.png";
import neutralImage from "../images/neutral.png";
import sadImage from "../images/sad.png";
import tiredImage from "../images/tired.png";
import frustratedImage from "../images/frustrated.png";


// Data Emosi/Mood
const MOODS = [
    { name: "Energetic", image: energeticImage }, 
    { name: "Happy", image: happyImage },
    { name: "Neutral", image: neutralImage },
    { name: "Sad", image: sadImage },
    { name: "Tired", image: tiredImage }, 
    { name: "Frustrated", image: frustratedImage },
];

// --- Komponen Mood Card ---
const MoodCard = ({ mood, isSelected, onClick }) => {
    return (
        // <Col xs={6} sm={4} md={4} className="mb-3 d-flex justify-content-center">
            <Card
                className={`text-center mood-card mood-card-compact ${isSelected ? "mood-selected" : ""}`}
                onClick={() => onClick(mood.name)}
                style={{ width: "120px", height: "120px" }}
            >
                <Card.Body className="p-2 d-flex flex-column align-items-center justify-content-center">
                    <div className="mood-image-wrapper mb-2">
                        <img
                            src={mood.image}
                            alt={mood.name}
                            style={{ width: "60px", height: "60px", objectFit: "contain" }}
                        />
                    </div>
                    <Card.Text className="small fw-semibold mb-0">
                        {mood.name}
                    </Card.Text>
                </Card.Body>
            </Card>
    );
};

// --- Komponen Halaman Utama ---
export default function FunSessionWelcome() {
    // Default mood diatur null atau sesuai kebutuhan, tapi di desain adalah 'Tired'
    const [selectedMood, setSelectedMood] = useState('Tired'); 
    const [showMoodToast, setShowMoodToast] = useState(false);

    // State baru untuk section "Welcome Back!"
    const [showWelcomeBack, setShowWelcomeBack] = useState(false);
    // State baru untuk mood kedua
    const [selectedMoodAfterGame, setSelectedMoodAfterGame] = useState(null);
    // State baru untuk notifikasi setelah game
    const [showThanksToast, setShowThanksToast] = useState(false);

    // Ref untuk menunjuk ke lokasi scroll
    const welcomeBackRef = useRef(null);

    const handleMoodSelect = (moodName) => {
        setSelectedMood(moodName);
        setShowMoodToast(true);
        
        // Sembunyikan notifikasi setelah 3 detik
        setTimeout(() => {
            setShowMoodToast(false);
        }, 3000);
    };

    // Fungsi baru untuk handle klik Play Games Now
    const handlePlayGamesNow = () => {
        // Asumsi: Redirect ke games platform, lalu kembali ke sini dan memicu tampilan form kedua
        // Untuk simulasi: Langsung tampilkan form kedua dan scroll
        
        // 1. Tampilkan section "Welcome Back!"
        setShowWelcomeBack(true);
        // 2. Set mood kedua menjadi null (belum memilih)
        setSelectedMoodAfterGame(null);
        // 3. Scroll ke section "Welcome Back!"
        setTimeout(() => {
            // Pengecekan current sebelum scrollIntoView
            if (welcomeBackRef.current) { 
                welcomeBackRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    };

    // Fungsi baru untuk handle pemilihan mood setelah game
    const handleMoodSelectAfterGame = (moodName) => {
        setSelectedMoodAfterGame(moodName);
    };

    // Fungsi baru untuk handle klik Done
    const handleDone = () => {
        if (!selectedMoodAfterGame) {
            alert("Please select your mood first.");
            return;
        }

        // 1. Tampilkan notifikasi "Thanks for sharing!"
        setShowThanksToast(true);

        // 2. Sembunyikan notifikasi setelah 3 detik
        setTimeout(() => {
            setShowThanksToast(false);
        }, 3000);
        
        // Opsional: Sembunyikan section "Welcome Back!" setelah selesai
        // setShowWelcomeBack(false); 
    };

    return (
        <>
            <AppNavbar isLoggedIn={true} activePage="Fun Session" />

            <Container fluid className="mt-4 px-4 pb-5">
                <h2>Welcome To Fun Session Today!</h2>
                <p>
                    Engage with your team through games and discussions
                </p>

                {/* Bagian Pemilihan Mood */}
                <div className="mood-selection-box-wrapper">
                <div className="p-4 rounded-3 shadow-sm mb-5 mood-selection-box">
                    <h5 className="fw-semibold mb-4 text-center">How Are You Feeling Today?</h5>
                    <Row className="justify-content-center">
                        {MOODS.map((mood) => (
                            <Col key={mood.name} xs={4} sm={4} md={2} className="mb-3 d-flex justify-content-center">
                            <MoodCard
                                key={mood.name}
                                mood={mood}
                                isSelected={selectedMood === mood.name}
                                onClick={handleMoodSelect}
                            />
                            </Col>
                        ))}
                    </Row>
                </div>
                </div>
                
                {/* Notifikasi Mood (Diaktifkan jika ada mood yang terpilih) */}
                {showMoodToast && selectedMood && (
                    <div 
                        className="mood-toast"
                        style={{
                            position: 'fixed',
                            bottom: '20px',
                            right: '20px',
                            backgroundColor: '#d1fae5', 
                            color: '#059669', 
                            padding: '12px 20px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            zIndex: 1000,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}
                    >
                        <CheckCircleFill size={20} />
                        <div>
                            <p className="fw-semibold mb-0">You are feeling {selectedMood.toLowerCase()} today</p>
                            <p className="small mb-0 text-muted" style={{ fontSize: '0.75rem' }}>Your mood has been recorded.</p>
                        </div>
                    </div>
                )}


                {/* Bagian Wanna Have Some Fun? */}
                <div className="text-center mt-5">
                    <h4 className="fw-bold mb-2">Wanna Have Some Fun?</h4>
                    <p className="text-muted mb-4">
                        Take a break and play some games to boost your mood!
                    </p>
                    <Button 
                        variant="primary" 
                        size="lg" 
                        className="fun-play-btn"
                        onClick={handlePlayGamesNow} // Ubah onClick
                    >
                        Play Games Now
                    </Button>
                    <p className="small text-muted mt-2">
                        You'll be redirected to games platform
                    </p>
                </div>

                {/* --- Bagian Welcome Back! (Muncul setelah klik Play Games Now) --- */}
                {showWelcomeBack && (
                    <div ref={welcomeBackRef} className="mt-5 pt-5">
                        <div className="mood-selection-box-wrapper">
                            <div className="p-4 rounded-3 shadow-sm mb-5 mood-selection-box">
                                <h4 className="fw-bold text-center mb-1">Welcome Back!</h4>
                                <p className="text-center text-muted mb-4">How do you feel after playing games?</p>

                                {/* Row Pemilihan Mood Kedua */}
                                <Row className="justify-content-center">
                                    {MOODS.map((mood) => (
                                        <Col key={mood.name} xs={6} sm={4} md={4} className="mb-3 d-flex justify-content-center">
                                        <MoodCard
                                            key={mood.name}
                                            mood={mood}
                                            // Menggunakan state baru untuk pemilihan mood setelah game
                                            isSelected={selectedMoodAfterGame === mood.name} 
                                            onClick={handleMoodSelectAfterGame}
                                        />
                                        </Col>
                                    ))}
                                </Row>

                                {/* Bagian Wow great to hear! & Done Button */}
                                {selectedMoodAfterGame && (
                                    <div className="text-center mt-4 p-3 rounded-3 mood-selection-inner-card">
                                        <p className="fw-semibold mb-2">Wow great to hear!</p>
                                        <p className="small text-muted mb-3">Take it slow and be kind to yourself.</p>
                                        <Button
                                            variant="primary"
                                            className="btn-sm"
                                            onClick={handleDone} // Panggil fungsi Done
                                        >
                                            Done
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

            </Container>

            {/* Notifikasi Mood KEDUA ("Thanks for sharing!") */}
            {showThanksToast && (
            <div 
                className="mood-toast"
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    backgroundColor: '#d1fae5', 
                    color: '#059669', 
                    padding: '12px 20px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}
            >
            <CheckCircleFill size={20} />
                <div>
                    <p className="fw-semibold mb-0">Thanks for sharing!</p>
                    <p className="small mb-0 text-muted" style={{ fontSize: '0.75rem' }}>Your mood has been recorded.</p>
                </div>
            </div>
            )}
        </>
    );
}