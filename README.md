✍️ AI-Powered Virtual Whiteboard for Mathematical Problem Solving
A real-time hand gesture-controlled virtual whiteboard that captures handwritten mathematical equations via webcam and solves them using AI.

📌 Project Overview
This application uses computer vision and AI to let users write math equations in the air using their finger. The system detects hand gestures via MediaPipe, renders strokes on a virtual canvas, processes the image, and sends it to the Google Gemini API for symbolic interpretation and solving.

🧩 Modules
ModuleTypeStatusDescriptionGesture Detection ModuleBackendIn ProgressHand landmark tracking with MediaPipe; Draw, Erase, Idle statesVirtual Canvas SystemBackendIn ProgressNumPy-powered rendering layer capturing fingertip trajectoriesImage Processing PipelineBackendIn ProgressGrayscale conversion, thresholding, resizing, noise removalReal-Time Video Feed HandlerBackendIn ProgressOpenCV webcam capture with async initializationSession State ManagerBackendIn ProgressPersistent drawing history and undo/redo across Streamlit rerunsAI Solver IntegrationBackendPlannedGoogle Gemini API integration for equation interpretationStreamlit DashboardFrontendPlannedFull-stack UI showing webcam feed, canvas, and solutionsNumerical Methods EngineBackendPlannedSymPy-based symbolic computation and numerical problem solving

🛠️ Tech Stack

Python 3.10+
MediaPipe — hand landmark detection
OpenCV — webcam capture and frame processing
NumPy — virtual canvas rendering
Pillow (PIL) — image preprocessing
Streamlit — web-based dashboard UI
Google Gemini API — AI-powered equation interpretation
SymPy — symbolic math computation


⚙️ Setup & Installation
1. Clone the repository
bashgit clone https://github.com/<your-username>/virtual-whiteboard.git
cd virtual-whiteboard
2. Create and activate a virtual environment
bashpython -m venv venv
source venv/bin/activate        # macOS/Linux
venv\Scripts\activate           # Windows
3. Install dependencies
bashpip install -r requirements.txt
4. Set up your Gemini API key
Create a .env file in the project root:
GEMINI_API_KEY=your_api_key_here
5. Run the application
bashstreamlit run app.py
The app will be available at https://milestone-3-status-r-8hat.bolt.host

🖐️ Gesture Controls
GestureActionIndex finger up (Draw mode)Draw on canvasIndex + Middle fingers up (Erase mode)Erase strokesFist / all fingers down (Idle mode)Pause drawing

📁 Project Structure
virtual-whiteboard/
├── app.py                  # Streamlit entry point
├── gesture_detector.py     # MediaPipe hand landmark detection
├── canvas.py               # NumPy virtual canvas system
├── image_processor.py      # Image preprocessing pipeline
├── video_feed.py           # Webcam capture handler
├── session_manager.py      # Streamlit session state manager
├── ai_solver.py            # Gemini API integration (planned)
├── math_engine.py          # SymPy numerical engine (planned)
├── requirements.txt
├── .env.example
└── README.md

📊 Milestone 3 Progress

✅ Hand landmark detection with MediaPipe (21-point tracking)
✅ Gesture state recognition (Draw / Erase / Idle)
✅ Virtual canvas rendering with NumPy
✅ Image preprocessing pipeline (grayscale, thresholding, noise removal)
✅ Lighting compensation (adaptive brightness adjustment)
✅ Performance optimization (frame skipping, coordinate smoothing)
✅ Memory management (frame buffer + garbage collection)
✅ Async webcam loading with fallback
✅ Comprehensive error handling
🔄 Gemini API integration (in progress)
⬜ Streamlit Dashboard (planned)
⬜ Numerical Methods Engine (planned)


🐛 Known Issues
IssueSeverityStatusAI model false positives on overlapping symbolsMediumIn ProgressReal-time latency exceeds 3s targetHighIn Progress

📝 License
This project is developed as part of an academic course milestone. All rights reserved.


