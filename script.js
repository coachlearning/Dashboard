document.addEventListener("DOMContentLoaded", function () {
    // ==== LANGUAGE TOGGLE ====
    let currentLanguage = 'en'; // Default language
    
    const languageToggle = document.getElementById('language-toggle');
    const languageToggleText = languageToggle.querySelector('span');
    
    // Function to update all translatable elements
    function updateLanguage(lang) {
      currentLanguage = lang;
      
      // Update language toggle button
      languageToggleText.textContent = lang === 'en' ? 'EN' : 'JP';
      languageToggle.classList.toggle('active', lang === 'ja');
      
      // Update all elements with translation data attributes
      const translatableElements = document.querySelectorAll('[data-en][data-ja]');
      translatableElements.forEach(element => {
        const translation = element.getAttribute(`data-${lang}`);
        if (translation) {
          element.textContent = translation;
        }
      });
      
      // Update placeholders
      const translatableInputs = document.querySelectorAll('[data-en-placeholder][data-ja-placeholder]');
      translatableInputs.forEach(input => {
        const placeholder = input.getAttribute(`data-${lang}-placeholder`);
        if (placeholder) {
          input.placeholder = placeholder;
        }
      });
      
      // Update form labels
      const formLabels = document.querySelectorAll('label[data-en][data-ja]');
      formLabels.forEach(label => {
        const translation = label.getAttribute(`data-${lang}`);
        if (translation) {
          label.textContent = translation;
        }
      });
      
      // Update select options that were dynamically created
      updateDynamicSelectOptions(lang);
    }
    
    // Function to update dynamically created select options
    function updateDynamicSelectOptions(lang) {
      const selectOptions = document.querySelectorAll('.select-option[data-en][data-ja]');
      selectOptions.forEach(option => {
        const translation = option.getAttribute(`data-${lang}`);
        if (translation && option.textContent !== translation) {
          option.textContent = translation;
        }
      });
      
      const hiddenOptions = document.querySelectorAll('select option[data-en][data-ja]');
      hiddenOptions.forEach(option => {
        const translation = option.getAttribute(`data-${lang}`);
        if (translation && option.textContent !== translation) {
          option.textContent = translation;
        }
      });
    }
    
    // Language toggle click handler
    languageToggle.addEventListener('click', () => {
      const newLang = currentLanguage === 'en' ? 'ja' : 'en';
      updateLanguage(newLang);
      
      // Store language preference
      localStorage.setItem('dashboard-language', newLang);
    });
    
    // Initialize language from localStorage or default to English
    const savedLanguage = localStorage.getItem('dashboard-language') || 'en';
    updateLanguage(savedLanguage);

    // ==== CUSTOM SELECT DROPDOWNS ====
    function initializeCustomSelects() {
        const customSelects = document.querySelectorAll('.custom-select');
        
        customSelects.forEach(select => {
            const trigger = select.querySelector('.select-trigger');
            const options = select.querySelector('.select-options');
            const valueSpan = select.querySelector('.select-value');
            const hiddenSelect = select.nextElementSibling;
            const searchInput = select.querySelector('.select-search');
            
            // Toggle dropdown
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // Don't toggle if it's a searchable select and click is on the search input
                if (select.classList.contains('searchable') && e.target.classList.contains('select-search')) {
                    return;
                }
                
                // Close other open dropdowns
                customSelects.forEach(otherSelect => {
                    if (otherSelect !== select) {
                        otherSelect.classList.remove('open');
                    }
                });
                
                select.classList.toggle('open');
            });
            
            // Handle option selection
            options.addEventListener('click', (e) => {
                if (e.target.classList.contains('select-option')) {
                    const value = e.target.dataset.value;
                    const text = e.target.textContent;
                    
                    // Update display
                    if (valueSpan) {
                        valueSpan.textContent = text;
                    }
                    if (searchInput) {
                        searchInput.value = text;
                    }
                    
                    // Update hidden select
                    hiddenSelect.value = value;
                    
                    // Update selected state
                    options.querySelectorAll('.select-option').forEach(option => {
                        option.classList.remove('selected');
                    });
                    e.target.classList.add('selected');
                    
                    // Close dropdown
                    select.classList.remove('open');
                    
                    // Trigger change event on hidden select
                    const event = new Event('change', { bubbles: true });
                    hiddenSelect.dispatchEvent(event);
                }
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!select.contains(e.target)) {
                    select.classList.remove('open');
                }
            });
        });
    }
    
    // Initialize custom selects
    initializeCustomSelects();

    // ==== NAVIGATION LOGIC ====
    const studentBtn = document.getElementById("monthBtn");
    const universityBtn = document.getElementById("universityBtn");
    const matchBtn = document.getElementById("matchBtn");
  
    const studentPage = document.getElementById("studentPage");
    const universityPage = document.getElementById("universityPage");
    const matchPage = document.getElementById("matchPage");
    const addStudentPage = document.getElementById("addStudentPage");
  
    function showPage(pageToShow) {
      studentBtn.classList.remove("active");
      universityBtn.classList.remove("active");
      matchBtn.classList.remove("active");
  
      studentPage.classList.remove("active");
      universityPage.classList.remove("active");
      matchPage.classList.remove("active");
      addStudentPage.classList.remove("active");
  
      // Hide/show student select and info based on page
      const studentSelectContainer = document.querySelector('.select-container');
      const studentInfo = document.getElementById('student-info');
      
      if (pageToShow === "university") {
        universityBtn.classList.add("active");
        universityPage.classList.add("active");
        // Hide student select and info for university page
        studentSelectContainer.style.display = 'none';
        studentInfo.style.display = 'none';
      } else if (pageToShow === "match") {
        matchBtn.classList.add("active");
        matchPage.classList.add("active");
        // Show student select and info for match page
        studentSelectContainer.style.display = 'flex';
        studentInfo.style.display = 'flex';
      } else if (pageToShow === "addStudent") {
        addStudentPage.classList.add("active");
        // Hide student select and info for add student page
        studentSelectContainer.style.display = 'none';
        studentInfo.style.display = 'none';
      } else {
        // Show student select and info for other pages
        studentSelectContainer.style.display = 'flex';
        studentInfo.style.display = 'flex';
        
        if (pageToShow === "student") {
          studentBtn.classList.add("active");
          studentPage.classList.add("active");
        }
      }
    }
  
    studentBtn.addEventListener("click", () => showPage("student"));
    universityBtn.addEventListener("click", () => showPage("university"));
    matchBtn.addEventListener("click", () => showPage("match"));
  
    // ==== ADD STUDENT FUNCTIONALITY ====
    const addStudentHeaderBtn = document.getElementById("add-student-btn");
    const resetDataBtn = document.getElementById("reset-data-btn");
    const addStudentForm = document.getElementById("add-student-form");
    const resetFormBtn = document.getElementById("reset-form-btn");
    
    // Add event listener for header add student button
    addStudentHeaderBtn.addEventListener("click", () => showPage("addStudent"));
    
    // Add event listener for reset data button
    resetDataBtn.addEventListener("click", () => {
      if (confirm(currentLanguage === 'ja' 
        ? 'ローカルストレージのデータをクリアして、元のtest.jsonデータを再読み込みしますか？'
        : 'Clear local storage data and reload original test.json data?')) {
        localStorage.removeItem('dashboard-students');
        location.reload();
      }
    });
    
    // Form submission handler
    addStudentForm.addEventListener("submit", async function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(addStudentForm);
      const studentData = {};
      
      // Convert form data to object
      for (let [key, value] of formData.entries()) {
        if (value === '') {
          studentData[key] = null;
        } else if (key === '学籍番号') {
          studentData[key] = parseInt(value);
        } else {
          studentData[key] = value;
        }
      }
      
      // Validate required fields
      const requiredFields = ['学籍番号', '姓名', '日期', '科目', '志願'];
      const missingFields = requiredFields.filter(field => !studentData[field]);
      
      if (missingFields.length > 0) {
        const fieldNames = {
          '学籍番号': currentLanguage === 'ja' ? '学籍番号' : 'Student ID',
          '姓名': currentLanguage === 'ja' ? '姓名' : 'Name',
          '日期': currentLanguage === 'ja' ? '日期' : 'Date',
          '科目': currentLanguage === 'ja' ? '科目' : 'Subject',
          '志願': currentLanguage === 'ja' ? '志願' : 'Target Department'
        };
        
        const missingFieldNames = missingFields.map(field => fieldNames[field]).join(', ');
        const message = currentLanguage === 'ja' 
          ? `必須項目を入力してください: ${missingFieldNames}`
          : `Please fill in all required fields: ${missingFieldNames}`;
        showFormMessage('error', message);
        return;
      }
      
      try {
        // Load existing data from localStorage or fetch from JSON
        let existingData = [];
        
        // First try to get from localStorage
        const storedData = localStorage.getItem('dashboard-students');
        if (storedData) {
          existingData = JSON.parse(storedData);
        } else {
          // If no localStorage data, fetch from the original JSON file
          const response = await fetch('test.json');
          existingData = await response.json();
        }
        
        // Check if student ID already exists
        const existingStudent = existingData.find(student => 
          student.学籍番号 === studentData.学籍番号 && 
          student.日期 === studentData.日期
        );
        
        if (existingStudent) {
          const message = currentLanguage === 'ja' 
            ? 'この学籍番号と日付の学生は既に存在します。'
            : 'A student with this ID and date already exists.';
          showFormMessage('error', message);
          return;
        }
        
        // Add new student to the array
        existingData.push(studentData);
        
        // Save to localStorage
        localStorage.setItem('dashboard-students', JSON.stringify(existingData));
        
        // Show success message
        const successMessage = currentLanguage === 'ja' 
          ? '学生が正常に追加されました！（ローカルストレージに保存）'
          : 'Student added successfully! (Saved to local storage)';
        showFormMessage('success', successMessage);
        
        // Update the local students array
        students = existingData;
        
        // Refresh the student select dropdown
        populateStudentSelect();
        
        // Reset the form
        addStudentForm.reset();
        
        // Clear any existing messages after 3 seconds
        setTimeout(() => {
          clearFormMessage();
        }, 3000);
        
      } catch (error) {
        console.error('Error adding student:', error);
        const errorMessage = currentLanguage === 'ja' 
          ? '学生の追加中にエラーが発生しました。もう一度お試しください。'
          : 'Error adding student. Please try again.';
        showFormMessage('error', errorMessage);
      }
    });
    
    // Reset form handler
    resetFormBtn.addEventListener("click", function() {
      addStudentForm.reset();
      clearFormMessage();
    });
    
    // Function to show form messages
    function showFormMessage(type, message) {
      clearFormMessage();
      
      const messageDiv = document.createElement('div');
      messageDiv.className = `form-message ${type}`;
      messageDiv.textContent = message;
      
      const form = document.getElementById('add-student-form');
      form.insertBefore(messageDiv, form.firstChild);
    }
    
    // Function to clear form messages
    function clearFormMessage() {
      const existingMessage = document.querySelector('.form-message');
      if (existingMessage) {
        existingMessage.remove();
      }
    }
    
    // Function to reset to original data (clear localStorage)
    function resetToOriginalData() {
      localStorage.removeItem('dashboard-students');
      location.reload(); // Reload the page to fetch original data
    }
  
    // ==== CHARTS ====
    
    // Global chart variables
    let radarChart = null;
    let pieChart = null;

    // Function to update radar chart with real data
    function updateRadarChart(record) {
      const radarCtx = document.getElementById("radarChart").getContext("2d");
      
      // Destroy existing chart if it exists
      if (radarChart) {
        radarChart.destroy();
      }
      
      // Get subjects based on profession
      const allSubjects = professionSubjects[record.科目] || [];
      
      // Filter out 成績 for charts (only show in table)
      const subjects = allSubjects.filter(subj => subj !== "成績");
      
      // Use Chinese labels directly
      const labels = subjects;
      
      // Define weights for each subject
      const weights = {
        "日本語": 4,
        "文数": 2,
        "理数": 2,
        "物理": 1,
        "化学": 1,
        "生物": 1,
        "文総": 2,
        "TOFEL": 1.2,
        "記述": 0.5
      };
      
      // Get actual scores from the record and apply weights
      const scores = subjects.map(subj => {
        const score = record[subj];
        const weight = weights[subj] || 1;
        return score !== null && score !== undefined ? score / weight : 0;
      });
      
      radarChart = new Chart(radarCtx, {
        type: "radar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Current Score",
              data: scores,
              backgroundColor: "rgba(74, 144, 226, 0.2)",
              borderColor: "#4A90E2",
              borderWidth: 2,
              pointBackgroundColor: "#4A90E2",
              pointRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              angleLines: { color: "#e0e0e0" },
              grid: { color: "#e0e0e0" },
              suggestedMin: 0,
              suggestedMax: 100,
              ticks: {
                display: false,
                stepSize: 30,
              },
              pointLabels: {
                font: { family: "Open Sans", size: 16 },
                color: "#333333",
              },
            },
          },
          plugins: {
            legend: {
              labels: { font: { family: "Open Sans", size: 12 } },
            },
            tooltip: {
              backgroundColor: "rgba(0,0,0,0.7)",
              titleFont: { family: "Open Sans", weight: "600", size: 13, color: "#FFFFFF" },
              bodyFont: { family: "Open Sans", size: 12, color: "#FFFFFF" },
              callbacks: {
                label: function(context) {
                  const subject = context.label;
                  const weightedScore = context.parsed.r;
                  const originalScore = record[subject];
                  const weight = weights[subject] || 1;
                  return `${subject}: ${weightedScore.toFixed(1)} (Original: ${originalScore})`;
                }
              }
            },
          },
          animation: { duration: 1200, easing: "easeOutQuart" },
        },
      });
    }

    // Function to update pie chart with real data
    function updatePieChart(record) {
      const pieCtx = document.getElementById("pieChart").getContext("2d");
      
      // Destroy existing chart if it exists
      if (pieChart) {
        pieChart.destroy();
      }
      
      // Get subjects based on profession
      const allSubjects = professionSubjects[record.科目] || [];
      
      // Filter out 成績 for charts (only show in table)
      const subjects = allSubjects.filter(subj => subj !== "成績");
      
      // Use Chinese labels directly
      const labels = subjects;
      
      // Get actual scores from the record
      const scores = subjects.map(subj => {
        const score = record[subj];
        return score !== null && score !== undefined ? score : 0;
      });
      
      pieChart = new Chart(pieCtx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              data: scores,
              backgroundColor: [
                "#4A90E2",
                "#50E3C2", 
                "#F5A623",
                "#9013FE",
                "#D0021B",
                "#FF6B6B",
                "#4ECDC4",
                "#45B7D1"
              ],
              borderColor: "#FFFFFF",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: { font: { family: "Open Sans", size: 12 }, color: "#333333" },
            },
            tooltip: {
              backgroundColor: "rgba(0,0,0,0.7)",
              titleFont: { family: "Open Sans", weight: "600", size: 13, color: "#FFFFFF" },
              bodyFont: { family: "Open Sans", size: 12, color: "#FFFFFF" },
            },
          },
          animation: { duration: 1200, easing: "easeOutQuart" },
        },
      });
    }

    // Initialize charts with placeholder data
    function initializeCharts() {
      const radarCtx = document.getElementById("radarChart").getContext("2d");
      const pieCtx = document.getElementById("pieChart").getContext("2d");
      
      // Destroy existing charts if they exist
      if (radarChart) {
        radarChart.destroy();
        radarChart = null;
      }
      if (pieChart) {
        pieChart.destroy();
        pieChart = null;
      }
      
      // Initialize with empty data
      radarChart = new Chart(radarCtx, {
        type: "radar",
        data: {
          labels: ["Select a student to view data"],
          datasets: [
            {
              label: "Current Score",
              data: [0],
              backgroundColor: "rgba(74, 144, 226, 0.2)",
              borderColor: "#4A90E2",
              borderWidth: 2,
              pointBackgroundColor: "#4A90E2",
              pointRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              angleLines: { color: "#e0e0e0" },
              grid: { color: "#e0e0e0" },
              suggestedMin: 0,
              suggestedMax: 100,
              ticks: {
                display: false,
                stepSize: 30,
              },
              pointLabels: {
                font: { family: "Open Sans", size: 16 },
                color: "#333333",
              },
            },
          },
          plugins: {
            legend: {
              labels: { font: { family: "Open Sans", size: 12 } },
            },
            tooltip: {
              backgroundColor: "rgba(0,0,0,0.7)",
              titleFont: { family: "Open Sans", weight: "600", size: 13, color: "#FFFFFF" },
              bodyFont: { family: "Open Sans", size: 12, color: "#FFFFFF" },
            },
          },
          animation: { duration: 1200, easing: "easeOutQuart" },
        },
      });
      
      pieChart = new Chart(pieCtx, {
        type: "pie",
        data: {
          labels: ["Select a student to view data"],
          datasets: [
            {
              data: [1],
              backgroundColor: ["#e0e0e0"],
              borderColor: "#FFFFFF",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: { font: { family: "Open Sans", size: 12 }, color: "#333333" },
            },
            tooltip: {
              backgroundColor: "rgba(0,0,0,0.7)",
              titleFont: { family: "Open Sans", weight: "600", size: 13, color: "#FFFFFF" },
              bodyFont: { family: "Open Sans", size: 12, color: "#FFFFFF" },
            },
          },
          animation: { duration: 1200, easing: "easeOutQuart" },
        },
      });
    }

    // Initialize charts
    initializeCharts();

    // Map each profession to its relevant subjects
    const professionSubjects = {
      "物化": ["日本語", "理数", "物理", "化学", "TOFEL", "記述", "成績"],
      "物生": ["日本語", "理数", "物理", "生物", "TOFEL", "記述", "成績"],
      "化生": ["日本語", "理数", "化学", "生物", "TOFEL", "記述", "成績"],
      "文系": ["日本語", "文数", "文総", "TOFEL", "記述", "成績"]
    };

    // ==== STUDENT SELECTION ====
    let students = [];
    let filteredStudents = []; // all records for the selected student

    const studentSelect = document.getElementById('student-select');
    const dateSelect    = document.getElementById('date-select');
    const table         = document.getElementById('gradesTable');
    const tableHead     = table.querySelector('thead');
    const tableBody     = table.querySelector('tbody');

    fetch('test.json')
      .then(res => res.json())
      .then(data => {
        // Check if we have data in localStorage first
        const storedData = localStorage.getItem('dashboard-students');
        if (storedData) {
          students = JSON.parse(storedData);
        } else {
          students = data;
        }
        populateStudentSelect();
      })
      .catch(err => {
        console.error('Error loading JSON:', err);
        // Try to load from localStorage as fallback
        const storedData = localStorage.getItem('dashboard-students');
        if (storedData) {
          students = JSON.parse(storedData);
          populateStudentSelect();
        }
      });

    // Also populate student select if data is already available
    if (students.length > 0) {
      populateStudentSelect();
    }

    function populateStudentSelect() {
      // Clear existing options
      const studentOptions = document.getElementById('student-options');
      studentOptions.innerHTML = '<div class="select-option" data-value="" data-en="-- Select Student --" data-ja="-- 学生を選択 --">-- Select Student --</div>';
      
      // Add student options
      students.forEach(student => {
        const option = document.createElement('div');
        option.className = 'select-option';
        option.dataset.value = student.学籍番号;
        option.textContent = student.姓名;
        studentOptions.appendChild(option);
      });
      
      // Also populate the hidden select for compatibility
      const hiddenSelect = document.getElementById('student-select');
      hiddenSelect.innerHTML = '<option value="" data-en="-- Select Student --" data-ja="-- 学生を選択 --">-- Select Student --</option>';
      students.forEach(student => {
        const option = document.createElement('option');
        option.value = student.学籍番号;
        option.textContent = student.姓名;
        hiddenSelect.appendChild(option);
      });
      
      // Update language for newly created options
      updateDynamicSelectOptions(currentLanguage);
    }

    studentSelect.addEventListener('change', () => {
      handleStudentSelection(studentSelect.value);
    });

    // Also listen to the custom student select
    document.addEventListener('change', (e) => {
      if (e.target.id === 'student-select') {
        handleStudentSelection(e.target.value);
      }
    });

    function handleStudentSelection(studentId) {
      const id = Number(studentId);
      filteredStudents = students.filter(s => s.学籍番号 === id);

      clearInfoAndTable();

      if (filteredStudents.length) {
        const { 姓名, 学籍番号, 科目, 志願 } = filteredStudents[0];
        document.getElementById('student-name').textContent               = 姓名;
        document.getElementById('student-id').textContent                 = 学籍番号;
        document.getElementById('student-profession').textContent         = 科目;
        document.getElementById('student-target-department').textContent  = 志願;

        populateDateSelect();
      } else {
        const dateSelectWrapper = document.getElementById('date-select-wrapper');
        dateSelectWrapper.classList.add('disabled');
      }
    }

    function populateDateSelect() {
      const dateOptions = document.getElementById('date-options');
      const hiddenSelect = document.getElementById('date-select');
      
      // Clear existing options
      dateOptions.innerHTML = '<div class="select-option" data-value="" data-en="-- Select Date --" data-ja="-- 日付を選択 --">-- Select Date --</div>';
      hiddenSelect.innerHTML = '<option value="" data-en="-- Select Date --" data-ja="-- 日付を選択 --">-- Select Date --</option>';
      
      const uniqueDates = [...new Set(filteredStudents.map(r => r.日期))];
      
      uniqueDates.forEach(dt => {
        // Add to custom select
        const customOption = document.createElement('div');
        customOption.className = 'select-option';
        customOption.dataset.value = dt;
        customOption.textContent = dt;
        dateOptions.appendChild(customOption);
        
        // Add to hidden select
        const hiddenOption = document.createElement('option');
        hiddenOption.value = dt;
        hiddenOption.textContent = dt;
        hiddenSelect.appendChild(hiddenOption);
      });
      
      // Enable the date select
      const dateSelectWrapper = document.getElementById('date-select-wrapper');
      dateSelectWrapper.classList.remove('disabled');
      
      // Update language for newly created options
      updateDynamicSelectOptions(currentLanguage);
    }

    dateSelect.addEventListener('change', () => {
      const chosenDate = dateSelect.value;
      const record = filteredStudents.find(r => r.日期 === chosenDate);

      tableHead.innerHTML = '';
      tableBody.innerHTML = '';

      if (record) {
        renderGradesTable(record);
        // Update charts with the selected record data
        updateRadarChart(record);
        updatePieChart(record);
      }
    });

    // Also listen to the custom date select
    document.addEventListener('change', (e) => {
      if (e.target.id === 'date-select') {
        const chosenDate = e.target.value;
        const record = filteredStudents.find(r => r.日期 === chosenDate);

        tableHead.innerHTML = '';
        tableBody.innerHTML = '';

        if (record) {
          renderGradesTable(record);
          // Update charts with the selected record data
          updateRadarChart(record);
          updatePieChart(record);
        }
      }
    });

    // Build the table: subjects→columns, one row of scores
    function renderGradesTable(record) {
      const subjects = professionSubjects[record.科目] || [];

      // header row
      const headerRow = document.createElement('tr');
      subjects.forEach(subj => {
        const th = document.createElement('th');
        th.textContent = subj;
        headerRow.appendChild(th);
      });
      tableHead.appendChild(headerRow);

      // score row
      const scoreRow = document.createElement('tr');
      subjects.forEach(subj => {
        const td = document.createElement('td');
        // use `record`, not `rec`
        const val = record[subj];
        td.textContent = (val != null) ? val : 'N/A';
        scoreRow.appendChild(td);
      });
      tableBody.appendChild(scoreRow);
    }

    function clearInfoAndTable() {
      document.getElementById('student-name').textContent               = '';
      document.getElementById('student-id').textContent                 = '';
      document.getElementById('student-profession').textContent         = '';
      document.getElementById('student-target-department').textContent  = '';
      
      // Reset date select
      const dateOptions = document.getElementById('date-options');
      const dateValue = document.querySelector('#date-select-wrapper .select-value');
      const dateSelectWrapper = document.getElementById('date-select-wrapper');
      
      dateOptions.innerHTML = '<div class="select-option" data-value="" data-en="-- Select Date --" data-ja="-- 日付を選択 --">-- Select Date --</div>';
      dateValue.textContent = '-- Select Date --';
      dateSelectWrapper.classList.add('disabled');
      
      // Reset hidden select
      const hiddenDateSelect = document.getElementById('date-select');
      hiddenDateSelect.innerHTML = '<option value="" data-en="-- Select Date --" data-ja="-- 日付を選択 --">-- Select Date --</option>';
      
      tableHead.innerHTML   = '';
      tableBody.innerHTML   = '';
      
      // Only reset charts if no student is selected
      if (filteredStudents.length === 0) {
        initializeCharts();
      }
      
      // Update language for reset options
      updateDynamicSelectOptions(currentLanguage);
    }

    // ==== UNIVERSITY SELECTION ====
    let universities = [];
    let universitiesLowest = []; // Add variable for lowest grades
    let allUniversities = [];
    let filteredUniversities = [];

    // Track current selections for proper filtering
    let currentUniversity = null;
    let currentSubject = null;
    let currentYear = null;
    let currentMonth = null;

    const universitySelect = document.getElementById('university-select');
    const subjectSelect = document.getElementById('subject-select');
    const yearSelect = document.getElementById('year-select');
    const monthSelect = document.getElementById('month-select');
    const departmentSelect = document.getElementById('department-select');
    const universityTable = document.getElementById('universityTable');
    const universityTableHead = universityTable.querySelector('thead');
    const universityTableBody = universityTable.querySelector('tbody');
    const universitySearch = document.getElementById('university-search');
    const universitySelectWrapper = document.getElementById('university-select-wrapper');

    // Global chart variables for university
    let universityRadarChart = null;

    // Load both university data files
    Promise.all([
      fetch('university.json').then(res => res.json()),
      fetch('university_lowest.json').then(res => res.json())
    ])
      .then(([universityData, lowestData]) => {
        universities = universityData;
        universitiesLowest = lowestData; // Store lowest grades data
        allUniversities = [...new Set(universityData.map(u => u.受験校))]; // Store unique university names
        console.log('Loaded university data:', universityData.length, 'records');
        console.log('Loaded lowest grades data:', lowestData.length, 'records');
        populateUniversitySelect();
        // Initialize match selects after universities are loaded
        populateMatchYearSelect();
      })
      .catch(err => {
        console.error('Error loading university JSON files:', err);
      });

    // Search functionality
    universitySearch.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      filterUniversities(searchTerm);
      
      // Open dropdown when typing
      if (!universitySelectWrapper.classList.contains('open')) {
        universitySelectWrapper.classList.add('open');
      }
    });

    universitySearch.addEventListener('focus', () => {
      // Open dropdown when focusing on search input
      universitySelectWrapper.classList.add('open');
    });

    universitySearch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        // Select first option when pressing Enter
        const firstOption = document.querySelector('#university-options .select-option:not([data-value=""])');
        if (firstOption) {
          firstOption.click();
        }
      }
    });

    function filterUniversities(searchTerm) {
      const universityOptions = document.getElementById('university-options');
      const hiddenSelect = document.getElementById('university-select');
      
      // Clear existing options
      universityOptions.innerHTML = '<div class="select-option" data-value="" data-en="-- Select University --" data-ja="-- 大学を選択 --">-- Select University --</div>';
      hiddenSelect.innerHTML = '<option value="" data-en="-- Select University --" data-ja="-- 大学を選択 --">-- Select University --</option>';
      
      // Filter universities based on search term
      const filteredUnis = allUniversities.filter(uni => 
        uni.toLowerCase().includes(searchTerm)
      );
      
      // Add filtered options
      filteredUnis.forEach(uni => {
        const option = document.createElement('div');
        option.className = 'select-option';
        option.dataset.value = uni;
        option.textContent = uni;
        universityOptions.appendChild(option);
        
        const hiddenOption = document.createElement('option');
        hiddenOption.value = uni;
        hiddenOption.textContent = uni;
        hiddenSelect.appendChild(hiddenOption);
      });
      
      // Update language for newly created options
      updateDynamicSelectOptions(currentLanguage);
    }

    function populateUniversitySelect() {
      const universityOptions = document.getElementById('university-options');
      universityOptions.innerHTML = '<div class="select-option" data-value="" data-en="-- Select University --" data-ja="-- 大学を選択 --">-- Select University --</div>';
      
      allUniversities.forEach(uni => {
        const option = document.createElement('div');
        option.className = 'select-option';
        option.dataset.value = uni;
        option.textContent = uni;
        universityOptions.appendChild(option);
      });
      
      const hiddenSelect = document.getElementById('university-select');
      hiddenSelect.innerHTML = '<option value="" data-en="-- Select University --" data-ja="-- 大学を選択 --">-- Select University --</option>';
      allUniversities.forEach(uni => {
        const option = document.createElement('option');
        option.value = uni;
        option.textContent = uni;
        hiddenSelect.appendChild(option);
      });
      
      // Update language for newly created options
      updateDynamicSelectOptions(currentLanguage);
    }

    universitySelect.addEventListener('change', () => {
      handleUniversitySelection(universitySelect.value);
    });

    document.addEventListener('change', (e) => {
      if (e.target.id === 'university-select') {
        handleUniversitySelection(e.target.value);
      }
    });

    function handleUniversitySelection(universityName) {
      currentUniversity = universityName;
      currentSubject = null;
      currentYear = null;
      currentMonth = null;
      filteredUniversities = universities.filter(u => u.受験校 === universityName);
      clearUniversityInfoAndTable();
      resetUniversitySelectsAfter('subject');
      if (filteredUniversities.length) {
        populateSubjectSelect();
      }
    }

    function populateSubjectSelect() {
      const subjectOptions = document.getElementById('subject-options');
      const hiddenSelect = document.getElementById('subject-select');
      
      subjectOptions.innerHTML = '<div class="select-option" data-value="">-- Select Subject --</div>';
      hiddenSelect.innerHTML = '<option value="">-- Select Subject --</option>';
      
      const uniqueSubjects = [...new Set(filteredUniversities.map(u => u.科目))];
      uniqueSubjects.forEach(subj => {
        const customOption = document.createElement('div');
        customOption.className = 'select-option';
        customOption.dataset.value = subj;
        customOption.textContent = subj;
        subjectOptions.appendChild(customOption);
        
        const hiddenOption = document.createElement('option');
        hiddenOption.value = subj;
        hiddenOption.textContent = subj;
        hiddenSelect.appendChild(hiddenOption);
      });
      
      const subjectSelectWrapper = document.getElementById('subject-select-wrapper');
      subjectSelectWrapper.classList.remove('disabled');
    }

    subjectSelect.addEventListener('change', () => {
      handleSubjectSelection(subjectSelect.value);
    });

    document.addEventListener('change', (e) => {
      if (e.target.id === 'subject-select') {
        handleSubjectSelection(e.target.value);
      }
    });

    function handleSubjectSelection(subject) {
      currentSubject = subject;
      currentYear = null;
      currentMonth = null;
      const subjectFiltered = universities.filter(u =>
        u.受験校 === currentUniversity &&
        u.科目 === subject
      );
      clearUniversityInfoAndTable();
      resetUniversitySelectsAfter('subject');
      if (subjectFiltered.length) {
        populateYearSelect(subjectFiltered);
      }
    }

    function populateYearSelect(subjectFiltered) {
      const yearOptions = document.getElementById('year-options');
      const hiddenSelect = document.getElementById('year-select');
      
      yearOptions.innerHTML = '<div class="select-option" data-value="">-- Select Year --</div>';
      hiddenSelect.innerHTML = '<option value="">-- Select Year --</option>';
      
      const uniqueYears = [...new Set(subjectFiltered.map(u => u.年度))];
      uniqueYears.forEach(year => {
        const customOption = document.createElement('div');
        customOption.className = 'select-option';
        customOption.dataset.value = year;
        customOption.textContent = year;
        yearOptions.appendChild(customOption);
        
        const hiddenOption = document.createElement('option');
        hiddenOption.value = year;
        hiddenOption.textContent = year;
        hiddenSelect.appendChild(hiddenOption);
      });
      
      const yearSelectWrapper = document.getElementById('year-select-wrapper');
      yearSelectWrapper.classList.remove('disabled');
    }

    yearSelect.addEventListener('change', () => {
      handleYearSelection(yearSelect.value);
    });

    document.addEventListener('change', (e) => {
      if (e.target.id === 'year-select') {
        handleYearSelection(e.target.value);
      }
    });

    function handleYearSelection(year) {
      currentYear = Number(year);
      currentMonth = null;
      const yearFiltered = universities.filter(u =>
        u.受験校 === currentUniversity &&
        u.科目 === currentSubject &&
        u.年度 === Number(year)
      );
      clearUniversityInfoAndTable();
      resetUniversitySelectsAfter('year');
      if (yearFiltered.length) {
        populateMonthSelect(yearFiltered);
      }
    }

    function populateMonthSelect(yearFiltered) {
      const monthOptions = document.getElementById('month-options');
      const hiddenSelect = document.getElementById('month-select');
      
      monthOptions.innerHTML = '<div class="select-option" data-value="">-- Select Month --</div>';
      hiddenSelect.innerHTML = '<option value="">-- Select Month --</option>';
      
      const uniqueMonths = [...new Set(yearFiltered.map(u => u.月))];
      uniqueMonths.forEach(month => {
        const customOption = document.createElement('div');
        customOption.className = 'select-option';
        customOption.dataset.value = month;
        customOption.textContent = month;
        monthOptions.appendChild(customOption);
        
        const hiddenOption = document.createElement('option');
        hiddenOption.value = month;
        hiddenOption.textContent = month;
        hiddenSelect.appendChild(hiddenOption);
      });
      
      const monthSelectWrapper = document.getElementById('month-select-wrapper');
      monthSelectWrapper.classList.remove('disabled');
    }

    monthSelect.addEventListener('change', () => {
      handleMonthSelection(monthSelect.value);
    });

    document.addEventListener('change', (e) => {
      if (e.target.id === 'month-select') {
        handleMonthSelection(e.target.value);
      }
    });

    function handleMonthSelection(month) {
      currentMonth = month;
      const monthFiltered = universities.filter(u =>
        u.受験校 === currentUniversity &&
        u.科目 === currentSubject &&
        u.年度 === currentYear &&
        u.月 === month
      );
      clearUniversityInfoAndTable();
      resetUniversitySelectsAfter('month');
      if (monthFiltered.length) {
        populateDepartmentSelect(monthFiltered);
      }
    }

    function populateDepartmentSelect(monthFiltered) {
      const departmentOptions = document.getElementById('department-options');
      const hiddenSelect = document.getElementById('department-select');
      
      departmentOptions.innerHTML = '<div class="select-option" data-value="">-- Select Department --</div>';
      hiddenSelect.innerHTML = '<option value="">-- Select Department --</option>';
      
      const uniqueDepartments = [...new Set(monthFiltered.map(u => u['学部／研究科']))];
      uniqueDepartments.forEach(dept => {
        const customOption = document.createElement('div');
        customOption.className = 'select-option';
        customOption.dataset.value = dept;
        customOption.textContent = dept;
        departmentOptions.appendChild(customOption);
        
        const hiddenOption = document.createElement('option');
        hiddenOption.value = dept;
        hiddenOption.textContent = dept;
        hiddenSelect.appendChild(hiddenOption);
      });
      
      const departmentSelectWrapper = document.getElementById('department-select-wrapper');
      departmentSelectWrapper.classList.remove('disabled');
    }

    departmentSelect.addEventListener('change', () => {
      handleDepartmentSelection(departmentSelect.value);
    });

    document.addEventListener('change', (e) => {
      if (e.target.id === 'department-select') {
        handleDepartmentSelection(e.target.value);
      }
    });

    function handleDepartmentSelection(department) {
      const record = filteredUniversities.find(u => u['学部／研究科'] === department);
      
      // Find corresponding lowest grade record
      let lowestRecord = null;
      if (record && universitiesLowest && universitiesLowest.length > 0) {
        lowestRecord = universitiesLowest.find(u => 
          u.受験校 === record.受験校 && 
          u.科目 === record.科目 && 
          u.年度 === record.年度 && 
          u.月 === record.月 && 
          u['学部／研究科'] === record['学部／研究科']
        );
        console.log('Found record:', record);
        console.log('Found lowest record:', lowestRecord);
      }

      universityTableHead.innerHTML = '';
      universityTableBody.innerHTML = '';

      if (record) {
        renderUniversityTable(record, lowestRecord);
        updateUniversityCharts(record, lowestRecord);
        updateUniversityInfo(record);
      }
    }

    function renderUniversityTable(record, lowestRecord) {
      // Get subjects based on profession
      const subjects = professionSubjects[record.科目] || [];

      // Create header row with subjects
      const headerRow = document.createElement('tr');
      subjects.forEach(subj => {
        const th = document.createElement('th');
        th.textContent = subj;
        headerRow.appendChild(th);
      });
      universityTableHead.appendChild(headerRow);

      // Create score row for regular requirements
      const scoreRow = document.createElement('tr');
      scoreRow.className = 'requirements-row';
      subjects.forEach(subj => {
        const td = document.createElement('td');
        const val = record[subj];
        td.textContent = (val != null) ? val : 'N/A';
        scoreRow.appendChild(td);
      });
      universityTableBody.appendChild(scoreRow);

      // Create score row for lowest passing grades if available
      if (lowestRecord) {
        const lowestRow = document.createElement('tr');
        lowestRow.className = 'lowest-row';
        subjects.forEach(subj => {
          const td = document.createElement('td');
          const val = lowestRecord[subj];
          td.textContent = (val != null) ? val : 'N/A';
          td.style.color = '#e74c3c'; // Red color for lowest grades
          td.style.fontWeight = 'bold';
          lowestRow.appendChild(td);
        });
        universityTableBody.appendChild(lowestRow);
      }
    }

    function updateUniversityInfo(record) {
      document.getElementById('university-applicants').textContent = record['受験生数'] ?? record['受験生数'] ?? '';
      document.getElementById('university-admitted').textContent = record['合格者数'] ?? record['合格者数'] ?? '';
      document.getElementById('university-rate').textContent = record['倍率(%)'] ?? record['倍率(%)'] ?? '';
    }

    function clearUniversityInfoAndTable() {
      document.getElementById('university-applicants').textContent = '';
      document.getElementById('university-admitted').textContent = '';
      document.getElementById('university-rate').textContent = '';
      
      universityTableHead.innerHTML = '';
      universityTableBody.innerHTML = '';
      
      // Reset university charts
      initializeUniversityCharts();
    }

    function resetUniversitySelectsAfter(level) {
      // Reset all selects after the specified level (excluding university)
      const selects = ['subject', 'year', 'month', 'department'];
      const levelIndex = selects.indexOf(level);
      
      selects.forEach((selectName, index) => {
        if (index > levelIndex) {
          const wrapper = document.getElementById(`${selectName}-select-wrapper`);
          const options = document.getElementById(`${selectName}-options`);
          const value = document.querySelector(`#${selectName}-select-wrapper .select-value`);
          const hiddenSelect = document.getElementById(`${selectName}-select`);
          
          options.innerHTML = `<div class="select-option" data-value="">-- Select ${selectName.charAt(0).toUpperCase() + selectName.slice(1)} --</div>`;
          value.textContent = `-- Select ${selectName.charAt(0).toUpperCase() + selectName.slice(1)} --`;
          wrapper.classList.add('disabled');
          hiddenSelect.innerHTML = `<option value="">-- Select ${selectName.charAt(0).toUpperCase() + selectName.slice(1)} --</option>`;
        }
      });
    }

    function updateUniversityCharts(record, lowestRecord) {
      updateUniversityRadarChart(record, lowestRecord);
    }

    function updateUniversityRadarChart(record, lowestRecord) {
      const radarCtx = document.getElementById("universityRadarChart").getContext("2d");
      
      if (universityRadarChart) {
        universityRadarChart.destroy();
      }
      
      const allSubjects = professionSubjects[record.科目] || [];
      const subjects = allSubjects.filter(subj => subj !== "成績");
      
      const labels = subjects;
      
      const weights = {
        "日本語": 4,
        "文数": 2,
        "理数": 2,
        "物理": 1,
        "化学": 1,
        "生物": 1,
        "文総": 2,
        "TOFEL": 1.2,
        "記述": 0.5
      };
      
      const scores = subjects.map(subj => {
        const score = record[subj];
        const weight = weights[subj] || 1;
        return score !== null && score !== undefined ? score / weight : 0;
      });

      // Calculate lowest scores if available
      const lowestScores = lowestRecord ? subjects.map(subj => {
        const score = lowestRecord[subj];
        const weight = weights[subj] || 1;
        return score !== null && score !== undefined ? score / weight : 0;
      }) : null;
      
      const datasets = [
        {
          label: "University Requirements",
          data: scores,
          backgroundColor: "rgba(74, 144, 226, 0.2)",
          borderColor: "#4A90E2",
          borderWidth: 2,
          pointBackgroundColor: "#4A90E2",
          pointRadius: 4,
        }
      ];

      // Add lowest grades dataset if available
      if (lowestScores) {
        datasets.push({
          label: "Lowest Passing Grades",
          data: lowestScores,
          backgroundColor: "rgba(231, 76, 60, 0.2)",
          borderColor: "#e74c3c",
          borderWidth: 2,
          pointBackgroundColor: "#e74c3c",
          pointRadius: 4,
        });
      }
      
      universityRadarChart = new Chart(radarCtx, {
        type: "radar",
        data: {
          labels: labels,
          datasets: datasets,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              angleLines: { color: "#e0e0e0" },
              grid: { color: "#e0e0e0" },
              suggestedMin: 0,
              suggestedMax: 100,
              ticks: {
                display: false,
                stepSize: 30,
              },
              pointLabels: {
                font: { family: "Open Sans", size: 16 },
                color: "#333333",
              },
            },
          },
          plugins: {
            legend: {
              labels: { font: { family: "Open Sans", size: 12 } },
            },
            tooltip: {
              backgroundColor: "rgba(0,0,0,0.7)",
              titleFont: { family: "Open Sans", weight: "600", size: 13, color: "#FFFFFF" },
              bodyFont: { family: "Open Sans", size: 12, color: "#FFFFFF" },
              callbacks: {
                label: function(context) {
                  const subject = context.label;
                  const weightedScore = context.parsed.r;
                  const datasetIndex = context.datasetIndex;
                  const originalScore = datasetIndex === 0 ? record[subject] : lowestRecord[subject];
                  const weight = weights[subject] || 1;
                  const label = datasetIndex === 0 ? "Requirements" : "Lowest";
                  return `${subject} (${label}): ${weightedScore.toFixed(1)} (Original: ${originalScore})`;
                }
              }
            },
          },
          animation: { duration: 1200, easing: "easeOutQuart" },
        },
      });
    }

    function initializeUniversityCharts() {
      const radarCtx = document.getElementById("universityRadarChart").getContext("2d");
      
      if (universityRadarChart) {
        universityRadarChart.destroy();
        universityRadarChart = null;
      }
      
      universityRadarChart = new Chart(radarCtx, {
        type: "radar",
        data: {
          labels: ["Select a university to view data"],
          datasets: [
            {
              label: "University Requirements",
              data: [0],
              backgroundColor: "rgba(74, 144, 226, 0.2)",
              borderColor: "#4A90E2",
              borderWidth: 2,
              pointBackgroundColor: "#4A90E2",
              pointRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              angleLines: { color: "#e0e0e0" },
              grid: { color: "#e0e0e0" },
              suggestedMin: 0,
              suggestedMax: 100,
              ticks: {
                display: false,
                stepSize: 30,
              },
              pointLabels: {
                font: { family: "Open Sans", size: 16 },
                color: "#333333",
              },
            },
          },
          plugins: {
            legend: {
              labels: { font: { family: "Open Sans", size: 12 } },
            },
            tooltip: {
              backgroundColor: "rgba(0,0,0,0.7)",
              titleFont: { family: "Open Sans", weight: "600", size: 13, color: "#FFFFFF" },
              bodyFont: { family: "Open Sans", size: 12, color: "#FFFFFF" },
            },
          },
          animation: { duration: 1200, easing: "easeOutQuart" },
        },
      });
    }

    // Initialize university charts
    initializeUniversityCharts();

    // ==== MATCH SECTION ====
    let matchFilteredStudents = [];
    let matchFilteredUniversities = [];

    const matchYearSelect = document.getElementById('match-year-select');
    const matchMonthSelect = document.getElementById('match-month-select');
    const matchDifficultySelect = document.getElementById('match-difficulty-select');
    const universityMatchesList = document.getElementById('university-matches-list');

    // Global chart variable for match
    let matchRadarChart = null;

    // Function to update match student info when student/date changes in main selects
    function updateMatchStudentInfo() {
      if (filteredStudents.length > 0 && dateSelect.value) {
        const record = filteredStudents.find(r => r.日期 === dateSelect.value);
        if (record) {
          document.getElementById('match-student-score').textContent = record.成績 || 'N/A';
          
          // Update radar chart with student data
          updateMatchRadarChart(record, null);
          
          // Store the current student record
          matchFilteredStudents = [record];
        }
      } else {
        clearMatchInfoAndTable();
      }
    }

    // Listen to changes in the main student and date selects
    studentSelect.addEventListener('change', updateMatchStudentInfo);
    dateSelect.addEventListener('change', updateMatchStudentInfo);

    // Match year selection handler
    matchYearSelect.addEventListener('change', () => {
      handleMatchYearSelection(matchYearSelect.value);
    });

    document.addEventListener('change', (e) => {
      if (e.target.id === 'match-year-select') {
        handleMatchYearSelection(e.target.value);
      }
    });

    function handleMatchYearSelection(year) {
      const yearFiltered = universities.filter(u => u.年度 === Number(year));
      clearMatchTable();

      if (yearFiltered.length) {
        populateMatchMonthSelect(yearFiltered);
      }
    }

    function populateMatchMonthSelect(yearFiltered) {
      const matchMonthOptions = document.getElementById('match-month-options');
      const hiddenSelect = document.getElementById('match-month-select');
      
      matchMonthOptions.innerHTML = '<div class="select-option" data-value="">-- Select Month --</div>';
      hiddenSelect.innerHTML = '<option value="">-- Select Month --</option>';
      
      const uniqueMonths = [...new Set(yearFiltered.map(u => u.月))];
      uniqueMonths.forEach(month => {
        const customOption = document.createElement('div');
        customOption.className = 'select-option';
        customOption.dataset.value = month;
        customOption.textContent = month;
        matchMonthOptions.appendChild(customOption);
        
        const hiddenOption = document.createElement('option');
        hiddenOption.value = month;
        hiddenOption.textContent = month;
        hiddenSelect.appendChild(hiddenOption);
      });
      
      const matchMonthSelectWrapper = document.getElementById('match-month-select-wrapper');
      matchMonthSelectWrapper.classList.remove('disabled');
    }

    matchMonthSelect.addEventListener('change', () => {
      handleMatchMonthSelection(matchMonthSelect.value);
    });

    document.addEventListener('change', (e) => {
      if (e.target.id === 'match-month-select') {
        handleMatchMonthSelection(e.target.value);
      }
    });

    function handleMatchMonthSelection(month) {
      const monthFiltered = universities.filter(u => u.月 === month);
      matchFilteredUniversities = monthFiltered;
      clearMatchTable();
    }

    // Match difficulty selection handler
    matchDifficultySelect.addEventListener('change', () => {
      handleMatchDifficultySelection(matchDifficultySelect.value);
    });

    document.addEventListener('change', (e) => {
      if (e.target.id === 'match-difficulty-select') {
        handleMatchDifficultySelection(e.target.value);
      }
    });

    function handleMatchDifficultySelection(difficulty) {
      if (!matchFilteredStudents.length || !matchFilteredUniversities.length) {
        return;
      }

      const studentRecord = matchFilteredStudents[0];
      const studentScore = studentRecord.成績;
      const studentSubject = studentRecord.科目;

      if (!studentScore || !studentSubject) {
        return;
      }

      let matchedUniversities = [];

      // Filter universities by subject and score based on difficulty
      const subjectFiltered = matchFilteredUniversities.filter(u => u.科目 === studentSubject);

      switch (difficulty) {
        case 'Easy':
          // 成績 is 20pts lower than student's 成績, sorted by 成績 from highest to lowest
          matchedUniversities = subjectFiltered
            .filter(u => u.成績 && u.成績 <= studentScore - 20)
            .sort((a, b) => b.成績 - a.成績)
            .slice(0, 15);
          break;
        case 'Medium':
          // 成績 is no more 10pts lower or 10pts higher than student's 成績, sorted from lowest to highest
          matchedUniversities = subjectFiltered
            .filter(u => u.成績 && u.成績 >= studentScore - 10 && u.成績 <= studentScore + 10)
            .sort((a, b) => a.成績 - b.成績)
            .slice(0, 15);
          break;
        case 'Hard':
          // 成績 is 20pts higher than student's 成績, sorted from lowest to highest
          matchedUniversities = subjectFiltered
            .filter(u => u.成績 && u.成績 >= studentScore + 20)
            .sort((a, b) => a.成績 - b.成績)
            .slice(0, 15);
          break;
      }

      renderMatchTable(matchedUniversities);
    }

    function renderMatchTable(matchedUniversities) {
      universityMatchesList.innerHTML = '';

      if (matchedUniversities.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'university-match-item';
        noResults.textContent = 'No matching universities found';
        universityMatchesList.appendChild(noResults);
        return;
      }

      matchedUniversities.forEach((uni, index) => {
        const matchItem = document.createElement('div');
        matchItem.className = 'university-match-item';
        matchItem.dataset.index = index;
        
        const universityName = document.createElement('div');
        universityName.className = 'university-name';
        universityName.textContent = uni.受験校;
        
        const department = document.createElement('div');
        department.className = 'university-department';
        department.textContent = uni['学部／研究科'];
        
        const stats = document.createElement('div');
        stats.className = 'university-stats';
        stats.textContent = `成績: ${uni.成績 || 'N/A'} | 受験生: ${uni.受験生数 || 'N/A'} | 合格: ${uni.合格者数 || 'N/A'} | 倍率: ${uni['倍率(%)'] || 'N/A'}% | TOFEL: ${uni['TOFEL(%)'] || 'N/A'}%`;
        
        matchItem.appendChild(universityName);
        matchItem.appendChild(department);
        matchItem.appendChild(stats);
        
        // Add click event
        matchItem.addEventListener('click', () => {
          // Remove previous selection
          document.querySelectorAll('.university-match-item').forEach(item => {
            item.classList.remove('selected');
          });
          
          // Add selection to current item
          matchItem.classList.add('selected');
          
          // Update radar chart with university data
          const studentRecord = matchFilteredStudents[0];
          updateMatchRadarChart(studentRecord, uni);
        });
        
        universityMatchesList.appendChild(matchItem);
      });
    }

    function updateMatchRadarChart(studentRecord, universityRecord) {
      const radarCtx = document.getElementById("matchRadarChart").getContext("2d");
      
      if (matchRadarChart) {
        matchRadarChart.destroy();
      }
      
      const allSubjects = professionSubjects[studentRecord.科目] || [];
      const subjects = allSubjects.filter(subj => subj !== "成績");
      
      const labels = subjects;
      
      const weights = {
        "日本語": 4,
        "文数": 2,
        "理数": 2,
        "物理": 1,
        "化学": 1,
        "生物": 1,
        "文総": 2,
        "TOFEL": 1.2,
        "記述": 0.5
      };
      
      const studentScores = subjects.map(subj => {
        const score = studentRecord[subj];
        const weight = weights[subj] || 1;
        return score !== null && score !== undefined ? score / weight : 0;
      });
      
      const datasets = [
        {
          label: "Student Performance",
          data: studentScores,
          backgroundColor: "rgba(74, 144, 226, 0.2)",
          borderColor: "#4A90E2",
          borderWidth: 2,
          pointBackgroundColor: "#4A90E2",
          pointRadius: 4,
        }
      ];
      
      // Add university data if available
      if (universityRecord) {
        const universityScores = subjects.map(subj => {
          const score = universityRecord[subj];
          const weight = weights[subj] || 1;
          return score !== null && score !== undefined ? score / weight : 0;
        });
        
        datasets.push({
          label: `${universityRecord.受験校} Requirements`,
          data: universityScores,
          backgroundColor: "rgba(74, 144, 226, 0.2)",
          borderColor: "#4A90E2",
          borderWidth: 2,
          pointBackgroundColor: "#4A90E2",
          pointRadius: 4,
        });
      }
      
      matchRadarChart = new Chart(radarCtx, {
        type: "radar",
        data: {
          labels: labels,
          datasets: datasets,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              angleLines: { color: "#e0e0e0" },
              grid: { color: "#e0e0e0" },
              suggestedMin: 0,
              suggestedMax: 100,
              ticks: {
                display: false,
                stepSize: 30,
              },
              pointLabels: {
                font: { family: "Open Sans", size: 16 },
                color: "#333333",
              },
            },
          },
          plugins: {
            legend: {
              labels: { font: { family: "Open Sans", size: 12 } },
            },
            tooltip: {
              backgroundColor: "rgba(0,0,0,0.7)",
              titleFont: { family: "Open Sans", weight: "600", size: 13, color: "#FFFFFF" },
              bodyFont: { family: "Open Sans", size: 12, color: "#FFFFFF" },
              callbacks: {
                label: function(context) {
                  const subject = context.label;
                  const weightedScore = context.parsed.r;
                  const record = context.dataset.label.includes('Student') ? studentRecord : universityRecord;
                  const originalScore = record[subject];
                  const weight = weights[subject] || 1;
                  return `${context.dataset.label} - ${subject}: ${weightedScore.toFixed(1)} (Original: ${originalScore})`;
                }
              }
            },
          },
          animation: { duration: 1200, easing: "easeOutQuart" },
        },
      });
    }

    function clearMatchInfoAndTable() {
      document.getElementById('match-student-score').textContent = '';
      
      matchGradesTableHead.innerHTML = '';
      matchGradesTableBody.innerHTML = '';
      
      clearMatchTable();
      
      if (matchRadarChart) {
        matchRadarChart.destroy();
        matchRadarChart = null;
      }
    }

    function clearMatchTable() {
      universityMatchesList.innerHTML = '';
    }

    // Initialize match year select with university data
    function populateMatchYearSelect() {
      const matchYearOptions = document.getElementById('match-year-options');
      matchYearOptions.innerHTML = '<div class="select-option" data-value="">-- Select Year --</div>';
      
      const uniqueYears = [...new Set(universities.map(u => u.年度))];
      uniqueYears.forEach(year => {
        const option = document.createElement('div');
        option.className = 'select-option';
        option.dataset.value = year;
        option.textContent = year;
        matchYearOptions.appendChild(option);
      });
      
      const hiddenSelect = document.getElementById('match-year-select');
      hiddenSelect.innerHTML = '<option value="">-- Select Year --</option>';
      uniqueYears.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        hiddenSelect.appendChild(option);
      });
    }

  });
  