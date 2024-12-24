# 3D Solar System Portfolio

A stunning 3D solar system visualization built with Three.js, featuring an interactive planetary system that serves as a creative portfolio display.

## 🌟 Features

- Realistic 3D solar system with 9 planets
- Fixed 45-degree viewing angle for optimal visualization
- Interactive planets with information panels
- Beautiful starfield background with dynamic and static stars
- Smooth orbital animations
- Planetary glow effects
- Saturn's rings implementation
- Zoom functionality for detailed viewing

## 🚀 Technologies Used

- Three.js
- JavaScript (ES6+)
- HTML5
- CSS3

## 📁 Project Structure
solar-system-portfolio/
├── index.html
├── README.md
├── css/
│ └── style.css
├── js/
│ ├── main.js
│ ├── SolarSystem.js
│ ├── Planet.js
│ ├── Stars.js
│ ├── Moon.js
│ └── CelestialObject.js
└── assets/
└── textures/
├── circle.png
├── sun.jpg
├── mercury.jpg
├── venus.jpg
├── earth.jpg
├── mars.jpg
├── jupiter.jpg
├── saturn.jpg
├── saturn_rings.png
├── uranus.jpg
├── neptune.jpg
└── pluto.jpg

## 🛠️ Setup and Installation

1. Clone the repository:
bash
git clone https://github.com/yourusername/solar-system-portfolio.git

2. Navigate to the project directory:
bash
cd solar-system-portfolio  

3. Set up a local server (you can use Python's built-in server or any other local server):
bash
python -m http.server 8000

4. Open your browser and visit:
http://localhost:8000


## 🎮 Controls

- **Zoom**: Mouse wheel / Pinch gesture
- **Click**: Select planet to view information
- **Close Button**: Close information panel

## 🪐 Planet Configuration

Each planet can be configured with the following properties:
- Orbit radius
- Planet size
- Rotation speed
- Orbit speed
- Texture
- Glow color
- Custom information

## 📝 Customization

1. Update personal information in `SolarSystem.js`:
javascript
sunGroup.userData.info = {
name: "Your Name",
title: "Your Title",
email: "your.email@example.com",
github: "https://github.com/yourusername",
linkedin: "https://linkedin.com/in/yourusername"
};

2. Modify planet properties in `planetConfigs` array in `SolarSystem.js`

## 🖼️ Textures

Planet textures should be placed in the `assets/textures/` directory. You can obtain high-quality planet textures from:
- [Solar System Scope](https://www.solarsystemscope.com/textures/)
- NASA's image library
- Space Engine textures

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details

## 🙏 Acknowledgments

- Three.js community
- NASA for planetary textures
- Solar System Scope for reference textures
- Original inspiration from various space visualization projects

## 📧 Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/solar-system-portfolio](https://github.com/yourusername/solar-system-portfolio)

2. Modify planet properties in `planetConfigs` array in `SolarSystem.js`

## 🖼️ Textures

Planet textures should be placed in the `assets/textures/` directory. You can obtain high-quality planet textures from:
- [Solar System Scope](https://www.solarsystemscope.com/textures/)
- NASA's image library
- Space Engine textures

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details

## 🙏 Acknowledgments

- Three.js community
- NASA for planetary textures
- Solar System Scope for reference textures
- Original inspiration from various space visualization projects

## 📧 Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/solar-system-portfolio](https://github.com/akshaysenn/Solar-System)
