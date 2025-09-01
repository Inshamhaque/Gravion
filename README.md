# 🌌 Gravity Simulator

An **interactive gravity & orbital mechanics simulator** built with **HTML, CSS, and JavaScript**.  
Add planets, moons, comets, and asteroids to orbit around a customizable star and watch realistic orbital motion unfold.

---

## 🚀 Features
- **Click to Create Bodies**  
  - Left Click → Add planets  
  - Right Click → Add moons  
  - Shift + Click → Add comets/asteroids  

- **Dynamic Star Mass Control**  
  Adjust star mass (`0.5M☉ – 3M☉`) and watch how orbital speeds and periods change in real-time.

- **Physics Engine**  
  Implements simplified **Kepler’s Laws**:  
  - `F = GMm / r²`  
  - `v = √(GM / r)`  
  - `T = 2π√(r³ / GM)`  

- **Interactive UI**  
  - Toggle Gravity visualization 🌍  
  - Clear system 🗑  
  - Pause/Resume ⏸ ▶  
  - Trails and comet tails  

- **Detailed Body Stats** *(New Feature)*  
  Each body shows:  
  - Type (Planet, Moon, Comet, Asteroid)  
  - Relative distance (in px + AU-equivalent)  
  - Mass (in Earth-mass or relative units)  
  - Orbital speed (km/s)  
  - Orbital period (seconds)  

- **System Status Panel**  
  - Body count  
  - Total system mass  
  - Average orbital speed  

---

## 🎮 Controls
- **Mouse**  
  - Left Click → Add Planet  
  - Right Click → Add Moon  
  - Shift + Click → Add Comet/Asteroid  

- **Keyboard Shortcuts**  
  - `C` → Clear system  
  - `G` → Toggle gravity paths  
  - `↑` → Increase star mass  
  - `↓` → Decrease star mass  

---

## 🛠 Tech Stack
- HTML5  
- CSS3 (animations, gradients, trails)  
- Vanilla JavaScript (physics + interactions)

---

## 📦 Setup
1. Clone repo:
   ```bash
   git clone https://github.com/your-username/gravity-simulator.git
   cd gravity-simulator
