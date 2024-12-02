// import React, { useState } from 'react';
// import axios from 'axios';

// const roadmapData = {
//     frontend: {
//         HTML: ["div html", "span html", "anchor tag html", "input html", "form html"],
//         CSS: ["Flexbox CSS", "Grid CSS", "Animations CSS", "Media Queries CSS"],
//         JavaScript: ["ES6+ JavaScript", "DOM Manipulation JavaScript", "Fetch API JavaScript", "Promises JavaScript", "Async/Await JavaScript"],
//         TypeScript: ["Types TypeScript", "Interfaces TypeScript", "Generics TypeScript", "Decorators TypeScript"],
//         React: ["Hooks React", "State Management React", "React Router React", "Context API React"],
//         Vue: ["Vuex Vue", "Directives Vue", "Single File Components Vue", "Vue Router Vue"],
//         Angular: ["Components Angular", "Services Angular", "RxJS Angular", "Modules Angular"],
//     },
//     backend: {
//         Nodejs: ["Express Nodejs", "Event Loop Nodejs", "Streams Nodejs", "Modules Nodejs"],
//         Express: ["Routing Express", "Middleware Express", "Error Handling Express", "Authentication Express"],
//         Django: ["ORM Django", "Models Django", "Views Django", "Templates Django"],
//         Flask: ["Blueprints Flask", "Jinja2 Flask", "Werkzeug Flask", "Flask-SQLAlchemy Flask"],
//         Spring: ["MVC Spring", "Spring Boot", "Security", "JPA"],
//         RubyOnRails: ["Active Record RubyOnRails", "Action Cable RubyOnRails", "Routing RubyOnRails", "Testing RubyOnRails"],
//     },
//     devops: {
//         Docker: ["Images Docker", "Containers Docker", "Volumes Docker", "Docker Compose Docker"],
//         Kubernetes: ["Pods Kubernetes", "Services Kubernetes", "Deployments", "ConfigMaps"],
//         Terraform: ["Providers", "Modules", "State", "Workspaces"],
//         Jenkins: ["Pipelines", "Declarative Syntax", "Jenkinsfile", "Blue Ocean"],
//         CI_CD: ["Continuous Integration", "Continuous Deployment", "Version Control"],
//     },
//     cloud: {
//         AWS: ["EC2", "S3", "Lambda", "RDS", "VPC", "CloudFormation"],
//         Azure: ["Virtual Machines", "App Services", "Cosmos DB", "Azure Functions"],
//         GCP: ["Compute Engine", "Cloud Storage", "Kubernetes Engine", "Cloud Functions"],
//         Docker: ["Images", "Containers", "Volumes", "Docker Compose"],
//         Kubernetes: ["Pods", "Services", "Deployments", "ConfigMaps"],
//     },
//     ai_ml: {
//         "Machine Learning": ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Neural Networks"],
//         "Deep Learning": ["CNN", "RNN", "Autoencoders", "GANs"],
//         "NLP": ["Tokenization", "Word Embeddings", "Transformers", "BERT", "GPT"],
//         "Computer Vision": ["Image Classification", "Object Detection", "Segmentation", "GANs"],
//         "AI Tools": ["TensorFlow", "PyTorch", "Keras", "scikit-learn"],
//     },
//     blockchain: {
//         Ethereum: ["Smart Contracts", "Solidity", "Web3.js", "IPFS"],
//         Hyperledger: ["Fabric", "Composer", "Chaincode", "Consensus Algorithms"],
//         SmartContracts: ["Solidity", "ERC-20", "ERC-721", "Gas Fees"],
//     },
//     database: {
//         MySQL: ["Joins", "Indexes", "Stored Procedures", "Triggers"],
//         PostgreSQL: ["PL/pgSQL", "Indexes", "JSONB", "Full Text Search"],
//         MongoDB: ["Aggregation", "Sharding", "Indexes", "Replication"],
//         Redis: ["Data Structures", "Persistence", "Pub/Sub", "Transactions"],
//     },
//     security: {
//         OWASP: ["Injection", "Cross-Site Scripting", "Security Misconfiguration", "Broken Authentication"],
//         "Penetration Testing": ["Reconnaissance", "Scanning", "Exploitation", "Reporting"],
//         Encryption: ["AES", "RSA", "SSL/TLS", "PGP"],
//         IdentityManagement: ["OAuth 2.0", "JWT", "Single Sign-On", "Multi-factor Authentication"],
//     },
//     ios: {
//         Swift: ["Syntax", "Optionals", "Closures", "Error Handling", "Generics"],
//         UIKit: ["UI Components", "Layouts", "Animation", "Auto Layout"],
//         SwiftUI: ["Views", "State Management", "Property Wrappers", "Combine Framework"],
//         CoreData: ["Models", "Fetching", "Saving", "Relationships"],
//         Networking: ["URLSession", "Alamofire", "Handling API Calls"],
//     },
//     mlops: {
//         "Model Training": ["Data Preprocessing", "Hyperparameter Tuning", "Distributed Training"],
//         "Model Deployment": ["Dockerizing ML Models", "Kubernetes for ML", "Serverless Deployment"],
//         "Monitoring": ["Model Drift Detection", "Data Drift", "Performance Monitoring"],
//         "ML Pipelines": ["Airflow", "Kubeflow", "MLflow", "CI/CD for ML"],
//     },
// };

