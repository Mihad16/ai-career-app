import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from career.models import Stream, Degree, Domain, Skill, DomainSkill, RoadmapStep

def run():
    print("Clearing old data...")
    Stream.objects.all().delete()
    Degree.objects.all().delete()
    Skill.objects.all().delete()

    print("Creating core skills...")
    skill_names = [
        # Core
        "Physics", "Chemistry", "Mathematics", "Biology", 
        "Accounting", "Economics", "Business Studies",
        # Tech
        "HTML", "CSS", "JavaScript", "React", "Node.js", "Python", "SQL",
        "Data Analysis", "Machine Learning", "Deep Learning", "Sensors", "CAD",
        "Cyber Security", "Penetration Testing", "Mobile App Dev", "React Native", "Java", "C++",
        # Finance
        "Financial Analysis", "Tax Law", "Corporate Finance", "Banking Regulations", "Investment Banking",
        # Biz/Mgmt
        "Marketing Strategy", "Digital Marketing", "HR Management", "Recruitment", "Leadership", "Business Analytics", "Entrepreneurship",
        # Arts/Humanities
        "Public Administration", "Constitutional Law", "Journalism", "Copywriting", "Communication", "Teaching Pedagogies", "Content Strategy", "SEO",
        # Science
        "Anatomy", "Pharmacology", "Biotechnology", "Thermodynamics", "Robotics", "Ecology", "Environmental Law"
    ]
    skills = {}
    for name in skill_names:
        c_link = f"https://www.coursera.org/search?query={name.replace(' ', '+')}"
        y_link = f"https://www.youtube.com/results?search_query={name.replace(' ', '+')}+crash+course"
        skills[name], _ = Skill.objects.get_or_create(
            name=name, 
            defaults={'coursera_link': c_link, 'youtube_link': y_link}
        )

    print("Creating Streams...")
    pcm = Stream.objects.create(name="Science (PCM)")
    pcb = Stream.objects.create(name="Science (PCB)")
    commerce = Stream.objects.create(name="Commerce")
    arts = Stream.objects.create(name="Humanities (Arts)")

    print("Creating Degrees...")
    btech = Degree.objects.create(name="Bachelor of Technology")
    btech.streams.add(pcm)
    
    bca = Degree.objects.create(name="Bachelor of Computer Applications")
    bca.streams.add(pcm)

    mbbs = Degree.objects.create(name="Bachelor of Medicine, Bachelor of Surgery (MBBS)")
    mbbs.streams.add(pcb)
    
    bpharm = Degree.objects.create(name="Bachelor of Pharmacy")
    bpharm.streams.add(pcb)

    bsc = Degree.objects.create(name="Bachelor of Science")
    bsc.streams.add(pcm, pcb)

    bcom = Degree.objects.create(name="Bachelor of Commerce")
    bcom.streams.add(commerce)
    
    bba = Degree.objects.create(name="Bachelor of Business Administration")
    bba.streams.add(commerce)

    beco = Degree.objects.create(name="Bachelor of Economics")
    beco.streams.add(commerce)

    ba = Degree.objects.create(name="Bachelor of Arts")
    ba.streams.add(arts)
    
    bsw = Degree.objects.create(name="Bachelor of Social Work")
    bsw.streams.add(arts)

    bjmc = Degree.objects.create(name="Bachelor of Journalism and Mass Communication")
    bjmc.streams.add(arts)

    def make_domain_and_roadmap(degree, domain_name, required_skill_names, roadmap_steps, job_role, salary, growth):
        domain = Domain.objects.create(name=domain_name, degree=degree, job_roles=job_role, average_salary=salary, career_growth=growth)
        for s_name in required_skill_names:
            DomainSkill.objects.create(domain=domain, skill=skills[s_name])
        for idx, step in enumerate(roadmap_steps, 1):
            RoadmapStep.objects.create(domain=domain, step_number=idx, title=step['title'], description=step['desc'])
        return domain

    # ==== BCA ====
    make_domain_and_roadmap(bca, "Web Development", ["HTML", "CSS", "JavaScript", "React", "Node.js"], [
        {"title": "HTML & CSS Basics", "desc": "Learn the structure and styling of web pages."},
        {"title": "JavaScript Fundamentals", "desc": "Understand core JS concepts like loops, arrays, and DOM manipulation."},
        {"title": "Frontend Framework (React)", "desc": "Learn component based architecture, state management, and hooks."},
        {"title": "Backend API (Node.js)", "desc": "Learn to create RESTful APIs and interact with databases."},
        {"title": "Deploy Projects", "desc": "Deploy full stack apps on Vercel or Heroku."}
    ], "Full Stack Developer", "₹5–9 LPA", "Very High / 22% YoY")
    
    make_domain_and_roadmap(bca, "Cybersecurity", ["Python", "Cyber Security", "Penetration Testing"], [
        {"title": "Networking Basics", "desc": "Understand TCP/IP, DNS, and OSI Model."},
        {"title": "Linux & Scripting", "desc": "Learn Linux commands and Python for automation."},
        {"title": "Ethical Hacking Concepts", "desc": "Learn about OWASP Top 10 vulnerabilities."},
        {"title": "Certifications", "desc": "Prepare for CompTIA Security+ or CEH."}
    ], "Security Analyst", "₹6–12 LPA", "Extremely High / 32% YoY")
    
    make_domain_and_roadmap(bca, "Data Science", ["Python", "SQL", "Data Analysis", "Machine Learning"], [
        {"title": "Python & SQL", "desc": "Master data extraction and manipulation."},
        {"title": "Data Visualization", "desc": "Learn Matplotlib, Seaborn, or PowerBI."},
        {"title": "Machine Learning", "desc": "Study algorithms: Regression, Classification, Clustering."},
        {"title": "Build AI Models", "desc": "Train models on Kaggle datasets."}
    ], "Data Analyst", "₹4–8 LPA", "High / 28% YoY")
    
    make_domain_and_roadmap(bca, "Mobile App Development", ["JavaScript", "React Native"], [
        {"title": "UI Design basics", "desc": "Learn how mobile layouts work."},
        {"title": "React Native", "desc": "Learn cross-platform mobile development."},
        {"title": "State Management", "desc": "Redux or Context API integration."},
        {"title": "Publish to Stores", "desc": "Deploy to Google Play and App Store."}
    ], "Mobile Developer", "₹5–10 LPA", "High / 18% YoY")

    # ==== BCom ====
    make_domain_and_roadmap(bcom, "Accounting", ["Accounting", "Financial Analysis"], [
        {"title": "Basic Accounting Principles", "desc": "Master double-entry bookkeeping."},
        {"title": "Accounting Software", "desc": "Learn Tally, QuickBooks, or Zoho Books."},
        {"title": "Financial Reporting", "desc": "Understand Balance Sheets and P&L statements."},
        {"title": "Articleship/Internship", "desc": "Work under a CA or in an accounting firm."}
    ], "Accountant", "₹3–6 LPA", "Stable / 10% YoY")

    make_domain_and_roadmap(bcom, "Finance", ["Financial Analysis", "Corporate Finance"], [
        {"title": "Financial Markets", "desc": "Understand stocks, bonds, and mutual funds."},
        {"title": "Corporate Finance", "desc": "Capital budgeting and risk management."},
        {"title": "Financial Modeling", "desc": "Use Excel to build financial forecasts."},
        {"title": "CFA Preparation", "desc": "Start Level 1 of the CFA program."}
    ], "Financial Analyst", "₹5–9 LPA", "High / 15% YoY")
    
    make_domain_and_roadmap(bcom, "Taxation", ["Accounting", "Tax Law"], [
        {"title": "Direct Taxes", "desc": "Income Tax rules and computation."},
        {"title": "Indirect Taxes", "desc": "GST framework and filing."},
        {"title": "Tax Planning", "desc": "Corporate and individual tax optimization strategies."},
        {"title": "Tax Consultant Certification", "desc": "Gain official credentials."}
    ], "Tax Consultant", "₹4–8 LPA", "Stable / 8% YoY")

    make_domain_and_roadmap(bcom, "Banking", ["Banking Regulations", "Investment Banking"], [
        {"title": "Banking Operations", "desc": "Learn core banking systems and retail banking."},
        {"title": "Regulatory Compliance", "desc": "Understand RBI guidelines and AML rules."},
        {"title": "Credit Analysis", "desc": "Assess borrower creditworthiness for loans."},
        {"title": "Bank PO Exams", "desc": "Prepare for IBPS or SBI PO recruitment."}
    ], "Bank Officer", "₹5–10 LPA", "Moderate / 12% YoY")

    # ==== BBA ====
    make_domain_and_roadmap(bba, "Marketing", ["Marketing Strategy", "Digital Marketing"], [
        {"title": "Marketing Principles", "desc": "The 4 Ps of marketing and consumer behavior."},
        {"title": "Digital Channels", "desc": "SEO, SEM, and Social Media strategies."},
        {"title": "Campaign Management", "desc": "Planning and executing ad campaigns."},
        {"title": "Analytics", "desc": "Measuring ROI using Google Analytics."}
    ], "Digital Marketing Mgr", "₹4–7 LPA", "High / 20% YoY")

    make_domain_and_roadmap(bba, "Human Resources", ["HR Management", "Recruitment"], [
        {"title": "Organizational Behavior", "desc": "Understanding company culture and employee dynamics."},
        {"title": "Talent Acquisition", "desc": "Sourcing, interviewing, and onboarding."},
        {"title": "Performance Management", "desc": "Appraisal systems and employee retention."},
        {"title": "Labor Laws", "desc": "Understanding legal compliance in HR."}
    ], "HR Specialist", "₹3.5–6 LPA", "Stable / 12% YoY")

    make_domain_and_roadmap(bba, "Business Analytics", ["Data Analysis", "Python", "Business Analytics"], [
        {"title": "Data Processing", "desc": "Cleaning and structuring data using Python/Excel."},
        {"title": "Statistical Models", "desc": "Using stats to forecast business trends."},
        {"title": "BI Tools", "desc": "Master Tableau or PowerBI for dashboards."},
        {"title": "Strategy Recommendations", "desc": "Presenting insights to stakeholders."}
    ], "Business Analyst", "₹6–10 LPA", "High / 25% YoY")

    make_domain_and_roadmap(bba, "Entrepreneurship", ["Leadership", "Accounting", "Entrepreneurship"], [
        {"title": "Idea Validation", "desc": "Market research and evaluating product-market fit."},
        {"title": "Business Planning", "desc": "Creating a roadmap, financial projections, and lean canvas."},
        {"title": "Funding & Pitching", "desc": "Learning how to secure seed capital and pitch investors."},
        {"title": "Launch", "desc": "Developing an MVP and going to market."}
    ], "Startup Founder", "Variable", "Exponential / Risk Heavy")

    # ==== BSc ====
    make_domain_and_roadmap(bsc, "Biotechnology", ["Biology", "Chemistry", "Biotechnology"], [
        {"title": "Cell Biology", "desc": "Study cellular structure and functions."},
        {"title": "Lab Techniques", "desc": "Master PCR, Gel Electrophoresis, and Chromatography."},
        {"title": "Research Project", "desc": "Assist in a laboratory setting or publish a paper."}
    ], "Biotech Researcher", "₹4–8 LPA", "Moderate / 14% YoY")

    make_domain_and_roadmap(bsc, "Physics Research", ["Physics", "Mathematics", "Thermodynamics"], [
        {"title": "Classical Mechanics", "desc": "Newtonian physics and kinematics."},
        {"title": "Quantum Mechanics", "desc": "Wave-particle duality and Schrödinger equation."},
        {"title": "Experimental Design", "desc": "Designing rigorous experiments and analyzing error."},
        {"title": "Graduate School Prep", "desc": "Prepare for entering a MSc or PhD program."}
    ], "Research Scientist", "₹6–12 LPA", "Moderate / 10% YoY")

    make_domain_and_roadmap(bsc, "Data Science", ["Python", "SQL", "Mathematics", "Machine Learning"], [
        {"title": "Statistical Foundations", "desc": "Probability, distributions, and inferential stats."},
        {"title": "Python Data Stack", "desc": "Master Pandas, NumPy, and Scikit-learn."},
        {"title": "Advanced Visualization", "desc": "Creating comprehensive data storytelling reports."},
        {"title": "Machine Learning", "desc": "Predictive modeling and deployments."}
    ], "Data Scientist", "₹7–14 LPA", "Very High / 30% YoY")

    make_domain_and_roadmap(bsc, "Environmental Science", ["Ecology", "Biology", "Environmental Law"], [
        {"title": "Ecological Principles", "desc": "Study ecosystems, biodiversity, and conservation."},
        {"title": "Pollution Control", "desc": "Methods for monitoring and mitigating air/water pollution."},
        {"title": "Environmental Impact Assessment", "desc": "Learn how to evaluate industrial projects."},
        {"title": "Sustainability Consulting", "desc": "Advising corporations on green practices."}
    ], "Environmental Consultant", "₹4–8 LPA", "High / 20% YoY")

    # ==== BTech ====
    make_domain_and_roadmap(btech, "AI/ML", ["Python", "Mathematics", "Machine Learning", "Deep Learning"], [
        {"title": "Linear Algebra & Calculus", "desc": "The math foundational to neural networks."},
        {"title": "Core ML Algorithms", "desc": "Implement SVMs, Random Forests, and Gradient Boosting."},
        {"title": "Deep Learning", "desc": "Build Neural Networks with PyTorch or TensorFlow."},
        {"title": "Computer Vision / NLP", "desc": "Specialize in language or image processing."}
    ], "AI Engineer", "₹8–15 LPA", "Extremely High / 35% YoY")

    make_domain_and_roadmap(btech, "Robotics", ["Physics", "Python", "Mathematics", "Robotics", "Sensors"], [
        {"title": "Kinematics", "desc": "Understanding robot movement and joints."},
        {"title": "Sensors and Actuators", "desc": "Hardware interfacing and signal processing."},
        {"title": "Control Systems", "desc": "PID controllers and stability."},
        {"title": "ROS (Robot Operating System)", "desc": "Software framework for robot development."}
    ], "Robotics Engineer", "₹6–12 LPA", "High / 22% YoY")

    make_domain_and_roadmap(btech, "Software Engineering", ["Java", "C++", "SQL", "HTML"], [
        {"title": "Data Structures & Algorithms", "desc": "Master arrays, trees, graphs, and dynamic programming."},
        {"title": "OOD & System Design", "desc": "Object Oriented Design and highly scalable architectures."},
        {"title": "Version Control & CI/CD", "desc": "Git workflows and automated testing/deployment pipelines."},
        {"title": "Full Stack Integrations", "desc": "Connect DBs to backend logic and frontend UI."}
    ], "Software Engineer", "₹8–16 LPA", "High / 25% YoY")

    make_domain_and_roadmap(btech, "Civil Engineering", ["Physics", "Mathematics", "CAD"], [
        {"title": "Structural Analysis", "desc": "Determine how loads affect physical structures."},
        {"title": "Materials Science", "desc": "Understand properties of concrete, steel, and timber."},
        {"title": "AutoCAD & Drafting", "desc": "Create standard blueprints and 3D architectural models."},
        {"title": "Project Management", "desc": "On-site planning, cost estimation, and supervision."}
    ], "Civil Engineer", "₹4–9 LPA", "Stable / 10% YoY")

    # ==== BA ====
    make_domain_and_roadmap(ba, "Civil Services", ["Public Administration", "Constitutional Law", "Economics"], [
        {"title": "Syllabus Analysis", "desc": "Understand the UPSC/State PSC exam pattern."},
        {"title": "Core Subjects", "desc": "Deep dive into History, Geography, Polity, and Economy."},
        {"title": "Current Affairs", "desc": "Daily reading of major newspapers and analysis."},
        {"title": "Mock Tests & Answer Writing", "desc": "Practice extensive writing under time limits."}
    ], "Civil Servant", "₹6–10 LPA", "Prestige / Stable")

    make_domain_and_roadmap(ba, "Journalism", ["Journalism", "Copywriting", "Communication"], [
        {"title": "News Reporting Basics", "desc": "Learn the 5Ws and 1H of storytelling."},
        {"title": "Media Ethics", "desc": "Understand journalism standards and libel laws."},
        {"title": "Multimedia Production", "desc": "Editing audio and video for digital broadcast."},
        {"title": "Portfolio Building", "desc": "Publish articles in college papers or personal blogs."}
    ], "Journalist", "₹3–7 LPA", "Moderate / 8% YoY")

    make_domain_and_roadmap(ba, "Teaching", ["Communication", "Teaching Pedagogies", "Leadership"], [
        {"title": "Educational Psychology", "desc": "Understand learning styles and student development."},
        {"title": "Curriculum Design", "desc": "Plan engaging lesson structures and assessments."},
        {"title": "Classroom Management", "desc": "Handle behavioral dynamics and maintain focus."},
        {"title": "B.Ed Certification", "desc": "Acquire official teaching qualifications."}
    ], "Educator", "₹3–6 LPA", "Stable / 7% YoY")

    make_domain_and_roadmap(ba, "Content Writing", ["Copywriting", "SEO", "Content Strategy"], [
        {"title": "Writing Fundamentals", "desc": "Master grammar, tone, and storytelling techniques."},
        {"title": "SEO Basics", "desc": "Keyword integration and optimizing for search engines."},
        {"title": "Content Formats", "desc": "Learn to write blogs, whitepapers, social copy, and newsletters."},
        {"title": "Freelancing / Agency", "desc": "Pitch clients or join a digital marketing team."}
    ], "Content Marketer", "₹3.5–7 LPA", "High / 15% YoY")

    print("Success: Final Master Curriculum thoroughly populated.")

if __name__ == '__main__':
    run()
