import React, { useState } from 'react';

function EvaluationTable({ evaluations, onView, onAddTag, onRemoveTag }) {
    const [filterText, setFilterText] = useState('');
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    // Filter evaluations
    const filtered = evaluations.filter(e => {
        const search = filterText.toLowerCase();
        // Example filter by signature or command
        return (
            e.signature.toLowerCase().includes(search) ||
            e.command.toLowerCase().includes(search)
        );
    });

    // Sort evaluations
    const sorted = [...filtered].sort((a, b) => {
        if (!sortKey) return 0;
        if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    const handleSort = (key) => {
        // If clicking the same column, toggle order
        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };

    return (
        <div>
            <h2>Evaluations</h2>
            <input
                type="text"
                placeholder="Filter by signature or command..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                style={{ marginBottom: '10px' }}
            />
            <table border="1" cellPadding="5" cellSpacing="0">
                <thead>
                <tr>
                    <th onClick={() => handleSort('signature')}>
                        Signature {sortKey === 'signature' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                    </th>
                    <th onClick={() => handleSort('command')}>
                        Command {sortKey === 'command' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                    </th>
                    <th>Configuration</th>
                    <th>Log</th>
                    <th>Performance</th>
                    <th>Comment</th>
                    <th>Tags</th>
                </tr>
                </thead>
                <tbody>
                {sorted.map((evaluation) => (
                    <tr key={evaluation.signature}>
                        <td>{evaluation.signature}</td>
                        <td>
                            {/* For text fields, use "View" instead of showing full text */}
                            <button onClick={() => onView('Command', evaluation.command)}>View</button>
                        </td>
                        <td>
                            <button onClick={() => onView('Configuration', evaluation.configuration)}>View</button>
                        </td>
                        <td>
                            <button onClick={() => onView('Log', evaluation.log)}>View</button>
                        </td>
                        <td>
                            <button onClick={() => onView('Performance', evaluation.performance)}>View</button>
                        </td>
                        <td>
                            <button onClick={() => onView('Comment', evaluation.comment)}>View</button>
                        </td>
                        <td>
                            {/* Display tags, allow remove, also allow add */}
                            {evaluation.tags.map((tag) => (
                                <span key={tag} style={{ marginRight: '5px' }}>
                    {tag} <button onClick={() => onRemoveTag(evaluation.signature, tag)}>x</button>
                  </span>
                            ))}
                            <button
                                onClick={() => {
                                    const newTag = prompt('Enter new tag name:');
                                    if (newTag) {
                                        onAddTag(evaluation.signature, newTag);
                                    }
                                }}
                            >
                                + Add Tag
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default EvaluationTable;