// const Modal = ({ isOpen, onClose, onSelect }) => {
//     if (!isOpen) return null;

//     const handleSelect = (status) => {
//         onSelect(status);
//         onClose();
//     };

//     return (
//         <div style={modalStyles.overlay}>
//             <div style={modalStyles.container}>
//                 <h3>Select Status</h3>
//                 <ul style={modalStyles.list}>
//                     {["Done", "In Progress", "Skip"].map((status) => (
//                         <li key={status} onClick={() => handleSelect(status)} style={modalStyles.listItem}>
//                             {status}
//                         </li>
//                     ))}
//                 </ul>
//                 <button onClick={onClose} style={modalStyles.closeButton}>Close</button>
//             </div>
//         </div>
//     );
// };

// const Compo = () => {
//     const [field, setField] = useState('');
//     const [technologies, setTechnologies] = useState({});
//     const [selectedTech, setSelectedTech] = useState(null);
//     const [subtopics, setSubtopics] = useState([]);
//     const [videos, setVideos] = useState([]);
//     const [subtopicStatus, setSubtopicStatus] = useState({}); // State to track subtopic statuses
//     const [modalOpen, setModalOpen] = useState(false);
//     const [currentSubtopic, setCurrentSubtopic] = useState(null); // Track the subtopic being edited

//     const handleFieldChange = (e) => {
//         const selectedField = e.target.value;
//         setField(selectedField);
//         if (roadmapData[selectedField]) {
//             setTechnologies(roadmapData[selectedField]);
//             setSelectedTech(null);
//         } else {
//             setTechnologies({});
//         }
//     };

//     const fetchYoutubeVideos = async (topic) => {
//         try {
//             const response = await axios.get(`http://localhost:5001/search?topic=${topic}`);
//             const videoLinks = response.data.links.map(link => ({ title: topic, link }));
//             setVideos(videoLinks);
//         } catch (error) {
//             console.error('Error fetching videos:', error);
//         }
//     };

//     const handleTechClick = (tech) => {
//         setSelectedTech(tech);
//         setSubtopics(technologies[tech] || []);
//         fetchYoutubeVideos(tech);
//     };

//     const handleSubtopicClick = (subtopic) => {
//         fetchYoutubeVideos(subtopic);
//     };

//     const handleStatusChange = (subtopic, status) => {
//         setSubtopicStatus((prev) => ({ ...prev, [subtopic]: status })); // Update status for the specific subtopic
//     };

//     return (
//         <div style={styles.container}>
//             <h2 style={styles.heading}>Roadmap Suggestion</h2>
//             <select onChange={handleFieldChange} style={styles.select}>
//                 <option value="">Select a field</option>
//                 {Object.keys(roadmapData).map((field, index) => (
//                     <option key={index} value={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</option>
//                 ))}
//             </select>

