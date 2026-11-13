/**
 * CampusCARE - Shared Data Store & State Management
 * Works seamlessly offline / via file:// and with backend servers
 */

const STORAGE_KEY = 'campuscare_complaints_v1';
const USER_KEY = 'campuscare_current_user_v1';
const WALLPAPER_KEY = 'campuscare_wallpaper_v1';

// Seed initial complaints if none exist (All example problems have no images)
const DEFAULT_COMPLAINTS = [
    {
        id: "CC-2026-1001",
        studentName: "Thanush",
        studentUsn: "4MT22CS223",
        year: "2nd Year",
        department: "Computer Science & Engineering",
        category: "wi-fi",
        categoryLabel: "Wi-Fi & Network",
        location: "CS Block, 3rd Floor, 306",
        priority: "High",
        title: "Intermittent Wi-Fi connectivity and high packet loss",
        description: "The primary Wi-Fi access point 'CAMPUS-STUDENT-5G' frequently drops connection during practical programming lab sessions. Students are unable to fetch repositories or access online compilers.",
        image: null,
        createdAt: "2026-10-01 10:30 AM",
        timestamp: Date.now() - 86400000 * 1.5,
        status: "In Progress",
        assignedTo: "Mr. Satish (IT Network Admin)",
        resolutionNotes: "Replaced faulty PoE injector switch on 3rd floor. Currently monitoring bandwidth stability.",
        resolvedAt: null,
        studentRating: null,
        studentFeedback: null
    },
    {
        id: "CC-2026-1002",
        studentName: "Shreya Naik",
        studentUsn: "4MT22IS089",
        year: "4th Year",
        department: "Information Science & Engineering",
        category: "electricity",
        categoryLabel: "Electricity & Lighting",
        location: "Main Block, Seminar Hall 2",
        priority: "Urgent",
        title: "Ceiling fan sparking and flickering LED tube",
        description: "Ceiling fan #3 makes a heavy rattling noise and sparks were observed when turned to speed 5. Also the projector power outlet is tripped. Urgent check needed for safety.",
        image: null,
        createdAt: "2026-09-30 02:15 PM",
        timestamp: Date.now() - 86400000 * 2.5,
        status: "Resolved",
        assignedTo: "Electrical Maintenance Cell",
        resolutionNotes: "Faulty regulator replaced, wiring re-insulated and projector line circuit breaker reset. Tested safe.",
        resolvedAt: "2026-10-01 11:00 AM",
        studentRating: 5,
        studentFeedback: "Quick action taken within 24 hours. The fan is running smoothly and safe now. Thank you!"
    },
    {
        id: "CC-2026-1003",
        studentName: "Firas Ahmed",
        studentUsn: "4MT23EC018",
        year: "2nd Year",
        department: "Electronics & Communication",
        category: "water",
        categoryLabel: "Water & Plumbing",
        location: "Boys Hostel Block B, 2nd Floor Washroom",
        priority: "High",
        title: "Continuous tap leakage and low water pressure",
        description: "Two taps in the morning washroom area are continuously dripping causing water wastage, and the hot water geyser outlet valve is jammed.",
        image: null,
        createdAt: "2026-10-02 08:45 AM",
        timestamp: Date.now() - 86400000 * 0.4,
        status: "Pending",
        assignedTo: "Unassigned",
        resolutionNotes: "",
        resolvedAt: null,
        studentRating: null,
        studentFeedback: null
    },
    {
        id: "CC-2026-1004",
        studentName: "Ziya Parveen",
        studentUsn: "4MT21ME032",
        year: "4th Year",
        department: "Mechanical Engineering",
        category: "furniture",
        categoryLabel: "Furniture & Infrastructure",
        location: "Mechanical Block, Design Studio 102",
        priority: "Medium",
        title: "Broken drafting table clamps and missing chair cushions",
        description: "Three drafting tables in row B have broken tilt adjustment locks causing the boards to slide down during CAD sketching.",
        image: null,
        createdAt: "2026-09-29 04:20 PM",
        timestamp: Date.now() - 86400000 * 3.2,
        status: "Resolved",
        assignedTo: "Carpentry & Workshop Team",
        resolutionNotes: "Welded new locking bolts and replaced hinge nuts on all three drafting tables.",
        resolvedAt: "2026-09-30 05:00 PM",
        studentRating: 4,
        studentFeedback: "Fixed properly, tables are sturdy now."
    },
    {
        id: "CC-2026-1005",
        studentName: "Vijeth Kumar",
        studentUsn: "4MT23AI012",
        year: "2nd Year",
        department: "Artificial Intelligence & Data Science",
        category: "cleanliness",
        categoryLabel: "Cleanliness & Sanitation",
        location: "Central Library, 1st Floor Reference Section",
        priority: "Low",
        title: "Dust accumulation on bookshelf racks 14-18",
        description: "The AI and ML book racks have not been vacuumed this week, dusty books causing sneezing among students studying there.",
        image: null,
        createdAt: "2026-10-02 01:10 PM",
        timestamp: Date.now() - 86400000 * 0.1,
        status: "Pending",
        assignedTo: "Unassigned",
        resolutionNotes: "",
        resolvedAt: null,
        studentRating: null,
        studentFeedback: null
    }
];

