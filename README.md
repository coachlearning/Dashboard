# Student Performance Dashboard

A comprehensive bilingual (English/Japanese) dashboard for tracking student performance and university admission requirements for the EJU (Examination for Japanese University Admission for International Students).

## 🎯 Overview

This dashboard provides three main functionalities:

1. **Student Performance Tracking** - Monitor individual student progress across different subjects
2. **University Requirements Analysis** - View admission requirements and lowest passing grades for Japanese universities
3. **University Matching** - Find suitable universities based on student performance and difficulty preferences

## ✨ Features

### 🌐 Bilingual Support
- Full English and Japanese language support
- Toggle between languages with a single click
- Persistent language preference storage

### 📊 Student Section
- **Individual Student Tracking**: Select students and view their performance over time
- **Test Score Visualization**: Radar charts showing subject performance
- **Study Hours Tracking**: Pie charts displaying time allocation across subjects
- **Detailed Score Tables**: Comprehensive breakdown of all subject scores

### 🏫 University Section
- **Comprehensive University Database**: 4,000+ university departments across Japan
- **Dual Data Visualization**: 
  - University requirements (average scores)
  - Lowest passing grades
- **Advanced Filtering**: Search by university, subject, year, month, and department
- **Admission Statistics**: Applicants, admitted students, and acceptance rates
- **Interactive Radar Charts**: Compare requirements vs. lowest passing grades

### 🎯 Match Section
- **Smart University Matching**: Find universities based on student performance
- **Difficulty Levels**: Easy, Medium, and Hard matching options
- **Performance Comparison**: Student scores vs. university averages
- **Detailed Match Results**: Comprehensive university information with statistics

### 🎨 User Interface
- **Modern Design**: Clean, responsive interface with smooth animations
- **Custom Dropdowns**: Searchable and filterable selection components
- **Interactive Charts**: Chart.js powered visualizations
- **Mobile Responsive**: Works seamlessly on all device sizes

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Charts**: Chart.js 4.4.0
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Google Fonts (Open Sans, Poppins)
- **Data Processing**: Python with Pandas (backend preprocessing)

## 📁 Project Structure

```
Dashboard/
├── index.html              # Main HTML file
├── script.js               # Main JavaScript application
├── style.css               # Styles and responsive design
├── university.json         # University requirements data
├── university_lowest.json  # Lowest passing grades data
├── test.json              # Sample student data
└── backend/
    ├── preprocess.ipynb    # Data preprocessing notebook
    ├── 2022-2024_EJU_analysis(F).xlsx    # Source university data
    └── 2022-2024_EJU_lowest(F).xlsx      # Source lowest grades data
    └── 2022-2024_test.xlsx      # Source student test grades data
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3.7+ (for data preprocessing)
- Pandas library (for data processing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Dashboard.git
   cd Dashboard
   ```

2. **Set up the development server**
   
   **Option A: Python HTTP Server**
   ```bash
   python -m http.server 8000
   ```
   
   **Option B: Node.js (if you have Node.js installed)**
   ```bash
   npx http-server
   ```
   
   **Option C: Live Server (VS Code extension)**
   - Install "Live Server" extension
   - Right-click on `index.html` → "Open with Live Server"

3. **Open your browser**
   - Navigate to `http://localhost:8000`
   - The dashboard should load with sample data

### Data Processing (Optional)

If you need to update the university data:

1. **Install Python dependencies**
   ```bash
   pip install pandas openpyxl
   ```

2. **Update source Excel files** in the `backend/` directory

3. **Run the preprocessing notebook**
   ```bash
   jupyter notebook backend/preprocess.ipynb
   ```

4. **Copy generated JSON files** to the root directory

## 📊 Data Sources

The dashboard uses data from:
- **EJU Analysis Data**: University admission requirements and statistics
- **EJU Lowest Data**: Minimum passing scores for each department
- **Student Performance Data**: Individual student test scores and study hours

## 🎮 Usage Guide

### Student Performance Tracking
1. Select a student from the dropdown
2. Choose a test date
3. View performance charts and detailed score tables
4. Analyze study time distribution

### University Requirements Analysis
1. Navigate to the "University" tab
2. Search and select a university
3. Filter by subject, year, month, and department
4. Compare requirements vs. lowest passing grades
5. View admission statistics

### University Matching
1. Navigate to the "Match" tab
2. Select a student and test date
3. Choose year, month, and difficulty level
4. View matched universities with detailed information
5. Compare student performance with university requirements

## 🌐 Deployment

### GitHub Pages (Recommended)
1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select source branch (trail)
4. Your dashboard will be available at `https://yourusername.github.io/repo-name/`

### Other Hosting Options
- **Netlify**: Drag and drop deployment
- **Vercel**: Automatic deployment from GitHub
- **Firebase Hosting**: Google's hosting solution

## 🔧 Customization

### Adding New Students
1. Update the `test.json` file with new student data
2. Follow the existing data structure
3. Include all required fields (ID, name, scores, etc.)

### Modifying University Data
1. Update the Excel files in the `backend/` directory
2. Run the preprocessing notebook
3. Replace the JSON files in the root directory

### Styling Changes
- Modify `style.css` for visual changes
- Update color schemes, fonts, or layout
- Add new CSS classes for custom components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mingshuo Zhu**
- GitHub: [@Mingshuo1230](https://github.com/Mingshuo123o)
- Email: m.s.zhu[at]outlook.jp

## 🙏 Acknowledgments

- Chart.js for the excellent charting library
- Font Awesome for the beautiful icons
- Google Fonts for the typography
- The publishing house Sougakusya for providing the admission data

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/Mingshuo1230/Dashboard/issues) page
2. Create a new issue with detailed information
3. Contact the author directly

---

**Note**: This dashboard is designed for educational purposes and uses real EJU admission data. Always verify information with official university sources for actual admission decisions. 