//             <div style={styles.contentContainer}>
//                 <div style={styles.techList}>
//                     {Object.keys(technologies).length > 0 ? (
//                         <ul style={styles.list}>
//                             {Object.keys(technologies).map((tech, index) => (
//                                 <li
//                                     key={index}
//                                     onClick={() => handleTechClick(tech)}
//                                     style={styles.listItem}
//                                 >
//                                     {tech}
//                                 </li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p style={styles.noSuggestions}>No suggestions available. Please select a field.</p>
//                     )}
//                 </div>

//                 <div style={styles.subtopicContainer}>
//                     {selectedTech ? (
//                         <>
//                             <h3 style={styles.subtopicHeading}>{selectedTech} Subtopics</h3>
//                             <ul style={styles.sublist}>
//                                 {subtopics.map((subtopic, subIndex) => (
//                                     <li
//                                         key={subIndex}
//                                         onClick={() => handleSubtopicClick(subtopic)}
//                                         style={styles.subListItem}
//                                     >
//                                         <span style={styles.subtopicText}>{subtopic}</span>
//                                         <div style={styles.menu}>
//                                             <span
//                                                 style={styles.dotMenu}
//                                                 onClick={(e) => {
//                                                     e.stopPropagation();
//                                                     setCurrentSubtopic(subtopic);
//                                                     setModalOpen(true);
//                                                 }}
//                                             >
//                                                 ⋮
//                                             </span>
//                                         </div>
//                                         {/* Display the status if set */}

//                                     </li>
//                                 ))}
//                             </ul>
//                         </>
//                     ) : (
//                         <p style={styles.selectMessage}>Select a technology to view its subtopics.</p>
//                     )}
//                 </div>
//             </div>

//             <div style={styles.videoContainer}>
//                 <h3 style={styles.videoHeading}>Related YouTube Videos</h3>
//                 <div style={styles.videoGrid}>
//                     {videos.map((video, index) => (
//                         <div key={index} style={styles.videoCard}>
//                             <h4 style={styles.videoTitle}>{video.title}</h4>
//                             <a href={video.link} target="_blank" rel="noopener noreferrer" style={styles.videoLink}>
//                                 Watch on YouTube
//                             </a>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Modal for selecting status */}
//             <Modal
//                 isOpen={modalOpen}
//                 onClose={() => setModalOpen(false)}
//                 onSelect={(status) => handleStatusChange(currentSubtopic, status)}
//             />
//         </div>
//     );
// };