// Available Campus Wallpapers
const WALLPAPERS = [
    { id: 'bg2', name: 'Curved Glass Campus (Default)', url: 'campus-background2.jpeg' },
    { id: 'bg1', name: 'Modern Campus Walkway', url: 'campus-background.jpeg' },
    { id: 'bg3', name: 'Gothic Heritage Hall', url: 'campus-background3.jpeg' },
    { id: 'bg4', name: 'Historic Quadrangle', url: 'campus-background4.jpeg' }
];

// Category Icons and Colors
const CATEGORY_META = {
    'classroom': { label: 'Classroom & AC', icon: '🏫', color: '#3b82f6' },
    'electricity': { label: 'Electricity & Lighting', icon: '⚡', color: '#f59e0b' },
    'water': { label: 'Water & Plumbing', icon: '🚰', color: '#06b6d4' },
    'furniture': { label: 'Furniture & Desks', icon: '🪑', color: '#8b5cf6' },
    'wi-fi': { label: 'Wi-Fi & IT Systems', icon: '📶', color: '#10b981' },
    'washroom': { label: 'Washroom & Hygiene', icon: '🧼', color: '#ec4899' },
    'cleanliness': { label: 'Cleanliness & Waste', icon: '🧹', color: '#14b8a6' },
    'lab': { label: 'Lab & Equipment', icon: '🔬', color: '#6366f1' },
    'cafeteria': { label: 'Cafeteria & Food', icon: '🍔', color: '#f97316' },
    'security': { label: 'Safety & Security', icon: '🛡️', color: '#ef4444' }
};

// Priority Badges
const PRIORITY_META = {
    'Urgent': { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)', border: '#f87171', icon: '🚨' },
    'High': { color: '#f97316', bg: 'rgba(249, 115, 22, 0.15)', border: '#fb923c', icon: '⚠️' },
    'Medium': { color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)', border: '#60a5fa', icon: '🔷' },
    'Low': { color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)', border: '#34d399', icon: '🟢' }
};

// Status Badges
const STATUS_META = {
    'Pending': { color: '#eab308', bg: 'rgba(234, 179, 8, 0.15)', border: '#facc15', icon: '⏳' },
    'In Progress': { color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)', border: '#60a5fa', icon: '🔄' },
    'Resolved': { color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)', border: '#34d399', icon: '✅' },
    'Rejected': { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)', border: '#f87171', icon: '❌' }
};

// Initialize DB and sanitize legacy example images if stored in localStorage
function initDataStore() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_COMPLAINTS));
        } else {
            // Automatically strip images from example complaints or any campus-background mockup images
            let list = JSON.parse(stored);
            let updated = false;
            if (Array.isArray(list)) {
                list.forEach(c => {
                    const isExampleTicket = ['CC-2026-1001', 'CC-2026-1002', 'CC-2026-1003', 'CC-2026-1004', 'CC-2026-1005'].includes(c.id);
                    const isBackgroundMockImage = typeof c.image === 'string' && c.image.toLowerCase().includes('campus-background');
                    if (c.image && (isExampleTicket || isBackgroundMockImage)) {
                        c.image = null;
                        updated = true;
                    }
                });
                if (updated) {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
                }
            }
        }
    } catch (e) {
        console.warn('LocalStorage error, using in-memory defaults:', e);
    }
}

// Get all complaints
function getAllComplaints() {
    initDataStore();
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : DEFAULT_COMPLAINTS;
    } catch (e) {
        return DEFAULT_COMPLAINTS;
    }
}

// Save all complaints
function saveAllComplaints(list) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
        // Broadcast custom event for intra-tab updates
        window.dispatchEvent(new CustomEvent('campuscare_updated'));
    } catch (e) {
        console.error('Failed to save complaints to localStorage:', e);
    }
}

