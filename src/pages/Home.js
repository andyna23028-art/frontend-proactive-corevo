import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Whatsapp,
  Envelope,
  GeoAlt,
  PuzzleFill, 
} from "react-bootstrap-icons";
import AppNavbar from "../components/Navbar";

const styles = {

    vars: {
        primaryColor: '#0d6efd',
        bgColor: '#f7f9fc',
        cardBg: '#ffffff',
        whatsappColor: '#25D366',
        emailColor: '#f27573',
        joinBtnColor: '#ffc107',
    },

    containerMain: {
        backgroundColor: '#f7f9fc',
        paddingTop: '1rem',
        paddingBottom: '3rem',
    },
    greetingTitle: {
        color: '#0d6efd',
        fontSize: '2rem',
        fontWeight: 'bold',
    },

    primaryCard: {
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    },

    gradientButton: {
        padding: '12px 20px',
        borderRadius: '8px',
        border: 'none',
        fontWeight: 'bold',
        color: 'white',
        transition: 'transform 0.2s',
    },

    chatCard: {
        borderRadius: '8px',
        borderLeft: '5px solid transparent',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    },
    whatsappBorder: {
        borderLeftColor: '#25D366',
    },
    emailBorder: {
        borderLeftColor: '#f27573',
    },
    chatIcon: {
        width: '30px',
        height: '30px',
    },
    chatLinkText: {
        color: '#0d6efd',
        fontWeight: '500',
        marginTop: '5px',
        fontSize: '0.875rem',
    },

    sessionInnerCard: {
        borderRadius: '8px',
        border: '1px solid #dee2e6',
        padding: '0',
    },
    sessionIcon: {
        width: '35px',
        height: '35px',
        borderRadius: '50%',
        backgroundColor: 'rgba(13, 110, 253, 0.1)',
        color: '#0d6efd',
        flexShrink: 0,
    },
    sessionJoinBtn: {
        backgroundColor: '#ffc107',
        borderColor: '#ffc107',
        color: '#343a40',
        padding: '5px 15px',
        borderRadius: '6px',
        fontWeight: 'bold',
        fontSize: '0.875rem',
        lineHeight: '1.5',
    },
};

const PrimaryCard = ({ children, customStyle = {}, className = "", ...rest }) => (
  <Card
    style={{ ...styles.primaryCard, ...customStyle }}
    className={`shadow-sm border-0 ${className}`} 
    {...rest}
  >
    <Card.Body className="p-4">{children}</Card.Body>
  </Card>
);

const GradientButton = ({ children, as = Link, className = "", ...rest }) => (
  <Button
    as={as}
    {...rest}
    style={styles.gradientButton}
    className={`home-gradient-btn w-100 fw-bold ${className}`}
  >
    {children}
  </Button>
);

const ChatCard = ({ icon, title, description, linkText, type = 'whatsapp' }) => (
  <Card
    style={{ ...styles.chatCard, ...(type === 'whatsapp' ? styles.whatsappBorder : styles.emailBorder) }}
    className={`shadow-sm border-0 home-chat-card`}
    role="button" 
    tabIndex="0" 
  >
    <Card.Body>
      <div className="d-flex align-items-start mb-2">
        <div style={styles.chatIcon} className="me-3 flex-shrink-0 d-flex align-items-center justify-content-center">
          {icon}
        </div>
        <div>
          <h6 className="mb-1 fw-semibold">{title}</h6>
          <p className="mb-0 text-muted small">{description}</p>
        </div>
      </div>
      <p style={styles.chatLinkText} className="mb-0 small">{linkText}</p>
    </Card.Body>
  </Card>
);

export default function Home() {
  
  const externalStyles = `
    /* Gradient Button Styling */
    .home-gradient-btn {
        background: linear-gradient(to right, #007bff, #00c6ff) !important;
        box-shadow: 0 4px 10px rgba(0, 123, 255, 0.3) !important;
    }
    .home-gradient-btn:hover {
        transform: translateY(-1px) !important;
        box-shadow: 0 6px 15px rgba(0, 123, 255, 0.4) !important;
        opacity: 0.9 !important;
    }

    /* Chat Card Hover Effect */
    .home-chat-card:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08) !important;
    }

    /* Memastikan Performance & Unlock Wins sejajar dengan grid di kanan */
    .home-performance-card {
        min-height: 250px; 
    }
    
    /* Memastikan layout Let's Chat di tablet (MD) tetap 50/50 */
    @media (min-width: 768px) and (max-width: 991.98px) {
        .chat-col-fix {
            flex: 0 0 50%;
            max-width: 50%;
        }
    }
  `;

  return (
    <>
      <style>{externalStyles}</style>
      
      <AppNavbar isLoggedIn={true} activePage="Home" />
      
      <Container fluid className="mt-4 px-4 pb-5" style={styles.containerMain}>

        <header className="mb-1">
          <h1 style={styles.greetingTitle}>
            Good Morning, John
          </h1>
          <p className="text-muted mb-0">Plan your day with us!</p>
        </header>

        <Row className="g-4 mb-4">
          {/* Performance Card */}
          <Col lg={7}>
            <PrimaryCard className="home-performance-card h-100 d-flex flex-column justify-content-between">
              <div>
                <h5 className="fw-bold mb-2">Performance</h5>
            
                <p className="text-muted small mb-5">
                  Monitor and manage the overall performance targets and achievements
                  for you and your team. Track Key Performance Indicators (KPIs), view
                  feedback, and identify areas that require development.
                </p>
              </div>

              <GradientButton to="/performance">
                View More
              </GradientButton>
            </PrimaryCard>
          </Col>

          {/* Your Training Report */}
          <Col lg={5}>
            <PrimaryCard customStyle={{ height: '100%' }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">Your Training Report</h5>
                <Button
                  as={Link}
                  to="/training-report"
                  variant="link"
                  className="p-0 small text-primary fw-semibold"
                >
                  See all
                </Button>
              </div>

              <div className="mb-2">
                <div className="fw-semibold small">Work Ethics Training</div>
                <div className="text-muted small">1 Month</div>
              </div>

              <hr className="my-3" />

              <p className="text-muted small mb-3">
                View the summary and final results of the Work Ethics training
                you attended.
              </p>

              <div className="d-flex align-items-center text-muted small">
                <GeoAlt size={14} className="me-1" />
                <span className="me-2">Surabaya</span>
                <span className="mx-1">|</span>
                <span>3 months ago</span>
              </div>
            </PrimaryCard>
          </Col>
        </Row>

        <Row className="g-3">
          {/* LET'S CHAT */}
          <Col lg={3}>
            <h5 className="fw-bold mb-3">Let&apos;s Chat</h5>
            <Row className="g-1">
              <Col xs={8} md={6} lg={12} className="chat-col-fix"> 
                <ChatCard
                  type="whatsapp"
                  icon={<Whatsapp size={24} color={styles.vars.whatsappColor} />}
                  title="Whatsapp Chat"
                  description="Do you send chat in here?"
                  linkText="You can start chat in here!"
                />
              </Col>
              <Col xs={12} md={6} lg={12} className="chat-col-fix">
                <ChatCard
                  type="email"
                  icon={<Envelope size={24} color={styles.vars.emailColor} />}
                  title="By Email"
                  description="Do you send email for HRD?"
                  linkText="You can start chat in here!"
                />
              </Col>
            </Row>
          </Col>

          {/* UNLOCK YOUR WINS */}
          <Col lg={4}>
            <PrimaryCard customStyle={{ height: '40%' }} className="d-flex flex-column justify-content-between home-performance-card">
              <div>
                <h5 className="fw-bold mb-2">Unlock Your Wins</h5>
               
                <p className="text-muted small mb-5">
                  Earn badges, points, and exclusive perks as you hit your
                  productivity goals.
                </p>
              </div>
              
              <GradientButton to="/reward">
                See All Rewards
              </GradientButton>
            </PrimaryCard>
          </Col>

          {/* UPCOMING FUN SESSION */}
          <Col lg={5}>
            <PrimaryCard customStyle={{ height: '75%' }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">Upcoming Fun Session</h5>
                <Button
                  as={Link}
                  to="/funsession"
                  variant="link"
                  className="p-0 small text-primary fw-semibold"
                >
                  See all
                </Button>
              </div>

              
              <Card style={styles.sessionInnerCard}>
                <Card.Body className="p-3">
                 
                  <div className="d-flex justify-content-between align-items-center">
                   
                    <div className="d-flex align-items-center">
                      <div style={styles.sessionIcon} className="me-3 d-flex align-items-center justify-content-center">
                        <PuzzleFill size={18} /> 
                      </div>
                      <div>
                        <div className="fw-semibold small mb-1">
                          Mind Stretch
                        </div>
                        <p className="text-muted small mb-0">
                          Take a short break to clear your mind and boost your
                          creativity.
                        </p>
                      </div>
                    </div>
                    {/* Tombol Join */}
                    <Button
                      as={Link}
                      to="/funsession"
                      size="sm"
                      style={styles.sessionJoinBtn}
                      className="fw-bold"
                    >
                      Join
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </PrimaryCard>
          </Col>
        </Row>
      </Container>
    </>
  );
}