import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  ProgressBar,
  Form,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import AppNavbar from "../components/Navbar";
import "../styles/FunSession.css";

/* ===== IMAGES ===== */
import energeticImage from "../images/energetic.png";
import happyImage from "../images/happy.png";
import neutralImage from "../images/neutral.png";
import sadImage from "../images/sad.png";
import tiredImage from "../images/tired.png";
import frustratedImage from "../images/frustrated.png";

/* ===== MOODS ===== */
const MOODS = [
  { name: "Energetic", image: energeticImage },
  { name: "Happy", image: happyImage },
  { name: "Neutral", image: neutralImage },
  { name: "Sad", image: sadImage },
  { name: "Tired", image: tiredImage },
  { name: "Frustrated", image: frustratedImage },
];

/* ===== MOCK DATA ===== */
const MOOD_STATISTICS_BEFORE = [
  { name: "Energetic", percentage: 20 },
  { name: "Happy", percentage: 85 },
  { name: "Neutral", percentage: 70 },
  { name: "Sad", percentage: 35 },
  { name: "Tired", percentage: 90 },
  { name: "Frustrated", percentage: 60 },
];

const MOOD_STATISTICS_AFTER = [
  { name: "Energetic", percentage: 95 },
  { name: "Happy", percentage: 40 },
  { name: "Neutral", percentage: 10 },
  { name: "Sad", percentage: 5 },
  { name: "Tired", percentage: 30 },
  { name: "Frustrated", percentage: 50 },
];

/* ===== COMPONENTS ===== */

const MoodCard = ({ mood, isHighlighted }) => (
  <Card
    className={`text-center mood-card mood-disabled ${
      isHighlighted ? "mood-selected" : ""
    }`}
    style={{ width: 120, height: 120 }}
  >
    <Card.Body className="p-2 d-flex flex-column align-items-center justify-content-center">
      <img
        src={mood.image}
        alt={mood.name}
        style={{ width: 60, height: 60, objectFit: "contain" }}
      />
      <Card.Text className="small fw-semibold mt-2 mb-0">
        {mood.name}
      </Card.Text>
    </Card.Body>
  </Card>
);

const MoodProgressBar = ({ name, percentage }) => (
  <Row className="align-items-center mb-3">
    <Col xs={3} className="text-end small fw-semibold">
      {name}
    </Col>
    <Col xs={7}>
      <ProgressBar
        now={percentage}
        className="rounded-pill"
        style={{ height: 10 }}
      />
    </Col>
    <Col xs={2} className="small fw-bold">
      {percentage}%
    </Col>
  </Row>
);

/* ===== PAGE ===== */

