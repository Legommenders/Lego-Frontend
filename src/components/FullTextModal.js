import React from 'react';

function FullTextModal({ isOpen, onClose, title, content }) {
    if (!isOpen) return null;

    return (
        <div style={styles.backdrop}>
            <div style={styles.modal}>
                <h2>{title}</h2>
                <pre style={styles.pre}>{content}</pre>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

const styles = {
    backdrop: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modal: {
        position: 'relative',
        margin: '10% auto',
        padding: '20px',
        width: '50%',
        background: '#fff',
        borderRadius: '8px'
    },
    pre: {
        background: '#f0f0f0',
        padding: '10px',
        maxHeight: '300px',
        overflowY: 'auto'
    }
};

export default FullTextModal;
