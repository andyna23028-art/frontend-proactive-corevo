import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const CreateFunSessionModal = ({ show, handleClose, handleSave }) => {
    // State untuk menampung input form
    const [formData, setFormData] = useState({
        title: '',
        department: '', // Kolom Department (jika diperlukan)
        description: '',
        dateTimeLocal: '', // Gunakan format YYYY-MM-DDTHH:MM
        duration: '', // Dalam menit
        host: 'Admin', // Default host
        type: 'upcoming', // Default type
        participants: 0, // Default participants
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        // Logika validasi sederhana
        if (!formData.title || !formData.dateTimeLocal || !formData.duration || !formData.description) {
            alert("Harap isi semua kolom wajib!");
            return;
        }

        // ✅ PERBAIKAN: Deklarasikan datePart dan timePart di sini
        const [datePart, timePart] = formData.dateTimeLocal.split('T'); 

        // Panggil fungsi handleSave dari parent (FunSession.js)
        handleSave({
            ...formData,
            date: datePart, // Dikirim sebagai date terpisah
            time: timePart, // Dikirim sebagai time terpisah
            // dateTimeLocal tidak perlu dikirim ke parent jika sudah dipisah
        });
        
        // Reset form dan tutup modal
        setFormData({
            title: '',
            department: '',
            description: '',
            dateTimeLocal: '',
            duration: '',
            host: 'Admin',
            type: 'upcoming',
            participants: 0,
        });
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Create New Fun Session</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="text-muted small mb-3">Schedule new game for employees</p>
                <Form>
                    {/* Session Title */}
                    <Form.Group className="mb-3" controlId="formSessionTitle">
                        <Form.Label>Session Title</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className='custom-form-control'
                        />
                    </Form.Group>

                    {/* Department (Opsional) */}
                    <Form.Group className="mb-3" controlId="formDepartment">
                        <Form.Label>Department</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className='custom-form-control'
                        />
                    </Form.Group>

                    {/* Description */}
                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className='custom-form-control'
                        />
                    </Form.Group>

                    {/* Date & Time and Duration in one row */}
                    <Row className="mb-3">
                        {/* Date & Time (SEKARANG HANYA SATU INPUT) */}
                        <Col md={6}>
                            <Form.Group controlId="formDateTime">
                                <Form.Label>Date & Time</Form.Label>
                                {/* ✅ Input tunggal menggunakan type="datetime-local" */}
                                <Form.Control 
                                    type="datetime-local" 
                                    name="dateTimeLocal"
                                    value={formData.dateTimeLocal}
                                    onChange={handleChange}
                                    className='custom-form-control'
                                />
                                {/* Ikon yang muncul (kalender) akan ditangani oleh browser native */}
                            </Form.Group>
                        </Col>
                        
                        {/* Duration (min) */}
                        <Col md={6}>
                            <Form.Group controlId="formDuration">
                                <Form.Label>Duration (min)</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    name="duration"
                                    min="10" 
                                    value={formData.duration}
                                    onChange={handleChange}
                                    className='custom-form-control'
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateFunSessionModal;