window.CSTW_DATA = {
  metadata: {
    title: "Catholic School Teacher Workforce",
    activeWave: "2020-21",
    source: "NCES PowerStats",
    updated: "November 2026",
    note: "Weighted national estimates for private-school teachers."
  },
  waves: [
    { year: "1987-88", survey: "SASS", status: "pilot" },
    { year: "1990-91", survey: "SASS", status: "pilot" },
    { year: "1993-94", survey: "SASS", status: "pilot" },
    { year: "1999-2000", survey: "SASS", status: "pilot" },
    { year: "2003-04", survey: "SASS", status: "available" },
    { year: "2007-08", survey: "SASS", status: "available" },
    { year: "2011-12", survey: "SASS", status: "available" },
    { year: "2015-16", survey: "NTPS", status: "unavailable" },
    { year: "2017-18", survey: "NTPS", status: "partial" },
    { year: "2020-21", survey: "NTPS", status: "available" }
  ],
  trends: {
    demographics: [
      { label: "Teachers age 50+", startYear: "1987–88", start: 21.0, endYear: "1999–2000", end: 33.8, max: 40 },
      { label: "Male teachers", startYear: "2003–04", start: 19.8, endYear: "2020–21", end: 24.2, max: 40 },
      { label: "Teachers of color", startYear: "2003–04", start: 11.4, endYear: "2020–21", end: 14.7, max: 40 }
    ],
    autonomy: {
      years: ["2003–04", "2007–08", "2011–12", "2020–21"],
      rows: [
        { label: "Teaching techniques", values: [83.6, 83.1, 80.1, 78.0], className: "" },
        { label: "Student discipline", values: [73.6, 65.8, 65.5, 53.3], className: "alt" }
      ]
    },
    preparation: [
      ["Subject matter", 86.0],
      ["Instructional methods", 75.7],
      ["Assessment", 69.3],
      ["Differentiation", 68.0],
      ["Classroom management", 61.0]
    ],
    autonomySplit: [
      ["Teaching techniques", 78.0, "control"],
      ["Student discipline", 53.3, "control"],
      ["School curriculum", 38.8, "influence"],
      ["Hiring teachers", 5.8, "influence"],
      ["School budget", 2.0, "influence"]
    ]
  },
  sectors: {
    "Catholic": {
      age: 45.9,
      experience: 15.0,
      salary: 43102,
      schoolEarnings: 44660,
      totalEarnings: 47914,
      hours: 50.3,
      instruction: 23.6,
      classSize: 18.6,
      students: 99.6,
      pupilFte: 12.2,
      supplies: 319,
      profile: {
        "Full-time": 86.7,
        "Women": 75.8,
        "Teachers of color": 14.7,
        "Early-career teachers": 15.9,
        "Regular state certificate": 89.9,
        "Alternative certification route": 17.3
      },
      retention: {
        "As long as able": 49.3,
        "Until retirement eligibility": 14.9,
        "Until a life event": 8.0,
        "Until a better job": 6.4,
        "Leave as soon as possible": 3.1,
        "Undecided": 18.3
      }
    },
    "Other religious": {
      age: 45.4,
      experience: 14.2,
      salary: 37431,
      schoolEarnings: 38711,
      totalEarnings: 42275,
      hours: 47.2,
      instruction: 22.2,
      classSize: 14.0,
      students: 71.0,
      pupilFte: 9.4,
      supplies: 317,
      profile: {
        "Full-time": 80.4,
        "Women": 77.2,
        "Teachers of color": 16.8,
        "Early-career teachers": 20.3,
        "Regular state certificate": 88.5,
        "Alternative certification route": 13.7
      },
      retention: {
        "As long as able": 52.8,
        "Until retirement eligibility": 11.1,
        "Until a life event": 9.9,
        "Until a better job": 7.0,
        "Leave as soon as possible": 1.8,
        "Undecided": 19.1
      }
    },
    "Nonsectarian": {
      age: 44.9,
      experience: 14.4,
      salary: 53373,
      schoolEarnings: 55451,
      totalEarnings: 57791,
      hours: 48.6,
      instruction: 21.5,
      classSize: 12.0,
      students: 58.4,
      pupilFte: 7.4,
      supplies: 247,
      profile: {
        "Full-time": 85.1,
        "Women": 72.1,
        "Teachers of color": 18.6,
        "Early-career teachers": 13.4,
        "Regular state certificate": 90.9,
        "Alternative certification route": 17.4
      },
      retention: {
        "As long as able": 51.6,
        "Until retirement eligibility": 11.3,
        "Until a life event": 7.3,
        "Until a better job": 9.6,
        "Leave as soon as possible": 3.1,
        "Undecided": 17.1
      }
    }
  },
  supportGroups: {
    mentoring: {
      label: "Mentoring",
      rows: [
        ["Mentor met weekly", 63.5, 11.1],
        ["Mentor met monthly", 41.6, 26.2],
        ["Same-subject mentor", 56.1, 15.9],
        ["Different-subject mentor", 41.2, 27.4],
        ["Standards lesson help", 62.7, 11.6],
        ["No standards lesson help", 37.1, 29.5]
      ]
    },
    firstYear: {
      label: "First-year supports",
      rows: [
        ["Reduced schedule", 63.1, 11.9],
        ["No reduced schedule", 48.9, 22.3],
        ["Principal communication", 55.5, 17.9],
        ["No principal communication", 39.0, 27.9],
        ["Observation", 58.3, 18.5],
        ["No observation", 40.1, 23.2]
      ]
    },
    financial: {
      label: "Financial and employment conditions",
      rows: [
        ["No student loans", 52.5, 16.6],
        ["Had student loans", 45.8, 20.1],
        ["Full-time", 49.4, 16.9],
        ["Part-time", 48.6, 27.1],
        ["No outside income", 49.4, 18.2],
        ["Outside income", 48.8, 18.5]
      ]
    }
  }
};