// // Styles for modal
// const modalStyles = {
//     overlay: {
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dimmed background
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     container: {
//         backgroundColor: '#ffffff', // White background for the modal
//         padding: '20px',
//         borderRadius: '10px',
//         width: '300px',
//         textAlign: 'center',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow for depth
//     },
//     title: {
//         marginBottom: '15px',
//         color: '#333333', // Dark color for the title
//         fontSize: '20px',
//     },
//     list: {
//         listStyleType: 'none',
//         padding: '0',
//     },
//     listItem: {
//         padding: '10px',
//         cursor: 'pointer',
//         transition: 'background-color 0.3s',
//         color: '#007bff', // Change color for better visibility
//         backgroundColor: '#f1f1f1', // Light background for items
//         borderRadius: '5px',
//         marginBottom: '5px',
//     },
//     closeButton: {
//         marginTop: '10px',
//         padding: '10px 20px',
//         backgroundColor: '#007bff',
//         color: '#fff',
//         border: 'none',
//         borderRadius: '5px',
//         cursor: 'pointer',
//     },
// };

// const styles = {
//     container: {
//         maxWidth: '900px',
//         margin: '50px auto',
//         padding: '20px',
//         backgroundColor: '#ffffff',
//         borderRadius: '10px',
//         boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//     },
//     heading: {
//         textAlign: 'center',
//         marginBottom: '20px',
//         color: '#333333',
//         fontSize: '24px',
//     },
//     select: {
//         width: '100%',
//         padding: '10px',
//         marginBottom: '20px',
//         borderRadius: '5px',
//         border: '1px solid #007bff',
//         backgroundColor: '#e0f7fa',
//         color: '#000000',
//     },
//     contentContainer: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         backgroundColor: '#f8f9fa',
//         padding: '15px',
//         borderRadius: '8px',
//     },
//     techList: {
//         flex: 1,
//         marginRight: '20px',
//         backgroundColor: '#e3f2fd',
//         borderRadius: '8px',
//         padding: '10px',
//     },
//     list: {
//         listStyleType: 'none',
//         padding: '0',
//     },
//     listItem: {
//         padding: '10px',
//         border: '1px solid #007bff',
//         borderRadius: '5px',
//         marginBottom: '10px',
//         cursor: 'pointer',
//         transition: 'background-color 0.3s',
//         backgroundColor: '#ffffff',
//         color: '#333333',
//     },
//     noSuggestions: {
//         textAlign: 'center',
//         color: '#dc3545',
//         fontSize: '18px',
//     },
//     subtopicContainer: {
//         flex: 2,
//         backgroundColor: '#e1bee7',
//         borderRadius: '8px',
//         padding: '10px',
//     },
//     subtopicHeading: {
//         textAlign: 'center',
//         color: '#6a1b9a',
//     },
//     sublist: {
//         listStyleType: 'none',
//         padding: '0',
//     },
//     subListItem: {
//         padding: '10px',
//         border: '1px solid #6a1b9a',
//         borderRadius: '5px',
//         marginBottom: '10px',
//         backgroundColor: '#ffffff',
//         position: 'relative',
//     },
//     subtopicText: {
//         color: '#6a1b9a',
//     },
//     menu: {
//         position: 'absolute',
//         right: '10px',
//         top: '10px',
//     },
//     dotMenu: {
//         cursor: 'pointer',
//         fontSize: '18px',
//         color: '#6a1b9a',
//     },
//     statusText: {
//         marginTop: '5px',
//         fontStyle: 'italic',
//         color: '#6a1b9a',
//     },
//     selectMessage: {
//         textAlign: 'center',
//         color: '#6a1b9a',
//     },
//     videoContainer: {
//         marginTop: '20px',
//     },
//     videoHeading: {
//         textAlign: 'center',
//         marginBottom: '10px',
//         color: '#333333',
//     },
//     videoGrid: {
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
//         gap: '10px',
//     },
//     videoCard: {
//         border: '1px solid #007bff',
//         borderRadius: '5px',
//         padding: '10px',
//         textAlign: 'center',
//         backgroundColor: '#ffffff',
//     },
//     videoTitle: {
//         fontSize: '14px',
//         marginBottom: '5px',
//         color: '#007bff',
//     },
//     videoLink: {
//         color: '#007bff',
//         textDecoration: 'underline',
//     },
// };

// export default Compo;
















































































import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const roadmapData = {
    frontend: {
        HTML: ["div html", "span html", "anchor tag html", "input html", "form html"],
        CSS: ["Flexbox CSS", "Grid CSS", "Animations CSS", "Media Queries CSS"],
        JavaScript: ["ES6+ JavaScript", "DOM Manipulation JavaScript", "Fetch API JavaScript", "Promises JavaScript", "Async/Await JavaScript"],
        TypeScript: ["Types TypeScript", "Interfaces TypeScript", "Generics TypeScript", "Decorators TypeScript"],
        React: ["Hooks React", "State Management React", "React Router React", "Context API React"],
        Vue: ["Vuex Vue", "Directives Vue", "Single File Components Vue", "Vue Router Vue"],
        Angular: ["Components Angular", "Services Angular", "RxJS Angular", "Modules Angular"],
    },
    backend: {
        Nodejs: ["Express Nodejs", "Event Loop Nodejs", "Streams Nodejs", "Modules Nodejs"],
        Express: ["Routing Express", "Middleware Express", "Error Handling Express", "Authentication Express"],
        Django: ["ORM Django", "Models Django", "Views Django", "Templates Django"],
        Flask: ["Blueprints Flask", "Jinja2 Flask", "Werkzeug Flask", "Flask-SQLAlchemy Flask"],
        Spring: ["MVC Spring", "Spring Boot", "Security", "JPA"],
        RubyOnRails: ["Active Record RubyOnRails", "Action Cable RubyOnRails", "Routing RubyOnRails", "Testing RubyOnRails"],
    },
    devops: {
        Docker: ["Images Docker", "Containers Docker", "Volumes Docker", "Docker Compose Docker"],
        Kubernetes: ["Pods Kubernetes", "Services Kubernetes", "Deployments", "ConfigMaps"],
        Terraform: ["Providers", "Modules", "State", "Workspaces"],
        Jenkins: ["Pipelines", "Declarative Syntax", "Jenkinsfile", "Blue Ocean"],
        CI_CD: ["Continuous Integration", "Continuous Deployment", "Version Control"],
    },
    cloud: {
        AWS: ["EC2", "S3", "Lambda", "RDS", "VPC", "CloudFormation"],
        Azure: ["Virtual Machines", "App Services", "Cosmos DB", "Azure Functions"],
        GCP: ["Compute Engine", "Cloud Storage", "Kubernetes Engine", "Cloud Functions"],
        Docker: ["Images", "Containers", "Volumes", "Docker Compose"],
        Kubernetes: ["Pods", "Services", "Deployments", "ConfigMaps"],
    },
    ai_ml: {
        "Machine Learning": ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Neural Networks"],
        "Deep Learning": ["CNN", "RNN", "Autoencoders", "GANs"],
        "NLP": ["Tokenization", "Word Embeddings", "Transformers", "BERT", "GPT"],
        "Computer Vision": ["Image Classification", "Object Detection", "Segmentation", "GANs"],
        "AI Tools": ["TensorFlow", "PyTorch", "Keras", "scikit-learn"],
    },
    blockchain: {
        Ethereum: ["Smart Contracts", "Solidity", "Web3.js", "IPFS"],
        Hyperledger: ["Fabric", "Composer", "Chaincode", "Consensus Algorithms"],
        SmartContracts: ["Solidity", "ERC-20", "ERC-721", "Gas Fees"],
    },
    database: {
        MySQL: ["Joins", "Indexes", "Stored Procedures", "Triggers"],
        PostgreSQL: ["PL/pgSQL", "Indexes", "JSONB", "Full Text Search"],
        MongoDB: ["Aggregation", "Sharding", "Indexes", "Replication"],
        Redis: ["Data Structures", "Persistence", "Pub/Sub", "Transactions"],
    },
    security: {
        OWASP: ["Injection", "Cross-Site Scripting", "Security Misconfiguration", "Broken Authentication"],
        "Penetration Testing": ["Reconnaissance", "Scanning", "Exploitation", "Reporting"],
        Encryption: ["AES", "RSA", "SSL/TLS", "PGP"],
        IdentityManagement: ["OAuth 2.0", "JWT", "Single Sign-On", "Multi-factor Authentication"],
    },
    ios: {
        Swift: ["Syntax", "Optionals", "Closures", "Error Handling", "Generics"],
        UIKit: ["UI Components", "Layouts", "Animation", "Auto Layout"],
        SwiftUI: ["Views", "State Management", "Property Wrappers", "Combine Framework"],
        CoreData: ["Models", "Fetching", "Saving", "Relationships"],
        Networking: ["URLSession", "Alamofire", "Handling API Calls"],
    },
    mlops: {
        "Model Training": ["Data Preprocessing", "Hyperparameter Tuning", "Distributed Training"],
        "Model Deployment": ["Dockerizing ML Models", "Kubernetes for ML", "Serverless Deployment"],
        "Monitoring": ["Model Drift Detection", "Data Drift", "Performance Monitoring"],
        "ML Pipelines": ["Airflow", "Kubeflow", "MLflow", "CI/CD for ML"],
    },
};


const Modal = ({ isOpen, onClose, onSelect }) => {
    if (!isOpen) return null;

    const handleSelect = (status) => {
        onSelect(status);
        onClose();
    };

    return (
        <div style={modalStyles.overlay}>
            <div style={modalStyles.container}>
                <h3>Select Status</h3>
                <ul style={modalStyles.list}>
                    {["Done", "In Progress", "Skip"].map((status) => (
                        <li key={status} onClick={() => handleSelect(status)} style={modalStyles.listItem}>
                            {status}
                        </li>
                    ))}
                </ul>
                <button onClick={onClose} style={modalStyles.closeButton}>Close</button>
            </div>
        </div>
    );
};

const getStatusColor = (status) => {
    switch (status) {
        case "In Progress":
            return "#fdd835"; // Yellow
        case "Done":
            return "#66bb6a"; // Green
        case "Skip":
            return "#ef5350"; // Red
        default:
            return "#ffffff"; // Default to white
    }
};
const Compo = () => {
    const [field, setField] = useState('');
    const [technologies, setTechnologies] = useState({});
    const [selectedTech, setSelectedTech] = useState(null);
    const [subtopics, setSubtopics] = useState([]);
    const [videos, setVideos] = useState([]);
    const [subtopicStatus, setSubtopicStatus] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [currentSubtopic, setCurrentSubtopic] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.log('User not logged in. Redirecting to login page...');
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchStatuses = async () => {
            const userId = localStorage.getItem('userId');
            if (userId && selectedTech) {
                try {
                    const response = await axios.get(`http://localhost:5001/api/status?userId=${userId}&tech=${selectedTech}`);
                    const fetchedStatuses = response.data; 
                    setSubtopicStatus(fetchedStatuses);
                } catch (error) {
                    console.error('Error fetching statuses:', error);
                }
            }
        };

        fetchStatuses();
    }, [selectedTech]);

    const handleFieldChange = (e) => {
        const selectedField = e.target.value;
        setField(selectedField);
        if (roadmapData[selectedField]) {
            setTechnologies(roadmapData[selectedField]);
            setSelectedTech(null);
            setSubtopics([]);
        } else {
            setTechnologies({});
        }
    };

    const handleTechClick = (tech) => {
        setSelectedTech(tech);
        setSubtopics(technologies[tech] || []);
        fetchYoutubeVideos(tech);
    };

    const fetchYoutubeVideos = async (topic) => {
        try {
            const response = await axios.get(`http://localhost:5001/search?topic=${topic}`);
            const videoLinks = response.data.links.map(link => ({ title: topic, link }));
            setVideos(videoLinks);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    const handleStatusChange = async (subtopic, status) => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            navigate('/login');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5001/api/status', {
                userId,
                subtopic,
                status,
            });

            // Update the local state only after successful status change
            if (response.status === 200) {
                setSubtopicStatus((prev) => ({ ...prev, [subtopic]: status }));
            }
        } catch (error) {
            console.error('Error saving status:', error);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Roadmap Suggestion</h2>
            <select onChange={handleFieldChange} style={styles.select}>
                <option value="">Select a field</option>
                {Object.keys(roadmapData).map((field, index) => (
                    <option key={index} value={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</option>
                ))}
            </select>

            <div style={styles.contentContainer}>
                <div style={styles.techList}>
                    <ul style={styles.list}>
                        {Object.keys(technologies).map((tech, index) => (
                            <li key={index} onClick={() => handleTechClick(tech)} style={styles.listItem}>
                                {tech}
                            </li>
                        ))}
                    </ul>
                </div>

                <div style={styles.subtopicContainer}>
                    {selectedTech ? (
                        <>
                            <h3 style={styles.subtopicHeading}>{selectedTech} Subtopics</h3>
                            <ul style={styles.sublist}>
                                {subtopics.map((subtopic, subIndex) => (
                                    <li
                                        key={subIndex}
                                        onClick={() => handleStatusChange(subtopic, currentSubtopic)}
                                        style={{
                                            ...styles.subListItem,
                                            backgroundColor: getStatusColor(subtopicStatus[subtopic]),
                                        }}
                                    >
                                        <span style={styles.subtopicText}>{subtopic}</span>
                                        <div style={styles.menu}>
                                            <span
                                                style={styles.dotMenu}
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent triggering the li click
                                                    setCurrentSubtopic(subtopic);
                                                    setModalOpen(true);
                                                }}
                                            >
                                                ⋮
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <p style={styles.selectMessage}>Select a technology to view its subtopics.</p>
                    )}
                </div>
            </div>

            <div style={styles.videoContainer}>
                <h3 style={styles.videoHeading}>Related YouTube Videos</h3>
                <div style={styles.videoGrid}>
                    {videos.map((video, index) => (
                        <div key={index} style={styles.videoCard}>
                            <h4 style={styles.videoTitle}>{video.title}</h4>
                            <a href={video.link} target="_blank" rel="noopener noreferrer" style={styles.videoLink}>
                                Watch on YouTube
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSelect={(status) => handleStatusChange(currentSubtopic, status)}
            />
        </div>
    );
};

const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dimmed background
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#ffffff', // White background for the modal
        padding: '20px',
        borderRadius: '10px',
        width: '300px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow for depth
    },
    title: {
        marginBottom: '15px',
        color: '#333333', // Dark color for the title
        fontSize: '20px',
    },
    list: {
        listStyleType: 'none',
        padding: '0',
    },
    listItem: {
        padding: '10px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        color: '#007bff', // Change color for better visibility
        backgroundColor: '#f1f1f1', // Light background for items
        borderRadius: '5px',
        marginBottom: '5px',
    },
    closeButton: {
        marginTop: '10px',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

const styles = {
    container: {
        maxWidth: '900px',
        margin: '50px auto',
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333333',
        fontSize: '24px',
    },
    select: {
        width: '100%',
        padding: '10px',
        marginBottom: '20px',
        borderRadius: '5px',
        border: '1px solid #007bff',
        backgroundColor: '#e0f7fa',
        color: '#000000',
    },
    contentContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#f8f9fa',
        padding: '15px',
        borderRadius: '8px',
    },
    techList: {
        flex: 1,
        marginRight: '20px',
        backgroundColor: '#e3f2fd',
        borderRadius: '8px',
        padding: '10px',
    },
    list: {
        listStyleType: 'none',
        padding: '0',
    },
    listItem: {
        padding: '10px',
        border: '1px solid #007bff',
        borderRadius: '5px',
        marginBottom: '10px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        backgroundColor: '#ffffff',
        color: '#333333',
    },
    noSuggestions: {
        textAlign: 'center',
        color: '#dc3545',
        fontSize: '18px',
    },
    subtopicContainer: {
        flex: 2,
        backgroundColor: '#e1bee7',
        borderRadius: '8px',
        padding: '10px',
    },
    subtopicHeading: {
        textAlign: 'center',
        color: '#6a1b9a',
    },
    sublist: {
        listStyleType: 'none',
        padding: '0',
    },
    subListItem: {
        padding: '10px',
        border: '1px solid #6a1b9a',
        borderRadius: '5px',
        marginBottom: '10px',
        backgroundColor: '#ffffff',
        position: 'relative',
    },
    subtopicText: {
        color: '#6a1b9a',
    },
    menu: {
        position: 'absolute',
        right: '10px',
        top: '10px',
    },
    dotMenu: {
        cursor: 'pointer',
        fontSize: '18px',
        color: '#6a1b9a',
    },
    statusText: {
        marginTop: '5px',
        fontStyle: 'italic',
        color: '#6a1b9a',
    },
    selectMessage: {
        textAlign: 'center',
        color: '#6a1b9a',
    },
    videoContainer: {
        marginTop: '20px',
    },
    videoHeading: {
        textAlign: 'center',
        marginBottom: '10px',
        color: '#333333',
    },
    videoGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '10px',
    },
    videoCard: {
        border: '1px solid #007bff',
        borderRadius: '5px',
        padding: '10px',
        textAlign: 'center',
        backgroundColor: '#ffffff',
    },
    videoTitle: {
        fontSize: '14px',
        marginBottom: '5px',
        color: '#007bff',
    },
    videoLink: {
        color: '#007bff',
        textDecoration: 'underline',
    },
};

export default Compo;









































































