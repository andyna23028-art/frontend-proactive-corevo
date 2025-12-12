import React, { useState } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap'; // Import Row dan Col
import { XLg, ChevronUp, ChevronDown } from 'react-bootstrap-icons'; 

// Data Karyawan Dummy
const EMPLOYEE_OPTIONS = [
    { id: 1, name: 'Rayn Reynolds' },
    { id: 2, name: 'John Doe' },
    { id: 3, name: 'Lily Aminah' },
    { id: 4, name: 'Alice Johnson' },
    { id: 5, name: 'Carolina Davis' },
    { id: 6, name: 'Jackson Smith' },
    { id: 7, name: 'Charles Wilson' },
    { id: 8, name: 'Thomas Herve' },
];

// Data Default untuk mode Create (tidak digunakan lagi karena menggunakan state terpisah)
// const DEFAULT_FORM_DATA = { ... }

// 🌟 KONSTANTA: Batas maksimum nilai penilaian
const MAX_RATING = 5; 

export default function PerformanceModal({ show, handleClose, handleSubmit, initialData }) {
    
    // Gunakan state terpisah untuk setiap field - lebih stabil dan tidak re-render
    const [employeeName, setEmployeeName] = useState(initialData?.employeeName || '');
    const [goalAchievement, setGoalAchievement] = useState(initialData?.goalAchievement || 0);
    const [knowledgeSkills, setKnowledgeSkills] = useState(initialData?.knowledgeSkills || 0);
    const [behaviorWorkEthic, setBehaviorWorkEthic] = useState(initialData?.behaviorWorkEthic || 0);
    const [disciplineReliability, setDisciplineReliability] = useState(initialData?.disciplineReliability || 0);
    const [goalAchievementDescription, setGoalAchievementDescription] = useState(initialData?.goalAchievementDescription || '');
    const [knowledgeSkillsDescription, setKnowledgeSkillsDescription] = useState(initialData?.knowledgeSkillsDescription || '');
    const [behaviorWorkEthicDescription, setBehaviorWorkEthicDescription] = useState(initialData?.behaviorWorkEthicDescription || '');
    const [disciplineReliabilityDescription, setDisciplineReliabilityDescription] = useState(initialData?.disciplineReliabilityDescription || '');
    const [validated, setValidated] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        // Kumpulkan semua data
        const formData = {
            employeeName,
            goalAchievement,
            knowledgeSkills,
            behaviorWorkEthic,
            disciplineReliability,
            goalAchievementDescription,
            knowledgeSkillsDescription,
            behaviorWorkEthicDescription,
            disciplineReliabilityDescription,
        };

        handleSubmit(formData);
        handleClose();
    };

    // Deteksi Mode dan Teks Tombol
    const isEditMode = !!initialData;
    const saveButtonText = isEditMode ? 'Save Changes' : 'Save';

    // Style kustom untuk input yang ada spinner-nya
    const customInputStyle = {
        backgroundColor: '#eff6ff', 
        borderRadius: '10px', 
        border: 'none', 
        height: '43px',
        fontSize: '1rem',
        fontWeight: '500',
        paddingRight: '40px', 
    };
    
    // Komponen Input dengan Spinner dan Description
    const RatingGroup = ({ labelValue, valueState, setValue, labelDescription, descriptionState, setDescription }) => (
        <Row className="mb-4">
            {/* Kolom Kiri untuk Nilai (Value) */}
            <Col md={6}>
                <Form.Group className="mb-3" controlId={`form${labelValue}`}>
                    <Form.Label className="fw-semibold text-dark">{labelValue}</Form.Label>
                    <div className="position-relative">
                        <Form.Control
                            type="number"
                            value={valueState}
                            onChange={(e) => setValue(parseInt(e.target.value) || 0)}
                            style={customInputStyle}
                            required 
                            min={0}
                            max={MAX_RATING}
                        />
                        <div 
                            className="position-absolute d-flex flex-column" 
                            style={{ 
                                right: '5px', 
                                top: '50%', 
                                transform: 'translateY(-50%)',
                                zIndex: 100, 
                                pointerEvents: 'auto' 
                            }}>
                            
                            <ChevronUp 
                                size={20} 
                                className="text-primary cursor-pointer p-1" 
                                style={{ cursor: 'pointer', lineHeight: '1', height: '20px' }}
                                onClick={() => {
                                    const newVal = Math.min(MAX_RATING, valueState + 1);
                                    setValue(newVal);
                                }}
                            />
                            
                            <ChevronDown 
                                size={20} 
                                className="text-primary cursor-pointer p-1" 
                                style={{ cursor: 'pointer', lineHeight: '1', height: '20px', marginTop: '-15px' }}
                                onClick={() => {
                                    const newVal = Math.max(0, valueState - 1);
                                    setValue(newVal);
                                }}
                            />
                        </div>
                    </div>
                    <Form.Control.Feedback type="invalid">
                        Nilai harus di antara 0 dan {MAX_RATING}.
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>

            {/* Kolom Kanan untuk Deskripsi */}
            <Col md={6}>
                <Form.Group className="mb-3" controlId={`form${labelDescription}`}>
                    <Form.Label className="fw-semibold text-dark">{labelDescription}</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3}
                        value={descriptionState}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ ...customInputStyle, height: 'auto', paddingRight: '10px' }}
                    />
                </Form.Group>
            </Col>
        </Row>
    );

    return (
        <Modal 
            show={show} 
            onHide={handleClose} 
            centered 
            contentClassName="rounded-4"
            dialogClassName="modal-xl" // Gunakan ukuran yang lebih besar (xl) untuk menampung 2 kolom
        >
            <Modal.Header 
                style={{ borderBottom: 'none', padding: '1.5rem 1.5rem 0.5rem 1.5rem' }}
                closeButton={false}
            >
                <div className="w-100 d-flex justify-content-between align-items-center">
                    <Modal.Title className="fw-bold fs-4">{isEditMode ? 'Edit Performance' : 'Manage Performance'}</Modal.Title>
                    <Button variant="light" onClick={handleClose} className="rounded-circle p-1" style={{ width: '30px', height: '30px' }}>
                        <XLg size={20} />
                    </Button>
                </div>
            </Modal.Header>
            
            <Modal.Body style={{ padding: '0 1.5rem 1rem 1.5rem' }}>
                <p className="text-muted mb-4">Employee performance is typically evaluated based on the following key categories</p>
                
                <Form noValidate validated={validated} onSubmit={onSubmit}> 
                    
                    {/* Select Employee */}
                    <Form.Group className="mb-4" controlId="formEmployeeName">
                        <Form.Label className="fw-semibold text-dark">Select Employee</Form.Label>
                        <Form.Select 
                            value={employeeName}
                            onChange={(e) => setEmployeeName(e.target.value)}
                            required
                            disabled={isEditMode} 
                            style={{ backgroundColor: '#eff6ff', borderRadius: '10px', border: 'none', height: '43px', fontSize: '1rem' }}
                        >
                            <option value="" disabled>Pilih Karyawan...</option>
                            {EMPLOYEE_OPTIONS.map(employee => (
                                <option key={employee.id} value={employee.name}>{employee.name}</option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Mohon pilih karyawan terlebih dahulu.
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Performance Metrics with Descriptions */}
                    <RatingGroup 
                        labelValue="Goal Achievement Value" 
                        valueState={goalAchievement}
                        setValue={setGoalAchievement}
                        labelDescription="Description"
                        descriptionState={goalAchievementDescription}
                        setDescription={setGoalAchievementDescription}
                    />

                    <RatingGroup 
                        labelValue="Behavior & Work Ethic Value" 
                        valueState={behaviorWorkEthic}
                        setValue={setBehaviorWorkEthic}
                        labelDescription="Description"
                        descriptionState={behaviorWorkEthicDescription}
                        setDescription={setBehaviorWorkEthicDescription}
                    />

                    <RatingGroup 
                        labelValue="Knowledge & Skill Value" 
                        valueState={knowledgeSkills}
                        setValue={setKnowledgeSkills}
                        labelDescription="Description"
                        descriptionState={knowledgeSkillsDescription}
                        setDescription={setKnowledgeSkillsDescription}
                    />

                    <RatingGroup 
                        labelValue="Discipline & Reliability Value" 
                        valueState={disciplineReliability}
                        setValue={setDisciplineReliability}
                        labelDescription="Description"
                        descriptionState={disciplineReliabilityDescription}
                        setDescription={setDisciplineReliabilityDescription}
                    />


                    {/* Button Submit (hidden) */}
                    <div style={{ display: 'none' }}>
                        <Button type="submit">Hidden Submit</Button>
                    </div>

                </Form>
            </Modal.Body>
            
            <Modal.Footer style={{ borderTop: 'none', padding: '0 1.5rem 1.5rem 1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                    variant="light" 
                    onClick={handleClose} 
                    style={{ borderRadius: '10px', color: '#2563eb', border: '1px solid #dbeafe', padding: '0.5rem 1.5rem', marginRight: '10px' }}
                >
                    Cancel
                </Button>
                <Button 
                    variant="primary" 
                    onClick={onSubmit} 
                    style={{ borderRadius: '10px', padding: '0.5rem 1.5rem', fontWeight: 'bold' }}
                >
                    {saveButtonText} 
                </Button>
            </Modal.Footer>
        </Modal>
    );
}