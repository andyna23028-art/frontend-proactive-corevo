import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Calendar } from "react-bootstrap-icons"; // Menggunakan ikon Calendar

// Komponen ini akan digunakan oleh FunSession.js
export default function FormModal({ show, handleClose, handleSave }) {
  const [sessionTitle, setSessionTitle] = useState("");
  const [department, setDepartment] = useState(""); // Tambahkan state untuk Department
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(40); // Default 40 menit

  const handleSubmit = (e) => {
    e.preventDefault();

    // Data sesi baru yang akan dikirim ke FunSession.js (atau backend)
    const newSession = {
      id: Date.now(), // ID sementara
      title: sessionTitle,
      department: department,
      description: description,
      date: date,
      time: time,
      duration: `${duration} min`,
      participants: 0, // Awalnya 0
      host: "HR Admin", // Host tetap
      type: "upcoming",
    };

    // Panggil fungsi save dari parent
    handleSave(newSession);

    // Reset Form
    setSessionTitle("");
    setDepartment("");
    setDescription("");
    setDate("");
    setTime("");
    setDuration(40);
    handleClose(); // Tutup modal
  };

  const handleDateChange = (e) => {
    // Simulasi kalender sederhana (hanya ambil value input date)
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Create New Fun Session</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-muted small">Schedule new game for employees</p>
        <Form onSubmit={handleSubmit}>
          {/* Session Title */}
          <Form.Group className="mb-3" controlId="sessionTitle">
            <Form.Label className="fw-semibold">Session Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter session title"
              value={sessionTitle}
              onChange={(e) => setSessionTitle(e.target.value)}
              required
            />
          </Form.Group>

          {/* Department - Menambahkan kolom Department/Pilih Target */}
          <Form.Group className="mb-3" controlId="department">
            <Form.Label className="fw-semibold">Target Department</Form.Label>
            <Form.Control
              as="select"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option value="">Select Department...</option>
              <option value="All">All Department</option>
              <option value="IT">IT Department</option>
              <option value="HR">HR Department</option>
              <option value="Finance">Finance Department</option>
            </Form.Control>
          </Form.Group>


          {/* Duration */}
          <Form.Group className="mb-3" controlId="duration">
            <Form.Label className="fw-semibold">Duration (min)</Form.Label>
            <Form.Control
              type="number"
              min="10"
              step="5"
              placeholder="Duration in minutes"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-3" controlId="description">
            <Form.Label className="fw-semibold">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter session description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          {/* Date and Time */}
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="sessionDate">
                <Form.Label className="fw-semibold">Date</Form.Label>
                {/* Menggunakan input type="date" native agar fungsional */}
                <Form.Control
                  type="date"
                  value={date}
                  onChange={handleDateChange}
                  required
                />
                {/* Anda bisa mengimplementasikan datepicker yang lebih kompleks di sini */}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="sessionTime">
                <Form.Label className="fw-semibold">Time</Form.Label>
                {/* Menggunakan input type="time" native */}
                <Form.Control
                  type="time"
                  value={time}
                  onChange={handleTimeChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end mt-4 gap-2">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}