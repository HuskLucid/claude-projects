// --- i18n ---
const translations = {
    en: {
        title: "Focus on Studies",
        welcome: "Welcome to your professional study environment.",
        timerTitle: "Pomodoro Timer",
        start: "Start",
        pause: "Pause",
        reset: "Reset",
        taskTitle: "Task Manager",
        taskPlaceholder: "Add a new task...",
        add: "Add",
        notepadTitle: "Quick Notes",
        notepadPlaceholder: "Jot down quick thoughts..."
    },
    es: {
        title: "Concéntrate en tus Estudios",
        welcome: "Bienvenido a tu entorno de estudio profesional.",
        timerTitle: "Temporizador Pomodoro",
        start: "Iniciar",
        pause: "Pausar",
        reset: "Reiniciar",
        taskTitle: "Administrador de Tareas",
        taskPlaceholder: "Añadir una nueva tarea...",
        add: "Añadir",
        notepadTitle: "Notas Rápidas",
        notepadPlaceholder: "Anota pensamientos rápidos..."
    },
    fr: {
        title: "Concentration sur les Études",
        welcome: "Bienvenue dans votre environnement d'étude professionnel.",
        timerTitle: "Minuteur Pomodoro",
        start: "Démarrer",
        pause: "Pause",
        reset: "Réinitialiser",
        taskTitle: "Gestionnaire de Tâches",
        taskPlaceholder: "Ajouter une nouvelle tâche...",
        add: "Ajouter",
        notepadTitle: "Notes Rapides",
        notepadPlaceholder: "Notez vos pensées rapides..."
    }
};

const langSelect = document.getElementById('lang-select');
langSelect.addEventListener('change', (e) => {
    const lang = e.target.value;
    const t = translations[lang];

    document.getElementById('app-title').textContent = t.title;
    document.getElementById('welcome').textContent = t.welcome;
    document.getElementById('timer-title').textContent = t.timerTitle;
    document.getElementById('start-btn').textContent = t.start;
    document.getElementById('pause-btn').textContent = t.pause;
    document.getElementById('reset-btn').textContent = t.reset;
    document.getElementById('task-title').textContent = t.taskTitle;
    document.getElementById('task-input').placeholder = t.taskPlaceholder;
    document.getElementById('add-task-btn').textContent = t.add;
    document.getElementById('notepad-title').textContent = t.notepadTitle;
    document.getElementById('notepad').placeholder = t.notepadPlaceholder;
});


// --- Pomodoro Timer ---
let timerInterval;
let timeLeft = 25 * 60; // 25 minutes in seconds
let isRunning = false;

const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

startBtn.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                isRunning = false;
                alert('Pomodoro session completed! Take a break.');
            }
        }, 1000);
    }
});

pauseBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    isRunning = false;
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = 25 * 60;
    updateTimerDisplay();
});


// --- Task Manager ---
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

addTaskBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text) {
        addTask(text);
        taskInput.value = '';
    }
});

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const text = taskInput.value.trim();
        if (text) {
            addTask(text);
            taskInput.value = '';
        }
    }
});

function addTask(text) {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
        li.classList.toggle('task-completed', checkbox.checked);
    });

    const span = document.createElement('span');
    span.classList.add('task-text');
    span.textContent = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'X';
    deleteBtn.addEventListener('click', () => {
        li.remove();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}


// --- Notepad ---
const notepad = document.getElementById('notepad');

// Load saved notes
const savedNotes = localStorage.getItem('studyNotepad');
if (savedNotes) {
    notepad.value = savedNotes;
}

// Save notes on input
notepad.addEventListener('input', () => {
    localStorage.setItem('studyNotepad', notepad.value);
});
