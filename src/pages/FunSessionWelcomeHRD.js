// src/pages/FunSessionWelcomeHRD.js --> HRD/Manager View (Dashboard Visual)
import React, { useState } from "react";
import { Container, Card, Row, Col, Button, ProgressBar, Form } from "react-bootstrap";
import AppNavbar from "../components/Navbar";
import { ArrowLeftCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom"; 
import "../styles/FunSession.css";

// --- 1. IMPORT SEMUA GAMBAR EMOSI DI SINI ---
// Pastikan path dan nama file gambar ini benar
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

// src/pages/FunSessionWelcomeHRD.js

// --- 2. DATA MOCK STATISTIK MOOD AWAL (Real Time Data) ---
const MOOD_STATISTICS_BEFORE = [
    // Sesuaikan persentase ini agar terlihat berbeda, sesuai desain
    { name: "Excited", percentage: 20 },   // Terlihat pendek di desain
    { name: "Happy", percentage: 85 },    // Terlihat panjang
    { name: "Neutral", percentage: 70 },  // Terlihat sedang
    { name: "Sad", percentage: 35 },      // Terlihat sangat pendek
    { name: "Tired", percentage: 90 },    // Terlihat paling panjang
    { name: "Frustrated", percentage: 60 }, // Terlihat sedang
];

// --- 3. DATA MOCK STATISTIK MOOD AKHIR (Real Time Data) ---
const MOOD_STATISTICS_AFTER = [
    // Sesuaikan persentase ini agar terlihat berbeda, sesuai desain
    { name: "Excited", percentage: 95 },
    { name: "Happy", percentage: 40 },
    { name: "Neutral", percentage: 10 },
    { name: "Sad", percentage: 5 },
    { name: "Tired", percentage: 30 },
    { name: "Frustrated", percentage: 50 },
];


// --- Komponen Mood Card (Pasif & Highlighted) ---
const MoodCard = ({ mood, isHighlighted, isCompact }) => {
    const size = isCompact ? 100 : 120;

    return (
        <Card
            className={`text-center mood-card mood-disabled ${isHighlighted ? "mood-selected" : ""}`}
            style={{ width: size, height: size }}
        >
            <Card.Body className="p-2 d-flex flex-column align-items-center justify-content-center">
                
                <div className="mood-image-wrapper mb-2">
                    <img
                        src={mood.image}
                        alt={mood.name}
                        style={{
                            width: size * 0.5,
                            height: size * 0.5,
                            objectFit: "contain"
                        }}
                    />
                </div>

                <Card.Text className="small fw-semibold mb-0">
                    {mood.name}
                </Card.Text>

            </Card.Body>
        </Card>
    );
};


const MoodProgressBar = ({ name, percentage }) => {
    const variant = "primary";

    return (
        <Row className="align-items-center mb-3">

            {/* Mood label */}
            <Col 
                xs={3} 
                sm={2} 
                className="text-end small pe-2 fw-semibold"
            >
                {name}
            </Col>

            {/* Progress bar */}
            <Col xs={7} sm={8} className="ps-0">
            <div className="progress-bar-wrapper">
                <ProgressBar
                    now={percentage}
                    style={{ height: '10px'}}
                    variant={variant}
                    className="rounded-pill"
                />
                </div>
            </Col>

            {/* Percentage */}
            <Col 
                xs={2} 
                sm={2}
                className="text-start small fw-bold ps-2"
            >
                {percentage}%
            </Col>

        </Row>
    );
};



// --- Komponen Halaman Utama Fun Session HRD ---
export default function FunSessionWelcomeHRD() {
    // Simulasi status sesi: Active atau Finished
    const [isSessionActive, setIsSessionActive] = useState(true);
    const [notes, setNotes] = useState('');

    const handleEndSession = () => {
        if (window.confirm("Are you sure you want to end this session and finalize metrics?")) {
            setIsSessionActive(false);
            console.log("Session ended successfully. Final reports are now being generated.");
        }
    };
    
    // Asumsi mood dominan untuk meniru highlight di desain
    const dominantMoodBefore = "Tired"; // Sesuai data 90%
    const dominantMoodAfter = "Happy"; // Mengubah dari Energetic ke Happy sesuai gambar 19dd5d.jpg

    return (
        <>
            <AppNavbar isLoggedIn={true} activePage="Fun Session" />

            <Container fluid className="mt-4 px-4 pb-5 fun-session-hrd-container">
                
                {/* Tombol Back ke FunSession List */}
                <div className="mb-4">
                    <Button 
                        as={Link} 
                        to="/funsession" 
                        variant="link" // Gunakan link untuk tampilan yang lebih bersih
                        className="p-0 mb-3 d-inline-flex align-items-center text-muted fw-semibold"
                    >
                    </Button>
                    <h2 className="fw-bold mb-1">Welcome To Fun Session Today!</h2>
                    <p className="text-muted fs-6">
                        Real-Time Analytics for "Mind Stretch" Session (Hosted by Admin)
                    </p>
                </div>

                {/* --- 1. How Are You Feeling Today? (View Only) --- */}
                <div className="mt-5 pt-5">
                    <div className="p-4 rounded-3 shadow mood-selection-box bg-light-blue">
                        <h5 className="fw-semibold mb-4 text-center">How Are You Feeling Today?</h5>
                        
                        {/* Visualisasi Mood Awal */}
                        <Row className="justify-content-center mb-4">
                            {MOODS.map((mood) => (
                                <Col key={mood.name} xs={4} sm={4} md={2} className="mb-3 d-flex justify-content-center">
                                <MoodCard
                                    key={mood.name}
                                    mood={mood}
                                    isHighlighted={mood.name === dominantMoodBefore}
                                />
                                </Col>
                            ))}
                        </Row>

                        {/* Grafik Mood Awal */}
                        <div className="p-4 bg-white rounded-3 shadow-sm">
                            <h6 className="fw-semibold mb-3">Employees Feeling Today</h6>
                            {MOOD_STATISTICS_BEFORE.map((mood) => (
                                <MoodProgressBar 
                                    key={mood.name}
                                    name={mood.name}
                                    percentage={mood.percentage}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- 2. Wanna Have Some Fun? (Status Session) --- */}
                <div className="text-center mt-5">
                    <h4 className="fw-bold mb-2">Wanna Have Some Fun?</h4>
                    <p className="text-muted mb-4">
                        Status: {isSessionActive ? "Currently Active" : "Concluded"}
                    </p>
                    <Button 
                        variant={isSessionActive ? "danger" : "secondary"}
                        size="lg" 
                        className="fun-play-btn"
                        onClick={handleEndSession}
                        disabled={!isSessionActive}
                    >
                        {isSessionActive ? "Start Game" : "Session Concluded"}
                    </Button>
                    <p className="small text-muted mt-2">
                        {isSessionActive ? "Click to manually end the session" : "Final reports are ready"}
                    </p>
                </div>
                

                {/* --- 3. Welcome Back! (View Only) --- */}
                <div className="mt-5 pt-5"> 
                    <div className="p-4 rounded-3 shadow mood-selection-box bg-light-blue"> 
                        <h4 className="fw-bold text-center mb-1">Welcome Back!</h4>
                        <p className="text-center text-muted mb-4">How do you feel after playing games?</p>

                        {/* Visualisasi Mood Kedua */}
                        <Row className="justify-content-center">
                            {MOODS.map((mood) => (
                                <Col key={mood.name} xs={4} sm={4} md={4} className="mb-3 d-flex justify-content-center"> 
                                <MoodCard
                                    key={mood.name}
                                    mood={mood}
                                    isHighlighted={mood.name === dominantMoodAfter}
                                />
                                </Col>
                            ))}
                        </Row>

                        {/* Grafik Mood Kedua */}
                        <div className="p-4 bg-white rounded-3 shadow-sm">
                            <h6 className="fw-semibold mb-3">Employees Feeling After Fun Session</h6>
                            {MOOD_STATISTICS_AFTER.map((mood) => (
                                <MoodProgressBar 
                                    key={mood.name}
                                    name={mood.name}
                                    percentage={mood.percentage}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- 4. Notes (HRD Input/Review) --- */}
                <div className="mt-5">
                    <div className="p-4 rounded-3 shadow mood-selection-box bg-light-blue"> 
                    <h4 className="fw-bold mb-3">Notes</h4>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="mb-4 shadow-sm"
                        disabled={!isSessionActive} // Notes bisa diubah selama sesi aktif
                    />
                    </div>
                    
                    <div className="text-center mb-5 mt-4">
                        <Button
                            variant="primary"
                            size="lg"
                            className="fun-finish-btn"
                            disabled={!isSessionActive}
                        >
                            Finish Fun Session
                        </Button>
                    </div>   
                </div>

            </Container>
        </>
    );
}