// Add a new complaint
function addComplaint(complaint) {
    const list = getAllComplaints();
    const newId = "CC-2026-" + Math.floor(1000 + Math.random() * 9000);
    const newObj = {
        id: newId,
        studentName: complaint.studentName || 'Student',
        studentUsn: (complaint.studentUsn || '4MT22CS001').toUpperCase().trim(),
        year: complaint.year || '3rd Year',
        department: complaint.department || 'General',
        category: complaint.category || 'classroom',
        categoryLabel: CATEGORY_META[complaint.category]?.label || complaint.category,
        location: complaint.location || 'Campus Premises',
        priority: complaint.priority || 'Medium',
        title: complaint.title || (complaint.description ? complaint.description.substring(0, 50) + '...' : 'Reported Campus Issue'),
        description: complaint.description || '',
        image: complaint.image || null,
        createdAt: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
        timestamp: Date.now(),
        status: 'Pending',
        assignedTo: 'Unassigned',
        resolutionNotes: '',
        resolvedAt: null,
        studentRating: null,
        studentFeedback: null
    };

    list.unshift(newObj);
    saveAllComplaints(list);
    return newObj;
}

// Update an existing complaint
function updateComplaint(id, updates) {
    const list = getAllComplaints();
    const index = list.findIndex(c => c.id === id);
    if (index !== -1) {
        list[index] = { ...list[index], ...updates };
        saveAllComplaints(list);
        return list[index];
    }
    return null;
}

// Delete complaint
function deleteComplaint(id) {
    let list = getAllComplaints();
    const initialLen = list.length;
    list = list.filter(c => c.id !== id);
    if (list.length !== initialLen) {
        saveAllComplaints(list);
        return true;
    }
    return false;
}

// Remove image from complaint
function removeComplaintImage(id) {
    return updateComplaint(id, { image: null });
}

// Current User Session Management
function getCurrentUser() {
    try {
        const user = localStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
    } catch (e) {
        return null;
    }
}

function setCurrentUser(user) {
    try {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (e) {
        console.error(e);
    }
}

function logoutUser() {
    try {
        localStorage.removeItem(USER_KEY);
    } catch (e) {
        console.error(e);
    }
    window.location.href = "index.html";
}

// Wallpaper Manager
function getSavedWallpaper() {
    try {
        return localStorage.getItem(WALLPAPER_KEY) || 'campus-background2.jpeg';
    } catch (e) {
        return 'campus-background2.jpeg';
    }
}

function setWallpaper(url) {
    try {
        localStorage.setItem(WALLPAPER_KEY, url);
    } catch (e) {}
    applyWallpaper();
}

function applyWallpaper() {
    const url = getSavedWallpaper();
    const bgContainer = document.querySelector('.campus-wallpaper-bg') || document.body;
    if (bgContainer) {
        bgContainer.style.backgroundImage = `linear-gradient(rgba(10, 15, 29, 0.72), rgba(15, 23, 42, 0.84)), url('${url}')`;
        bgContainer.style.backgroundSize = 'cover';
        bgContainer.style.backgroundPosition = 'center';
        bgContainer.style.backgroundAttachment = 'fixed';
    }
}

// Analytics Aggregator
function getSystemStats() {
    const list = getAllComplaints();
    const total = list.length;
    const resolved = list.filter(c => c.status === 'Resolved').length;
    const pending = list.filter(c => c.status === 'Pending').length;
    const inProgress = list.filter(c => c.status === 'In Progress').length;
    const rate = total > 0 ? Math.round((resolved / total) * 100) : 100;
    
    // Average rating
    const rated = list.filter(c => c.studentRating > 0);
    const avgRating = rated.length > 0 ? (rated.reduce((sum, c) => sum + c.studentRating, 0) / rated.length).toFixed(1) : "4.9";

    return { total, resolved, pending, inProgress, rate, avgRating };
}

// Export complaints to CSV
function exportComplaintsCSV() {
    const list = getAllComplaints();
    if (!list.length) {
        alert("No complaints available to export.");
        return;
    }

    const headers = ["Ticket ID", "Date", "Student USN", "Student Name", "Department", "Category", "Location", "Priority", "Status", "Assigned Staff", "Resolution Notes", "Rating"];
    const rows = list.map(c => [
        `"${c.id}"`,
        `"${c.createdAt}"`,
        `"${c.studentUsn}"`,
        `"${c.studentName}"`,
        `"${c.department}"`,
        `"${c.categoryLabel}"`,
        `"${c.location.replace(/"/g, '""')}"`,
        `"${c.priority}"`,
        `"${c.status}"`,
        `"${(c.assignedTo || 'Unassigned').replace(/"/g, '""')}"`,
        `"${(c.resolutionNotes || '').replace(/"/g, '""')}"`,
        `"${c.studentRating ? c.studentRating + ' Stars' : 'Not Rated'}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CampusCARE_Grievances_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Auto-run DB init on script load
initDataStore();