export default function FunSessionWelcomeHRD() {
  const navigate = useNavigate();
  const [isSessionActive, setIsSessionActive] = useState(true);
  const [notes, setNotes] = useState("");
  const [showFinishToast, setShowFinishToast] = useState(false);

  const dominantMoodBefore = "Tired";
  const dominantMoodAfter = "Happy";

  const handleFinishSession = () => {
    setIsSessionActive(false);
    setShowFinishToast(true);

    // Ambil sesi terbaru dari localStorage (atau gunakan default dummy jika tidak ada)
    let sessions = [];
    try {
      sessions = JSON.parse(localStorage.getItem('fun_sessions')) || [];
    } catch (e) { sessions = []; }

    // Cari sesi upcoming terbaru (dengan type 'upcoming')
    const upcomingSessionIndex = sessions.findIndex(s => s.type === 'upcoming');
    if (upcomingSessionIndex !== -1) {
      // Ubah type menjadi 'past' dan update recap/feedback
      const session = { ...sessions[upcomingSessionIndex] };
      session.type = 'past';
      session.recap = 'Sesi telah selesai. Semua peserta telah mengikuti Fun Session.';
      session.feedback = 'Fun Session berjalan lancar dan bermanfaat.';
      session.detailText = 'Sesi Fun Session telah selesai dan data telah dipindahkan ke riwayat.';
      sessions[upcomingSessionIndex] = session;
      localStorage.setItem('fun_sessions', JSON.stringify(sessions));
    }

    // Setelah toast, redirect ke /funsession dan tab Past
    setTimeout(() => {
      setShowFinishToast(false);
      navigate('/funsession?tab=past');
    }, 1500);
  };

  return (
    <>
      <AppNavbar isLoggedIn={true} activePage="Fun Session" />

      <Container fluid className="mt-4 px-4 pb-5">
        {/* HEADER */}
        <div className="mb-4">
          <h2 className="fw-bold mb-1">Welcome To Fun Session Today!</h2>
          <p className="text-muted">
            Real-Time Analytics for Mind Stretch Session
          </p>
        </div>

        {/* BEFORE */}
        <div className="p-4 rounded-3 shadow-sm bg-light mb-5">
          <h5 className="fw-semibold text-center mb-4">
            How Are You Feeling Today?
          </h5>

          <Row className="justify-content-center mb-4">
            {MOODS.map((mood) => (
              <Col
                key={mood.name}
                xs={4}
                md={2}
                className="d-flex justify-content-center mb-3"
              >
                <MoodCard
                  mood={mood}
                  isHighlighted={mood.name === dominantMoodBefore}
                />
              </Col>
            ))}
          </Row>

          <div className="p-4 bg-white rounded-3 shadow-sm">
            <h6 className="fw-semibold mb-3">Employees Feeling Today</h6>
            {MOOD_STATISTICS_BEFORE.map((mood) => (
              <MoodProgressBar key={mood.name} {...mood} />
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className="fun-info-box mb-5">
          <p className="fun-info-quote">
            “Fun Session helps employees reset their mood and return to work with
            better focus and emotional balance.”
          </p>
          <p className="fun-info-meta">
            — Insight summary for HR & Management
          </p>
        </div>

        {/* AFTER */}
        <div className="p-4 rounded-3 shadow-sm bg-light mb-5">
          <h4 className="fw-bold text-center mb-1">Welcome Back!</h4>
          <p className="text-center text-muted mb-4">
            How do employees feel after playing games?
          </p>

          <Row className="justify-content-center mb-4">
            {MOODS.map((mood) => (
              <Col
                key={mood.name}
                xs={4}
                md={4}
                className="d-flex justify-content-center mb-3"
              >
                <MoodCard
                  mood={mood}
                  isHighlighted={mood.name === dominantMoodAfter}
                />
              </Col>
            ))}
          </Row>

          <div className="p-4 bg-white rounded-3 shadow-sm">
            <h6 className="fw-semibold mb-3">
              Employees Feeling After Fun Session
            </h6>
            {MOOD_STATISTICS_AFTER.map((mood) => (
              <MoodProgressBar key={mood.name} {...mood} />
            ))}
          </div>
        </div>

        {/* NOTES */}
        <div className="p-4 rounded-3 shadow-sm bg-light mb-4">
          <h4 className="fw-bold mb-3">Notes</h4>
          <Form.Control
            as="textarea"
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={!isSessionActive}
          />
        </div>

        {/* FINISH */}
        <div className="text-center mb-5">
          <Button
            variant="primary"
            size="lg"
            disabled={!isSessionActive}
            onClick={handleFinishSession}
          >
            Finish Fun Session
          </Button>
        </div>
      </Container>

      {/* ===== TOAST ===== */}
      <ToastContainer
        position="bottom-center"
        className="finish-toast-container p-3"
      >
        <Toast
          show={showFinishToast}
          onClose={() => setShowFinishToast(false)}
          delay={3000}
          autohide
          className="finish-toast"
        >
          <Toast.Body className="d-flex align-items-center gap-3">
            <div className="finish-toast-icon">✓</div>
            <div>
              <div className="finish-toast-title">Fun Session Finished</div>
              <div className="finish-toast-text">
                Session data has been finalized.
              </div>
            </div>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
